"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  getAgents,
  getSiteConfig,
  hasMeaningfulSiteConfig,
  type SiteAgent,
  type SiteConfig,
} from "@/lib/public-site";
import { prefixAgencyPath, resolveAgencySlugFromPathname } from "@/lib/agency-routing";

function getDisplayName(siteConfig: SiteConfig | null) {
  return siteConfig?.branding?.displayName || siteConfig?.organization.name || "Agency Website";
}

function getAgentImage(seed: string, avatar?: string | null) {
  if (avatar) return avatar;
  const initials = seed
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "AG";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#faf8f2"/><stop offset="1" stop-color="#ddd6cb"/></linearGradient></defs><rect width="900" height="1200" fill="url(#g)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#6f6257" font-family="Arial, sans-serif" font-size="280" font-weight="700">${initials}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function VelaAboutPageContent({
  initialSiteConfig = null,
  initialAgents = [],
}: {
  initialSiteConfig?: SiteConfig | null;
  initialAgents?: SiteAgent[];
}) {
  const pathname = usePathname();
  const agencySlug = resolveAgencySlugFromPathname(pathname);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(initialSiteConfig);
  const [agents, setAgents] = useState<SiteAgent[]>(initialAgents);

  useEffect(() => {
    setSiteConfig(initialSiteConfig);
    setAgents(initialAgents);
  }, [initialAgents, initialSiteConfig]);

  useEffect(() => {
    let active = true;

    async function load() {
      const [nextSiteConfig, nextAgents] = await Promise.all([
        getSiteConfig(agencySlug),
        getAgents(agencySlug),
      ]);

      if (!active) return;
      setSiteConfig((current) =>
        hasMeaningfulSiteConfig(nextSiteConfig) ? nextSiteConfig : current,
      );
      setAgents((current) =>
        nextAgents.agents.length > 0 || current.length === 0 ? nextAgents.agents : current,
      );
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
  const stats = [
    { label: "Live listings", value: siteConfig?.stats?.totalListings ?? 0 },
    { label: "Active agents", value: siteConfig?.stats?.activeAgents ?? agents.length },
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
          <p className="text-[12px] font-bold uppercase tracking-[0.5em] text-primary">Our Story</p>
          <h1 className="mt-8 text-6xl font-headline font-extrabold uppercase leading-[0.9] md:text-8xl">
            {displayName}
          </h1>
          <p className="mt-8 max-w-3xl text-lg font-light leading-8 text-white/80">
            {aboutCompany}
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <p className="text-4xl font-editorial font-light italic leading-tight text-foreground md:text-5xl">
              Public branding stays current because the website resolves the agency slug, finds the
              organization, and fetches live data with the organization hex code.
            </p>
            <div className="space-y-6 text-lg font-light leading-8 text-muted-foreground">
              <p>{aboutCompany}</p>
              <p>
                Updates to organization details, active agents, office timings, and listings appear
                here automatically without manual template editing.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href={prefixAgencyPath("/agents", agencySlug)}>
                <Button className="rounded-full bg-primary px-10 uppercase tracking-[0.3em] text-[11px] font-bold text-white">
                  Meet the advisors
                </Button>
              </Link>
              <Link href={prefixAgencyPath("/contact", agencySlug)}>
                <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white uppercase tracking-[0.3em] text-[11px] font-bold">
                  Contact office
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[2rem] border border-primary/10 bg-white p-8 shadow-sm">
                <p className="text-4xl font-headline font-extrabold text-primary">{stat.value}</p>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.5em] text-primary">The team</p>
              <p className="mt-6 text-3xl font-editorial font-light italic text-foreground md:text-5xl">
                Advisors representing {displayName}.
              </p>
            </div>
            <Link href={prefixAgencyPath("/agents", agencySlug)}>
              <Button variant="outline" className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white uppercase tracking-[0.3em] text-[10px] font-bold">
                View all agents
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {agents.slice(0, 4).map((agent) => (
              <Link
                key={agent.slug || agent.id || agent.name}
                href={prefixAgencyPath(`/agents/${agent.slug || ""}`, agencySlug)}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-muted shadow-xl">
                  <Image
                    src={getAgentImage(agent.slug || agent.name, agent.avatar)}
                    alt={agent.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-headline text-xl font-bold uppercase tracking-wider">{agent.name}</h3>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                      {agent.jobTitle || agent.title || agent.tagline || "Property Consultant"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
