import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property-card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { StickyFilterBar } from "@/components/sticky-filter-bar";
import { Navbar } from "@/components/navbar";

export default function RentPage() {
  const properties = [
    {
      id: "r1",
      title: "Harbourfront Residence",
      price: "2,850 / week",
      location: "Darling Point, NSW",
      beds: 3,
      baths: 2,
      cars: 2,
      area: 210,
      imageUrl: PlaceHolderImages.find(i => i.id === "listing-2")?.imageUrl || "",
      imageHint: PlaceHolderImages.find(i => i.id === "listing-2")?.imageHint || "",
      agentName: "Julian Vance",
      tag: "For Rent" as const,
    },
    {
      id: "r2",
      title: "Noosa Modern Sanctuary",
      price: "1,950 / week",
      location: "Noosa Heads, QLD",
      beds: 4,
      baths: 3,
      cars: 2,
      area: 380,
      imageUrl: PlaceHolderImages.find(i => i.id === "listing-1")?.imageUrl || "",
      imageHint: PlaceHolderImages.find(i => i.id === "listing-1")?.imageHint || "",
      agentName: "Sarah West",
      tag: "For Rent" as const,
    },
    {
      id: "r3",
      title: "Melbourne City Loft",
      price: "1,200 / week",
      location: "Melbourne CBD, VIC",
      beds: 2,
      baths: 2,
      cars: 1,
      area: 110,
      imageUrl: PlaceHolderImages.find(i => i.id === "listing-5")?.imageUrl || "",
      imageHint: PlaceHolderImages.find(i => i.id === "listing-5")?.imageHint || "",
      agentName: "Emma Clarke",
      tag: "For Rent" as const,
    },
    {
      id: "r4",
      title: "Coastal Edge Villa",
      price: "2,400 / week",
      location: "Cottesloe, WA",
      beds: 3,
      baths: 2,
      cars: 2,
      area: 250,
      imageUrl: PlaceHolderImages.find(i => i.id === "listing-6")?.imageUrl || "",
      imageHint: PlaceHolderImages.find(i => i.id === "listing-6")?.imageHint || "",
      agentName: "David Perth",
      tag: "For Rent" as const,
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar theme="light" />

      <section className="pt-48 pb-12 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-24 text-center md:text-left">
            <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary mb-6">Premium Leases</h2>
            <h1 className="text-5xl md:text-8xl font-headline font-extrabold uppercase mb-8 leading-[0.9]">
              Exquisite <br /><span className="text-primary">Lifestyles.</span>
            </h1>
            <p className="text-xl font-light text-muted-foreground max-w-2xl leading-relaxed mx-auto md:mx-0">
              Explore our exclusive collection of high-end lease opportunities across Australia's most coveted suburbs.
            </p>
          </div>
        </div>
      </section>

      <StickyFilterBar />

      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="mt-24 flex justify-center">
            <Button 
              variant="outline" 
              className="rounded-full px-16 py-8 h-auto border-primary/20 text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-[0.4em] text-[10px] transition-all shadow-sm hover:shadow-xl active:scale-[0.98]"
            >
              View More Leases
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}