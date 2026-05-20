import { VelaContactPageContent } from "@/components/public/agency-contact-page";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { getSiteConfig } from "@/lib/public-site";
import { getRequestAgencySlug } from "@/lib/server-agency";

export default async function ContactPage() {
  const agencySlug = await getRequestAgencySlug();
  const siteConfig = await getSiteConfig(agencySlug);

  return (
    <>
      <Navbar theme="dark" />
      <VelaContactPageContent initialSiteConfig={siteConfig} />
      <SiteFooter />
    </>
  );
}
