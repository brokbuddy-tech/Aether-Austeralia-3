"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAgents, getSiteConfig, type SiteAgent, type SiteConfig } from "@/lib/public-site";
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

export function VelaAgentsPageContent() {
  const pathname = usePathname();
  const agencySlug = resolveAgencySlugFromPathname(pathname);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [agents, setAgents] = useState<SiteAgent[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      const [nextSiteConfig, nextAgents] = await Promise.all([
        getSiteConfig(agencySlug),
        getAgents(agencySlug),
      ]);

      if (!active) return;
      setSiteConfig(nextSiteConfig);
      setAgents(nextAgents.agents);
    }

    void load();
    return () => {
      active = false;
    };
  }, [agencySlug]);

  const displayName = getDisplayName(siteConfig);
  const filteredAgents = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return agents;

    return agents.filter((agent) => {
      const haystack = [
        agent.name,
        agent.jobTitle,
        agent.title,
        agent.tagline,
        agent.bio,
        ...(agent.languages || []),
        ...(agent.specializations || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [agents, search]);

  return (
    <main className="min-h-screen bg-background">
      <section className="pt-48 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary mb-6">Our Team</h2>
          <h1 className="text-5xl md:text-8xl font-headline font-extrabold uppercase mb-8 leading-[0.9]">
            Advisors at <span className="text-primary">{displayName}</span>
          </h1>
          <p className="text-xl font-light text-muted-foreground max-w-2xl leading-relaxed">
            Meet the public-facing agents and advisors connected to this organization in Broker OS.
          </p>
          <div className="mt-10 max-w-xl rounded-full border border-primary/10 bg-white px-6 py-3 shadow-sm flex items-center gap-3">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by agent, language, or specialization"
              className="border-0 px-0 focus-visible:ring-0"
            />
          </div>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredAgents.map((agent) => (
              <Link
                key={agent.slug || agent.id || agent.name}
                href={prefixAgencyPath(`/agents/${agent.slug || ""}`, agencySlug)}
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-primary/5 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={getAgentImage(agent.slug || agent.name, agent.avatar)}
                    alt={agent.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="mb-6">
                    <h3 className="text-xl font-headline font-bold uppercase tracking-wider text-foreground">{agent.name}</h3>
                    <p className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] mt-1">
                      {agent.jobTitle || agent.title || agent.tagline || "Property Consultant"}
                    </p>
                  </div>
                  <p className="text-muted-foreground font-light text-sm leading-relaxed mb-8 flex-1">
                    {agent.bio || `${agent.name} is part of the public team for ${displayName}.`}
                  </p>
                  <div className="space-y-3 pt-6 border-t border-primary/5">
                    <div className="flex flex-wrap gap-2">
                      {(agent.languages || []).slice(0, 3).map((language) => (
                        <span key={language} className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                          {language}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                      <span>{agent.totalListings ?? 0} listings</span>
                      <span className="inline-flex items-center gap-2">
                        View profile <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredAgents.length === 0 ? (
            <p className="mt-12 text-center text-sm uppercase tracking-[0.3em] text-muted-foreground">
              No public agents matched the current search.
            </p>
          ) : null}

          <div className="mt-16 text-center">
            <Link href={prefixAgencyPath("/contact", agencySlug)}>
              <Button className="rounded-full px-12 py-6 bg-primary hover:bg-primary/90 text-white font-bold h-auto uppercase tracking-widest text-xs">
                Contact the office
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
