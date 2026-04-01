"use client";

import { useState } from "react";
import { Search, Loader2, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { aiPoweredPropertySearch, type AiPoweredPropertySearchOutput } from "@/ai/flows/ai-powered-property-search-flow";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export function AISearchBar() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiPoweredPropertySearchOutput | null>(null);
  const [open, setOpen] = useState(false);
  
  // Manual Filter State
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "any",
    bedrooms: "any",
    bathrooms: "any",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
    amenities: [] as string[]
  });

  const { toast } = useToast();

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!query.trim() && !filters.location && filters.propertyType === 'any') {
      toast({
        title: "Search criteria required",
        description: "Please describe your ideal property or use the filters.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    setResult(null);
    setOpen(false); // Close modal if open

    try {
      const output = await aiPoweredPropertySearch({ query });
      
      const mergedResult = {
        ...output,
        location: filters.location || output.location,
        propertyType: filters.propertyType !== 'any' ? filters.propertyType : output.propertyType,
        bedrooms: filters.bedrooms !== 'any' ? parseInt(filters.bedrooms) : output.bedrooms,
        bathrooms: filters.bathrooms !== 'any' ? parseInt(filters.bathrooms) : output.bathrooms,
        minPrice: filters.minPrice ? parseFloat(filters.minPrice) : output.minPrice,
        maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : output.maxPrice,
        amenities: filters.amenities.length > 0 ? Array.from(new Set([...(output.amenities || []), ...filters.amenities])) : output.amenities
      };

      setResult(mergedResult);
      
      toast({
        title: "Search refined",
        description: "Your search has been processed with specified criteria.",
      });
    } catch (error) {
      console.error("Search failed:", error);
      toast({
        title: "Search failed",
        description: "Unable to process your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleAmenity = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const availableAmenities = ["Pool", "Gym", "Garage", "Garden", "Ocean View", "Air Con"];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="glass-light p-2 rounded-full flex items-center gap-2 shadow-2xl border border-white/40">
        <form onSubmit={handleSearch} className="flex-1 flex items-center px-6 gap-3">
          <input
            type="text"
            placeholder="Describe your ideal home... (e.g. 4-bed house with a pool in Noosa)"
            className="w-full bg-transparent border-none focus:ring-0 text-foreground placeholder:text-muted-foreground/60 text-sm md:text-base font-light py-4"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 group">
              <SlidersHorizontal className="text-primary w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none rounded-[2.5rem] shadow-2xl bg-transparent">
            <div className="p-8 md:p-10 glass-light backdrop-blur-3xl h-full w-full">
              <DialogHeader className="mb-8">
                <div className="flex items-center justify-between">
                  <DialogTitle className="font-headline font-bold uppercase tracking-[0.3em] text-sm text-primary">Advanced Filters</DialogTitle>
                  <Sparkles className="w-4 h-4 text-primary opacity-50" />
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Location</Label>
                    <Input 
                      placeholder="e.g. Noosa" 
                      value={filters.location}
                      onChange={(e) => setFilters({...filters, location: e.target.value})}
                      className="rounded-xl border-primary/10 h-11 bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Property Type</Label>
                    <Select value={filters.propertyType} onValueChange={(v) => setFilters({...filters, propertyType: v})}>
                      <SelectTrigger className="rounded-xl border-primary/10 h-11 bg-white/50">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Type</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Bedrooms</Label>
                    <Select value={filters.bedrooms} onValueChange={(v) => setFilters({...filters, bedrooms: v})}>
                      <SelectTrigger className="rounded-xl border-primary/10 h-11 bg-white/50">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                        <SelectItem value="5">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Bathrooms</Label>
                    <Select value={filters.bathrooms} onValueChange={(v) => setFilters({...filters, bathrooms: v})}>
                      <SelectTrigger className="rounded-xl border-primary/10 h-11 bg-white/50">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Price Range (AUD)</Label>
                    <div className="flex gap-4">
                      <Input 
                        placeholder="Min Price" 
                        type="number" 
                        value={filters.minPrice}
                        onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                        className="rounded-xl border-primary/10 h-11 bg-white/50"
                      />
                      <Input 
                        placeholder="Max Price" 
                        type="number" 
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                        className="rounded-xl border-primary/10 h-11 bg-white/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Premium Amenities</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {availableAmenities.map(amenity => (
                      <div key={amenity} className="flex items-center space-x-3 group cursor-pointer">
                        <Checkbox 
                          id={amenity} 
                          checked={filters.amenities.includes(amenity)}
                          onCheckedChange={() => toggleAmenity(amenity)}
                          className="rounded-md border-primary/20"
                        />
                        <label htmlFor={amenity} className="text-[10px] uppercase font-bold tracking-widest cursor-pointer text-muted-foreground group-hover:text-primary transition-colors">
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <Button 
                    onClick={handleSearch} 
                    className="w-full rounded-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-[0.3em] text-[10px] h-14 shadow-xl transition-all active:scale-[0.98]"
                  >
                    Show Results
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button 
          onClick={handleSearch}
          disabled={loading}
          size="icon"
          className="rounded-full h-14 w-14 bg-primary hover:bg-primary/90 text-white shadow-lg transition-all shrink-0"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
        </Button>
      </div>

      <div className="flex justify-center">
        <Button 
          type="button"
          onClick={() => handleSearch()}
          disabled={loading}
          variant="outline"
          className="rounded-full px-10 py-7 h-auto border-primary/20 bg-transparent text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-[0.3em] text-[10px] group transition-all shadow-sm active:scale-[0.98]"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 mr-3 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4 mr-3 group-hover:rotate-12 transition-transform" />
          )}
          Discover with AI Assistant
        </Button>
      </div>
      
      {result && (
        <div className="glass-light p-8 rounded-[2.5rem] border border-primary/10 shadow-xl animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-[10px] text-primary font-bold uppercase tracking-[0.4em]">AI Intelligent Filter</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setResult(null)} className="h-8 w-8 rounded-full hover:bg-primary/5">
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {result.location && (
              <Badge variant="outline" className="px-5 py-2.5 rounded-full border-primary/20 text-primary bg-primary/5 font-bold uppercase tracking-[0.2em] text-[9px]">
                Location: {result.location}
              </Badge>
            )}
            {result.bedrooms && (
              <Badge variant="outline" className="px-5 py-2.5 rounded-full border-primary/20 text-primary bg-primary/5 font-bold uppercase tracking-[0.2em] text-[9px]">
                {result.bedrooms} Bedrooms
              </Badge>
            )}
            {result.propertyType && (
              <Badge variant="outline" className="px-5 py-2.5 rounded-full border-primary/20 text-primary bg-primary/5 font-bold uppercase tracking-[0.2em] text-[9px]">
                {result.propertyType}
              </Badge>
            )}
            {result.maxPrice && (
              <Badge variant="outline" className="px-5 py-2.5 rounded-full border-primary/20 text-primary bg-primary/5 font-bold uppercase tracking-[0.2em] text-[9px]">
                Up to ${result.maxPrice.toLocaleString()}
              </Badge>
            )}
            {result.amenities && result.amenities.length > 0 && result.amenities.map(a => (
              <Badge key={a} variant="outline" className="px-5 py-2.5 rounded-full border-primary/20 text-primary bg-primary/5 font-bold uppercase tracking-[0.2em] text-[9px]">
                {a}
              </Badge>
            ))}
          </div>

          <p className="mt-8 text-sm text-muted-foreground font-light italic leading-relaxed border-l-2 border-primary/10 pl-6">
            "Vela Armon AI has refined your request. We've matched your criteria with our exclusive database of {result.propertyType || 'residences'} in {result.location || 'premium postcodes'} to find your ideal legacy property."
          </p>
        </div>
      )}
    </div>
  );
}
