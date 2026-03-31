import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";

export function MarketInsights() {
  const insightImg = PlaceHolderImages.find(img => img.id === "insight-1");

  return (
    <section className="py-24 px-6 md:px-12 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 aspect-[3/2] relative overflow-hidden rounded-2xl shadow-2xl bg-muted">
            {insightImg?.imageUrl ? (
              <Image
                src={insightImg.imageUrl}
                alt="Architecture Detail"
                fill
                className="object-cover"
                data-ai-hint={insightImg.imageHint}
              />
            ) : null}
          </div>
          
          {/* Right: Text */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-accent text-white text-[10px] font-bold uppercase tracking-widest rounded">Insight</span>
              <span className="text-muted-foreground text-[10px] uppercase tracking-widest font-bold">2 min read</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-editorial font-bold leading-tight italic">
              2026 Market Forecast: <br />
              The Evolution of Coastal Living.
            </h2>
            
            <p className="text-muted-foreground text-lg font-light leading-relaxed max-w-lg">
              As architectural aesthetics shift towards organic minimalism, the Australian luxury market prepares for a new era of sustainable coastal grandeur.
            </p>
            
            <Button variant="link" className="p-0 h-auto text-primary font-bold uppercase tracking-[0.3em] text-[11px] group">
              Read More
              <div className="w-12 h-[1px] bg-primary ml-4 transition-all group-hover:w-20" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
