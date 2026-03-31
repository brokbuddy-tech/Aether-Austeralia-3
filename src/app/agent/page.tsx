
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { AgentFooter } from "@/components/agent-footer";
import { Button } from "@/components/ui/button";
import { AgentCard } from "@/components/agent-card";

export default function AgentPage() {
  const agents = [
    {
      name: "Sarah West",
      role: "Founder & CEO",
      imageId: "team-1",
      email: "sarah@velaarmon.com.au",
      phone: "+61 400 123 456",
      bio: "With over 20 years in luxury real estate, Sarah has redefined the standard of premium acquisitions in the Australian market."
    },
    {
      name: "Julian Vance",
      role: "Director of Luxury Estates",
      imageId: "team-2",
      email: "julian@velaarmon.com.au",
      phone: "+61 400 654 321",
      bio: "Julian specializes in off-market transactions for high-net-worth individuals, bridging the gap between desire and exclusivity."
    },
    {
      name: "Emma Clarke",
      role: "Head of Residential",
      imageId: "team-3",
      email: "emma@velaarmon.com.au",
      phone: "+61 400 987 654",
      bio: "Emma brings a keen eye for architectural design and community integration, ensuring every residence is a true sanctuary."
    },
    {
      name: "Marcus Thorne",
      role: "Senior Consultant",
      imageId: "team-4",
      email: "marcus@velaarmon.com.au",
      phone: "+61 400 333 444",
      bio: "An expert in the Sydney Eastern Suburbs market, Marcus provides unparalleled negotiation strategy for premium sellers."
    },
    {
      name: "Lara Croft",
      role: "Property Advisor",
      imageId: "team-5",
      email: "lara@velaarmon.com.au",
      phone: "+61 400 555 666",
      bio: "Lara's passion for modern architecture and investment yields makes her the ideal advisor for growing portfolios."
    }
  ];

  const navLinks = [
    { name: 'Buy', href: '/buy' },
    { name: 'Rent', href: '/rent' },
    { name: 'Sold', href: '/sold' },
    { name: 'Commercial', href: '/commercial' },
    { name: 'Agent', href: '/agent' },
    { name: 'About Us', href: '/about' },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Persistent Navigation */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[90] hidden md:flex items-center gap-12 bg-white/50 backdrop-blur-md px-10 py-4 rounded-full border border-white/40 shadow-sm">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            className={`text-[10px] uppercase font-bold tracking-[0.3em] hover:text-primary transition-colors ${link.name === 'Agent' ? 'text-primary' : ''}`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="absolute top-0 left-0 right-0 z-[100] px-6 py-6 flex justify-between items-center pointer-events-none">
        <Link href="/" className="text-xl md:text-2xl font-headline font-extrabold tracking-tighter uppercase pointer-events-auto">
          <span className="text-foreground">Vela</span> <span className="text-primary">Armon</span>
        </Link>
        <Link href="/contact" className="pointer-events-auto">
          <Button className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white font-bold h-10 uppercase tracking-[0.2em] text-[10px] shadow-lg">
            Contact Us
          </Button>
        </Link>
      </div>

      {/* Header Section */}
      <section className="pt-48 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary mb-6">Our Team</h2>
          <h1 className="text-5xl md:text-8xl font-headline font-extrabold uppercase mb-8 leading-[0.9]">
            Expert <span className="text-primary">Advisors.</span>
          </h1>
          <p className="text-xl font-light text-muted-foreground max-w-2xl mb-16 leading-relaxed">
            Meet the team redefining Australian real estate through integrity, market intelligence, and a commitment to architectural excellence.
          </p>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {agents.map((agent, idx) => (
              <AgentCard key={idx} {...agent} />
            ))}
          </div>
        </div>
      </section>

      <AgentFooter />
      <SiteFooter />
    </main>
  );
}
