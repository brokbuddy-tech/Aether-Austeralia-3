import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Bed, Bath, Car, Maximize, MapPin, Share2, Heart, ArrowLeft, Grid3X3, MessageSquare, Mail, ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { PropertyNarrative } from "@/components/property-narrative";
import { PropertyAmenities } from "@/components/property-amenities";
import { InspectionBooking } from "@/components/inspection-booking";
import { AuctionDetails } from "@/components/auction-details";
import { PropertyMap } from "@/components/property-map";
import { DigitalBrochure } from "@/components/digital-brochure";

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
    description: "Experience the ultimate in coastal luxury at this stunning Noosa Heads residence. Designed for seamless indoor-outdoor living, this home features floor-to-ceiling glass, premium natural finishes, and a private infinity pool overlooking the lush hinterland. Every detail has been meticulously curated to provide a sense of calm and sophistication.",
    amenities: ["Infinity Pool", "Chef's Kitchen", "Climate Control", "Smart Home System", "Outdoor Firepit", "High-Speed Wi-Fi"]
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
    description: "Occupying the entire top floor of one of Double Bay's most prestigious buildings, this penthouse offers 360-degree views of Sydney Harbour. With a private rooftop garden, bespoke marble kitchen, and master suite that rivals the world's finest hotels, this is a rare opportunity for the most discerning collector.",
    amenities: ["Wine Cellar", "Home Cinema", "24/7 Security", "Private Gym", "Climate Control", "Secure Parking"]
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
    description: "A triumph of contemporary architecture, this Toorak estate combines bold concrete forms with warm timber accents. The expansive floorplan offers multiple living zones, a dedicated home cinema, and a climate-controlled wine cellar. Set amongst manicured gardens, it provides absolute privacy in Melbourne's premier suburb.",
    amenities: ["Home Cinema", "Wine Cellar", "Secure Parking", "Climate Control", "Solar Power", "Private Gym"]
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
    description: "A sanctuary of scale and serenity. This sprawling hinterland estate offers absolute seclusion just minutes from Byron's famous beaches. Featuring a separate guest cottage, equestrian facilities, and panoramic ocean views, it is a legacy property of international standing.",
    amenities: ["Infinity Pool", "Solar Power", "Outdoor Firepit", "Climate Control", "Smart Home System", "High-Speed Wi-Fi"]
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
    description: "The height of urban sophistication. This New Farm residence offers breathtaking river and city views from every room. With custom joinery, integrated Miele appliances, and access to world-class building amenities including a residents-only lounge and wellness center.",
    amenities: ["Private Gym", "Climate Control", "24/7 Security", "High-Speed Wi-Fi", "Secure Parking", "Smart Home System"]
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
    description: "Perfectly positioned on the dunes of Cottesloe, this architectural masterpiece captures the raw beauty of the Indian Ocean. Designed by an award-winning firm, the home utilizes sustainable materials and smart-home technology to create a living experience that is both luxurious and responsible.",
    amenities: ["Solar Power", "Climate Control", "Smart Home System", "High-Speed Wi-Fi", "Outdoor Firepit", "Secure Parking"]
  }
];

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = properties.find(p => p.id === id);

  if (!property) {
    notFound();
  }

  const galleryImages = [
    PlaceHolderImages.find(i => i.id === "insight-1")?.imageUrl || "",
    PlaceHolderImages.find(i => i.id === "contact-bg")?.imageUrl || "",
    PlaceHolderImages.find(i => i.id === "faq-image")?.imageUrl || "",
  ];

  const navLinks = [
    { name: 'Buy', href: '/buy' },
    { name: 'Rent', href: '/rent' },
    { name: 'Sold', href: '/sold' },
    { name: 'Commercial', href: '/commercial' },
    { name: 'Agent', href: '/agent' },
    { name: 'About Us', href: '/about' },
  ];

  const agentAvatar = PlaceHolderImages.find(i => i.id === (property.agentName === 'Sarah West' ? 'team-1' : property.agentName === 'Julian Vance' ? 'team-2' : property.agentName === 'Emma Clarke' ? 'team-3' : property.agentName === 'Marcus Thorne' ? 'team-4' : 'team-5'))?.imageUrl || PlaceHolderImages.find(i => i.id === 'team-1')!.imageUrl;
  const agentBg = PlaceHolderImages.find(i => i.id === 'agent-bg')?.imageUrl || "";

  return (
    <main className="min-h-screen bg-background">
      {/* Persistent Navigation */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[90] hidden md:flex items-center gap-6 lg:gap-12 bg-white/50 backdrop-blur-md px-6 lg:px-10 py-4 rounded-full border border-white/40 shadow-sm">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            className={`text-[9px] lg:text-[10px] uppercase font-bold tracking-[0.3em] hover:text-primary transition-colors`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="absolute top-0 left-0 right-0 z-[100] px-4 md:px-6 py-6 flex justify-between items-center">
        <Link href="/" className="text-lg md:text-2xl font-headline font-extrabold tracking-tighter uppercase">
          <span className="text-foreground">Vela</span> <span className="text-primary">Armon</span>
        </Link>
        <Link href="/contact">
          <Button className="rounded-full px-4 md:px-8 bg-primary hover:bg-primary/90 text-white font-bold h-9 md:h-10 uppercase tracking-[0.2em] text-[9px] md:text-[10px] shadow-lg">
            Contact
          </Button>
        </Link>
      </div>

      <section className="pt-24 md:pt-32 pb-12 md:pb-24 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Back button and share */}
          <div className="flex justify-between items-center mb-8 md:mb-12">
            <Link href="/buy" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em]">Back</span>
            </Link>
            <div className="flex gap-2 md:gap-4">
              <Button variant="outline" size="icon" className="rounded-full border-primary/10 h-8 w-8 md:h-10 md:w-10">
                <Heart className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-primary/10 h-8 w-8 md:h-10 md:w-10">
                <Share2 className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[4/3] md:aspect-[21/9] rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl mb-8">
            <Image 
              src={property.imageUrl}
              alt={property.title}
              fill
              className="object-cover"
              priority
              data-ai-hint={property.imageHint}
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 right-6 md:right-12 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 z-10">
              <div className="text-white">
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-headline font-extrabold uppercase leading-[0.9] mb-4">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                  <span className="text-[10px] md:text-sm uppercase tracking-widest font-bold">{property.location}</span>
                </div>
              </div>
              <div className="glass-light p-4 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-2xl border-white/20">
                <p className="text-[8px] md:text-[10px] uppercase font-bold tracking-[0.3em] text-muted-foreground mb-1">
                  Valuation
                </p>
                <p className="text-xl md:text-2xl lg:text-3xl font-headline font-extrabold text-primary">AUD ${property.price}</p>
              </div>
            </div>
          </div>

          {/* Details Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
            <div className="lg:col-span-2 space-y-12 md:space-y-16">
              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8">
                {property.beds !== undefined && (
                  <div className="flex flex-col gap-2 p-4 md:p-6 rounded-2xl bg-muted/30 border border-primary/5">
                    < Bed className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    <p className="text-xl md:text-2xl font-headline font-bold">{property.beds}</p>
                    <p className="text-[8px] md:text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Bedrooms</p>
                  </div>
                )}
                {property.baths !== undefined && (
                  <div className="flex flex-col gap-2 p-4 md:p-6 rounded-2xl bg-muted/30 border border-primary/5">
                    <Bath className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    <p className="text-xl md:text-2xl font-headline font-bold">{property.baths}</p>
                    <p className="text-[8px] md:text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Bathrooms</p>
                  </div>
                )}
                {property.cars !== undefined && (
                  <div className="flex flex-col gap-2 p-4 md:p-6 rounded-2xl bg-muted/30 border border-primary/5">
                    <Car className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    <p className="text-xl md:text-2xl font-headline font-bold">{property.cars}</p>
                    <p className="text-[8px] md:text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Parking</p>
                  </div>
                )}
                <div className="flex flex-col gap-2 p-4 md:p-6 rounded-2xl bg-muted/30 border border-primary/5">
                  <Maximize className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  <p className="text-xl md:text-2xl font-headline font-bold">{property.area}m²</p>
                  <p className="text-[8px] md:text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Area</p>
                </div>
              </div>

              {/* Amenities Section */}
              <PropertyAmenities amenities={property.amenities || []} />

              {/* Description / Narrative */}
              <PropertyNarrative description={property.description} />

              {/* Inspection Scheduler */}
              <InspectionBooking />

              {/* Auction Details */}
              <AuctionDetails />

              {/* Property Map */}
              <PropertyMap location={property.location} />
            </div>

            {/* Sidebar Stacks on Mobile */}
            <div className="relative">
              <div className="lg:sticky lg:top-32 space-y-8 md:space-y-12">
                <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-[#EDEDED] flex flex-col max-w-[360px] mx-auto w-full">
                  {/* Header with Background */}
                  <div className="relative h-28 md:h-32 flex flex-col items-center justify-center pt-4">
                    <Image 
                      src={agentBg}
                      alt="Agent Background"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    
                    {/* Avatar */}
                    <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-white shadow-xl">
                       <Image 
                         src={agentAvatar}
                         alt={property.agentName}
                         fill
                         className="object-cover"
                         data-ai-hint="Professional Portrait"
                       />
                    </div>
                  </div>

                  {/* Identity Section */}
                  <div className="px-4 md:px-6 pt-4 pb-6 text-center bg-white">
                    <h3 className="text-base md:text-lg font-headline font-extrabold uppercase tracking-tight text-[#111111]">
                      {property.agentName}
                    </h3>
                    <p className="text-primary font-headline font-bold text-[7px] md:text-[8px] uppercase tracking-[0.2em] mt-1">
                      SENIOR SALES EXECUTIVE
                    </p>

                    {/* Trust Grid / Metrics */}
                    <div className="grid grid-cols-3 gap-0 mt-4 mb-6 border-y border-[#EDEDED] py-4">
                      <div className="text-center px-1">
                        <p className="text-xs md:text-sm font-bold text-[#111111]">142+</p>
                        <p className="text-[6px] md:text-[7px] font-bold text-[#9CA3AF] uppercase tracking-widest">SOLD</p>
                      </div>
                      <div className="text-center px-1 border-x border-[#EDEDED]">
                        <p className="text-xs md:text-sm font-bold text-[#111111]">12y</p>
                        <p className="text-[6px] md:text-[7px] font-bold text-[#9CA3AF] uppercase tracking-widest">EXP</p>
                      </div>
                      <div className="text-center px-1">
                        <p className="text-xs md:text-sm font-bold text-[#111111]">4.9</p>
                        <p className="text-[6px] md:text-[7px] font-bold text-[#9CA3AF] uppercase tracking-widest">RATING</p>
                      </div>
                    </div>

                    {/* CTAs Hub */}
                    <div className="space-y-2.5">
                      <Button className="w-full rounded-full py-4 md:py-5 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-[0.2em] text-[8px] md:text-[9px] h-auto shadow-lg transition-all active:scale-[0.98]">
                        BOOK PRIVATE INSPECTION
                      </Button>
                      
                      <DigitalBrochure property={property} galleryImages={galleryImages} />
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Button className="rounded-full py-4 md:py-5 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#111111] font-bold uppercase tracking-[0.2em] text-[7px] md:text-[8px] h-auto flex items-center justify-center gap-2 transition-all">
                          <MessageSquare className="w-3 h-3" />
                          SMS
                        </Button>
                        <Button className="rounded-full py-4 md:py-5 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#111111] font-bold uppercase tracking-[0.2em] text-[7px] md:text-[8px] h-auto flex items-center justify-center gap-2 transition-all">
                          <Mail className="w-3 h-3" />
                          EMAIL
                        </Button>
                      </div>

                      <div className="pt-2">
                        <Link 
                          href={`https://wa.me/61400000000?text=Hi%20${property.agentName},%20I'm%20interested%20in%20viewing%20${property.title}%20at%20${property.location}.`} 
                          target="_blank" 
                          className="text-primary text-[7px] md:text-[8px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2 group hover:underline"
                        >
                          WHATSAPP AGENT <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
