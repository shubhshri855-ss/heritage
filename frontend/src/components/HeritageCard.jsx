import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Tag, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

const HeritageCard = ({ location, index = 0, onExplore }) => {
  const imageRefs = useRef([]);

  // Use the provided images array, or fallback to the single image duplicated 
  // (so it doesn't break if they only provide a single image string for now)
  const images = location.images && location.images.length > 1 
    ? location.images 
    : [location.image];

  useEffect(() => {
    // Only run animation if we have multiple images
    if (images.length <= 1) return;

    let ctx = gsap.context(() => {
      // Ensure the first image is visible and others are hidden initially
      gsap.set(imageRefs.current.slice(1), { autoAlpha: 0 });
      gsap.set(imageRefs.current[0], { autoAlpha: 1 });

      const tl = gsap.timeline({ repeat: -1 });

      images.forEach((_, i) => {
        const nextIndex = (i + 1) % images.length;
        
        // Crossfade continuously without stopping
        tl.to(imageRefs.current[i], {
          autoAlpha: 0,
          duration: 0.3,
          ease: 'none'
        }, `crossfade${i}`)
        .fromTo(imageRefs.current[nextIndex], 
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.3, ease: 'none' },
          `crossfade${i}`
        );
      });
    });

    return () => ctx.revert();
  }, [images]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex flex-col bg-background rounded-2xl overflow-hidden border border-white/5 hover:border-primary/20 transition-colors duration-300"
    >
      {/* Image Placeholder */}
      <div className="relative h-64 overflow-hidden bg-surface-light">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-20 pointer-events-none" />
        
        {location.sketchfabEmbedUrl ? (
          <div className="w-full h-full relative z-10">
            <iframe 
              title={`${location.name} 3D Model`}
              frameBorder="0" 
              allowFullScreen 
              mozallowfullscreen="true" 
              webkitallowfullscreen="true" 
              allow="autoplay; fullscreen; xr-spatial-tracking"
              src={`${location.sketchfabEmbedUrl}?autostart=1&preload=1&ui_controls=0&ui_infos=0&ui_watermark=0`}
              className="absolute inset-0 w-full h-full"
            ></iframe>
            {/* Invisible overlay to prevent iframe from hijacking scroll/clicks on the card */}
            <div className="absolute inset-0 z-20 bg-transparent cursor-pointer" onClick={() => onExplore(location.id)}></div>
          </div>
        ) : (
          <div className="w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out z-10 relative">
            {/* GSAP Image Slider Container */}
            {images.map((img, i) => (
              <img 
                key={i}
                ref={el => imageRefs.current[i] = el}
                src={img} 
                alt={`${location.name} view ${i + 1}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? 'inherit' : 'hidden' }}
              />
            ))}
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 right-4 z-30 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
          <Tag size={12} className="text-primary" />
          <span className="text-[10px] tracking-widest uppercase font-medium">{location.category}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow relative z-30 -mt-8">
        <h4 className="text-2xl font-cinzel font-semibold text-text-primary mb-4 group-hover:text-primary transition-colors">
          {location.name}
        </h4>
        
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3 text-sm text-text-secondary font-light">
            <MapPin size={16} className="text-primary/70" />
            <span>{location.location}, {location.state}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-text-secondary font-light">
            <Clock size={16} className="text-primary/70" />
            <span>{location.period}</span>
          </div>
        </div>

        {/* Connected Button */}
        <div className="mt-auto pt-4 border-t border-white/5">
          <button 
            onClick={() => onExplore(location.id)}
            className="w-full flex items-center justify-between group/btn text-sm tracking-widest uppercase font-medium text-text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded transition-colors py-2"
            aria-label={`Explore ${location.name} in 3D`}
          >
            <span>Explore in 3D</span>
            <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HeritageCard;
