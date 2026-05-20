
"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Autoplay from "embla-carousel-autoplay";
import { replaceTemplateBranding } from "@/lib/public-site";

type TestimonialSlide = {
  id: string;
  quote: string;
  author: string;
  meta: string;
  avatar?: string | null;
};

function getInitials(name: string) {
  return (
    name
      .split(/[\s&-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "AG"
  );
}

export function TestimonialSlider({
  agencyName = "Agency Website",
  testimonials = [],
}: {
  agencyName?: string;
  testimonials?: TestimonialSlide[];
}) {
  const userImg = PlaceHolderImages.find(img => img.id === "testimonial-avatar");

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const fallbackTestimonials: TestimonialSlide[] = [
    {
      id: "julian-vance",
      quote: "{{agencyName}} transformed our search from a chore into a curated exploration. Their visual approach and local insight are unmatched in the Australian market.",
      author: "Julian Vance",
      meta: "Luxury Portfolio Client"
    },
    {
      id: "sarah-montgomery",
      quote: "The professional integrity and technological edge that {{agencyName}} brings to real estate is truly extraordinary. A high-end experience through and through.",
      author: "Sarah Montgomery",
      meta: "Property Investor"
    },
    {
      id: "marcus-elena-chen",
      quote: "The precision and professionalism of {{agencyName}} made our relocation to Sydney effortless. Truly the gold standard for luxury acquisitions.",
      author: "Marcus & Elena Chen",
      meta: "Private Wealth Clients"
    },
    {
      id: "robert-sterling",
      quote: "Their knowledge of off-market properties in the Noosa region is unparalleled. We found our dream home before it even hit the portals.",
      author: "Dr. Robert Sterling",
      meta: "Retreat Owner"
    }
  ].map((testimonial) => ({
    ...testimonial,
    quote: replaceTemplateBranding(testimonial.quote, agencyName),
  }));
  const resolvedTestimonials = (testimonials.length > 0 ? testimonials : fallbackTestimonials).map((testimonial) => ({
    ...testimonial,
    quote: replaceTemplateBranding(testimonial.quote, agencyName),
  }));

  return (
    <div className="w-full relative px-4 md:px-0">
      <div className="max-w-3xl mx-auto relative px-4 md:px-12">
        <Carousel 
          className="w-full"
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {resolvedTestimonials.map((t) => (
              <CarouselItem key={t.id}>
                <div className="bg-white/30 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] text-center shadow-2xl border border-white/40">
                  <div className="relative mx-auto mb-6 h-12 w-12 overflow-hidden rounded-full border-2 border-white/50 bg-muted/20 md:mb-8 md:h-16 md:w-16">
                    {t.avatar || userImg?.imageUrl ? (
                      <Image
                        src={t.avatar || userImg?.imageUrl || ""}
                        alt={t.author}
                        fill
                        className="object-cover"
                        data-ai-hint={userImg?.imageHint}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs font-bold tracking-[0.2em] text-primary">
                        {getInitials(t.author)}
                      </div>
                    )}
                  </div>
                  <blockquote className="text-lg md:text-2xl font-editorial font-light italic text-foreground mb-6 md:mb-8 leading-relaxed">
                    "{t.quote}"
                  </blockquote>
                  <cite className="not-italic">
                    <div className="font-headline uppercase tracking-widest font-bold text-xs md:text-sm text-primary">{t.author}</div>
                    <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-1">{t.meta}</div>
                  </cite>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white/40 backdrop-blur-sm border-white/20 text-primary hover:bg-primary hover:text-white transition-all" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white/40 backdrop-blur-sm border-white/20 text-primary hover:bg-primary hover:text-white transition-all" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
