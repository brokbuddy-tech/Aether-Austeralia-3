import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property-card";
import { StickyFilterBar } from "@/components/sticky-filter-bar";
import { Navbar } from "@/components/navbar";
import { getListings } from "@/lib/api";
import { cleanQueryForCategory, matchesTemplateCategory, normalizeCategory } from "@/lib/search-utils";
import { getRequestAgencySlug } from "@/lib/server-agency";

export default async function BuyPage({
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
  const agencySlug = await getRequestAgencySlug();
  const category = normalizeCategory(params.category);
  const searchQuery = cleanQueryForCategory(params.q, category) || "";
  const headingLabel = searchQuery || category || "";
  const listingsResponse = await getListings({
    transactionType: "SALE",
    status: "ACTIVE",
    q: searchQuery,
    minPrice: params.minPrice || "",
    maxPrice: params.maxPrice || "",
    bedrooms: params.bedrooms || "",
    bathrooms: params.bathrooms || "",
    page: category ? "1" : params.page || "1",
    limit: category ? 96 : 12,
  }, agencySlug);
  const properties = listingsResponse.properties.filter((property) => matchesTemplateCategory(property, category));
  const total = category ? properties.length : listingsResponse.total;
  const page = category ? 1 : listingsResponse.page;
  const totalPages = category ? 1 : listingsResponse.totalPages;
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
            <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary mb-6">Premium Acquisitions</h2>
            <h1 className="text-5xl md:text-8xl font-headline font-extrabold uppercase mb-8 leading-[0.9]">
              Find your <br /><span className="text-primary">Sanctuary.</span>
            </h1>
            <p className="text-xl font-light text-muted-foreground max-w-2xl leading-relaxed mx-auto md:mx-0">
              Explore extraordinary residential opportunities curated for the discerning Australian market, where architecture meets lifestyle.
            </p>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
              {total} live buy listings{headingLabel ? ` matching "${headingLabel}"` : ""}
            </p>
          </div>
        </div>
      </section>

      <StickyFilterBar />

      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {properties.length === 0 && (
            <p className="mt-16 text-center text-sm uppercase tracking-[0.3em] text-muted-foreground">
              No listings matched the current filters.
            </p>
          )}

          {page < totalPages && (
            <div className="mt-24 flex justify-center">
              <Link href={`/buy?${nextPageParams.toString()}`}>
                <Button 
                  variant="outline" 
                  className="rounded-full px-16 py-8 h-auto border-primary/20 text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-[0.4em] text-[10px] transition-all shadow-sm hover:shadow-xl active:scale-[0.98]"
                >
                  View More Listings
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
