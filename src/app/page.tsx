import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { PropertyCard } from "@/components/property-card";
import { IntegritySuite } from "@/components/integrity-suite";
import { MarketInsights } from "@/components/market-insights";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { FAQSection } from "@/components/faq-section";
import { AgentFooter } from "@/components/agent-footer";
import { SiteFooter } from "@/components/site-footer";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";

export default function Home() {
  // Mock property data based on requirements
  const properties = [
    {
      id: "1",
      title: "Noosa Coastal Retreat",
      price: "4,250,000",
      location: "Noosa Heads, QLD",
      beds: 4,
      baths: 3,
      cars: 2,
      area: 450,
      imageUrl: PlaceHolderImages.find(i => i.id === "listing-1")?.imageUrl || "",
      imageHint: PlaceHolderImages.find(i => i.id === "listing-1")?.imageHint || "",
      agentName: "Sarah West",
    },
    {
      id: "2",
      title: "Harbour View Penthouse",
      price: "12,800,000",
      location: "Double Bay, NSW",
      beds: 3,
      baths: 4,
      cars: 3,
      area: 320,
      imageUrl: PlaceHolderImages.find(i => i.id === "listing-2")?.imageUrl || "",
      imageHint: PlaceHolderImages.find(i => i.id === "listing-2")?.imageHint || "",
      agentName: "Julian Vance",
    },
    {
      id: "3",
      title: "Modern Melbourne Estate",
      price: "3,100,000",
      location: "Toorak, VIC",
      beds: 5,
      baths: 3,
      cars: 2,
      area: 550,
      imageUrl: PlaceHolderImages.find(i => i.id === "listing-3")?.imageUrl || "",
      imageHint: PlaceHolderImages.find(i => i.id === "listing-3")?.imageHint || "",
      agentName: "Emma Clarke",
    },
    {
      id: "4",
      title: "Byron Hinterland Estate",
      price: "6,900,000",
      location: "Byron Bay, NSW",
      beds: 6,
      baths: 4,
      cars: 4,
      area: 1200,
      imageUrl: PlaceHolderImages.find(i => i.id === "listing-4")?.imageUrl || "",
      imageHint: PlaceHolderImages.find(i => i.id === "listing-4")?.imageHint || "",
      agentName: "Marcus Thorne",
    },
    {
      id: "5",
      title: "Brisbane City Spire",
      price: "2,450,000",
      location: "New Farm, QLD",
      beds: 2,
      baths: 2,
      cars: 1,
      area: 180,
      imageUrl: PlaceHolderImages.find(i => i.id === "listing-5")?.imageUrl || "",
      imageHint: PlaceHolderImages.find(i => i.id === "listing-5")?.imageHint || "",
      agentName: "Lara Croft",
    },
    {
      id: "6",
      title: "Ocean Edge Residence",
      price: "5,300,000",
      location: "Cottesloe, WA",
      beds: 4,
      baths: 3,
      cars: 2,
      area: 390,
      imageUrl: PlaceHolderImages.find(i => i.id === "listing-6")?.imageUrl || "",
      imageHint: PlaceHolderImages.find(i => i.id === "listing-6")?.imageHint || "",
      agentName: "David Perth",
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
    <main className="min-h-screen bg-background selection:bg-primary selection:text-white relative">
      {/* 1. Absolute Branding Overlay - Scrolls with page */}
      <div className="absolute top-0 left-0 right-0 z-[100] px-6 py-6 flex justify-between items-center pointer-events-none">
        <Link href="/" className="text-xl md:text-2xl font-headline font-extrabold tracking-tighter uppercase pointer-events-auto">
          <span className="text-white">Vela</span> <span className="text-primary">Armon</span>
        </Link>
        <Link href="/contact" className="pointer-events-auto">
          <Button className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white font-bold h-10 uppercase tracking-[0.2em] text-[10px] shadow-lg">
            Contact Us
          </Button>
        </Link>
      </div>

      {/* 2. Fixed Navigation Links - Sticky */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[90] hidden md:flex items-center gap-12 bg-white/50 backdrop-blur-md px-10 py-4 rounded-full border border-white/40 shadow-sm">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            className="text-[10px] uppercase font-bold tracking-[0.3em] hover:text-primary transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Property Grid */}
      <section className="py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary mb-6">Featured Opportunities</h2>
              <p className="text-3xl md:text-5xl font-editorial font-light italic leading-tight">
                Extraordinary residences <br /> in coveted locations.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/buy" className="px-8 py-3 rounded-full border border-primary/20 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-primary hover:text-white transition-all">All Listings</Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <IntegritySuite />
      
      {/* Testimonials */}
      <section className="bg-background py-32">
        <TestimonialSlider />
      </section>

      {/* Editorial & Market Analysis */}
      <MarketInsights />
      
      {/* FAQ Section */}
      <FAQSection />

      {/* Footer & Expert Advisor */}
      <AgentFooter />
      <SiteFooter />
    </main>
  );
}
