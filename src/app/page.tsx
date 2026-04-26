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
import { Navbar } from "@/components/navbar";
import { getListings } from "@/lib/api";

export default async function Home() {
  const { properties } = await getListings({ transactionType: "SALE", status: "ACTIVE", limit: 6 });

  return (
    <main className="min-h-screen bg-background selection:bg-primary selection:text-white relative">
      <Navbar theme="dark" />

      {/* Hero Section */}
      <HeroSection />

      {/* Property Grid */}
      <section className="py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary mb-6">Featured Opportunities</h2>
              <p className="text-3xl md:text-5xl font-editorial font-light italic leading-tight text-foreground">
                Extraordinary residences <br /> in coveted locations.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/buy" className="px-8 py-3 rounded-full border border-primary/20 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-primary hover:text-white transition-all text-foreground">All Listings</Link>
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

      {/* Expert Advisor Search */}
      <AgentFooter />

      {/* Editorial & Market Analysis */}
      <MarketInsights />

      {/* FAQ Section */}
      <FAQSection />
      
      {/* Footer Branding */}
      <SiteFooter />
    </main>
  );
}
