
import { getSiteConfig } from "@/lib/public-site";
import { getRequestAgencySlug } from "@/lib/server-agency";
import { NavbarClient } from "./navbar-client";

interface NavbarProps {
  theme?: "dark" | "light";
}

export async function Navbar({ theme = "light" }: NavbarProps) {
  const agencySlug = await getRequestAgencySlug();
  const siteConfig = await getSiteConfig(agencySlug);

  return <NavbarClient theme={theme} initialSiteConfig={siteConfig} />;
}
