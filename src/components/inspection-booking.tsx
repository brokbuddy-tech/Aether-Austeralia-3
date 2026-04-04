"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

const TIME_SLOTS = [
  "09:00 AM", "09:15 AM", "09:30 AM", "09:45 AM",
  "10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM",
  "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM",
  "01:00 PM", "01:15 PM", "01:30 PM", "01:45 PM",
  "02:00 PM", "02:15 PM", "02:30 PM", "02:45 PM",
  "03:00 PM", "03:15 PM", "03:30 PM", "03:45 PM",
  "04:00 PM", "04:15 PM", "04:30 PM", "04:45 PM",
];

export function InspectionBooking() {
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { toast } = useToast();

  const handleRequestBooking = () => {
    if (!date || !selectedTime) return;

    toast({
      title: "Request Sent",
      description: `Your private viewing for ${format(date, "PPP")} at ${selectedTime} has been requested.`,
    });
  };

  return (
    <section className="bg-[#F9F9F9] rounded-[2.5rem] p-12 border border-[#EDEDED] shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12">
        <h2 className="text-2xl font-headline font-extrabold text-[#111111] uppercase tracking-tight mb-2">
          Book an Inspection
        </h2>
        <p className="text-[#6B7280] font-body font-light text-base">
          Select a 15-minute private viewing slot that works for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* Left Column: Date Selection */}
        <div className="space-y-4">
          <label className="text-[12px] font-bold uppercase tracking-widest text-[#6B7280]">
            SELECT DATE
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal h-14 rounded-xl border-[#E5E7EB] bg-white hover:bg-white hover:border-[#111111] transition-all px-6",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-3 h-4 w-4 text-[#111111]" />
                {date ? format(date, "PPP") : <span className="text-sm font-light">Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-2xl border-none shadow-2xl bg-white/90 backdrop-blur-xl" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="p-4"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Right Column: Slot Selection */}
        <div className="space-y-4">
          <label className="text-[12px] font-bold uppercase tracking-widest text-[#6B7280]">
            AVAILABLE SLOTS
          </label>
          <ScrollArea className="h-[180px] pr-4">
            <div className="grid grid-cols-2 gap-3">
              {TIME_SLOTS.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={cn(
                    "flex items-center gap-2 h-12 px-4 rounded-xl border border-[#EDEDED] text-xs font-medium transition-all duration-300",
                    selectedTime === time
                      ? "bg-[#111111] text-white border-[#111111]"
                      : "bg-[#F3F4F6] text-[#6B7280] hover:border-[#111111] hover:bg-white"
                  )}
                >
                  <Clock className={cn("w-3.5 h-3.5", selectedTime === time ? "text-white" : "text-[#111111]")} />
                  {time}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="space-y-4">
        <Button
          onClick={handleRequestBooking}
          disabled={!date || !selectedTime}
          className="w-full h-16 bg-[#111111] hover:bg-[#111111]/90 text-white font-bold uppercase tracking-[0.2em] text-[11px] rounded-full shadow-lg group transition-all"
        >
          REQUEST PRIVATE VIEWING
          <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
        <p className="text-[10px] text-center text-[#9CA3AF] uppercase tracking-widest font-bold">
          <a href="#" className="hover:text-[#111111] transition-colors">Privacy Policy</a> regarding lead data collection.
        </p>
      </div>
    </section>
  );
}
