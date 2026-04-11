import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Bed, Bath, Car, Maximize, MapPin, Share2, Heart, ArrowLeft, Grid3X3, MessageSquare, Mail, FileText, ArrowRight } from "lucide-react";
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
  },
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
    description: "A sophisticated harbourfront sanctuary in Darling Point. This residence offers sweeping water views, expansive living areas, and high-end finishes throughout. Perfect for those seeking a prestigious lifestyle in one of Sydney's most exclusive pockets.",
    amenities: ["24/7 Security", "Climate Control", "Secure Parking", "High-Speed Wi-Fi", "Smart Home System"]
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
    description: "Immerse yourself in Noosa's natural beauty with this modern sanctuary. Designed for seamless indoor-outdoor living, the property features a private pool, chef's kitchen, and luxurious master suite. Experience the ultimate in coastal relaxation.",
    amenities: ["Infinity Pool", "Chef's Kitchen", "Climate Control", "High-Speed Wi-Fi", "Outdoor Firepit"]
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
    description: "An urban retreat in the heart of Melbourne. This stylish city loft boasts high ceilings, industrial accents, and panoramic skyline views. Footsteps away from the city's finest dining, shopping, and entertainment.",
    amenities: ["Climate Control", "High-Speed Wi-Fi", "Secure Parking", "24/7 Security"]
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
    description: "Perched on the edge of the Indian Ocean, this Cottesloe villa offers a lifestyle of sun, surf, and sophistication. With light-filled interiors and multiple balconies, every day feels like a holiday in this architectural masterpiece.",
    amenities: ["Climate Control", "High-Speed Wi-Fi", "Outdoor Firepit", "Secure Parking", "Smart Home System"]
  },
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
    description: "A landmark sale in Noosa Waters. This north-facing waterfront residence set a new standard for modern luxury in the region, featuring a 20m lap pool and bespoke boat mooring facilities.",
    amenities: ["Infinity Pool", "Chef's Kitchen", "Wine Cellar", "Solar Power", "Secure Parking"]
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
    description: "A record-breaking transaction for the Sydney Harbour market. This Point Piper penthouse represents the pinnacle of vertical living, offering unparalleled views and finishes of the highest international calibre.",
    amenities: ["24/7 Security", "Climate Control", "Private Gym", "Wine Cellar", "Secure Parking"]
  },
  {
    id: "c1",
    title: "Tech Central Tower",
    price: "15,500,000",
    location: "Sydney CBD, NSW",
    area: 2450,
    imageUrl: PlaceHolderImages.find(i => i.id === "insight-1")?.imageUrl || "",
    imageHint: "Modern Office Building",
    agentName: "Julian Vance",
    description: "A landmark commercial asset in the heart of Sydney's tech precinct. This A-grade office tower offers flexible floorplates, state-of-the-art sustainability credentials, and panoramic city skyline views, making it the ideal headquarters for innovation leaders.",
    amenities: ["24/7 Security", "Climate Control", "High-Speed Wi-Fi", "Solar Power", "Secure Parking"]
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
    description: "Strategically located industrial facility offering expansive high-clearance warehousing and integrated corporate office space. With superior access to arterial roads and the Port of Melbourne, this asset provides unparalleled efficiency for high-volume logistics operations.",
    amenities: ["Secure Parking", "24/7 Security", "Solar Power", "High-Speed Wi-Fi"]
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
    description: "A bespoke medical and consulting facility designed for practitioners who demand excellence. Featuring a high-end reception area, specialized treatment rooms, and ample on-site parking in Brisbane's most desirable urban pocket.",
    amenities: ["Climate Control", "High-Speed Wi-Fi", "24/7 Security", "Secure Parking"]
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
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[90] hidden md:flex items-center gap-12 bg-white/50 backdrop-blur-md px-10 py-4 rounded-full border border-white/40 shadow-sm">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            className={`text-[10px] uppercase font-bold tracking-[0.3em] hover:text-primary transition-colors ${link.name === 'Buy' || link.name === 'Sold' || link.name === 'Rent' || link.name === 'Commercial' ? 'text-primary' : ''}`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="absolute top-0 left-0 right-0 z-[100] px-6 py-6 flex justify-between items-center">
        <Link href="/" className="text-xl md:text-2xl font-headline font-extrabold tracking-tighter uppercase">
          <span className="text-foreground">Vela</span> <span className="text-primary">Armon</span>
        </Link>
        <Link href="/contact">
          <Button className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white font-bold h-10 uppercase tracking-[0.2em] text-[10px] shadow-lg">
            Contact Us
          </Button>
        </Link>
      </div>

      <section className="pt-32 pb-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Back button and share */}
          <div className="flex justify-between items-center mb-12">
            <Link href="/buy" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Back to Listings</span>
            </Link>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="rounded-full border-primary/10 hover:bg-primary/5">
                <Heart className="w-4 h-4 text-primary" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-primary/10 hover:bg-primary/5">
                <Share2 className="w-4 h-4 text-primary" />
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl mb-8">
            <Image 
              src={property.imageUrl}
              alt={property.title}
              fill
              className="object-cover"
              priority
              data-ai-hint={property.imageHint}
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-8 z-10">
              <div className="text-white">
                <h1 className="text-5xl md:text-7xl font-headline font-extrabold uppercase leading-[0.9] mb-4">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm uppercase tracking-widest font-bold">{property.location}</span>
                </div>
              </div>
              <div className="glass-light p-8 rounded-3xl backdrop-blur-2xl border-white/20">
                <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-muted-foreground mb-1">
                  {property.price.includes('/') ? 'Lease Terms' : 'Last Transaction'}
                </p>
                <p className="text-2xl md:text-3xl font-headline font-extrabold text-primary">AUD ${property.price}</p>
              </div>
            </div>
          </div>

          {/* Secondary Gallery */}
          <div className="space-y-6 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg group">
                  <Image 
                    src={img}
                    alt={`Gallery Image ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
              ))}
            </div>
            <div className="flex justify-center pt-4">
              <Button variant="outline" className="rounded-full px-10 py-6 h-auto border-primary/20 text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-[0.3em] text-[10px] transition-all">
                <Grid3X3 className="w-4 h-4 mr-3" />
                View All Photos
              </Button>
            </div>
          </div>

          {/* Details Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
            <div className="lg:col-span-2 space-y-16">
              {/* Metadata Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {property.beds !== undefined && (
                  <div className="flex flex-col gap-2 p-6 rounded-2xl bg-muted/30 border border-primary/5">
                    < Bed className="w-6 h-6 text-primary" />
                    <p className="text-2xl font-headline font-bold">{property.beds}</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Bedrooms</p>
                  </div>
                )}
                {property.baths !== undefined && (
                  <div className="flex flex-col gap-2 p-6 rounded-2xl bg-muted/30 border border-primary/5">
                    <Bath className="w-6 h-6 text-primary" />
                    <p className="text-2xl font-headline font-bold">{property.baths}</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Bathrooms</p>
                  </div>
                )}
                {property.cars !== undefined && (
                  <div className="flex flex-col gap-2 p-6 rounded-2xl bg-muted/30 border border-primary/5">
                    <Car className="w-6 h-6 text-primary" />
                    <p className="text-2xl font-headline font-bold">{property.cars}</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Parking</p>
                  </div>
                )}
                <div className="flex flex-col gap-2 p-6 rounded-2xl bg-muted/30 border border-primary/5">
                  <Maximize className="w-6 h-6 text-primary" />
                  <p className="text-2xl font-headline font-bold">{property.area}m²</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Total Area</p>
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

            {/* Side Sidebar: Expert Advisor Sticky Card */}
            <div className="relative">
              <div className="sticky top-32 space-y-12">
                <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-[#EDEDED] flex flex-col max-w-[360px] mx-auto">
                  {/* Header with Background */}
                  <div className="relative h-32 flex flex-col items-center justify-center pt-4">
                    <Image 
                      src={agentBg}
                      alt="Agent Background"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    
                    {/* Avatar */}
                    <div className="relative z-10 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl">
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
                  <div className="px-6 pt-4 pb-6 text-center bg-white">
                    <h3 className="text-lg font-headline font-extrabold uppercase tracking-tight text-[#111111]">
                      {property.agentName}
                    </h3>
                    <p className="text-primary font-headline font-bold text-[8px] uppercase tracking-[0.2em] mt-1">
                      SENIOR SALES EXECUTIVE
                    </p>

                    {/* Trust Grid / Metrics */}
                    <div className="grid grid-cols-3 gap-0 mt-4 mb-6 border-y border-[#EDEDED] py-4">
                      <div className="text-center px-1">
                        <p className="text-sm font-bold text-[#111111]">142+</p>
                        <p className="text-[7px] font-bold text-[#9CA3AF] uppercase tracking-widest">SOLD</p>
                      </div>
                      <div className="text-center px-1 border-x border-[#EDEDED]">
                        <p className="text-sm font-bold text-[#111111]">12y</p>
                        <p className="text-[7px] font-bold text-[#9CA3AF] uppercase tracking-widest">EXP</p>
                      </div>
                      <div className="text-center px-1">
                        <p className="text-sm font-bold text-[#111111]">4.9</p>
                        <p className="text-[7px] font-bold text-[#9CA3AF] uppercase tracking-widest">RATING</p>
                      </div>
                    </div>

                    {/* CTAs Hub */}
                    <div className="space-y-2.5">
                      <Button className="w-full rounded-full py-5 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-[0.2em] text-[9px] h-auto shadow-lg transition-all active:scale-[0.98]">
                        BOOK PRIVATE INSPECTION
                      </Button>
                      
                      <DigitalBrochure property={property} galleryImages={galleryImages} />
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Button className="rounded-full py-5 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#111111] font-bold uppercase tracking-[0.2em] text-[8px] h-auto flex items-center justify-center gap-2 transition-all">
                          <MessageSquare className="w-3 h-3" />
                          SMS
                        </Button>
                        <Button className="rounded-full py-5 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#111111] font-bold uppercase tracking-[0.2em] text-[8px] h-auto flex items-center justify-center gap-2 transition-all">
                          <Mail className="w-3 h-3" />
                          EMAIL
                        </Button>
                      </div>

                      <div className="pt-2">
                        <Link 
                          href={`https://wa.me/61400000000?text=Hi%20${property.agentName},%20I'm%20interested%20in%20viewing%20${property.title}%20at%20${property.location}.`} 
                          target="_blank" 
                          className="text-primary text-[8px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2 group hover:underline"
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
