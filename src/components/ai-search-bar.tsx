"use client";

import { useState } from "react";
import { Search, Loader2, SlidersHorizontal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { aiPoweredPropertySearch, type AiPoweredPropertySearchOutput } from "@/ai/flows/ai-powered-property-search-flow";

export function AISearchBar() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiPoweredPropertySearchOutput | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const output = await aiPoweredPropertySearch({ query });
      setResult(output);
      console.log("Search parameters extracted:", output);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Main Search Input */}
      <form 
        onSubmit={handleSearch}
        className="glass-light p-2 rounded-full flex items-center gap-2 shadow-2xl border border-white/40"
      >
        <div className="flex-1 flex items-center px-6 gap-3">
          <input
            type="text"
            placeholder="Describe your ideal home... (e.g. 4-bed house with a pool in Noosa)"
            className="w-full bg-transparent border-none focus:ring-0 text-foreground placeholder:text-muted-foreground/60 text-sm md:text-base font-light py-4"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <SlidersHorizontal className="text-primary w-5 h-5 opacity-40 cursor-pointer hover:opacity-100 transition-opacity hidden md:block" />
        </div>
        <Button 
          type="submit" 
          disabled={loading}
          size="icon"
          className="rounded-full h-14 w-14 bg-[#111111] hover:bg-black text-white shadow-lg transition-all shrink-0"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
        </Button>
      </form>

      {/* Explicit AI Search Button */}
      <div className="flex justify-center">
        <Button 
          onClick={() => handleSearch()}
          disabled={loading || !query.trim()}
          variant="outline"
          className="rounded-full px-8 py-6 h-auto border-primary/20 hover:bg-primary/5 text-primary font-bold uppercase tracking-[0.2em] text-[10px] group transition-all"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
          )}
          Discover with AI Assistant
        </Button>
      </div>
      
      {/* AI Analysis Result Display */}
      {result && (
        <div className="glass-light p-8 rounded-[2rem] border border-primary/10 shadow-xl animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[10px] text-primary font-bold uppercase tracking-[0.4em]">AI Intelligent Filter</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {result.location && (
              <Badge variant="outline" className="px-4 py-2 rounded-full border-primary/20 text-primary bg-primary/5 font-medium uppercase tracking-widest text-[10px]">
                Location: {result.location}
              </Badge>
            )}
            {result.bedrooms && (
              <Badge variant="outline" className="px-4 py-2 rounded-full border-primary/20 text-primary bg-primary/5 font-medium uppercase tracking-widest text-[10px]">
                {result.bedrooms} Bedrooms
              </Badge>
            )}
            {result.propertyType && (
              <Badge variant="outline" className="px-4 py-2 rounded-full border-primary/20 text-primary bg-primary/5 font-medium uppercase tracking-widest text-[10px]">
                {result.propertyType}
              </Badge>
            )}
            {result.amenities?.map(a => (
              <Badge key={a} variant="outline" className="px-4 py-2 rounded-full border-primary/20 text-primary bg-primary/5 font-medium uppercase tracking-widest text-[10px]">
                {a}
              </Badge>
            ))}
          </div>

          <p className="mt-8 text-sm text-muted-foreground font-light italic leading-relaxed">
            "Vela Armon AI has processed your request. We've refined our search to focus on {result.propertyType || 'residences'} in {result.location || 'premium postcodes'} matching your specific lifestyle requirements."
          </p>
        </div>
      )}
    </div>
  );
}
