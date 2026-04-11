import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property-card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { StickyFilterBar } from "@/components/sticky-filter-bar";

export default function CommercialPage() {
  const commercialProperties = [
    {
      id: "c1",
      title: "Tech Central Tower",
      price: "15,500,000",
      location: "Sydney CBD, NSW",
      area: 2450,
      imageUrl: PlaceHolderImages.find(i => i.id === "insight-1")?.imageUrl || "",
      imageHint: "Modern Office Building",
      agentName: "Julian Vance",
      tag: "Premium Office" as const,
    },
    {
      id: "c2",
      title: "Logistics Hub Alpha",
      price: "8,200,000",
      location: "Port Melbourne, VIC",
      area: 5800,
      imageUrl: PlaceHolderImages.find(i => i.id === "listing-3")?.imageUrl || "",
      imageHint: "Modern Industrial Warehouse",
      agentName: "Emma Clarke",
      tag: "Industrial" as const,
    },
    {
      id: "c3",
      title: "Wellness & Medical Centre",
      price: "4,900,000",
      location: "New Farm, QLD",
      area: 850,
      imageUrl: PlaceHolderImages.find(i => i.id === "listing-5")?.imageUrl || "",
      imageHint: "Medical Facility Architecture",
      agentName: "Lara Croft",
      tag: "Medical/Consulting" as const,
    },
    {
      id: "c4",
      title: "High-Tech Showroom",
      price: "3,750,000",
      location: "Alexandria, NSW",
      area: 1200,
      imageUrl: PlaceHolderImages.find(i => i.id === "listing-2")?.imageUrl || "",
      imageHint: "Modern Showroom Interior",
      agentName: "Marcus Thorne",
      tag: "Showroom/Warehouse" as const,
    },
    {
      id: "c5",
      title: "Luxury Retail Strip",
      price: "12,000,000",
      location: "Noosa Heads, QLD",
      area: 1500,
      imageUrl: PlaceHolderImages.find(i => i.id === "listing-1")?.imageUrl || "",
      imageHint: "Luxury Retail Storefront",
      agentName: "Sarah West",
      tag: "Retail" as const,
    },
    {
      id: "c6",
      title: "Riverside Development Site",
      price: "22,000,000",
      location: "South Bank, QLD",
      area: 3200,
      imageUrl: PlaceHolderImages.find(i => i.id === "listing-4")?.imageUrl || "",
      imageHint: "Construction Development Site",
      agentName: "David Perth",
      tag: "Development Site" as const,
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
            className={`text-[10px] uppercase font-bold tracking-[0.3em] hover:text-primary transition-colors ${link.name === 'Commercial' ? 'text-primary' : ''}`}
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

      <section className="pt-48 pb-12 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-24">
            <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary mb-6">Strategic Assets</h2>
            <h1 className="text-5xl md:text-8xl font-headline font-extrabold uppercase mb-8 leading-[0.9]">
              Commercial <br /><span className="text-primary">Portfolio.</span>
            </h1>
            <p className="text-xl font-light text-muted-foreground max-w-2xl leading-relaxed">
              Strategic industrial, retail, and office opportunities tailored for institutional and private investors across Australia's key markets.
            </p>
          </div>
        </div>
      </section>

      <StickyFilterBar />

      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {commercialProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="mt-24 flex justify-center">
            <Link href="/agent">
              <Button 
                variant="outline" 
                className="rounded-full px-16 py-8 h-auto border-primary/20 text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-[0.4em] text-[10px] transition-all shadow-sm hover:shadow-xl active:scale-[0.98]"
              >
                Consult an Advisor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
