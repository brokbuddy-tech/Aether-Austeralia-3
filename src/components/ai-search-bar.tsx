"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, SlidersHorizontal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export function AISearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "any",
    bedrooms: "any",
    bathrooms: "any",
    parking: "any",
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

    const params = new URLSearchParams();
    const searchTerms = [query.trim(), filters.location.trim(), ...filters.amenities]
      .filter(Boolean)
      .join(" ");

    if (searchTerms) params.set("q", searchTerms);
    if (filters.bedrooms !== "any") params.set("bedrooms", filters.bedrooms);
    if (filters.bathrooms !== "any") params.set("bathrooms", filters.bathrooms);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);

    const destination =
      filters.propertyType === "commercial"
        ? "/commercial"
        : "/buy";

    if (filters.propertyType !== "any" && filters.propertyType !== "commercial") {
      params.set("category", filters.propertyType);
    }

    setOpen(false);
    router.push(`${destination}${params.toString() ? `?${params.toString()}` : ""}`);
    setLoading(false);
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
            <Button variant="ghost" className="rounded-full h-14 w-14 border border-primary text-primary hover:bg-primary hover:text-white transition-all group shrink-0">
              <SlidersHorizontal className="w-6 h-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none rounded-[2.5rem] shadow-2xl bg-transparent">
            <div className="p-8 md:p-10 glass-light backdrop-blur-3xl h-full w-full">
              <DialogHeader className="mb-8">
                <div className="flex items-center justify-between">
                  <DialogTitle className="font-headline font-bold uppercase tracking-[0.3em] text-sm text-primary">Advanced Filters</DialogTitle>
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
                        <SelectItem value="commercial">Commercial</SelectItem>
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
                    <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Parking Spaces</Label>
                    <Select value={filters.parking} onValueChange={(v) => setFilters({...filters, parking: v})}>
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
    </div>
  );
}
