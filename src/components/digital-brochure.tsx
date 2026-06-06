"use client";

import { useRef } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Bed, Bath, Car, Maximize, MapPin, Download } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import { replaceTemplateBranding } from "@/lib/public-site";

interface DigitalBrochureProps {
  property: {
    id: string;
    title: string;
    price: string;
    location: string;
    beds?: number;
    baths?: number;
    cars?: number;
    area: number;
    imageUrl: string;
    description: string;
    imageHint?: string;
    agencyName?: string;
  };
  galleryImages: string[];
}

function waitForImageAsset(image: HTMLImageElement) {
  if (image.complete && image.naturalWidth > 0) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      image.removeEventListener("load", finish);
      image.removeEventListener("error", finish);
      resolve();
    };

    image.addEventListener("load", finish, { once: true });
    image.addEventListener("error", finish, { once: true });

    if (typeof image.decode === "function") {
      image.decode().then(finish).catch(() => undefined);
    }
  });
}

async function waitForBrochureAssets(root: HTMLElement) {
  const images = Array.from(root.querySelectorAll("img"));
  await Promise.all(images.map((image) => waitForImageAsset(image)));

  if ("fonts" in document) {
    try {
      await document.fonts.ready;
    } catch {
      // Continue even if font readiness cannot be determined.
    }
  }

  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}

export function DigitalBrochure({ property, galleryImages }: DigitalBrochureProps) {
  const { toast } = useToast();
  const brochureRef = useRef<HTMLDivElement>(null);
  const agencyName = property.agencyName || "Agency Website";
  const advisoryLabel = replaceTemplateBranding("{{agencyName}} | Premium Real Estate Advisory", agencyName);

  const handleDownload = async () => {
    if (!brochureRef.current) return;

    toast({
      title: "Generating Brochure",
      description: "Your exclusive visual brochure is being prepared for download.",
    });

    try {
      await waitForBrochureAssets(brochureRef.current);

      const canvas = await html2canvas(brochureRef.current, {
        useCORS: true,
        scale: Math.min(window.devicePixelRatio || 1, 2),
        backgroundColor: "#ffffff",
        logging: false,
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: brochureRef.current.scrollWidth,
        windowHeight: brochureRef.current.scrollHeight,
      });

      const link = document.createElement("a");
      link.download = `${property.title.toLowerCase().replace(/\s+/g, "-")}-brochure.png`;
      link.href = canvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Download Complete",
        description: "The visual brochure has been saved to your device.",
      });
    } catch (error) {
      console.error("Brochure generation failed:", error);
      toast({
        title: "Generation Failed",
        description: "Could not create the visual brochure. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full rounded-full h-14 border-[#111111] text-[#111111] font-bold uppercase tracking-[0.2em] text-[9px] flex items-center justify-center gap-2 group transition-all hover:bg-primary/10 hover:text-[#111111] hover:border-primary/40 backdrop-blur-sm">
          <FileText className="w-3.5 h-3.5" />
          VIEW DIGITAL BROCHURE
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-none rounded-[2rem] bg-white">
        <DialogHeader className="sr-only">
          <DialogTitle>{property.title} - Digital Brochure</DialogTitle>
          <DialogDescription>Exclusive property presentation for {property.title}.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col relative">
          <div className="absolute top-6 right-16 z-[60]">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="rounded-full bg-white/10 hover:bg-white border-white/40 text-white hover:text-primary transition-all backdrop-blur-xl h-10 px-6 text-[9px] uppercase font-bold tracking-[0.2em] shadow-lg"
            >
              <Download className="w-3.5 h-3.5 mr-2" />
              Download Image
            </Button>
          </div>

          <div ref={brochureRef} className="flex flex-col bg-white">
            <div className="relative aspect-[21/9] w-full">
              <Image
                src={property.imageUrl}
                alt={property.title}
                fill
                className="object-cover"
                data-ai-hint={property.imageHint}
                unoptimized
                priority
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-primary mb-2">Exclusive Presentation</p>
                <h2 className="text-3xl md:text-4xl font-headline font-extrabold uppercase tracking-tight">{property.title}</h2>
                <div className="mt-2 flex items-center gap-2 text-white/80">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-xs uppercase tracking-widest font-bold">{property.location}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-8 bg-[#F9F9F9]">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-black/5">
                  <Image src={img} alt={`Gallery ${idx + 1}`} fill className="object-cover" unoptimized priority={idx < 3} />
                </div>
              ))}
            </div>

            <div className="p-10 space-y-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-primary/10 pb-10">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-muted-foreground mb-1">Valuation</p>
                  <p className="text-3xl font-headline font-extrabold text-primary">AUD ${property.price}</p>
                </div>

                <div className="flex gap-8">
                  {property.beds !== undefined ? (
                    <div className="flex flex-col items-center gap-1">
                      <Bed className="w-5 h-5 text-primary" />
                      <span className="text-sm font-bold">{property.beds}</span>
                      <span className="text-[8px] uppercase font-bold tracking-widest text-muted-foreground">Beds</span>
                    </div>
                  ) : null}
                  {property.baths !== undefined ? (
                    <div className="flex flex-col items-center gap-1">
                      <Bath className="w-5 h-5 text-primary" />
                      <span className="text-sm font-bold">{property.baths}</span>
                      <span className="text-[8px] uppercase font-bold tracking-widest text-muted-foreground">Baths</span>
                    </div>
                  ) : null}
                  {property.cars !== undefined ? (
                    <div className="flex flex-col items-center gap-1">
                      <Car className="w-5 h-5 text-primary" />
                      <span className="text-sm font-bold">{property.cars}</span>
                      <span className="text-[8px] uppercase font-bold tracking-widest text-muted-foreground">Cars</span>
                    </div>
                  ) : null}
                  <div className="flex flex-col items-center gap-1">
                    <Maximize className="w-5 h-5 text-primary" />
                    <span className="text-sm font-bold">{property.area}mÂ²</span>
                    <span className="text-[8px] uppercase font-bold tracking-widest text-muted-foreground">Area</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary">Architectural Narrative</h3>
                <p className="text-muted-foreground font-light leading-relaxed text-lg whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              <div className="pt-10 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-xl font-headline font-extrabold tracking-tighter uppercase">
                  {agencyName}
                </div>
                <div className="text-center md:text-right">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{advisoryLabel}</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 mt-1">Â© 2026 All Rights Reserved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
