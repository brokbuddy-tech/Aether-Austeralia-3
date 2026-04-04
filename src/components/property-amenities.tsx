"use client";

import { 
  Waves, 
  Dumbbell, 
  Car, 
  Wifi, 
  Shield, 
  Wine, 
  Tv, 
  Sun, 
  Wind, 
  Flame 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyAmenitiesProps {
  amenities: string[];
}

const amenityIconMap: Record<string, any> = {
  "Infinity Pool": Waves,
  "Private Gym": Dumbbell,
  "Secure Parking": Car,
  "High-Speed Wi-Fi": Wifi,
  "24/7 Security": Shield,
  "Wine Cellar": Wine,
  "Home Cinema": Tv,
  "Solar Power": Sun,
  "Climate Control": Wind,
  "Outdoor Firepit": Flame,
  "Chef's Kitchen": Flame, // Fallback
  "Smart Home System": Shield, // Fallback
};

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary">Premium Amenities</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {amenities.map((amenity) => {
          const Icon = amenityIconMap[amenity] || Waves;
          return (
            <div 
              key={amenity} 
              className="flex items-center gap-4 p-4 rounded-xl bg-muted/20 border border-primary/5 hover:border-primary/20 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
              </div>
              <span className="text-[11px] uppercase font-bold tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                {amenity}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
