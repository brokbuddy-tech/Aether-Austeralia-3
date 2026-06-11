"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getSiteConfig, hasMeaningfulSiteConfig, submitOrgInquiry, type SiteConfig } from "@/lib/public-site";
import { prefixAgencyPath, resolveAgencySlugFromPathname } from "@/lib/agency-routing";

function getDisplayName(siteConfig: SiteConfig | null) {
  return siteConfig?.branding?.displayName || siteConfig?.organization.name || "Agency Website";
}

export function VelaContactPageContent({
  initialSiteConfig = null,
}: {
  initialSiteConfig?: SiteConfig | null;
}) {
  const pathname = usePathname();
  const agencySlug = resolveAgencySlugFromPathname(pathname);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(initialSiteConfig);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    setSiteConfig(initialSiteConfig);
  }, [initialSiteConfig]);

  useEffect(() => {
    let active = true;

    async function load() {
      const nextSiteConfig = await getSiteConfig(agencySlug);
      if (active && hasMeaningfulSiteConfig(nextSiteConfig)) {
        setSiteConfig(nextSiteConfig);
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, [agencySlug]);

  const displayName = getDisplayName(siteConfig);
  const officeEmail =
    siteConfig?.profile?.contact?.officialEmail ||
    siteConfig?.branding?.publicEmail ||
    siteConfig?.leadAgent?.email ||
    "hello@example.com";
  const officePhone =
    siteConfig?.profile?.contact?.primaryPhone ||
    siteConfig?.branding?.publicPhone ||
    siteConfig?.leadAgent?.phone ||
    "Phone available on request";
  const officeAddress = siteConfig?.profile?.officeAddress?.trim() || "Address shared on request";
  const officeTimings = siteConfig?.profile?.officeTimings?.trim() || "Available by appointment";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitFeedback(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    try {
      await submitOrgInquiry({
        name: [firstName, lastName].filter(Boolean).join(" "),
        email: String(formData.get("email") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        message: subject ? `Subject: ${subject}\n\n${message}` : message,
        templateName: "Aether Australia 3",
        formContext: "contact-page",
      }, agencySlug);

      form.reset();
      setSubmitFeedback({
        type: "success",
        message: `Your inquiry has been sent. ${displayName} will respond shortly.`,
      });
    } catch (error) {
      setSubmitFeedback({
        type: "error",
        message: error instanceof Error ? error.message : "Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center py-32 px-6">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/vela-contact-dynamic/1920/1080"
            alt={displayName}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-12">
            <div>
              <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary mb-6">Get in Touch</h2>
              <h1 className="text-5xl md:text-7xl font-headline font-extrabold uppercase leading-[0.9] mb-8">
                Connect with <br /> <span className="text-primary">{displayName}</span>
              </h1>
              <p className="text-lg font-light text-white/70 max-w-md leading-relaxed">
                Public contact data, office timings, and organization branding are synced directly
                from the Broker OS workspace for this agency slug.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-primary">Email Us</p>
                  <p className="font-light">{officeEmail}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-primary">Call Us</p>
                  <p className="font-light">{officePhone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-primary">Location</p>
                  <p className="font-light">{officeAddress}</p>
                  <p className="text-sm font-light text-white/60 mt-1">{officeTimings}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-light p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/20">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">First Name</label>
                  <Input name="firstName" className="rounded-xl border-primary/10 h-12 focus:ring-primary" placeholder="Enter first name" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Last Name</label>
                  <Input name="lastName" className="rounded-xl border-primary/10 h-12 focus:ring-primary" placeholder="Enter last name" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Email Address</label>
                <Input name="email" type="email" className="rounded-xl border-primary/10 h-12 focus:ring-primary" placeholder="email@example.com" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Phone</label>
                <Input name="phone" type="tel" className="rounded-xl border-primary/10 h-12 focus:ring-primary" placeholder="Your phone number" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Subject</label>
                <Input name="subject" className="rounded-xl border-primary/10 h-12 focus:ring-primary" placeholder={`How can ${displayName} help?`} required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Your Message</label>
                <Textarea name="message" className="rounded-xl border-primary/10 min-h-[150px] focus:ring-primary resize-none" placeholder="How can we assist you?" required minLength={10} />
              </div>
              {submitFeedback ? (
                <p
                  className={submitFeedback.type === "success" ? "text-center text-sm font-semibold text-emerald-700" : "text-center text-sm font-semibold text-red-600"}
                  aria-live="polite"
                >
                  {submitFeedback.message}
                </p>
              ) : null}
              <Button type="submit" disabled={isSubmitting} className="w-full rounded-full py-7 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-[0.3em] text-[11px] h-auto shadow-xl transition-all hover:scale-[1.02] disabled:opacity-70">
                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
              </Button>
            </form>

            <div className="mt-8 border-t border-primary/10 pt-6 text-center">
              <Link href={prefixAgencyPath("/agents", agencySlug)}>
                <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white uppercase tracking-[0.3em] text-[10px] font-bold">
                  View active agents
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
