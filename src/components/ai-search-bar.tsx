"use client";

import { useState } from "react";
import { Search, Loader2, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { aiPoweredPropertySearch, type AiPoweredPropertySearchOutput } from "@/ai/flows/ai-powered-property-search-flow";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export function AISearchBar() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiPoweredPropertySearchOutput | null>(null);
  
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
    try {
      // If user has manually entered filters, we can combine them or prioritize them
      // For this MVP, we'll still call the AI with the query string, but we can 
      // merge the manual filters into the result display if needed.
      const output = await aiPoweredPropertySearch({ query });
      
      // Merge manual filters into AI output if they were set
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
      {/* Main Search Input */}
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

        {/* Filter Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 group">
              <SlidersHorizontal className="text-primary w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[350px] md:w-[450px] p-6 rounded-[2rem] glass-light border-primary/10 shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-primary/5 pb-4">
                <h3 className="font-headline font-bold uppercase tracking-widest text-sm">Advanced Filters</h3>
                <Sparkles className="w-4 h-4 text-primary opacity-50" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Location</Label>
                  <Input 
                    placeholder="e.g. Noosa" 
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                    className="rounded-xl border-primary/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Property Type</Label>
                  <Select value={filters.propertyType} onValueChange={(v) => setFilters({...filters, propertyType: v})}>
                    <SelectTrigger className="rounded-xl border-primary/10">
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Bedrooms</Label>
                  <Select value={filters.bedrooms} onValueChange={(v) => setFilters({...filters, bedrooms: v})}>
                    <SelectTrigger className="rounded-xl border-primary/10">
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
                    <SelectTrigger className="rounded-xl border-primary/10">
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Price Range (AUD)</Label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Min" 
                      type="number" 
                      value={filters.minPrice}
                      onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                      className="rounded-xl border-primary/10"
                    />
                    <Input 
                      placeholder="Max" 
                      type="number" 
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                      className="rounded-xl border-primary/10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Area (m²)</Label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Min" 
                      type="number" 
                      value={filters.minArea}
                      onChange={(e) => setFilters({...filters, minArea: e.target.value})}
                      className="rounded-xl border-primary/10"
                    />
                    <Input 
                      placeholder="Max" 
                      type="number" 
                      value={filters.maxArea}
                      onChange={(e) => setFilters({...filters, maxArea: e.target.value})}
                      className="rounded-xl border-primary/10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Amenities</Label>
                <div className="grid grid-cols-3 gap-3">
                  {availableAmenities.map(amenity => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox 
                        id={amenity} 
                        checked={filters.amenities.includes(amenity)}
                        onCheckedChange={() => toggleAmenity(amenity)}
                      />
                      <label htmlFor={amenity} className="text-[10px] uppercase font-bold tracking-tighter cursor-pointer">
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleSearch} 
                className="w-full rounded-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-[10px] h-12 shadow-lg"
              >
                Apply & Search
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Button 
          onClick={handleSearch}
          disabled={loading}
          size="icon"
          className="rounded-full h-14 w-14 bg-[#111111] hover:bg-black text-white shadow-lg transition-all shrink-0"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
        </Button>
      </div>

      {/* Explicit AI Search Button */}
      <div className="flex justify-center">
        <Button 
          type="button"
          onClick={() => handleSearch()}
          disabled={loading}
          variant="outline"
          className="rounded-full px-8 py-6 h-auto border-primary/20 bg-transparent text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-[0.2em] text-[10px] group transition-all"
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-[10px] text-primary font-bold uppercase tracking-[0.4em]">AI Intelligent Filter</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setResult(null)} className="h-6 w-6 rounded-full">
              <X className="w-3 h-3" />
            </Button>
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
            {result.maxPrice && (
              <Badge variant="outline" className="px-4 py-2 rounded-full border-primary/20 text-primary bg-primary/5 font-medium uppercase tracking-widest text-[10px]">
                Up to ${result.maxPrice.toLocaleString()}
              </Badge>
            )}
            {result.amenities && result.amenities.length > 0 && result.amenities.map(a => (
              <Badge key={a} variant="outline" className="px-4 py-2 rounded-full border-primary/20 text-primary bg-primary/5 font-medium uppercase tracking-widest text-[10px]">
                {a}
              </Badge>
            ))}
          </div>

          <p className="mt-8 text-sm text-muted-foreground font-light italic leading-relaxed">
            "Vela Armon AI has refined your request. We've matched your criteria with our exclusive database of {result.propertyType || 'residences'} in {result.location || 'premium postcodes'} to find your ideal legacy property."
          </p>
        </div>
      )}
    </div>
  );
}
