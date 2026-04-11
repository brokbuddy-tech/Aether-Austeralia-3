
"use client";

import Image from "next/image";
import { MapPin, Navigation, Coffee, School, Waves } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface PropertyMapProps {
  location: string;
}

export function PropertyMap({ location }: PropertyMapProps) {
  const mapImg = PlaceHolderImages.find(i => i.id === "map-placeholder")?.imageUrl;

  const highlights = [
    { name: "Coastal Edge", dist: "400m", icon: Waves },
    { name: "The Promenade", dist: "1.2km", icon: Coffee },
    { name: "Westfield Centre", dist: "2.5km", icon: Navigation },
    { name: "Grammar School", dist: "3.1km", icon: School },
  ];

  return (
    <section className="bg-white rounded-[2.5rem] p-12 border border-primary/5 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700 mt-12">
      <div className="mb-10">
        <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary mb-6">The Location</h2>
        <h3 className="text-3xl md:text-4xl font-headline font-extrabold uppercase leading-tight mb-4">
          Prime <br /> <span className="text-primary">Sanctuary.</span>
        </h3>
        <p className="text-muted-foreground font-light text-lg max-w-md leading-relaxed mb-8">
          Strategically positioned in the heart of {location.split(',')[0]}, providing effortless access to the region's most coveted destinations.
        </p>
      </div>

      {/* Map Visualizer */}
      <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-inner mb-12 bg-muted/20 border border-primary/5">
        {mapImg && (
          <Image 
            src={mapImg}
            alt="Property Location Map"
            fill
            className="object-cover grayscale opacity-60 mix-blend-multiply"
            data-ai-hint="Minimalist Map"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
        
        {/* Pulsing Pin Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className="absolute inset-0 w-12 h-12 bg-primary/20 rounded-full animate-ping" />
            <div className="relative w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-2xl border-2 border-white">
              <MapPin className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Neighbourhood Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {highlights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex flex-col gap-2 p-6 rounded-2xl bg-muted/30 border border-primary/5 group hover:border-primary/20 transition-all">
              <Icon className="w-5 h-5 text-primary mb-2" />
              <p className="text-sm font-bold uppercase tracking-wider">{item.name}</p>
              <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{item.dist}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
