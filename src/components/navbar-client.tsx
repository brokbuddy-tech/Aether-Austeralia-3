"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { getSiteConfig, hasMeaningfulSiteConfig, type SiteConfig } from "@/lib/public-site";
import { prefixAgencyPath, resolveAgencySlugFromPathname } from "@/lib/agency-routing";

const navLinks = [
  { name: "Buy", href: "/buy" },
  { name: "Rent", href: "/rent" },
  { name: "Sold", href: "/sold" },
  { name: "Commercial", href: "/commercial" },
  { name: "Agents", href: "/agents" },
  { name: "About Us", href: "/about" },
];

interface NavbarClientProps {
  theme?: "dark" | "light";
  initialSiteConfig?: SiteConfig | null;
}

function getDisplayName(siteConfig?: SiteConfig | null) {
  return siteConfig?.branding?.displayName || siteConfig?.organization.name || "Agency Website";
}

function getContactEmail(siteConfig?: SiteConfig | null) {
  return (
    siteConfig?.profile?.contact?.officialEmail ||
    siteConfig?.branding?.publicEmail ||
    siteConfig?.leadAgent?.email ||
    "Email available on request"
  );
}

function getContactPhone(siteConfig?: SiteConfig | null) {
  return (
    siteConfig?.profile?.contact?.primaryPhone ||
    siteConfig?.branding?.publicPhone ||
    siteConfig?.leadAgent?.phone ||
    "Phone available on request"
  );
}

export function NavbarClient({
  theme = "light",
  initialSiteConfig,
}: NavbarClientProps) {
  const pathname = usePathname();
  const agencySlug = resolveAgencySlugFromPathname(pathname);
  const [open, setOpen] = useState(false);
  const [brandName, setBrandName] = useState(() => getDisplayName(initialSiteConfig));
  const [brandLogo, setBrandLogo] = useState<string | null>(initialSiteConfig?.profile?.logo || null);
  const [contactEmail, setContactEmail] = useState(() => getContactEmail(initialSiteConfig));
  const [contactPhone, setContactPhone] = useState(() => getContactPhone(initialSiteConfig));

  const isDark = theme === "dark";

  useEffect(() => {
    setBrandName(getDisplayName(initialSiteConfig));
    setBrandLogo(initialSiteConfig?.profile?.logo || null);
    setContactEmail(getContactEmail(initialSiteConfig));
    setContactPhone(getContactPhone(initialSiteConfig));
  }, [initialSiteConfig]);

  useEffect(() => {
    let active = true;

    async function loadSiteConfig() {
      try {
        const siteConfig = await getSiteConfig(agencySlug);
        if (!active) return;
        if (!hasMeaningfulSiteConfig(siteConfig)) return;
        setBrandName(getDisplayName(siteConfig));
        setBrandLogo(siteConfig.profile?.logo || null);
        setContactEmail(getContactEmail(siteConfig));
        setContactPhone(getContactPhone(siteConfig));
      } catch {
        if (!active) return;
        setBrandName((current) => current || getDisplayName(initialSiteConfig));
        setBrandLogo((current) => current ?? initialSiteConfig?.profile?.logo ?? null);
        setContactEmail((current) => current || getContactEmail(initialSiteConfig));
        setContactPhone((current) => current || getContactPhone(initialSiteConfig));
      }
    }

    void loadSiteConfig();
    return () => {
      active = false;
    };
  }, [agencySlug, initialSiteConfig]);

  return (
    <>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] hidden md:flex items-center gap-12 bg-white/50 backdrop-blur-md px-10 py-4 rounded-full border border-white/40 shadow-sm">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={prefixAgencyPath(link.href, agencySlug)}
            className={cn(
              "text-[10px] uppercase font-bold tracking-[0.3em] hover:text-primary transition-colors",
              pathname === prefixAgencyPath(link.href, agencySlug) || pathname === link.href ? "text-primary" : "text-foreground"
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <header className="absolute top-0 left-0 right-0 z-[90] px-6 py-6 flex justify-between items-center">
        <Link href={prefixAgencyPath("/", agencySlug)} className="flex items-center gap-3 text-xl md:text-2xl font-headline font-extrabold tracking-tighter uppercase pointer-events-auto">
          {brandLogo ? (
            <span className="relative h-11 w-11 overflow-hidden rounded-full border border-white/20 bg-white/90 shadow-lg">
              <Image
                src={brandLogo}
                alt={`${brandName} logo`}
                fill
                className="object-contain p-1.5"
                sizes="44px"
              />
            </span>
          ) : null}
          <span className={cn(isDark ? "text-white" : "text-foreground")}>{brandName}</span>
        </Link>

        <div className="hidden md:block pointer-events-auto">
          <Link href={prefixAgencyPath("/contact", agencySlug)}>
            <Button className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white font-bold h-10 uppercase tracking-[0.2em] text-[10px] shadow-lg">
              Contact Us
            </Button>
          </Link>
        </div>

        <div className="md:hidden pointer-events-auto">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className="rounded-full h-16 w-16 bg-primary text-white shadow-xl hover:bg-primary/90 transition-all border-none flex items-center justify-center"
              >
                <Menu className="w-8 h-8" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-xs p-0 border-none bg-background">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>Access site pages and contact information.</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col h-full pt-20">
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  <nav className="flex flex-col gap-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={prefixAgencyPath(link.href, agencySlug)}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "text-lg uppercase font-bold tracking-[0.2em] transition-colors",
                          pathname === prefixAgencyPath(link.href, agencySlug) || pathname === link.href ? "text-primary" : "text-foreground"
                        )}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>

                  <div className="pt-8 border-t border-primary/5">
                    <Link href={prefixAgencyPath("/contact", agencySlug)} onClick={() => setOpen(false)}>
                      <Button className="w-full rounded-full py-6 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-[0.2em] text-xs h-auto shadow-xl">
                        Contact Us
                      </Button>
                    </Link>
                  </div>

                  <div className="space-y-4 pt-4">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Inquiries</p>
                    <p className="font-light text-sm">{contactEmail}</p>
                    <p className="font-light text-sm">{contactPhone}</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
