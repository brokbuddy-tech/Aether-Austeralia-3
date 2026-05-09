"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Mail, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAgentProfile } from "@/lib/public-site";
import { prefixAgencyPath, resolveAgencySlugFromPathname } from "@/lib/agency-routing";

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

function getWhatsAppHref(value?: string | null, message?: string) {
  if (!value) return null;
  const digits = value.replace(/\D/g, "");
  if (!digits) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

export function VelaAgentProfilePageContent({ agentSlug }: { agentSlug: string }) {
  const pathname = usePathname();
  const agencySlug = resolveAgencySlugFromPathname(pathname);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Awaited<ReturnType<typeof getAgentProfile>> | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      const nextProfile = await getAgentProfile(agentSlug, agencySlug);
      if (!active) return;
      setProfile(nextProfile);
      setLoading(false);
    }

    void load();
    return () => {
      active = false;
    };
  }, [agentSlug, agencySlug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Loading profile</p>
      </main>
    );
  }

  if (!profile?.agent) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-headline font-extrabold uppercase">Agent not found</h1>
          <Link href={prefixAgencyPath("/agents", agencySlug)} className="inline-flex mt-8">
            <Button className="rounded-full bg-primary text-white font-bold uppercase tracking-[0.2em]">
              Back to agents
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const displayName = profile.organization?.name || "Agency Website";
  const accentColor = profile.agent.primaryColor || profile.profile?.primaryColor || "#C5A47E";
  const whatsappHref = getWhatsAppHref(
    profile.agent.whatsapp || profile.agent.phone || profile.profile?.contact?.whatsappNumber,
    `Hi ${profile.agent.name}, I'm interested in your listings with ${displayName}.`
  );

  return (
    <main className="min-h-screen bg-background">
      <section
        className="px-6 pt-40 pb-20"
        style={{
          background: `radial-gradient(circle at top right, ${accentColor}22, transparent 34%), linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link href={prefixAgencyPath("/", agencySlug)} className="hover:text-foreground">Home</Link>
            <ArrowRight className="w-4 h-4" />
            <Link href={prefixAgencyPath("/agents", agencySlug)} className="hover:text-foreground">Agents</Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-foreground">{profile.agent.name}</span>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="relative h-36 w-36 overflow-hidden rounded-[2rem] border border-primary/10 bg-white shadow-md">
                  <Image
                    src={getAgentImage(profile.agent.slug || profile.agent.name, profile.agent.avatar)}
                    alt={profile.agent.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                    {displayName}
                  </p>
                  <h1 className="mt-4 text-4xl md:text-5xl font-headline font-extrabold uppercase">
                    {profile.agent.name}
                  </h1>
                  <p className="mt-3 text-lg font-semibold" style={{ color: accentColor }}>
                    {profile.agent.jobTitle || profile.agent.title || profile.agent.tagline || "Property Consultant"}
                  </p>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
                    {profile.agent.bio || `${profile.agent.name} is part of the public team for ${displayName}.`}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {profile.agent.phone ? (
                  <a href={`tel:${profile.agent.phone}`}>
                    <Button className="rounded-full bg-primary text-white font-bold uppercase tracking-[0.2em]">
                      <Phone className="mr-2 w-4 h-4" />
                      Call
                    </Button>
                  </a>
                ) : null}
                {profile.agent.email ? (
                  <a href={`mailto:${profile.agent.email}`}>
                    <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-[0.2em]">
                      <Mail className="mr-2 w-4 h-4" />
                      Email
                    </Button>
                  </a>
                ) : null}
                {whatsappHref ? (
                  <a href={whatsappHref} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-[0.2em]">
                      <MessageSquare className="mr-2 w-4 h-4" />
                      WhatsApp
                    </Button>
                  </a>
                ) : null}
              </div>
            </div>

            <div className="rounded-[2rem] border border-primary/10 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Profile snapshot</h2>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {[
                  { label: "Active listings", value: profile.stats.activeListings },
                  { label: "Sold properties", value: profile.stats.soldListings },
                  { label: "Rented properties", value: profile.stats.rentedListings },
                  { label: "Years experience", value: profile.agent.yearsExperience || 0 },
                  { label: "Deals closed", value: profile.agent.totalDeals || 0 },
                  { label: "Languages", value: (profile.agent.languages || []).length },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-primary/10 bg-muted/30 p-4">
                    <p className="text-2xl font-headline font-extrabold text-foreground">{item.value}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">Active portfolio</p>
            <h2 className="mt-3 text-3xl font-headline font-extrabold uppercase">Live listings from {profile.agent.name}</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {profile.activeListings.map((listing: any) => (
              <Link
                key={listing.id}
                href={prefixAgencyPath(`/property/${listing.id}`, agencySlug)}
                className="group overflow-hidden rounded-[2rem] border border-primary/10 bg-white shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={listing.imageUrl}
                    alt={listing.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-headline font-bold uppercase tracking-tight">{listing.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{listing.location}</p>
                  <p className="mt-4 text-2xl font-headline font-extrabold text-primary">AUD ${listing.price}</p>
                </div>
              </Link>
            ))}
          </div>

          {profile.activeListings.length === 0 ? (
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              No public listings are active for this agent yet.
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
