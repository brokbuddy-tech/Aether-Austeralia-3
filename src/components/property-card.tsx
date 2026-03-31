"use client";

import Image from "next/image";
import { Bed, Bath, Car, Maximize } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PropertyProps {
  id: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  cars: number;
  area: number;
  imageUrl: string;
  imageHint?: string;
  agentName: string;
}

export function PropertyCard({ property }: { property: PropertyProps }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative flex flex-col overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
        {property.imageUrl ? (
          <Image
            src={property.imageUrl}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
            data-ai-hint={property.imageHint}
          />
        ) : null}
        
        {/* Metadata Overlay */}
        <div className="absolute bottom-4 left-4 flex gap-3 z-10">
          <div className="flex items-center gap-1.5 glass px-2 py-1 rounded text-white text-xs font-medium">
            <Bed className="w-3.5 h-3.5" /> {property.beds}
          </div>
          <div className="flex items-center gap-1.5 glass px-2 py-1 rounded text-white text-xs font-medium">
            <Bath className="w-3.5 h-3.5" /> {property.baths}
          </div>
          <div className="flex items-center gap-1.5 glass px-2 py-1 rounded text-white text-xs font-medium">
            <Car className="w-3.5 h-3.5" /> {property.cars}
          </div>
          <div className="flex items-center gap-1.5 glass px-2 py-1 rounded text-white text-xs font-medium">
            <Maximize className="w-3.5 h-3.5" /> {property.area}m²
          </div>
        </div>

        {/* Agent Name reveal on hover */}
        <div 
          className={cn(
            "absolute top-4 right-4 glass px-3 py-1 rounded transition-opacity duration-300",
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        >
          <span className="text-white text-[10px] uppercase tracking-widest font-bold">{property.agentName}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <div className="glass-light p-4 rounded-lg transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-300 shadow-sm border border-black/5">
          <h3 className="font-headline text-lg uppercase leading-tight">{property.title}</h3>
          <p className="text-primary font-bold text-xl mt-1">AUD ${property.price}</p>
          <p className="text-muted-foreground text-sm uppercase tracking-wider mt-1">{property.location}</p>
        </div>
      </div>
    </div>
  );
}
