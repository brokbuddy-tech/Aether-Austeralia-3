import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property-card";
import { StickyFilterBar } from "@/components/sticky-filter-bar";
import { Navbar } from "@/components/navbar";
import { getListings } from "@/lib/api";

export default async function CommercialPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    bathrooms?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const { properties: commercialProperties, total, page, totalPages } = await getListings({
    propertyType: "COMMERCIAL",
    status: "ACTIVE",
    q: params.q || "",
    category: params.category || "",
    minPrice: params.minPrice || "",
    maxPrice: params.maxPrice || "",
    bedrooms: params.bedrooms || "",
    bathrooms: params.bathrooms || "",
    page: params.page || "1",
    limit: 12,
  });
  const nextPageParams = new URLSearchParams(
    Object.entries({ ...params, page: String(page + 1) })
      .filter(([, value]) => Boolean(value))
      .map(([key, value]) => [key, String(value)])
  );

  return (
    <main className="min-h-screen bg-background">
      <Navbar theme="light" />

      <section className="pt-48 pb-12 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-24 text-center md:text-left">
            <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary mb-6">Strategic Assets</h2>
            <h1 className="text-5xl md:text-8xl font-headline font-extrabold uppercase mb-8 leading-[0.9]">
              Commercial <br /><span className="text-primary">Portfolio.</span>
            </h1>
            <p className="text-xl font-light text-muted-foreground max-w-2xl leading-relaxed mx-auto md:mx-0">
              Strategic industrial, retail, and office opportunities tailored for institutional and private investors across Australia's key markets.
            </p>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
              {total} live commercial listings{params.q ? ` matching "${params.q}"` : ""}
            </p>
          </div>
        </div>
      </section>

      <StickyFilterBar />

      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {commercialProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {commercialProperties.length === 0 && (
            <p className="mt-16 text-center text-sm uppercase tracking-[0.3em] text-muted-foreground">
              No listings matched the current filters.
            </p>
          )}

          <div className="mt-24 flex justify-center">
            {page < totalPages ? (
              <Link href={`/commercial?${nextPageParams.toString()}`}>
                <Button 
                  variant="outline" 
                  className="rounded-full px-16 py-8 h-auto border-primary/20 text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-[0.4em] text-[10px] transition-all shadow-sm hover:shadow-xl active:scale-[0.98]"
                >
                  View More Assets
                </Button>
              </Link>
            ) : (
              <Link href="/agent">
                <Button 
                  variant="outline" 
                  className="rounded-full px-16 py-8 h-auto border-primary/20 text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-[0.4em] text-[10px] transition-all shadow-sm hover:shadow-xl active:scale-[0.98]"
                >
                  Consult an Advisor
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
