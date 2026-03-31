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

export function TestimonialSlider() {
  const userImg = PlaceHolderImages.find(img => img.id === "testimonial-avatar");

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const testimonials = [
    {
      quote: "Vela Armon transformed our search from a chore into a curated exploration. Their visual approach and local insight are unmatched in the Australian market.",
      author: "Julian Vance",
      role: "Luxury Portfolio Client"
    },
    {
      quote: "The professional integrity and technological edge that Vela Armon brings to real estate is truly extraordinary. A high-end experience through and through.",
      author: "Sarah Montgomery",
      role: "Property Investor"
    },
    {
      quote: "The precision and professionalism of Vela Armon made our relocation to Sydney effortless. Truly the gold standard for luxury acquisitions.",
      author: "Marcus & Elena Chen",
      role: "Private Wealth Clients"
    },
    {
      quote: "Their knowledge of off-market properties in the Noosa region is unparalleled. We found our dream home before it even hit the portals.",
      author: "Dr. Robert Sterling",
      role: "Retreat Owner"
    }
  ];

  return (
    <div className="w-full relative">
      <div className="max-w-4xl mx-auto relative px-12">
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
            {testimonials.map((t, idx) => (
              <CarouselItem key={idx}>
                <div className="glass-light p-12 md:p-20 rounded-[2rem] text-center shadow-xl border border-primary/5">
                  <div className="relative w-16 h-16 mx-auto mb-8 rounded-full overflow-hidden border-2 border-primary/20 bg-muted">
                    {userImg?.imageUrl ? (
                      <Image
                        src={userImg.imageUrl}
                        alt="Client"
                        fill
                        className="object-cover"
                        data-ai-hint={userImg.imageHint}
                      />
                    ) : null}
                  </div>
                  <blockquote className="text-2xl md:text-3xl font-editorial font-light italic text-foreground mb-8 leading-relaxed">
                    "{t.quote}"
                  </blockquote>
                  <cite className="not-italic">
                    <div className="font-headline uppercase tracking-widest font-bold text-sm text-primary">{t.author}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-1">{t.role}</div>
                  </cite>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white border-primary/10 text-primary hover:bg-primary hover:text-white" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white border-primary/10 text-primary hover:bg-primary hover:text-white" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
