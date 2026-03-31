
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { IntegritySuite } from "@/components/integrity-suite";

export default function AboutPage() {
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
            className={`text-[10px] uppercase font-bold tracking-[0.3em] hover:text-primary transition-colors ${link.name === 'About Us' ? 'text-primary' : ''}`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="absolute top-0 left-0 right-0 z-[100] px-6 py-6 flex justify-between items-center pointer-events-none">
        <Link href="/" className="text-xl md:text-2xl font-headline font-extrabold tracking-tighter uppercase pointer-events-auto">
          <span className="text-foreground">Vela</span> <span className="text-primary">Armon</span>
        </Link>
      </div>

      <section className="pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold uppercase mb-8">
            Defining <span className="text-primary">Excellence.</span>
          </h1>
          <p className="text-xl font-light text-muted-foreground max-w-3xl mb-16">
            Vela Armon is more than a real estate agency. We are a strategic partner dedicated to uncovering extraordinary opportunities across Australia.
          </p>
        </div>
      </section>

      <IntegritySuite />
      <SiteFooter />
    </main>
  );
}
