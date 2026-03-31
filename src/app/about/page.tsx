
import Link from "next/link";
import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const navLinks = [
    { name: 'Buy', href: '/buy' },
    { name: 'Rent', href: '/rent' },
    { name: 'Sold', href: '/sold' },
    { name: 'Commercial', href: '/commercial' },
    { name: 'Agent', href: '/agent' },
    { name: 'About Us', href: '/about' },
  ];

  const team = [
    {
      name: "Sarah West",
      role: "Founder & CEO",
      bio: "With over 20 years in luxury real estate, Sarah has redefined the standard of premium acquisitions in the Australian market.",
      imageId: "team-1"
    },
    {
      name: "Julian Vance",
      role: "Director of Luxury Estates",
      bio: "Julian specializes in off-market transactions for high-net-worth individuals, bridging the gap between desire and exclusivity.",
      imageId: "team-2"
    },
    {
      name: "Emma Clarke",
      role: "Head of Residential",
      bio: "Emma brings a keen eye for architectural design and community integration, ensuring every residence is a true sanctuary.",
      imageId: "team-3"
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Persistent Navigation */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] hidden md:flex items-center gap-12 bg-white/50 backdrop-blur-md px-10 py-4 rounded-full border border-white/40 shadow-sm">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            className={`text-[10px] uppercase font-bold tracking-[0.3em] hover:text-primary transition-colors ${link.name === 'About Us' ? 'text-primary' : ''}`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Logo Branding - Absolute but z-indexed */}
      <div className="absolute top-0 left-0 right-0 z-[90] px-6 py-6 flex justify-between items-center pointer-events-none">
        <Link href="/" className="text-xl md:text-2xl font-headline font-extrabold tracking-tighter uppercase pointer-events-auto">
          <span className="text-white">Vela</span> <span className="text-primary">Armon</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative pt-64 pb-48 px-6 min-h-[80vh] flex items-center overflow-hidden">
        <Image 
           src={PlaceHolderImages.find(i => i.id === "hero-home")?.imageUrl || ""}
           alt="Vela Armon Hero"
           fill
           className="object-cover"
           priority
           data-ai-hint="Luxury Estate"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto z-10">
          <h1 className="text-6xl md:text-8xl font-headline font-extrabold uppercase mb-8 leading-[0.9] text-white">
            The <span className="text-primary">Legacy</span> <br /> of Excellence.
          </h1>
          <p className="text-xl font-light text-white/80 max-w-2xl mb-16 leading-relaxed">
            Vela Armon is Australia's premier real estate consultancy, dedicated to the curation of extraordinary residential and commercial opportunities.
          </p>
        </div>
      </section>

      {/* Company History / Mission */}
      <section className="py-24 bg-muted/30 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary">Our Story</h2>
            <p className="text-4xl md:text-5xl font-editorial font-light italic leading-tight">
              "We believe architecture is more than just structure; it's a profound expression of living."
            </p>
            <div className="space-y-6 text-muted-foreground font-light text-lg leading-relaxed">
              <p>
                Founded in the heart of Noosa, Vela Armon began with a singular vision: to treat real estate as a fine art. We realized that the most discerning clients aren't just looking for houses; they are looking for legacies.
              </p>
              <p>
                Today, our influence spans across Australia's most coveted postcodes, from the coastal grandeur of Byron Bay to the urban sophistication of Sydney Harbour. Our team of expert advisors provides unparalleled market intelligence, ensuring every transaction is as seamless as it is significant.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
             <Image 
               src={PlaceHolderImages.find(i => i.id === "listing-1")?.imageUrl || ""}
               alt="Vela Armon Heritage"
               fill
               className="object-cover"
               data-ai-hint="Luxury Modern Mansion"
             />
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary mb-6">The Visionaries</h2>
            <p className="text-3xl md:text-5xl font-editorial font-light italic">The experts behind the excellence.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, idx) => (
              <div key={idx} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-8 bg-muted">
                  <Image 
                    src={PlaceHolderImages.find(i => i.id === member.imageId)?.imageUrl || ""}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    data-ai-hint={PlaceHolderImages.find(i => i.id === member.imageId)?.imageHint}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                  <div className="absolute bottom-6 left-6 right-6 p-6 glass-light rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-headline font-bold uppercase tracking-widest text-lg">{member.name}</h3>
                    <p className="text-primary font-bold text-xs uppercase tracking-widest mt-1">{member.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground font-light leading-relaxed text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/50">
        <div className="max-w-7xl mx-auto py-24">
          <div className="text-center mb-12">
            <h2 className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary">Voices of Confidence</h2>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-headline font-extrabold uppercase leading-[1.1]">Ready to secure <br /> <span className="text-primary">your legacy?</span></h2>
          <p className="text-muted-foreground text-lg font-light">Join the most exclusive real estate network in Australia.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
            <Button className="rounded-full px-12 py-6 bg-primary hover:bg-primary/90 text-white font-bold h-auto uppercase tracking-widest text-xs">Consult an Advisor</Button>
            <Button variant="outline" className="rounded-full px-12 py-6 border-primary/20 hover:bg-primary/5 text-primary font-bold h-auto uppercase tracking-widest text-xs">View Listings</Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
