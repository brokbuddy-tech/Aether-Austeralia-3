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

export function StickyFilterBar() {
  const [filters, setFilters] = useState({
    location: "",
    price: "Any Price",
    type: "House",
    beds: "3+",
    bath: "Any",
  });

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
    <div className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#EDEDED] py-6 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
        <div className="flex flex-wrap items-end gap-6 lg:gap-8 w-full lg:w-auto">
          <FilterSegment 
            label="LOCATION" 
            value={filters.location} 
            onSelect={(v) => setFilters(f => ({ ...f, location: v }))}
            className="flex-1 lg:flex-none lg:w-[240px]"
          />
          <FilterSegment 
            label="PRICE (AUD)" 
            value={filters.price} 
            options={["Any Price", "$500k - $1M", "$1M - $3M", "$3M - $5M", "$5M+"]}
            onSelect={(v) => setFilters(f => ({ ...f, price: v }))}
          />
          <FilterSegment 
            label="TYPE" 
            value={filters.type} 
            options={["House", "Apartment", "Townhouse", "Land"]}
            onSelect={(v) => setFilters(f => ({ ...f, type: v }))}
          />
          <FilterSegment 
            label="BEDS" 
            value={filters.beds} 
            options={["Any", "1+", "2+", "3+", "4+", "5+"]}
            onSelect={(v) => setFilters(f => ({ ...f, beds: v }))}
          />
          <FilterSegment 
            label="BATH" 
            value={filters.bath} 
            options={["Any", "1+", "2+", "3+", "4+"]}
            onSelect={(v) => setFilters(f => ({ ...f, bath: v }))}
          />
        </div>

        <div className="flex items-center gap-4 w-full lg:w-auto">
          <Button 
            variant="outline" 
            className="flex-1 lg:flex-none rounded-full border-[#D1D5DB] text-[#111111] font-bold uppercase tracking-[0.2em] text-[10px] h-11 px-8 hover:bg-white hover:border-primary hover:text-primary transition-all flex items-center gap-3 group"
          >
            <SlidersHorizontal className="w-4 h-4 transition-transform group-hover:rotate-12" />
            More Filters
          </Button>
          <Button className="rounded-full h-11 w-11 lg:w-auto lg:px-8 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg">
            <Search className="w-4 h-4 lg:hidden" />
            <span className="hidden lg:inline">Search</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
