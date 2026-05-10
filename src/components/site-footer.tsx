import { getSiteConfig } from "@/lib/public-site";
import { getRequestAgencySlug } from "@/lib/server-agency";
import { SiteFooterClient } from "./site-footer-client";

export async function SiteFooter() {
  const agencySlug = await getRequestAgencySlug();
  const siteConfig = await getSiteConfig(agencySlug);

  return <SiteFooterClient initialSiteConfig={siteConfig} />;
}
