"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { Button } from "@/components/ui/button";
import {
  getAgents,
  getSiteConfig,
  getTestimonials,
  hasMeaningfulSiteConfig,
  type SiteAgent,
  type SiteConfig,
} from "@/lib/public-site";
import {
  prefixAgencyPath,
  resolveAgencySlugFromPathname,
} from "@/lib/agency-routing";
import { PlaceHolderImages } from "@/lib/placeholder-images";

function getDisplayName(siteConfig: SiteConfig | null) {
  return (
    siteConfig?.branding?.displayName ||
    siteConfig?.organization.name ||
    "Agency Website"
  );
}

function getAgentImage(seed: string, avatar?: string | null) {
  if (avatar) return avatar;
  const initials =
    seed
      .split(/[\s-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "AG";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#faf8f2"/><stop offset="1" stop-color="#ddd6cb"/></linearGradient></defs><rect width="900" height="1200" fill="url(#g)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#6f6257" font-family="Arial, sans-serif" font-size="280" font-weight="700">${initials}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function isLikelyRoleText(value?: string | null) {
  const normalized = value?.trim();
  if (!normalized) return false;
  if (/[.!?,:;]/.test(normalized)) return false;

  const words = normalized
    .replace(/[&/()-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  return words.length > 0 && words.length <= 5;
}

function toTitleCase(value: string) {
  return value.replace(/\b\w+/g, (part) => {
    const lower = part.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  });
}

function inferRoleFromName(name: string) {
  const matches = name.match(
    /\b(owner|manager|broker|founder|director|ceo|advisor|agent|consultant|principal|partner|head)\b/gi,
  );

  if (!matches?.length) return null;
  return toTitleCase(matches[0]);
}

function getAgentRole(agent: SiteAgent) {
  if (isLikelyRoleText(agent.jobTitle)) return agent.jobTitle!.trim();
  if (isLikelyRoleText(agent.title)) return agent.title!.trim();

  const inferredRole = inferRoleFromName(agent.name);
  if (inferredRole) return inferredRole;

  return "Property Consultant";
}

function getAgentTagline(agent: SiteAgent, displayName: string) {
  return (
    agent.tagline?.trim() ||
    (!isLikelyRoleText(agent.title) ? agent.title?.trim() : null) ||
    agent.bio?.trim() ||
    `${agent.name} is part of the expert advisory team at ${displayName}.`
  );
}

type AboutTestimonial = {
  id: string;
  quote: string;
  author: string;
  meta: string;
  avatar?: string | null;
};

function normalizeTestimonials(input: unknown[]): AboutTestimonial[] {
  const normalized: AboutTestimonial[] = [];

  input.forEach((item, index) => {
    const testimonial = item as {
      id?: string;
      message?: string | null;
      quote?: string | null;
      content?: string | null;
      author?: string | null;
      name?: string | null;
      clientName?: string | null;
      location?: string | null;
      property?: string | null;
      badgeLabel?: string | null;
      avatar?: string | null;
      image?: string | null;
      imageUrl?: string | null;
    };

    const quote =
      testimonial.message?.trim() ||
      testimonial.quote?.trim() ||
      testimonial.content?.trim() ||
      "";
    if (!quote) return;

    const author =
      testimonial.author?.trim() ||
      testimonial.name?.trim() ||
      testimonial.clientName?.trim() ||
      "Anonymous";

    normalized.push({
      id: testimonial.id || `${author}-${index}`,
      quote,
      author,
      meta:
        testimonial.badgeLabel?.trim() ||
        testimonial.location?.trim() ||
        testimonial.property?.trim() ||
        "Client testimonial",
      avatar:
        testimonial.imageUrl?.trim() ||
        testimonial.avatar?.trim() ||
        testimonial.image?.trim() ||
        null,
    });
  });

  return normalized;
}

export function VelaAboutPageContent({
  initialSiteConfig = null,
  initialAgents = [],
  initialTestimonials = [],
}: {
  initialSiteConfig?: SiteConfig | null;
  initialAgents?: SiteAgent[];
  initialTestimonials?: unknown[];
}) {
  const pathname = usePathname();
  const agencySlug = resolveAgencySlugFromPathname(pathname);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(
    initialSiteConfig,
  );
  const [agents, setAgents] = useState<SiteAgent[]>(initialAgents);
  const [testimonials, setTestimonials] = useState<AboutTestimonial[]>(() =>
    normalizeTestimonials(initialTestimonials),
  );
  const testimonialBg = PlaceHolderImages.find(i => i.id === "contact-bg")?.imageUrl;

  useEffect(() => {
    setSiteConfig(initialSiteConfig);
    setAgents(initialAgents);
    setTestimonials(normalizeTestimonials(initialTestimonials));
  }, [initialAgents, initialSiteConfig, initialTestimonials]);

  useEffect(() => {
    let active = true;

    async function load() {
      const [nextSiteConfig, nextAgents, nextTestimonials] = await Promise.all([
        getSiteConfig(agencySlug),
        getAgents(agencySlug),
        getTestimonials(agencySlug),
      ]);

      if (!active) return;
      setSiteConfig((current) =>
        hasMeaningfulSiteConfig(nextSiteConfig) ? nextSiteConfig : current,
      );
      setAgents((current) =>
        nextAgents.agents.length > 0 || current.length === 0
          ? nextAgents.agents
          : current,
      );
      setTestimonials(normalizeTestimonials(nextTestimonials));
    }

    void load();
    return () => {
      active = false;
    };
  }, [agencySlug]);

  const displayName = getDisplayName(siteConfig);
  const aboutCompany =
    siteConfig?.profile?.aboutCompany?.trim() ||
    siteConfig?.branding?.bio?.trim() ||
    `${displayName} pairs elegant public presentation with live organization data, live agent profiles, and current listings streamed from Broker OS.`;
  const mission =
    siteConfig?.profile?.mission?.trim() ||
    `${displayName} is committed to helping clients move confidently through the market with tailored advice and responsive support.`;
  const vision =
    siteConfig?.profile?.vision?.trim() ||
    `We want ${displayName} to be known for a public experience that feels refined, trustworthy, and always up to date.`;
  const stats = [
    { label: "Live listings", value: siteConfig?.stats?.totalListings ?? 0 },
    {
      label: "Active agents",
      value: siteConfig?.stats?.activeAgents ?? agents.length,
    },
    { label: "Ready homes", value: siteConfig?.stats?.readyListings ?? 0 },
    { label: "Off-plan", value: siteConfig?.stats?.offPlanListings ?? 0 },
  ];

  return (
    <main className="min-h-screen bg-background">
      <section className="relative min-h-[78vh] overflow-hidden px-6 pt-40 pb-28 text-white">
        <Image
          src="https://picsum.photos/seed/vela-about-dynamic/1920/1080"
          alt={displayName}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-[12px] font-bold uppercase tracking-[0.5em] text-primary">
            Our Story
          </p>
          <h1 className="mt-8 text-6xl font-headline font-extrabold uppercase leading-[0.9] md:text-8xl">
            {displayName}
          </h1>
          <p className="mt-8 max-w-3xl text-lg font-light leading-8 text-white/80">
            {aboutCompany}
          </p>
        </div>
      </section>
      {/* Company History / Mission */}
      <section className="py-24 bg-muted/30 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary">
              Our Story
            </h2>
            <p className="text-4xl md:text-5xl font-editorial font-light italic leading-tight">
              "We believe architecture is more than just structure; it's a
              profound expression of living."
            </p>
            <div className="space-y-6 text-muted-foreground font-light text-lg leading-relaxed">
              <p>
                Founded in the heart of Noosa, Vela Armon began with a singular
                vision: to treat real estate as a fine art. We realized that the
                most discerning clients aren't just looking for houses; they are
                looking for legacies.
              </p>
              <p>
                Today, our influence spans across Australia's most coveted
                postcodes, from the coastal grandeur of Byron Bay to the urban
                sophistication of Sydney Harbour. Our team of expert advisors
                provides unparalleled market intelligence, ensuring every
                transaction is as seamless as it is significant.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src={
                PlaceHolderImages.find((i) => i.id === "listing-1")?.imageUrl ||
                ""
              }
              alt="Vela Armon Heritage"
              fill
              className="object-cover"
              data-ai-hint="Luxury Modern Mansion"
            />
          </div>
        </div>
      </section>
      <section className="bg-muted/30 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.5em] text-primary">
                The team
              </p>
              <p className="mt-6 text-3xl font-editorial font-light italic text-foreground md:text-5xl">
                Advisors representing {displayName}.
              </p>
            </div>
            <Link href={prefixAgencyPath("/agents", agencySlug)}>
              <Button
                variant="outline"
                className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white uppercase tracking-[0.3em] text-[10px] font-bold"
              >
                View all agents
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {agents.slice(0, 3).map((agent) => (
              <Link
                key={agent.slug || agent.id || agent.name}
                href={prefixAgencyPath(
                  `/agents/${agent.slug || ""}`,
                  agencySlug,
                )}
                className="group block"
              >
                <div className="space-y-7">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-muted shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
                    <Image
                      src={getAgentImage(agent.slug || agent.name, agent.avatar)}
                      alt={agent.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-black/15 transition-colors duration-700 group-hover:bg-black/40" />
                    <div className="absolute inset-x-5 bottom-5 rounded-[1.5rem] bg-white px-6 py-5 text-primary shadow-[0_18px_40px_rgba(15,23,42,0.16)] transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:shadow-[0_28px_60px_rgba(15,23,42,0.22)]">
                      <h3 className="font-headline text-[1.35rem] font-semibold uppercase tracking-[0.18em] text-foreground">
                        {agent.name}
                      </h3>
                      <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.35em] text-primary">
                        {getAgentRole(agent)}
                      </p>
                    </div>
                  </div>
                  <p className="px-2 text-base font-light leading-8 text-muted-foreground md:text-lg">
                    {getAgentTagline(agent, displayName)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {testimonials.length > 0 ? (
      <section className="bg-background px-6 py-8 md:py-16 relative overflow-hidden">
        {testimonialBg && (
          <Image 
            src={testimonialBg}
            alt="Testimonials Background"
            fill
            className="object-cover opacity-20"
            data-ai-hint="Luxury Interior"
          />
        )}
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-[12px] font-bold uppercase tracking-[0.5em] text-primary">
              Client stories
            </p>
            <p className="mt-6 text-3xl font-editorial font-light italic text-foreground md:text-5xl">
              What clients remember about working with {displayName}.
            </p>
          </div>
          <TestimonialSlider
            agencyName={displayName}
            testimonials={testimonials}
          />
        </div>
      </section>
      ) : null}
      {/* CTA Section */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-headline font-extrabold uppercase leading-[1.1]">Ready to secure <br /> <span className="text-primary">your legacy?</span></h2>
          <p className="text-muted-foreground text-lg font-light">Join the most exclusive real estate network in Australia.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
            <Button className="rounded-full px-12 py-6 bg-primary hover:bg-primary/90 text-white font-bold h-auto uppercase tracking-widest text-xs">Consult an Advisor</Button>
            <Link href="/buy">
              <Button variant="outline" className="rounded-full px-12 py-6 border-primary/20 hover:bg-primary hover:text-white text-primary font-bold h-auto uppercase tracking-widest text-xs">View Listings</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
