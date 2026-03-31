"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  ratio?: number;
  className?: string;
  imageHint?: string;
}

export function ParallaxImage({ src, alt, ratio = 0.15, className, imageHint }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top } = containerRef.current.getBoundingClientRect();
      setOffset(top * ratio);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ratio]);

  if (!src) {
    return <div className={cn("bg-muted", className)} />;
  }

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <div
        className="absolute inset-0 w-full h-[120%] transition-transform duration-75 ease-out"
        style={{ transform: `translateY(${-offset}px)` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
          data-ai-hint={imageHint}
        />
      </div>
    </div>
  );
}
