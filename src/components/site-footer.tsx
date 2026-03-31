import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-[#111111] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="text-2xl font-headline font-extrabold tracking-tighter uppercase mb-6">
            Aether <span className="text-primary">Australia</span>
          </div>
          <p className="text-muted-foreground max-w-sm font-light leading-relaxed">
            Defining the benchmark for Australian real estate excellence through sophisticated design and unparalleled market intelligence.
          </p>
        </div>
        
        <div>
          <h4 className="font-headline font-bold uppercase tracking-widest text-xs mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-muted-foreground font-light">
            <li><Link href="#" className="hover:text-primary transition-colors">Residential Search</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Commercial Portfolio</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Market Reports</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Contact Expert</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold uppercase tracking-widest text-xs mb-6">Compliance</h4>
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed uppercase tracking-wider font-bold">
            All data projections for 2026. <br />
            REIA/REIV Registered Partner. <br />
            © 2024 Aether Australia. <br />
            All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}