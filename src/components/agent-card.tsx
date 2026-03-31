
"use client";

import Image from "next/image";
import { Mail, Phone, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface AgentCardProps {
  name: string;
  role: string;
  imageId: string;
  email: string;
  phone: string;
  bio: string;
}

export function AgentCard({ name, role, imageId, email, phone, bio }: AgentCardProps) {
  const agentImg = PlaceHolderImages.find(i => i.id === imageId);

  return (
    <div className="group bg-white rounded-[2.5rem] overflow-hidden border border-primary/5 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
      <div className="relative aspect-[4/5] overflow-hidden">
        {agentImg?.imageUrl && (
          <Image
            src={agentImg.imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            data-ai-hint={agentImg.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
      </div>
      
      <div className="p-8 flex flex-col flex-1">
        <div className="mb-6">
          <h3 className="text-xl font-headline font-bold uppercase tracking-wider text-foreground">{name}</h3>
          <p className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] mt-1">{role}</p>
        </div>
        
        <p className="text-muted-foreground font-light text-sm leading-relaxed mb-8 flex-1">
          {bio}
        </p>
        
        <div className="space-y-4 pt-6 border-t border-primary/5">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1 rounded-full border-primary/10 hover:bg-primary hover:text-white hover:border-primary text-[10px] uppercase font-bold tracking-widest h-11 transition-all"
              onClick={() => window.location.href = `mailto:${email}`}
            >
              <Mail className="w-3.5 h-3.5 mr-2" />
              Email
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 rounded-full border-primary/10 hover:bg-primary hover:text-white hover:border-primary text-[10px] uppercase font-bold tracking-widest h-11 transition-all"
              onClick={() => window.location.href = `tel:${phone}`}
            >
              <Phone className="w-3.5 h-3.5 mr-2" />
              Call
            </Button>
          </div>
          <Button 
            variant="ghost" 
            className="w-full rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5 text-[10px] uppercase font-bold tracking-widest h-11"
          >
            <Linkedin className="w-3.5 h-3.5 mr-2" />
            LinkedIn Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
