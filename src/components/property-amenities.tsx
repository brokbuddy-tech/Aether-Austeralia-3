import { AmenityIcon } from "@/components/amenity-icon";

interface PropertyAmenitiesProps {
  amenities: string[];
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary">Premium Amenities</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {amenities.map((amenity) => (
          <div
            key={amenity}
            className="flex items-center gap-4 p-4 rounded-xl bg-muted/20 border border-primary/5 hover:border-primary/20 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:bg-primary/10 transition-colors">
              <AmenityIcon name={amenity} className="h-5 w-5" />
            </div>
            <span className="text-[11px] uppercase font-bold tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
              {amenity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
