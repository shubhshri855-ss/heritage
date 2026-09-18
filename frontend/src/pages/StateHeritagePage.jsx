import React, { useMemo, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STATE_DATA } from '../constants/stateData';
import { HERITAGE_SITES } from '../constants/heritageSites';
import { HERITAGE_CULTURE } from '../constants/heritageCulture';
import { HERITAGE_FESTIVALS } from '../constants/heritageFestivals';
import PageTransition from '../components/PageTransition';
import Button from '../components/Button';

gsap.registerPlugin(ScrollTrigger);


const realImages = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwyK7JAQWIrVTIcUi7vRFoib-mXEIwTcacIG4lxRaW2A&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIpWZkxYPdrpYkdjLdGHaxFxlN_iCXQ4AiSSQPJxesAQ&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRrYdQjvx_WJFORH702tQfeXWKM2WNtvdgCqBV-t5HsQ&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbSAKKT3iiG_4aXXh41L4Tz3ke0vvtr8u1YXL2dcD_lA&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFwngT7ZLrceu-fwyQuRIc5e9OCStsxyfsw7DjG2BgIg&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhxG5rRTcXPDD3ibEvCZT0EfJhTzTTUeaSvumfB_JRQg&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxUd8XKU9tE_-1QKJComlHQ9RVdafgVZ_9ZVOwEiGqFg&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQabUDd3ZjdDPFNhxEDAJP4VVbNBOToEy1ceW3AtT3tjQ&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa5fOzAUV5g-e4rXdeIeEexIY508qiQlj3Sci9lGRnKQ&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpUodK30uucFgpCHABpG9-N16DF9UPlilgkb1CPgsHkA&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR2zaF9CxKS9X90iQnxSwGUpTkFp4hUdCJBe6bJdoMew&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_sc3T_Gke-h_WyUrkJm0kLuTb09-hYaonlQyu84wrbw&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkwnHc_03b0PCWYnNoCKWhZcMx7m-PnLAZ28ZNb_l-sg&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqCRb5gVKtSDSEwmoTUa9mzpj8gcg010T0pErxg3HlAA&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjxHgIxe4PHJTmSjI3mHwGxvw3Sj9l8x4GxThSonQimOZA8YEk1TkGIoM&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ10jgVt1zcdmoqaxIVT48OB0s6E28F1zGXS_vJj0bGvQ&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAabn2V0J8cazii-FM7hUODJ6g68sJZRIMMmJHUSaGgw&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtwphTV41P1rbfjxSGhBlAD1iASZdfKYMvv7zoWjdwUA&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeu6ov62kzx0rD5Js0G-XpSJuOs-WMR-lcAk8Nq5wwig&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpusoAflCY5NPLcnS1I5Z-jsqLBKWlW0X33MlYUYhQNA&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQWf39QDIUw2ONnvJExDM_G38dyUZF8bD1gm_2Qdvjlg&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE9VjL_eCQswbjm1nqb33liUwBzfijqIq1d_CVhw69EA&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG28eY7S4s6B3H94L7tYVTrjjFkQlG4hYDOCie1-onNQ&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSryILtfyqLAtIqm6QOvZJuCRdhrkT0nIidOcU29yrjwg&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNhXVoIZZKnAbOrc-IoTF-R3W-yQ8eGX2-eZTyvTMXVw&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh7t_08heib9n5sUmXleBvIcFgxfOAhn_dUo2Iw8tbXA&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyOk4nIgoy5qDQl9JmaziJDRth0l203Mwicos8AottZw&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo-IPze6JO5Gu_67s4ND1_jaNgmrDc0E5FnXF3Tt5_NQ&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpwypdI2Bssootn__MhlNTx0SenrHxCW1wTBqnsp1j2Q&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMCjSLVolpXnvyjLUVuDQt73dIelyciMfSRHxt7pDe1w&s=10'
];

const ImageSlideshow = ({ images, alt, baseClassName }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (!images || images.length <= 1) return;
    // Randomize the interval slightly so cards don't all transition at the exact same time
    const intervalTime = 3000 + Math.random() * 2000;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalTime);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <>
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`${alt} - view ${i + 1}`}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:sepia-[0.3] ${
            i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />
      ))}
    </>
  );
};

const StateHeritagePage = () => {
  const { stateId } = useParams();

  const stateData = useMemo(() => {
    if (!stateId) return null;
    const decodedId = decodeURIComponent(stateId).toLowerCase();
    return STATE_DATA.find(s => s.id.toLowerCase() === decodedId || s.name.toLowerCase() === decodedId);
  }, [stateId]);

  const stateHeritageItems = useMemo(() => {
    if (!stateData) return [];
    const stateNameLower = stateData.name.toLowerCase();
    
    // Partition by state first, then map type
    const sites = HERITAGE_SITES.filter(item => item.state && item.state.toLowerCase() === stateNameLower).map(item => ({...item, type: 'Site'}));
    const culture = HERITAGE_CULTURE.filter(item => item.state && item.state.toLowerCase() === stateNameLower).map(item => ({...item, type: 'Culture'}));
    const festivals = HERITAGE_FESTIVALS.filter(item => item.state && item.state.toLowerCase() === stateNameLower).map(item => ({...item, type: 'Festival'}));
    
    let actualItems = [...sites, ...culture, ...festivals];

    // Ensure all actual items have at least 3 images for the slideshow
    actualItems = actualItems.map((item, idx) => {
      // Clone the array to avoid mutating the original constants
      let imgs = item.images ? [...item.images] : [];
      if (item.image && !imgs.includes(item.image)) imgs.unshift(item.image);
      if (imgs.length === 0) imgs.push('https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800');
      
      // Pad with generic realImages if they don't have enough to cycle
      while (imgs.length < 3) {
        imgs.push(realImages[(idx * 11 + imgs.length * 7) % realImages.length]);
      }
      return { ...item, images: imgs };
    });

    // If there are less than 25 items, pad with beautiful placeholders to create a full collage
    const targetCount = 25;
    if (actualItems.length < targetCount) {
      const needed = targetCount - actualItems.length;
      const paddedItems = [];
      for (let i = 0; i < needed; i++) {
        // Pick 3-4 random images for the slideshow
        const randomImages = [
          realImages[(i * 3 + actualItems.length) % realImages.length],
          realImages[(i * 5 + actualItems.length + 1) % realImages.length],
          realImages[(i * 7 + actualItems.length + 2) % realImages.length]
        ];
        paddedItems.push({
          name: `Discover ${stateData.name} #${i + 1}`,
          type: ['Site', 'Culture', 'Festival'][i % 3],
          description: `Explore the magnificent and diverse heritage of ${stateData.name}. Uncover ancient traditions and breathtaking sites.`,
          images: randomImages,
        });
      }
      return [...actualItems, ...paddedItems];
    }
    
    return actualItems;
  }, [stateData]);

  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!stateHeritageItems.length) return;
    
    let ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.stacked-card');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom bottom', 
          scrub: 1,
        }
      });
      
      // Animate each item EXCEPT the very last one
      items.forEach((item, i) => {
        if (i < items.length - 1) {
          tl.to(item, {
            yPercent: -150, // Move up out of the view
            opacity: 0,
            scale: 0.85,
            rotation: (i % 2 === 0 ? -5 : 5), // Alternate slight rotation
            ease: 'power1.inOut'
          });
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [stateHeritageItems]);

  if (!stateData) {
    return (
      <PageTransition className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-cinzel text-primary mb-4">State Not Found</h1>
          <Link to="/">
            <Button variant="secondary" icon={ArrowLeft}>Return Home</Button>
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-background relative overflow-visible overflow-x-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-12 xl:px-24">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary)_0%,_transparent_50%)] opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col min-h-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl lg:text-7xl font-cinzel font-bold text-primary mb-4 uppercase tracking-wider"
            >
              {stateData.name}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-text-secondary font-light max-w-2xl"
            >
              Discover the rich culture, majestic sites, and vibrant festivals of {stateData.name}.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/">
              <Button variant="secondary" icon={ArrowLeft} iconAnimation="translate">
                Back to Map
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Heritage Stacked Cards */}
        {stateHeritageItems.length > 0 ? (
          <div 
            ref={wrapperRef} 
            className="w-full relative" 
            style={{ height: `calc(100vh + ${stateHeritageItems.length * 80}vh)` }}
          >
            <div className="sticky top-[15vh] w-full h-[70vh] flex items-center justify-center perspective-[1500px]">
              {stateHeritageItems.map((item, idx) => {
                return (
                  <motion.div
                    key={idx}
                    style={{ zIndex: stateHeritageItems.length - idx }}
                    className={`stacked-card absolute w-[90%] md:w-[800px] h-[450px] md:h-[600px] bg-surface-light border border-primary/20 shadow-2xl rounded-2xl overflow-hidden cursor-pointer group`}
                  >
                    <ImageSlideshow 
                      images={item.images} 
                      alt={item.name} 
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-sm md:text-md font-bold tracking-widest text-primary uppercase mb-2 block drop-shadow-md">
                        {item.type}
                      </span>
                      <h3 className="text-2xl md:text-4xl font-cinzel font-semibold text-text-primary mb-3 drop-shadow-lg leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-sm md:text-lg text-text-secondary line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 rounded-full border border-primary/20 flex items-center justify-center mb-8">
              <div className="w-16 h-16 rounded-full border border-primary/40 flex items-center justify-center animate-pulse">
                <span className="font-cinzel text-primary text-2xl">?</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-cinzel text-text-primary mb-4 text-center">
              Heritage Data Coming Soon
            </h2>
            <p className="text-text-secondary text-center max-w-lg">
              We are currently digitizing the magnificent heritage of {stateData.name}. Please check back later.
            </p>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default StateHeritagePage;
