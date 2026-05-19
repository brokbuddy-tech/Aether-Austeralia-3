import { VelaAgentsPageContent } from "@/components/public/agency-agents-page";
import { Navbar } from "@/components/navbar";
import { getAgents, getSiteConfig } from "@/lib/public-site";
import { getRequestAgencySlug } from "@/lib/server-agency";

export default async function AgentsPage() {
  const agencySlug = await getRequestAgencySlug();
  const [siteConfig, agentsResponse] = await Promise.all([
    getSiteConfig(agencySlug),
    getAgents(agencySlug),
  ]);

  return (
    <>
      <Navbar theme="light" />
      <VelaAgentsPageContent
        initialSiteConfig={siteConfig}
        initialAgents={agentsResponse.agents}
      />
    </>
  );
}
