"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getSiteConfig, type SiteConfig } from "@/lib/public-site";
import { prefixAgencyPath, resolveAgencySlugFromPathname } from "@/lib/agency-routing";

function getDisplayName(siteConfig?: SiteConfig | null) {
  return siteConfig?.branding?.displayName || siteConfig?.organization.name || "Agency Website";
}

export function SiteFooterClient({ initialSiteConfig }: { initialSiteConfig?: SiteConfig | null }) {
  const pathname = usePathname();
  const agencySlug = resolveAgencySlugFromPathname(pathname);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(initialSiteConfig ?? null);

  useEffect(() => {
    setSiteConfig((current) => initialSiteConfig ?? current ?? null);
  }, [initialSiteConfig]);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const nextSiteConfig = await getSiteConfig(agencySlug);
        if (active) {
          setSiteConfig(nextSiteConfig);
        }
      } catch {
        if (active) {
          setSiteConfig((current) => current ?? initialSiteConfig ?? null);
        }
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, [agencySlug, initialSiteConfig]);

  const displayName = getDisplayName(siteConfig);
  const officeAddress = siteConfig?.profile?.officeAddress?.trim();
  const aboutCompany =
    siteConfig?.profile?.aboutCompany?.trim() ||
    siteConfig?.branding?.bio?.trim() ||
    `Public branding, agents, and listings for ${displayName} are synced directly from Broker OS.`;

  return (
    <footer className="bg-primary text-primary-foreground py-12 md:py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
        <div className="col-span-1 sm:col-span-2">
          <div className="text-xl md:text-2xl font-headline font-extrabold tracking-tighter uppercase mb-6">
            {displayName}
          </div>
          <p className="text-primary-foreground/80 max-w-sm font-light leading-relaxed text-sm md:text-base">
            {aboutCompany}
          </p>
          {officeAddress ? (
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-primary-foreground/60">
              {officeAddress}
            </p>
          ) : null}
        </div>

        <div>
          <h4 className="font-headline font-bold uppercase tracking-widest text-[10px] md:text-xs mb-6 text-white">Quick Links</h4>
          <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-primary-foreground/70 font-light">
            <li><Link href={prefixAgencyPath("/buy", agencySlug)} className="hover:text-white transition-colors">Residential Search</Link></li>
            <li><Link href={prefixAgencyPath("/commercial", agencySlug)} className="hover:text-white transition-colors">Commercial Portfolio</Link></li>
            <li><Link href={prefixAgencyPath("/agents", agencySlug)} className="hover:text-white transition-colors">Agents</Link></li>
            <li><Link href={prefixAgencyPath("/contact", agencySlug)} className="hover:text-white transition-colors">Contact Expert</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold uppercase tracking-widest text-[10px] md:text-xs mb-6 text-white">Compliance</h4>
          <p className="text-[9px] md:text-[10px] text-primary-foreground/60 leading-relaxed uppercase tracking-wider font-bold">
            Public data synced live for this organization. <br />
            REIA/REIV Registered Partner. <br />
            &copy; {new Date().getFullYear()} {displayName}. <br />
            All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
