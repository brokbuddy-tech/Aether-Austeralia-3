"use client";

import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ParallaxImage } from "@/components/parallax-image";
import { AISearchBar } from "@/components/ai-search-bar";

export function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-home");

  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Side: Parallax Image */}
      <div className="w-full md:w-[55%] h-[40vh] md:h-full min-h-[300px]">
        <ParallaxImage
          src={heroImage?.imageUrl || ""}
          alt={heroImage?.description || "Hero Property"}
          className="w-full h-full"
          ratio={0.12}
          imageHint={heroImage?.imageHint}
        />
      </div>

      {/* Right Side: Minimalist Panel */}
      <div className="w-full md:w-[45%] bg-[#FAFAFA] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-12 md:py-0">
        <div className="max-w-xl mx-auto md:mx-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-headline font-extrabold text-foreground leading-[1.1] uppercase">
            Find a place <br />
            <span className="text-primary">you really love.</span>
          </h1>
          <p className="mt-6 md:mt-8 text-muted-foreground text-base md:text-xl font-light leading-relaxed max-w-md">
            Explore curated residential and commercial opportunities across Australia's key markets.
          </p>
        </div>
        
        {/* Floating Search in Panel */}
        <div className="mt-10 md:mt-16 relative z-20 w-full">
          <AISearchBar />
        </div>
      </div>
    </section>
  );
}
