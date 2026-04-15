import { ShieldCheck, TrendingUp, MapPin } from "lucide-react";

export function IntegritySuite() {
  const items = [
    {
      title: "Expert Advice",
      description: "Unparalleled market intelligence and strategic consultancy.",
      icon: ShieldCheck,
    },
    {
      title: "Marketing Excellence",
      description: "High-performance digital strategies that define luxury real estate.",
      icon: TrendingUp,
    },
    {
      title: "Local Knowledge",
      description: "Deep-rooted expertise in Australia's most exclusive suburbs.",
      icon: MapPin,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[10px] md:text-[12px] font-bold tracking-[0.5em] uppercase text-primary mb-4">The Integrity Suite</h2>
          <p className="text-xl md:text-3xl font-editorial font-light italic max-w-2xl mx-auto leading-tight">
            "Foundation built on trust, excellence, and localized wisdom."
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="flex flex-col items-center text-center p-8 md:p-10 rounded-[2rem] glass-light border border-primary/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 md:mb-8 transition-all duration-500 group-hover:bg-primary group-hover:rotate-[10deg]">
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary transition-colors duration-500 group-hover:text-white" />
                </div>
                <h3 className="font-headline uppercase tracking-widest text-base md:text-lg mb-4 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground font-light text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
