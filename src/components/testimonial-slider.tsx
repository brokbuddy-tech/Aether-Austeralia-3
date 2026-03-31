"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function TestimonialSlider() {
  const userImg = PlaceHolderImages.find(img => img.id === "testimonial-avatar");

  const testimonials = [
    {
      quote: "Aether transformed our search from a chore into a curated exploration. Their visual approach and local insight are unmatched in the Australian market.",
      author: "Julian Vance",
      role: "Luxury Portfolio Client"
    },
    {
      quote: "The professional integrity and technological edge that Aether brings to real estate is truly extraordinary. A high-end experience through and through.",
      author: "Sarah Montgomery",
      role: "Property Investor"
    }
  ];

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            {testimonials.map((t, idx) => (
              <CarouselItem key={idx}>
                <div className="glass-light p-12 md:p-20 rounded-[2rem] text-center shadow-xl border border-primary/5">
                  <div className="relative w-16 h-16 mx-auto mb-8 rounded-full overflow-hidden border-2 border-primary/20">
                    <Image
                      src={userImg?.imageUrl || ""}
                      alt="Client"
                      fill
                      className="object-cover"
                    />
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
        </Carousel>
      </div>
    </section>
  );
}