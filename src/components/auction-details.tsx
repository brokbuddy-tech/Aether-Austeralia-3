"use client";

import { Gavel, MapPin, Download, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AuctionDetails() {
  return (
    <section className="bg-white rounded-[2.5rem] p-12 border border-primary/5 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700 mt-12">
      <div className="mb-10">
        <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary mb-6">Auction Details</h2>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h3 className="text-3xl md:text-4xl font-headline font-extrabold uppercase leading-tight mb-4">
              Scheduled <br /> <span className="text-primary">Public Auction</span>
            </h3>
            <p className="text-muted-foreground font-light text-lg max-w-md leading-relaxed">
              A unique opportunity to acquire this landmark residence in a transparent, competitive environment governed by REIA standards.
            </p>
          </div>
          <div className="bg-muted/30 p-8 rounded-3xl border border-primary/5 flex flex-col items-center text-center min-w-[200px]">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2 text-center">Auction Date</span>
            <span className="text-2xl font-headline font-extrabold text-foreground">12 APR 2026</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mt-1">11:30 AM AEST</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="flex items-start gap-4 p-6 rounded-2xl bg-[#F9F9F9] border border-[#EDEDED] transition-colors hover:border-primary/20">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">LOCATION</p>
            <p className="text-sm font-bold uppercase tracking-wider">On-Site / 42 Coastal Drive</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-6 rounded-2xl bg-[#F9F9F9] border border-[#EDEDED] transition-colors hover:border-primary/20">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
            <Gavel className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">METHOD</p>
            <p className="text-sm font-bold uppercase tracking-wider">Unconditional Public Sale</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Button className="w-full h-16 bg-[#111111] hover:bg-[#111111]/90 text-white font-bold uppercase tracking-[0.2em] text-[11px] rounded-full shadow-lg group transition-all">
          REGISTER TO BID
          <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
        <div className="flex justify-center">
          <Button variant="link" className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary hover:no-underline flex items-center gap-2 group">
            <Download className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
            Download Auction Documents (PDF)
          </Button>
        </div>
      </div>
    </section>
  );
}
