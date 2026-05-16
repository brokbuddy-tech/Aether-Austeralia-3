"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface PropertyNarrativeProps {
  description: string;
}

export function PropertyNarrative({ description }: PropertyNarrativeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-8">
      <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary">The Narrative</h2>
      <p className="text-lg font-light leading-relaxed text-muted-foreground whitespace-pre-line">
        {description}
      </p>
      
      <div 
        className={`overflow-hidden transition-all duration-700 ease-in-out ${
          isExpanded ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="font-light text-muted-foreground max-w-none leading-relaxed space-y-6 text-lg">
          <p>
            Beyond the primary functional spaces, this asset offers unparalleled attention to detail. The integration of high-end facilities, smart building automation, and sustainable architectural principles ensures that the property is as efficient as it is impressive.
          </p>
          <p>
            Positioned within one of Australia's most strategic postcodes, tenants and owners enjoy proximity to logistical hubs, world-class amenities, and key landmarks while maintaining a sense of absolute prestige and security.
          </p>
        </div>
      </div>

      <Button 
        variant="ghost" 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-0 h-auto text-primary font-bold uppercase tracking-[0.3em] text-[11px] group hover:bg-transparent hover:text-primary/80"
      >
        {isExpanded ? 'Read Less' : 'Read More'}
        <div className={`ml-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
           <ChevronDown className="w-4 h-4" />
        </div>
        <div className="w-12 h-[1px] bg-primary ml-4 transition-all group-hover:w-20" />
      </Button>
    </div>
  );
}
