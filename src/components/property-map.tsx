
"use client";

import dynamic from "next/dynamic";
import { MapPin, Navigation, Coffee, School, Waves } from "lucide-react";

const DynamicLocationMap = dynamic(
  () => import("@/components/location-map").then((mod) => ({ default: mod.LocationMap })),
  {
    ssr: false,
    loading: () => (
      <div className="leaflet-property-map relative h-96 w-full overflow-hidden rounded-3xl border border-border bg-muted/35 animate-pulse" />
    ),
  }
);

interface PropertyMapProps {
  address: string;
  location: string;
  latitude?: number | null;
  longitude?: number | null;
}

export function PropertyMap({ address, location, latitude, longitude }: PropertyMapProps) {
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
      <div className="mb-12">
        <DynamicLocationMap
          latitude={latitude}
          longitude={longitude}
          locationLabel={location}
          addressLabel={address}
        />
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
