import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property-card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { StickyFilterBar } from "@/components/sticky-filter-bar";
import { Navbar } from "@/components/navbar";

export default function SoldPage() {
  const soldProperties = [
    {
      id: "s1",
      title: "Noosa Waters Estate",
      price: "5,800,000",
      location: "Noosa Waters, QLD",
      beds: 5,
      baths: 4,
      cars: 3,
      area: 620,
      imageUrl: PlaceHolderImages.find(i => i.id === "listing-1")?.imageUrl || "",
      imageHint: "Luxury Waterfront Home",
      agentName: "Sarah West",
      tag: "Sold" as const,
    },
    {
      id: "s2",
      title: "Point Piper Skyhouse",
      price: "24,500,000",
      location: "Point Piper, NSW",
      beds: 4,
      baths: 5,
      cars: 4,
      area: 480,
      imageUrl: PlaceHolderImages.find(i => i.id === "listing-2")?.imageUrl || "",
      imageHint: "Ultra Luxury Apartment",
      agentName: "Julian Vance",
      tag: "Record Price" as const,
    },
    {
      id: "s3",
      title: "Toorak Architectural Triumph",
      price: "8,900,000",
      location: "Toorak, VIC",
      beds: 4,
      baths: 3,
      cars: 2,
      area: 510,
      imageUrl: PlaceHolderImages.find(i => i.id === "listing-3")?.imageUrl || "",
      imageHint: "Architectural Masterpiece",
      agentName: "Emma Clarke",
      tag: "Sold" as const,
    },
    {
      id: "s4",
      title: "Byron Beachfront Sanctuary",
      price: "15,200,000",
      location: "Byron Bay, NSW",
      beds: 5,
      baths: 5,
      cars: 4,
      area: 850,
      imageUrl: PlaceHolderImages.find(i => i.id === "listing-4")?.imageUrl || "",
      imageHint: "Beachfront Luxury Byron",
      agentName: "Marcus Thorne",
      tag: "Record Price" as const,
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar theme="light" />

      <section className="pt-48 pb-12 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-24 text-center md:text-left">
            <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary mb-6">Market Success</h2>
            <h1 className="text-5xl md:text-8xl font-headline font-extrabold uppercase mb-8 leading-[0.9]">
              Recently <br /><span className="text-primary">Sold.</span>
            </h1>
            <p className="text-xl font-light text-muted-foreground max-w-2xl leading-relaxed mx-auto md:mx-0">
              Explore our track record of premium results achieved for our clients across Australia's most prestigious markets.
            </p>
          </div>
        </div>
      </section>

      <StickyFilterBar />

      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {soldProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="mt-24 flex justify-center">
            <Button 
              variant="outline" 
              className="rounded-full px-16 py-8 h-auto border-primary/20 text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-[0.4em] text-[10px] transition-all shadow-sm hover:shadow-xl active:scale-[0.98]"
            >
              Archive Search
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}