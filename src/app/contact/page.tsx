
"use client";

import Link from "next/link";
import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const contactImg = PlaceHolderImages.find(i => i.id === "contact-bg")?.imageUrl || "";
  const navLinks = [
    { name: 'Buy', href: '/buy' },
    { name: 'Rent', href: '/rent' },
    { name: 'Sold', href: '/sold' },
    { name: 'Commercial', href: '/commercial' },
    { name: 'Agent', href: '/agent' },
    { name: 'About Us', href: '/about' },
  ];

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Navigation Overlay */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] hidden md:flex items-center gap-12 bg-white/50 backdrop-blur-md px-10 py-4 rounded-full border border-white/40 shadow-sm">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            className="text-[10px] uppercase font-bold tracking-[0.3em] hover:text-primary transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="absolute top-0 left-0 right-0 z-[100] px-6 py-6 flex justify-between items-center pointer-events-none">
        <Link href="/" className="text-xl md:text-2xl font-headline font-extrabold tracking-tighter uppercase pointer-events-auto">
          <span className="text-foreground md:text-white">Vela</span> <span className="text-primary">Armon</span>
        </Link>
      </div>

      {/* Hero Section with Background */}
      <section className="relative min-h-screen flex items-center justify-center py-32 px-6">
        <div className="absolute inset-0 z-0">
          <Image 
            src={contactImg}
            alt="Vela Armon Contact"
            fill
            className="object-cover"
            priority
            data-ai-hint="Luxury Reception"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div className="text-white space-y-12">
            <div>
              <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary mb-6">Get in Touch</h2>
              <h1 className="text-5xl md:text-7xl font-headline font-extrabold uppercase leading-[0.9] mb-8">
                Your Next <br /> <span className="text-primary">Legacy</span> Awaits.
              </h1>
              <p className="text-lg font-light text-white/70 max-w-md leading-relaxed">
                Whether you're acquiring a sanctuary or seeking a strategic investment, our advisors provide the market intelligence you need.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-colors group-hover:bg-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-primary">Email Us</p>
                  <p className="font-light">concierge@velaarmon.com.au</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-colors group-hover:bg-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-primary">Call Us</p>
                  <p className="font-light">+61 (02) 8934 2200</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-colors group-hover:bg-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-primary">Location</p>
                  <p className="font-light">Level 42, International Towers, Sydney</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="glass-light p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/20">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">First Name</label>
                  <Input className="rounded-xl border-primary/10 h-12 focus:ring-primary" placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Last Name</label>
                  <Input className="rounded-xl border-primary/10 h-12 focus:ring-primary" placeholder="Enter last name" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Email Address</label>
                <Input type="email" className="rounded-xl border-primary/10 h-12 focus:ring-primary" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Subject</label>
                <Input className="rounded-xl border-primary/10 h-12 focus:ring-primary" placeholder="Nature of inquiry" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Your Message</label>
                <Textarea className="rounded-xl border-primary/10 min-h-[150px] focus:ring-primary resize-none" placeholder="How can we assist you?" />
              </div>
              <Button className="w-full rounded-full py-7 bg-[#111111] hover:bg-black text-white font-bold uppercase tracking-[0.3em] text-[11px] h-auto shadow-xl transition-all hover:scale-[1.02]">
                Submit Inquiry
              </Button>
            </form>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
