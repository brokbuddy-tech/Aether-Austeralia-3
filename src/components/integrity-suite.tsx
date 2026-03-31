import { ShieldCheck, TrendingUp, MapPin } from "lucide-react";

export function IntegritySuite() {
  const items = [
    {
      title: "Expert Advice",
      description: "Unparalleled market intelligence and strategic consultancy.",
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    },
    {
      title: "Marketing Excellence",
      description: "High-performance digital strategies that define luxury real estate.",
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
    },
    {
      title: "Local Knowledge",
      description: "Deep-rooted expertise in Australia's most exclusive suburbs.",
      icon: <MapPin className="w-8 h-8 text-primary" />,
    },
  ];

  return (
    <section className="py-24 bg-background px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary mb-4">The Integrity Suite</h2>
          <p className="text-2xl md:text-3xl font-editorial font-light italic max-w-2xl mx-auto">
            "Foundation built on trust, excellence, and localized wisdom."
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full border border-primary/20 flex items-center justify-center mb-8 transition-all duration-500 group-hover:bg-primary/5 group-hover:scale-110">
                {item.icon}
              </div>
              <h3 className="font-headline uppercase tracking-widest text-lg mb-4">{item.title}</h3>
              <p className="text-muted-foreground font-light text-sm leading-relaxed max-w-xs">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}