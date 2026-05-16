"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Grid3X3, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";

interface PropertyHeroGalleryProps {
  images: string[];
  title: string;
  location: string;
  price: string | number;
  imageHint?: string;
}

export function PropertyHeroGallery({
  images,
  title,
  location,
  price,
  imageHint,
}: PropertyHeroGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  const previewImages = images.slice(0, 3);
  const remainingImageCount = Math.max(images.length - previewImages.length, 0);
  const activeImage = images[activeIndex] || images[0];

  const openGallery = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <div className="relative aspect-[4/3] md:aspect-[21/9] rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl mb-8">
        <button
          type="button"
          onClick={() => openGallery(0)}
          className="absolute inset-0 h-full w-full text-left cursor-zoom-in"
          aria-label={`Open gallery image 1 of ${images.length}`}
        >
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover"
            priority
            data-ai-hint={imageHint}
          />
          <div className="absolute inset-0 bg-black/20" />
        </button>
        <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 right-6 md:right-12 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 z-10 pointer-events-none">
          <div className="text-white">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-headline font-extrabold uppercase leading-[0.9] mb-4">
              {title}
            </h1>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              <span className="text-[10px] md:text-sm uppercase tracking-widest font-bold">{location}</span>
            </div>
          </div>
          <div className="glass-light p-4 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-2xl border-white/20">
            <p className="text-[8px] md:text-[10px] uppercase font-bold tracking-[0.3em] text-muted-foreground mb-1">
              Valuation
            </p>
            <p className="text-xl md:text-3xl font-headline font-extrabold text-primary">AUD ${price}</p>
          </div>
        </div>
      </div>

      <div className="flex md:grid md:grid-cols-4 gap-4 mb-16 overflow-x-auto no-scrollbar pb-4 md:pb-0">
        {previewImages.map((img, idx) => (
          <button
            key={`${img}-${idx}`}
            type="button"
            onClick={() => openGallery(idx)}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm group cursor-zoom-in flex-none w-[280px] md:w-auto text-left"
            aria-label={`Open gallery image ${idx + 1} of ${images.length}`}
          >
            <Image src={img} alt={`${title} gallery ${idx + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </button>
        ))}
        <button
          type="button"
          onClick={() => openGallery(Math.min(previewImages.length, images.length - 1))}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted flex flex-col items-center justify-center cursor-pointer group border border-dashed border-primary/20 hover:bg-primary/5 transition-colors flex-none w-[280px] md:w-auto"
          aria-label={`Open full gallery with ${images.length} images`}
        >
          <Grid3X3 className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
          {remainingImageCount > 0 && (
            <span className="mb-1 text-xl font-headline font-extrabold text-primary">
              +{remainingImageCount}
            </span>
          )}
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary">View More</span>
        </button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogPortal>
          <DialogOverlay className="bg-black/95 z-[9999]" />
          <DialogContent className="fixed inset-0 z-[10000] flex flex-col items-center justify-center w-screen h-screen max-w-none m-0 p-0 border-none bg-transparent shadow-none !translate-x-0 !translate-y-0 !top-0 !left-0 [&>button:last-child]:hidden">
            <DialogHeader className="sr-only">
              <DialogTitle>{title} gallery</DialogTitle>
              <DialogDescription>
                Fullscreen gallery view for {title}.
              </DialogDescription>
            </DialogHeader>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-6 left-6 text-white bg-black/50 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-black/70 transition-colors z-[101]"
            >
              <ChevronLeft size={20} /> Back to gallery
            </button>

            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-16">
              <div className="relative w-full h-full">
                <Image
                  src={activeImage}
                  alt={`${title} image ${activeIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority={isOpen}
                />
              </div>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev - 1 + images.length) % images.length)}
                    aria-label="Show previous image"
                    className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-colors backdrop-blur-sm z-[101]"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev + 1) % images.length)}
                    aria-label="Show next image"
                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-colors backdrop-blur-sm z-[101]"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}
            </div>

            <div className="absolute bottom-6 right-6 text-white bg-black/50 px-4 py-2 rounded-lg backdrop-blur-md text-sm font-medium z-[101]">
              {activeIndex + 1} / {images.length}
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
}
