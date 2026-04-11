
"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export function StickyFilterBar() {
  const [filters, setFilters] = useState({
    location: "",
    price: "Any Price",
    type: "House",
    beds: "3+",
    bath: "Any",
    parking: "any",
    minPrice: "",
    maxPrice: "",
    amenities: [] as string[]
  });

  const [open, setOpen] = useState(false);

  const toggleAmenity = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const availableAmenities = ["Pool", "Gym", "Garage", "Garden", "Ocean View", "Air Con"];

  const FilterSegment = ({ 
    label, 
    value, 
    options, 
    onSelect, 
    className 
  }: { 
    label: string; 
    value: string; 
    options?: string[]; 
    onSelect?: (val: string) => void;
    className?: string;
  }) => (
    <div className={cn("flex flex-col gap-2 min-w-[120px]", className)}>
      <span className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] font-headline">
        {label}
      </span>
      {options ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-between bg-[#F3F4F6] h-11 px-4 rounded-sm text-sm font-body text-[#111111] transition-all hover:bg-[#E5E7EB] group">
              <span className="truncate">{value}</span>
              <ChevronDown className="w-4 h-4 ml-2 text-[#9CA3AF] transition-transform group-data-[state=open]:rotate-180" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px] rounded-xl border-[#EDEDED] shadow-2xl">
            {options.map((opt) => (
              <DropdownMenuItem 
                key={opt} 
                onClick={() => onSelect?.(opt)}
                className="text-sm font-body py-3 cursor-pointer focus:bg-primary/5 focus:text-primary"
              >
                {opt}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="relative">
          <input
            type="text"
            placeholder="Sydney, NSW"
            className="w-full bg-[#F3F4F6] h-11 px-4 rounded-sm text-sm font-body text-[#111111] border-none focus:ring-1 focus:ring-primary/20 placeholder:text-[#9CA3AF]"
            value={value}
            onChange={(e) => onSelect?.(e.target.value)}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="relative w-full bg-white border-b border-[#EDEDED] py-6 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
        <div className="flex flex-nowrap items-end gap-6 lg:gap-8 w-full lg:w-auto overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
          <FilterSegment 
            label="LOCATION" 
            value={filters.location} 
            onSelect={(v) => setFilters(f => ({ ...f, location: v }))}
            className="flex-none w-[200px] lg:w-[240px]"
          />
          <FilterSegment 
            label="PRICE (AUD)" 
            value={filters.price} 
            options={["Any Price", "$500k - $1M", "$1M - $3M", "$3M - $5M", "$5M+"]}
            onSelect={(v) => setFilters(f => ({ ...f, price: v }))}
            className="flex-none"
          />
          <FilterSegment 
            label="TYPE" 
            value={filters.type} 
            options={["House", "Apartment", "Townhouse", "Land"]}
            onSelect={(v) => setFilters(f => ({ ...f, type: v }))}
            className="flex-none"
          />
          <FilterSegment 
            label="BEDS" 
            value={filters.beds} 
            options={["Any", "1+", "2+", "3+", "4+", "5+"]}
            onSelect={(v) => setFilters(f => ({ ...f, beds: v }))}
            className="flex-none"
          />
          <FilterSegment 
            label="BATH" 
            value={filters.bath} 
            options={["Any", "1+", "2+", "3+", "4+"]}
            onSelect={(v) => setFilters(f => ({ ...f, bath: v }))}
            className="flex-none"
          />
        </div>

        <div className="flex items-center gap-4 w-full lg:w-auto shrink-0">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="flex-1 lg:flex-none rounded-full border-[#D1D5DB] text-[#111111] font-bold uppercase tracking-[0.2em] text-[10px] h-11 px-8 hover:bg-white hover:border-primary hover:text-primary transition-all flex items-center gap-3 group"
              >
                <SlidersHorizontal className="w-4 h-4 transition-transform group-hover:rotate-12" />
                More Filters
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
                      <Select value={filters.type.toLowerCase()} onValueChange={(v) => setFilters({...filters, type: v})}>
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
                      <Select value={filters.beds} onValueChange={(v) => setFilters({...filters, beds: v})}>
                        <SelectTrigger className="rounded-xl border-primary/10 h-11 bg-white/50">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Any">Any</SelectItem>
                          <SelectItem value="1+">1+</SelectItem>
                          <SelectItem value="2+">2+</SelectItem>
                          <SelectItem value="3+">3+</SelectItem>
                          <SelectItem value="4+">4+</SelectItem>
                          <SelectItem value="5+">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Bathrooms</Label>
                      <Select value={filters.bath} onValueChange={(v) => setFilters({...filters, bath: v})}>
                        <SelectTrigger className="rounded-xl border-primary/10 h-11 bg-white/50">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Any">Any</SelectItem>
                          <SelectItem value="1+">1+</SelectItem>
                          <SelectItem value="2+">2+</SelectItem>
                          <SelectItem value="3+">3+</SelectItem>
                          <SelectItem value="4+">4+</SelectItem>
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
                      onClick={() => setOpen(false)} 
                      className="w-full rounded-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-[0.3em] text-[10px] h-14 shadow-xl transition-all active:scale-[0.98]"
                    >
                      Show Results
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button className="rounded-full h-11 w-11 lg:w-auto lg:px-8 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg">
            <Search className="w-4 h-4 lg:hidden" />
            <span className="hidden lg:inline">Search</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
