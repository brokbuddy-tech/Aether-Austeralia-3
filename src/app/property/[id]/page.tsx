
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
import { Navbar } from "@/components/navbar";
import { getPropertyById } from "@/lib/api";
import { getRequestAgencySlug } from "@/lib/server-agency";

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agencySlug = await getRequestAgencySlug();
  const property = await getPropertyById(id, agencySlug);

  if (!property) {
    notFound();
  }

  const galleryImages = property.galleryImages.length > 0
    ? property.galleryImages
    : [
        property.imageUrl,
        PlaceHolderImages.find(i => i.id === "insight-1")?.imageUrl || "",
        PlaceHolderImages.find(i => i.id === "contact-bg")?.imageUrl || "",
      ].filter(Boolean);

  const agentAvatar = property.agentAvatar || PlaceHolderImages.find(i => i.id === (property.agentName === 'Sarah West' ? 'team-1' : property.agentName === 'Julian Vance' ? 'team-2' : property.agentName === 'Emma Clarke' ? 'team-3' : property.agentName === 'Marcus Thorne' ? 'team-4' : 'team-5'))?.imageUrl || PlaceHolderImages.find(i => i.id === 'team-1')!.imageUrl;
  const agentBg = PlaceHolderImages.find(i => i.id === 'agent-bg')?.imageUrl || "";
  const backHref = property.status === "SOLD"
    ? "/sold"
    : property.propertyType.toUpperCase() === "COMMERCIAL"
      ? "/commercial"
      : property.transactionType === "RENT"
        ? "/rent"
        : "/buy";
  const backLabel = property.status === "SOLD"
    ? "Back to Sold"
    : property.propertyType.toUpperCase() === "COMMERCIAL"
      ? "Back to Commercial"
      : property.transactionType === "RENT"
        ? "Back to Rent"
        : "Back to Buy";
  const smsHref = property.agentPhone ? `sms:${property.agentPhone}` : undefined;
  const emailHref = property.agentEmail ? `mailto:${property.agentEmail}` : undefined;
  const whatsappHref = property.agentWhatsapp
    ? `https://wa.me/${property.agentWhatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${property.agentName}, I'm interested in ${property.title} at ${property.location}.`)}`
    : undefined;

  return (
    <main className="min-h-screen bg-background">
      <Navbar theme="light" />

      <section className="pt-24 md:pt-32 pb-12 md:pb-24 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-center mb-8 md:mb-12">
            <Link href={backHref} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em]">{backLabel}</span>
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
                <p className="text-xl md:text-3xl font-headline font-extrabold text-primary">AUD ${property.price}</p>
              </div>
            </div>
          </div>

          {/* Property Gallery Grid - Row on responsive versions */}
          <div className="flex md:grid md:grid-cols-4 gap-4 mb-16 overflow-x-auto no-scrollbar pb-4 md:pb-0">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm group cursor-pointer flex-none w-[280px] md:w-auto">
                <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
            ))}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted flex flex-col items-center justify-center cursor-pointer group border border-dashed border-primary/20 hover:bg-primary/5 transition-colors flex-none w-[280px] md:w-auto">
              <Grid3X3 className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary">View More</span>
            </div>
          </div>

          {/* Details Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
            <div className="lg:col-span-2 space-y-12 md:space-y-16">
              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8">
                {property.beds !== undefined && (
                  <div className="flex flex-col gap-2 p-4 md:p-6 rounded-2xl bg-muted/30 border border-primary/5">
                    <Bed className="w-5 h-5 md:w-6 md:h-6 text-primary" />
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
              <PropertyMap
                address={property.address}
                location={property.location}
                latitude={property.latitude}
                longitude={property.longitude}
              />
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
                      <Button className="w-full rounded-full h-14 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-[0.2em] text-[9px] shadow-lg transition-all active:scale-[0.98]">
                        BOOK PRIVATE INSPECTION
                      </Button>
                      
                      <DigitalBrochure property={property} galleryImages={galleryImages} />
                      
                      <div className="grid grid-cols-2 gap-2">
                        {smsHref ? (
                          <Button asChild className="rounded-full py-4 md:py-5 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#111111] font-bold uppercase tracking-[0.2em] text-[7px] md:text-[8px] h-auto transition-all">
                            <a href={smsHref} className="flex items-center justify-center gap-2">
                              <MessageSquare className="w-3 h-3" />
                              SMS
                            </a>
                          </Button>
                        ) : (
                          <Button disabled className="rounded-full py-4 md:py-5 bg-[#F3F4F6] text-[#111111] font-bold uppercase tracking-[0.2em] text-[7px] md:text-[8px] h-auto flex items-center justify-center gap-2 transition-all">
                            <MessageSquare className="w-3 h-3" />
                            SMS
                          </Button>
                        )}
                        {emailHref ? (
                          <Button asChild className="rounded-full py-4 md:py-5 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#111111] font-bold uppercase tracking-[0.2em] text-[7px] md:text-[8px] h-auto transition-all">
                            <a href={emailHref} className="flex items-center justify-center gap-2">
                              <Mail className="w-3 h-3" />
                              EMAIL
                            </a>
                          </Button>
                        ) : (
                          <Button disabled className="rounded-full py-4 md:py-5 bg-[#F3F4F6] text-[#111111] font-bold uppercase tracking-[0.2em] text-[7px] md:text-[8px] h-auto flex items-center justify-center gap-2 transition-all">
                            <Mail className="w-3 h-3" />
                            EMAIL
                          </Button>
                        )}
                      </div>

                      {whatsappHref && (
                        <div className="pt-2">
                          <Link 
                            href={whatsappHref}
                            target="_blank" 
                            className="text-primary text-[7px] md:text-[8px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2 group hover:underline"
                          >
                            WHATSAPP AGENT <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      )}
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
