import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 md:py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
        <div className="col-span-1 sm:col-span-2">
          <div className="text-xl md:text-2xl font-headline font-extrabold tracking-tighter uppercase mb-6">
            Vela <span className="text-white">Armon</span>
          </div>
          <p className="text-primary-foreground/80 max-w-sm font-light leading-relaxed text-sm md:text-base">
            Defining the benchmark for Australian real estate excellence through sophisticated design and unparalleled market intelligence.
          </p>
        </div>
        
        <div>
          <h4 className="font-headline font-bold uppercase tracking-widest text-[10px] md:text-xs mb-6 text-white">Quick Links</h4>
          <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-primary-foreground/70 font-light">
            <li><Link href="/buy" className="hover:text-white transition-colors">Residential Search</Link></li>
            <li><Link href="/commercial" className="hover:text-white transition-colors">Commercial Portfolio</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Market Reports</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Expert</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold uppercase tracking-widest text-[10px] md:text-xs mb-6 text-white">Compliance</h4>
          <p className="text-[9px] md:text-[10px] text-primary-foreground/60 leading-relaxed uppercase tracking-wider font-bold">
            All data projections for 2026. <br />
            REIA/REIV Registered Partner. <br />
            © 2024 Vela Armon. <br />
            All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
