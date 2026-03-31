
"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function FAQSection() {
  const faqImage = PlaceHolderImages.find((img) => img.id === "faq-image");

  const faqs = [
    {
      question: "How do I schedule a private viewing?",
      answer: "Private viewings can be arranged directly through the listing agent or by contacting our concierge desk. We offer both physical walkthroughs and high-definition virtual tours for our international clientele.",
    },
    {
      question: "What is your process for off-market listings?",
      answer: "A significant portion of our portfolio consists of off-market 'quiet' listings. Registered clients gain exclusive access to these opportunities before they are released to the public domain.",
    },
    {
      question: "Do you provide international relocation services?",
      answer: "Yes, Vela Armon has a dedicated team specializing in international acquisitions and relocation, providing end-to-end support including legal referrals and logistical coordination.",
    },
    {
      question: "What regions of Australia do you cover?",
      answer: "Our expertise is concentrated in Australia's premium postcodes, including Noosa, Byron Bay, Sydney's Eastern Suburbs, Melbourne's Bayside, and the Perth coastal corridor.",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Aesthetic Image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl group">
            {faqImage?.imageUrl && (
              <Image
                src={faqImage.imageUrl}
                alt="Luxury Interior"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                data-ai-hint={faqImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
          </div>

          {/* Right Side: FAQ Content */}
          <div className="space-y-12">
            <div>
              <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary mb-6">Common Inquiries</h2>
              <p className="text-4xl md:text-5xl font-editorial font-light italic leading-tight">
                Guidance for the <br /> sophisticated collector.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-primary/10 py-2">
                  <AccordionTrigger className="text-lg font-headline font-bold uppercase tracking-widest text-left hover:no-underline hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-light text-base leading-relaxed pt-2 pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
