import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property-card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function BuyPage() {
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
    <main className="min-h-screen bg-background">
      {/* Persistent Navigation */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[90] hidden md:flex items-center gap-12 bg-white/50 backdrop-blur-md px-10 py-4 rounded-full border border-white/40 shadow-sm">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            className={`text-[10px] uppercase font-bold tracking-[0.3em] hover:text-primary transition-colors ${link.name === 'Buy' ? 'text-primary' : ''}`}
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

      <section className="pt-48 pb-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-24">
            <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary mb-6">Premium Acquisitions</h2>
            <h1 className="text-5xl md:text-8xl font-headline font-extrabold uppercase mb-8 leading-[0.9]">
              Find your <br /><span className="text-primary">Sanctuary.</span>
            </h1>
            <p className="text-xl font-light text-muted-foreground max-w-2xl leading-relaxed">
              Explore extraordinary residential opportunities curated for the discerning Australian market, where architecture meets lifestyle.
            </p>
          </div>
          
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
              View More Listings
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
