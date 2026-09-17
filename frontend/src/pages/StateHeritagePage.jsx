import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { STATE_DATA } from '../constants/stateData';
import { HERITAGE_SITES } from '../constants/heritageSites';
import { HERITAGE_CULTURE } from '../constants/heritageCulture';
import { HERITAGE_FESTIVALS } from '../constants/heritageFestivals';
import PageTransition from '../components/PageTransition';
import Button from '../components/Button';

// Combine all heritage data and add a source tag
const ALL_HERITAGE = [
  ...HERITAGE_SITES.map(item => ({ ...item, type: 'Site' })),
  ...HERITAGE_CULTURE.map(item => ({ ...item, type: 'Culture' })),
  ...HERITAGE_FESTIVALS.map(item => ({ ...item, type: 'Festival' })),
];

const StateHeritagePage = () => {
  const { stateId } = useParams();

  const stateData = useMemo(() => {
    return STATE_DATA.find(s => s.id.toLowerCase() === stateId?.toLowerCase());
  }, [stateId]);

  const stateHeritageItems = useMemo(() => {
    if (!stateData) return [];
    const stateNameLower = stateData.name.toLowerCase();
    
    return ALL_HERITAGE.filter(item => 
      item.state && item.state.toLowerCase() === stateNameLower
    );
  }, [stateData]);

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
    <PageTransition className="min-h-screen bg-background relative overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-12 xl:px-24">
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

        {/* Heritage Grid / Collage */}
        {stateHeritageItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
            {stateHeritageItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (idx % 10) }}
                className={`group relative overflow-hidden rounded-2xl bg-surface-light border border-primary/10 shadow-lg cursor-pointer ${
                  idx % 4 === 0 ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'
                }`}
              >
                <img 
                  src={item.image || item.images?.[0] || 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800'} 
                  alt={item.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:sepia-[0.3]"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs md:text-sm font-medium tracking-widest text-primary uppercase mb-2 block">
                    {item.type}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-cinzel font-semibold text-text-primary mb-3 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-sm md:text-base text-text-secondary line-clamp-2 md:line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
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
