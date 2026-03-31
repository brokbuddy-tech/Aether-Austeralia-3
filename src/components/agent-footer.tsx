import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";

export function AgentFooter() {
  const bgImg = PlaceHolderImages.find(img => img.id === "agent-bg");

  return (
    <section className="relative w-full py-32 overflow-hidden bg-muted">
      {bgImg?.imageUrl ? (
        <Image
          src={bgImg.imageUrl}
          alt="Office Background"
          fill
          className="object-cover blur-sm opacity-50"
          data-ai-hint={bgImg.imageHint}
        />
      ) : null}
      <div className="absolute inset-0 bg-primary/10" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-foreground uppercase tracking-tight mb-8">
          Find Your Local Expert.
        </h2>
        <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search by suburb, agent, or agency..."
            className="flex-1 px-8 py-5 rounded-full glass-light border-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground"
          />
          <Button className="rounded-full px-12 py-5 bg-primary hover:bg-primary/90 active:bg-white active:text-primary text-white font-bold h-auto uppercase tracking-widest text-xs transition-all shadow-xl">
            Search
          </Button>
        </div>
      </div>
    </section>
  );
}
