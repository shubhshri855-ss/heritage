import React, { Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Maximize, Mouse, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AnimatedCounter from '../components/AnimatedCounter';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import FeatureCard from '../components/FeatureCard';
import HeritageCard from '../components/HeritageCard';
import InteractiveIndiaMap from '../components/InteractiveIndiaMap';
import { STATISTICS } from '../constants/data';
import { HERITAGE_SITES } from '../constants/heritageSites';
import { HERITAGE_CULTURE } from '../constants/heritageCulture';
import { HERITAGE_FESTIVALS } from '../constants/heritageFestivals';
import { HERITAGE_LANGUAGES } from '../constants/heritageLanguages';
import { HERITAGE_DRESSES } from '../constants/heritageDresses';
import { HERITAGE_COMMUNITIES } from '../constants/heritageCommunities';

gsap.registerPlugin(ScrollTrigger);

// Lazy loaded heavy 3D components for code splitting
const HeroScene = lazy(() => import('../components/3d/HeroScene'));

const Home = () => {
  const navigate = useNavigate();
  const exploreContainerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const cultureExploreContainerRef = useRef(null);
  const cultureScrollContainerRef = useRef(null);
  const transitionContainerRef = useRef(null);
  const transitionTextRef = useRef(null);
  const transitionText2Ref = useRef(null);
  
  const heritageTransitionContainerRef = useRef(null);
  const heritageTransitionTextRef = useRef(null);
  const heritageTransitionText2Ref = useRef(null);
  
  const festivalExploreContainerRef = useRef(null);
  const festivalScrollContainerRef = useRef(null);
  const festivalTransitionContainerRef = useRef(null);
  const festivalTransitionTextRef = useRef(null);
  const festivalTransitionText2Ref = useRef(null);
  
  const languageExploreContainerRef = useRef(null);
  const languageScrollContainerRef = useRef(null);
  const languageTransitionContainerRef = useRef(null);
  const languageTransitionTextRef = useRef(null);
  const languageTransitionText2Ref = useRef(null);
  
  const dressExploreContainerRef = useRef(null);
  const dressScrollContainerRef = useRef(null);
  const dressTransitionContainerRef = useRef(null);
  const dressTransitionTextRef = useRef(null);
  const dressTransitionText2Ref = useRef(null);
  
  const communityExploreContainerRef = useRef(null);
  const communityScrollContainerRef = useRef(null);
  const communityTransitionContainerRef = useRef(null);
  const communityTransitionTextRef = useRef(null);
  const communityTransitionText2Ref = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop: Pin transitions AND sliders in strict DOM order
    mm.add("(min-width: 768px)", () => {
      // 1. Premium GSAP Transition before Heritage
      if (heritageTransitionContainerRef.current) {
        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: heritageTransitionContainerRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
          }
        });
        tl1.fromTo(heritageTransitionTextRef.current,
          { opacity: 0, scale: 0.8, filter: "blur(10px)", y: 50 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" }
        )
        .fromTo(heritageTransitionText2Ref.current,
          { opacity: 0, scale: 0.8, filter: "blur(10px)", y: 50 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" },
          "<0.5"
        )
        .to([heritageTransitionTextRef.current, heritageTransitionText2Ref.current], 
          { opacity: 0, scale: 1.2, filter: "blur(20px)", duration: 1, ease: "power2.in", stagger: 0.2 },
          ">0.5"
        );
      }

      // 2. Explore Section (Heritage Slider)
      if (exploreContainerRef.current && scrollContainerRef.current) {
        const getScrollAmount1 = () => {
          const scrollWidth = scrollContainerRef.current.scrollWidth;
          const windowWidth = window.innerWidth;
          const offsetLeft = scrollContainerRef.current.offsetLeft || 0;
          const amount = scrollWidth - windowWidth + offsetLeft;
          return amount > 0 ? amount : 0;
        };

        gsap.to(scrollContainerRef.current, {
          x: () => -getScrollAmount1(),
          ease: "none",
          scrollTrigger: {
            trigger: exploreContainerRef.current,
            pin: true,
            scrub: 1, 
            start: "top top",
            end: () => `+=${getScrollAmount1()}`, 
            invalidateOnRefresh: true
          }
        });
      }

      // 3. Premium GSAP Transition between Sections
      if (transitionContainerRef.current) {
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: transitionContainerRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
          }
        });
        tl2.fromTo(transitionTextRef.current,
          { opacity: 0, scale: 0.8, filter: "blur(10px)", y: 50 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" }
        )
        .fromTo(transitionText2Ref.current,
          { opacity: 0, scale: 0.8, filter: "blur(10px)", y: 50 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" },
          "<0.5"
        )
        .to([transitionTextRef.current, transitionText2Ref.current], 
          { opacity: 0, scale: 1.2, filter: "blur(20px)", duration: 1, ease: "power2.in", stagger: 0.2 },
          ">0.5"
        );
      }

      // 4. Explore Culture Section (Culture Slider)
      if (cultureExploreContainerRef.current && cultureScrollContainerRef.current) {
        const getScrollAmount2 = () => {
          const scrollWidth = cultureScrollContainerRef.current.scrollWidth;
          const windowWidth = window.innerWidth;
          const offsetLeft = cultureScrollContainerRef.current.offsetLeft || 0;
          const amount = scrollWidth - windowWidth + offsetLeft;
          return amount > 0 ? amount : 0;
        };

        gsap.to(cultureScrollContainerRef.current, {
          x: () => -getScrollAmount2(),
          ease: "none",
          scrollTrigger: {
            trigger: cultureExploreContainerRef.current,
            pin: true,
            scrub: 1, 
            start: "top top",
            end: () => `+=${getScrollAmount2()}`, 
            invalidateOnRefresh: true
          }
        });
      }

      // 4.5. Transition before Festivals
      if (festivalTransitionContainerRef.current) {
        const tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: festivalTransitionContainerRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
          }
        });
        tl3.fromTo(festivalTransitionTextRef.current,
          { opacity: 0, scale: 0.8, filter: "blur(10px)", y: 50 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" }
        )
        .fromTo(festivalTransitionText2Ref.current,
          { opacity: 0, scale: 0.8, filter: "blur(10px)", y: 50 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" },
          "<0.5"
        )
        .to([festivalTransitionTextRef.current, festivalTransitionText2Ref.current], 
          { opacity: 0, scale: 1.2, filter: "blur(20px)", duration: 1, ease: "power2.in", stagger: 0.2 },
          ">0.5"
        );
      }

      // 5. Explore Festivals
      if (festivalExploreContainerRef.current && festivalScrollContainerRef.current) {
        const getScrollAmount3 = () => {
          const scrollWidth = festivalScrollContainerRef.current.scrollWidth;
          const windowWidth = window.innerWidth;
          const offsetLeft = festivalScrollContainerRef.current.offsetLeft || 0;
          const amount = scrollWidth - windowWidth + offsetLeft;
          return amount > 0 ? amount : 0;
        };

        gsap.to(festivalScrollContainerRef.current, {
          x: () => -getScrollAmount3(),
          ease: "none",
          scrollTrigger: {
            trigger: festivalExploreContainerRef.current,
            pin: true,
            scrub: 1, 
            start: "top top",
            end: () => `+=${getScrollAmount3()}`, 
            invalidateOnRefresh: true
          }
        });
      }

      // 5.5. Transition before Languages
      if (languageTransitionContainerRef.current) {
        const tl4 = gsap.timeline({
          scrollTrigger: {
            trigger: languageTransitionContainerRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
          }
        });
        tl4.fromTo(languageTransitionTextRef.current,
          { opacity: 0, scale: 0.8, filter: "blur(10px)", y: 50 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" }
        )
        .fromTo(languageTransitionText2Ref.current,
          { opacity: 0, scale: 0.8, filter: "blur(10px)", y: 50 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" },
          "<0.5"
        )
        .to([languageTransitionTextRef.current, languageTransitionText2Ref.current], 
          { opacity: 0, scale: 1.2, filter: "blur(20px)", duration: 1, ease: "power2.in", stagger: 0.2 },
          ">0.5"
        );
      }

      // 6. Explore Languages
      if (languageExploreContainerRef.current && languageScrollContainerRef.current) {
        const getScrollAmount4 = () => {
          const scrollWidth = languageScrollContainerRef.current.scrollWidth;
          const windowWidth = window.innerWidth;
          const offsetLeft = languageScrollContainerRef.current.offsetLeft || 0;
          const amount = scrollWidth - windowWidth + offsetLeft;
          return amount > 0 ? amount : 0;
        };

        gsap.to(languageScrollContainerRef.current, {
          x: () => -getScrollAmount4(),
          ease: "none",
          scrollTrigger: {
            trigger: languageExploreContainerRef.current,
            pin: true,
            scrub: 1, 
            start: "top top",
            end: () => `+=${getScrollAmount4()}`, 
            invalidateOnRefresh: true
          }
        });
      }

      // 6.5. Transition before Dresses
      if (dressTransitionContainerRef.current) {
        const tl5 = gsap.timeline({
          scrollTrigger: {
            trigger: dressTransitionContainerRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
          }
        });
        tl5.fromTo(dressTransitionTextRef.current,
          { opacity: 0, scale: 0.8, filter: "blur(10px)", y: 50 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" }
        )
        .fromTo(dressTransitionText2Ref.current,
          { opacity: 0, scale: 0.8, filter: "blur(10px)", y: 50 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" },
          "<0.5"
        )
        .to([dressTransitionTextRef.current, dressTransitionText2Ref.current], 
          { opacity: 0, scale: 1.2, filter: "blur(20px)", duration: 1, ease: "power2.in", stagger: 0.2 },
          ">0.5"
        );
      }

      // 7. Explore Dresses
      if (dressExploreContainerRef.current && dressScrollContainerRef.current) {
        const getScrollAmount5 = () => {
          const scrollWidth = dressScrollContainerRef.current.scrollWidth;
          const windowWidth = window.innerWidth;
          const offsetLeft = dressScrollContainerRef.current.offsetLeft || 0;
          const amount = scrollWidth - windowWidth + offsetLeft;
          return amount > 0 ? amount : 0;
        };

        gsap.to(dressScrollContainerRef.current, {
          x: () => -getScrollAmount5(),
          ease: "none",
          scrollTrigger: {
            trigger: dressExploreContainerRef.current,
            pin: true,
            scrub: 1, 
            start: "top top",
            end: () => `+=${getScrollAmount5()}`, 
            invalidateOnRefresh: true
          }
        });
      }

      // 7.5. Transition before Communities
      if (communityTransitionContainerRef.current) {
        const tl6 = gsap.timeline({
          scrollTrigger: {
            trigger: communityTransitionContainerRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
          }
        });
        tl6.fromTo(communityTransitionTextRef.current,
          { opacity: 0, scale: 0.8, filter: "blur(10px)", y: 50 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" }
        )
        .fromTo(communityTransitionText2Ref.current,
          { opacity: 0, scale: 0.8, filter: "blur(10px)", y: 50 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" },
          "<0.5"
        )
        .to([communityTransitionTextRef.current, communityTransitionText2Ref.current], 
          { opacity: 0, scale: 1.2, filter: "blur(20px)", duration: 1, ease: "power2.in", stagger: 0.2 },
          ">0.5"
        );
      }

      // 8. Explore Communities
      if (communityExploreContainerRef.current && communityScrollContainerRef.current) {
        const getScrollAmount6 = () => {
          const scrollWidth = communityScrollContainerRef.current.scrollWidth;
          const windowWidth = window.innerWidth;
          const offsetLeft = communityScrollContainerRef.current.offsetLeft || 0;
          const amount = scrollWidth - windowWidth + offsetLeft;
          return amount > 0 ? amount : 0;
        };

        gsap.to(communityScrollContainerRef.current, {
          x: () => -getScrollAmount6(),
          ease: "none",
          scrollTrigger: {
            trigger: communityExploreContainerRef.current,
            pin: true,
            scrub: 1, 
            start: "top top",
            end: () => `+=${getScrollAmount6()}`, 
            invalidateOnRefresh: true
          }
        });
      }
    });

    // Mobile: Pin ONLY transitions (sliders are native scroll on mobile)
    mm.add("(max-width: 767px)", () => {
      // 1. Premium GSAP Transition before Heritage
      if (heritageTransitionContainerRef.current) {
        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: heritageTransitionContainerRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
          }
        });
        tl1.fromTo(heritageTransitionTextRef.current,
          { opacity: 0, scale: 0.8, filter: "blur(10px)", y: 50 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" }
        )
        .fromTo(heritageTransitionText2Ref.current,
          { opacity: 0, scale: 0.8, filter: "blur(10px)", y: 50 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" },
          "<0.5"
        )
        .to([heritageTransitionTextRef.current, heritageTransitionText2Ref.current], 
          { opacity: 0, scale: 1.2, filter: "blur(20px)", duration: 1, ease: "power2.in", stagger: 0.2 },
          ">0.5"
        );
      }

      // 3. Premium GSAP Transition between Sections
      if (transitionContainerRef.current) {
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: transitionContainerRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
          }
        });
        tl2.fromTo(transitionTextRef.current,
          { opacity: 0, scale: 0.8, filter: "blur(10px)", y: 50 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" }
        )
        .fromTo(transitionText2Ref.current,
          { opacity: 0, scale: 0.8, filter: "blur(10px)", y: 50 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" },
          "<0.5"
        )
        .to([transitionTextRef.current, transitionText2Ref.current], 
          { opacity: 0, scale: 1.2, filter: "blur(20px)", duration: 1, ease: "power2.in", stagger: 0.2 },
          ">0.5"
        );
      }

      if (festivalTransitionContainerRef.current) {
        const mtl3 = gsap.timeline({
          scrollTrigger: {
            trigger: festivalTransitionContainerRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
          }
        });
        mtl3.fromTo(festivalTransitionTextRef.current,
          { opacity: 0, scale: 0.8, filter: "blur(5px)", y: 20 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" }
        )
        .fromTo(festivalTransitionText2Ref.current,
          { opacity: 0, scale: 0.8, filter: "blur(5px)", y: 20 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" },
          "<0.5"
        )
        .to([festivalTransitionTextRef.current, festivalTransitionText2Ref.current], 
          { opacity: 0, scale: 1.1, filter: "blur(10px)", duration: 1, ease: "power2.in", stagger: 0.2 },
          ">0.5"
        );
      }

      if (languageTransitionContainerRef.current) {
        const mtl4 = gsap.timeline({
          scrollTrigger: {
            trigger: languageTransitionContainerRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
          }
        });
        mtl4.fromTo(languageTransitionTextRef.current,
          { opacity: 0, scale: 0.8, filter: "blur(5px)", y: 20 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" }
        )
        .fromTo(languageTransitionText2Ref.current,
          { opacity: 0, scale: 0.8, filter: "blur(5px)", y: 20 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" },
          "<0.5"
        )
        .to([languageTransitionTextRef.current, languageTransitionText2Ref.current], 
          { opacity: 0, scale: 1.1, filter: "blur(10px)", duration: 1, ease: "power2.in", stagger: 0.2 },
          ">0.5"
        );
      }

      if (dressTransitionContainerRef.current) {
        const mtl5 = gsap.timeline({
          scrollTrigger: {
            trigger: dressTransitionContainerRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
          }
        });
        mtl5.fromTo(dressTransitionTextRef.current,
          { opacity: 0, scale: 0.8, filter: "blur(5px)", y: 20 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" }
        )
        .fromTo(dressTransitionText2Ref.current,
          { opacity: 0, scale: 0.8, filter: "blur(5px)", y: 20 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" },
          "<0.5"
        )
        .to([dressTransitionTextRef.current, dressTransitionText2Ref.current], 
          { opacity: 0, scale: 1.1, filter: "blur(10px)", duration: 1, ease: "power2.in", stagger: 0.2 },
          ">0.5"
        );
      }

      if (communityTransitionContainerRef.current) {
        const mtl6 = gsap.timeline({
          scrollTrigger: {
            trigger: communityTransitionContainerRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
          }
        });
        mtl6.fromTo(communityTransitionTextRef.current,
          { opacity: 0, scale: 0.8, filter: "blur(5px)", y: 20 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" }
        )
        .fromTo(communityTransitionText2Ref.current,
          { opacity: 0, scale: 0.8, filter: "blur(5px)", y: 20 },
          { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out" },
          "<0.5"
        )
        .to([communityTransitionTextRef.current, communityTransitionText2Ref.current], 
          { opacity: 0, scale: 1.1, filter: "blur(10px)", duration: 1, ease: "power2.in", stagger: 0.2 },
          ">0.5"
        );
      }
    });

    return () => mm.revert();
  }, { dependencies: [HERITAGE_SITES.length, HERITAGE_CULTURE.length] });

  return (
    <div className="w-full text-text-primary selection:bg-primary/30 selection:text-primary font-sans overflow-x-hidden">
      

      {/* Hero Content Overlay */}
      <section className="relative z-10 min-h-screen flex items-center pt-32 pb-20 px-4 sm:px-6 lg:px-12 xl:px-24">
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text */}
          <div className="max-w-3xl space-y-8 z-20 mix-blend-difference">
            <motion.div className="overflow-hidden">
              <motion.p 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                className="text-primary font-outfit font-light tracking-[0.4em] uppercase text-xs md:text-sm"
              >
                THE DIGITAL ARCHIVE OF INDIA
              </motion.p>
            </motion.div>
            
            <div className="flex flex-col">
              <motion.div className="overflow-hidden">
                <motion.h2 
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  className="text-6xl md:text-8xl xl:text-[8rem] font-cinzel font-light text-text-primary leading-[0.9] tracking-tighter"
                >
                  Timeless
                </motion.h2>
              </motion.div>
              <motion.div className="overflow-hidden pb-4 md:pb-6">
                <motion.h2 
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="text-6xl md:text-8xl xl:text-[8rem] font-cinzel font-light text-text-primary leading-[0.9] tracking-tighter text-primary/90"
                >
                  Heritage.
                </motion.h2>
              </motion.div>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
              className="text-base md:text-lg text-text-secondary font-outfit font-light max-w-md leading-relaxed tracking-wide mix-blend-normal"
            >
              Step inside India's history through immersive 3D experiences, ancient scripts, and interactive stories beautifully crafted for the digital age.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
              className="pt-6 flex flex-col sm:flex-row items-start gap-4"
            >
              <Button 
                variant="primary" 
                icon={ChevronRight}
                onClick={() => document.getElementById('explore-section').scrollIntoView({ behavior: 'smooth' })}
              >
                EXPLORE HERITAGE
              </Button>


            </motion.div>
          </div>

          {/* Right Column: Interactive Map */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="hidden lg:flex items-center justify-center relative z-20"
          >
            <InteractiveIndiaMap />
          </motion.div>

        </div>
      </section>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary z-10 pointer-events-none"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <Mouse size={20} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
      
      {/* Features Section */}
      <div className="relative z-10 bg-transparent pt-32 pb-16 px-4 sm:px-6 lg:px-12 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="Heritage Should Be Experienced," 
            titleHighlight="Not Just Remembered." 
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-text-secondary font-light leading-relaxed max-w-4xl mb-24 -mt-12"
          >
            Millions of stories, monuments, crafts and traditions define India's identity. VIRASAT 3D transforms this cultural knowledge into immersive digital experiences that anyone can explore.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'IMMERSIVE EXPLORATION', desc: 'Explore historical places through interactive 3D environments.' },
              { num: '02', title: 'ANCIENT KNOWLEDGE', desc: 'Decode and understand historical scripts with AI-powered tools.' },
              { num: '03', title: 'LIVING CRAFTS', desc: 'Preserve traditional craftsmanship through digital documentation.' },
              { num: '04', title: 'LEARN BY PLAYING', desc: 'Discover culture through interactive heritage challenges.' }
            ].map((feature, index) => (
              <FeatureCard 
                key={feature.num} 
                num={feature.num} 
                title={feature.title} 
                desc={feature.desc} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <section className="relative z-10 bg-background/50 border-y border-white/5 py-20 px-4 sm:px-6 lg:px-12 xl:px-24 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/5">
            {STATISTICS.map((stat, index) => (
              <AnimatedCounter 
                key={stat.id}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Premium GSAP Transition before Heritage */}
      <section ref={heritageTransitionContainerRef} className="relative z-10 h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_60%)] opacity-5" />
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          <h2 ref={heritageTransitionTextRef} className="text-5xl md:text-7xl lg:text-[8rem] font-cinzel font-bold text-text-primary text-center tracking-wide leading-none mix-blend-difference">
            A Journey Through Time
          </h2>
          <h2 ref={heritageTransitionText2Ref} className="text-4xl md:text-6xl lg:text-7xl font-cinzel font-light text-primary text-center italic mt-4 mix-blend-difference">
            Discover Our Heritage
          </h2>
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[20vh] bg-primary/20 blur-[120px] pointer-events-none rounded-[100%]" />
      </section>

      {/* Explore Section */}
      <section id="explore-section" ref={exploreContainerRef} className="relative z-10 bg-transparent h-screen flex flex-col justify-center overflow-hidden">
        <div className="pl-4 sm:pl-6 lg:pl-12 xl:pl-24 w-full">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 pr-4 sm:pr-6 lg:pr-12 xl:pr-24 max-w-7xl">
            <SectionHeading 
              subtitle="Digital Archives" 
              title="Explore India's Heritage" 
              className="mb-0"
            />
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-2 md:hidden"
            >
              <button 
                className="p-3 rounded-full border border-white/10 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors text-text-secondary hover:text-text-primary"
                aria-label="Previous locations"
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                className="p-3 rounded-full border border-white/10 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors text-text-secondary hover:text-text-primary"
                aria-label="Next locations"
              >
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </div>

          <div ref={scrollContainerRef} className="flex gap-6 w-max pb-12 pr-12 md:pr-24">
            {HERITAGE_SITES.map((location, index) => (
              <div key={location.id} className="w-[320px] md:w-[450px] lg:w-[500px] shrink-0">
                <HeritageCard 
                  location={location} 
                  index={index} 
                  onExplore={(id) => navigate(`/explore/${id}`)} 
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Premium GSAP Transition Section */}
      <section ref={transitionContainerRef} className="relative z-10 h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_60%)] opacity-5" />
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          <h2 ref={transitionTextRef} className="text-5xl md:text-7xl lg:text-[8rem] font-cinzel font-bold text-text-primary text-center tracking-wide leading-none mix-blend-difference">
            From Stones & Stories
          </h2>
          <h2 ref={transitionText2Ref} className="text-4xl md:text-6xl lg:text-7xl font-cinzel font-light text-primary text-center italic mt-4 mix-blend-difference">
            To Living Traditions
          </h2>
        </div>
        
        {/* Animated Particles/Stars could go here, for now a simple glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[20vh] bg-primary/20 blur-[120px] pointer-events-none rounded-[100%]" />
      </section>

      {/* Explore Culture Section */}
      <section id="culture-explore-section" ref={cultureExploreContainerRef} className="relative z-10 bg-transparent h-screen flex flex-col justify-center overflow-hidden">
        <div className="pl-4 sm:pl-6 lg:pl-12 xl:pl-24 w-full">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 pr-4 sm:pr-6 lg:pr-12 xl:pr-24 max-w-7xl">
            <SectionHeading 
              subtitle="Living Traditions" 
              title="Explore India's Culture" 
              className="mb-0"
            />
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-2 md:hidden"
            >
              <button 
                className="p-3 rounded-full border border-white/10 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors text-text-secondary hover:text-text-primary"
                aria-label="Previous cultures"
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                className="p-3 rounded-full border border-white/10 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors text-text-secondary hover:text-text-primary"
                aria-label="Next cultures"
              >
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </div>

          <div ref={cultureScrollContainerRef} className="flex gap-6 w-max pb-12 pr-12 md:pr-24">
            {HERITAGE_CULTURE.map((location, index) => (
              <div key={location.id} className="w-[320px] md:w-[450px] lg:w-[500px] shrink-0">
                <HeritageCard 
                  location={location} 
                  index={index} 
                  onExplore={(id) => navigate(`/explore/${id}`)} 
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* GSAP Transition before Festivals */}
      <section ref={festivalTransitionContainerRef} className="relative z-10 h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_60%)] opacity-5" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          <h2 ref={festivalTransitionTextRef} className="text-5xl md:text-7xl lg:text-[8rem] font-cinzel font-bold text-text-primary text-center tracking-wide leading-none mix-blend-difference">
            Rhythms of Joy
          </h2>
          <h2 ref={festivalTransitionText2Ref} className="text-4xl md:text-6xl lg:text-7xl font-cinzel font-light text-primary text-center italic mt-4 mix-blend-difference">
            Experience The Celebrations
          </h2>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[20vh] bg-primary/20 blur-[120px] pointer-events-none rounded-[100%]" />
      </section>

      {/* Explore Festivals Section */}
      <section id="festival-explore-section" ref={festivalExploreContainerRef} className="relative z-10 bg-transparent h-screen flex flex-col justify-center overflow-hidden">
        <div className="pl-4 sm:pl-6 lg:pl-12 xl:pl-24 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 pr-4 sm:pr-6 lg:pr-12 xl:pr-24 max-w-7xl">
            <SectionHeading subtitle="Joyous Celebrations" title="Explore India's Festivals" className="mb-0" />
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-2 md:hidden">
              <button className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-text-secondary hover:text-text-primary" aria-label="Previous"><ArrowLeft size={20} /></button>
              <button className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-text-secondary hover:text-text-primary" aria-label="Next"><ChevronRight size={20} /></button>
            </motion.div>
          </div>
          <div ref={festivalScrollContainerRef} className="flex gap-6 w-max pb-12 pr-12 md:pr-24">
            {HERITAGE_FESTIVALS.map((location, index) => (
              <div key={location.id} className="w-[320px] md:w-[450px] lg:w-[500px] shrink-0">
                <HeritageCard location={location} index={index} onExplore={(id) => navigate(`/explore/${id}`)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GSAP Transition before Languages */}
      <section ref={languageTransitionContainerRef} className="relative z-10 h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_60%)] opacity-5" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          <h2 ref={languageTransitionTextRef} className="text-5xl md:text-7xl lg:text-[8rem] font-cinzel font-bold text-text-primary text-center tracking-wide leading-none mix-blend-difference">
            Echoes of the Past
          </h2>
          <h2 ref={languageTransitionText2Ref} className="text-4xl md:text-6xl lg:text-7xl font-cinzel font-light text-primary text-center italic mt-4 mix-blend-difference">
            Voices of Antiquity
          </h2>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[20vh] bg-primary/20 blur-[120px] pointer-events-none rounded-[100%]" />
      </section>

      {/* Explore Languages Section */}
      <section id="language-explore-section" ref={languageExploreContainerRef} className="relative z-10 bg-transparent h-screen flex flex-col justify-center overflow-hidden">
        <div className="pl-4 sm:pl-6 lg:pl-12 xl:pl-24 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 pr-4 sm:pr-6 lg:pr-12 xl:pr-24 max-w-7xl">
            <SectionHeading subtitle="Voices of Antiquity" title="Explore India's Languages" className="mb-0" />
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-2 md:hidden">
              <button className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-text-secondary hover:text-text-primary" aria-label="Previous"><ArrowLeft size={20} /></button>
              <button className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-text-secondary hover:text-text-primary" aria-label="Next"><ChevronRight size={20} /></button>
            </motion.div>
          </div>
          <div ref={languageScrollContainerRef} className="flex gap-6 w-max pb-12 pr-12 md:pr-24">
            {HERITAGE_LANGUAGES.map((location, index) => (
              <div key={location.id} className="w-[320px] md:w-[450px] lg:w-[500px] shrink-0">
                <HeritageCard location={location} index={index} onExplore={(id) => navigate(`/explore/${id}`)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GSAP Transition before Dresses */}
      <section ref={dressTransitionContainerRef} className="relative z-10 h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_60%)] opacity-5" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          <h2 ref={dressTransitionTextRef} className="text-5xl md:text-7xl lg:text-[8rem] font-cinzel font-bold text-text-primary text-center tracking-wide leading-none mix-blend-difference">
            Woven with Pride
          </h2>
          <h2 ref={dressTransitionText2Ref} className="text-4xl md:text-6xl lg:text-7xl font-cinzel font-light text-primary text-center italic mt-4 mix-blend-difference">
            Threads of Tradition
          </h2>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[20vh] bg-primary/20 blur-[120px] pointer-events-none rounded-[100%]" />
      </section>

      {/* Explore Dresses Section */}
      <section id="dress-explore-section" ref={dressExploreContainerRef} className="relative z-10 bg-transparent h-screen flex flex-col justify-center overflow-hidden">
        <div className="pl-4 sm:pl-6 lg:pl-12 xl:pl-24 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 pr-4 sm:pr-6 lg:pr-12 xl:pr-24 max-w-7xl">
            <SectionHeading subtitle="Threads of Tradition" title="Explore India's Dress" className="mb-0" />
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-2 md:hidden">
              <button className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-text-secondary hover:text-text-primary" aria-label="Previous"><ArrowLeft size={20} /></button>
              <button className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-text-secondary hover:text-text-primary" aria-label="Next"><ChevronRight size={20} /></button>
            </motion.div>
          </div>
          <div ref={dressScrollContainerRef} className="flex gap-6 w-max pb-12 pr-12 md:pr-24">
            {HERITAGE_DRESSES.map((location, index) => (
              <div key={location.id} className="w-[320px] md:w-[450px] lg:w-[500px] shrink-0">
                <HeritageCard location={location} index={index} onExplore={(id) => navigate(`/explore/${id}`)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GSAP Transition before Communities */}
      <section ref={communityTransitionContainerRef} className="relative z-10 h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_60%)] opacity-5" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          <h2 ref={communityTransitionTextRef} className="text-5xl md:text-7xl lg:text-[8rem] font-cinzel font-bold text-text-primary text-center tracking-wide leading-none mix-blend-difference">
            Unity in Diversity
          </h2>
          <h2 ref={communityTransitionText2Ref} className="text-4xl md:text-6xl lg:text-7xl font-cinzel font-light text-primary text-center italic mt-4 mix-blend-difference">
            The Social Fabric
          </h2>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[20vh] bg-primary/20 blur-[120px] pointer-events-none rounded-[100%]" />
      </section>

      {/* Explore Communities Section */}
      <section id="community-explore-section" ref={communityExploreContainerRef} className="relative z-10 bg-transparent h-screen flex flex-col justify-center overflow-hidden">
        <div className="pl-4 sm:pl-6 lg:pl-12 xl:pl-24 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 pr-4 sm:pr-6 lg:pr-12 xl:pr-24 max-w-7xl">
            <SectionHeading subtitle="The Social Fabric" title="Explore India's Communities" className="mb-0" />
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-2 md:hidden">
              <button className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-text-secondary hover:text-text-primary" aria-label="Previous"><ArrowLeft size={20} /></button>
              <button className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-text-secondary hover:text-text-primary" aria-label="Next"><ChevronRight size={20} /></button>
            </motion.div>
          </div>
          <div ref={communityScrollContainerRef} className="flex gap-6 w-max pb-12 pr-12 md:pr-24">
            {HERITAGE_COMMUNITIES.map((location, index) => (
              <div key={location.id} className="w-[320px] md:w-[450px] lg:w-[500px] shrink-0">
                <HeritageCard location={location} index={index} onExplore={(id) => navigate(`/explore/${id}`)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cinematic CTA Section */}
      <section className="relative z-10 w-full min-h-[60vh] flex items-center justify-center overflow-hidden py-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-surface)_0%,_var(--color-background)_100%)] opacity-80" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-50" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-primary tracking-[0.3em] uppercase text-sm md:text-base lg:text-lg font-medium"
          >
            Your Journey Begins Here
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-cinzel font-bold text-text-primary leading-tight"
          >
            Step Into The Story.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-text-secondary font-light max-w-3xl mx-auto leading-relaxed"
          >
            India's heritage is not just history. It is a living story waiting to be explored.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button 
              variant="primary" 
              icon={ChevronRight}
              onClick={() => document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-10 py-5"
            >
              EXPLORE HERITAGE
            </Button>

            <Button 
              variant="secondary" 
              icon={ChevronRight}
              className="w-full sm:w-auto px-10 py-5"
              onClick={() => navigate('/crafts')}
            >
              DISCOVER CRAFTS
            </Button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
