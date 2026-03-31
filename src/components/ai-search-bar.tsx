"use client";

import { useState } from "react";
import { Search, Loader2, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { aiPoweredPropertySearch, type AiPoweredPropertySearchOutput } from "@/ai/flows/ai-powered-property-search-flow";

export function AISearchBar() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiPoweredPropertySearchOutput | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const output = await aiPoweredPropertySearch({ query });
      setResult(output);
      // In a real app, this would trigger a filtering logic on a property list
      console.log("Search parameters extracted:", output);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <form 
        onSubmit={handleSearch}
        className="glass-light p-2 rounded-full flex items-center gap-2 shadow-2xl border border-white/40"
      >
        <div className="flex-1 flex items-center px-4 gap-3">
          <Search className="text-primary w-5 h-5 opacity-60" />
          <input
            type="text"
            placeholder="e.g., Modern 3-bed home with a pool in Noosa"
            className="w-full bg-transparent border-none focus:ring-0 text-foreground placeholder:text-muted-foreground/60 text-sm md:text-base font-light"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <SlidersHorizontal className="text-primary w-4 h-4 opacity-40 cursor-pointer hover:opacity-100 transition-opacity hidden md:block" />
        </div>
        <Button 
          type="submit" 
          disabled={loading}
          className="rounded-full px-8 py-6 bg-primary hover:bg-primary/90 text-white font-bold transition-all"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "SEARCH"}
        </Button>
      </form>
      
      {result && (
        <div className="glass p-4 rounded-xl animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="text-[10px] text-white/60 font-bold uppercase tracking-[0.2em] mb-2">Parameters Found</div>
          <div className="flex flex-wrap gap-2">
            {result.location && <Badge label={`Location: ${result.location}`} />}
            {result.bedrooms && <Badge label={`${result.bedrooms} Beds`} />}
            {result.amenities?.map(a => <Badge key={a} label={a} />)}
            {result.propertyType && <Badge label={result.propertyType} />}
          </div>
        </div>
      )}
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 glass-light rounded-full text-[11px] font-medium text-primary capitalize border border-white/20">
      {label}
    </span>
  );
}
