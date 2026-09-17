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

const StateHeritagePage = () => {
  const { stateId } = useParams();

  const stateData = useMemo(() => {
    return STATE_DATA.find(s => s.id.toLowerCase() === stateId?.toLowerCase());
  }, [stateId]);

  const stateHeritageItems = useMemo(() => {
    if (!stateData) return [];
    const stateNameLower = stateData.name.toLowerCase();
    
    const actualItems = ALL_HERITAGE.filter(item => 
      item.state && item.state.toLowerCase() === stateNameLower
    );

    // If there are less than 25 items, pad with beautiful placeholders to create a full collage
    const targetCount = 25;
    if (actualItems.length < targetCount) {
      const needed = targetCount - actualItems.length;
      const paddedItems = [];
      for (let i = 0; i < needed; i++) {
        const randomImage = realImages[(i * 3 + actualItems.length) % realImages.length];
        paddedItems.push({
          name: `Discover ${stateData.name} #${i + 1}`,
          type: ['Site', 'Culture', 'Festival'][i % 3],
          description: `Explore the magnificent and diverse heritage of ${stateData.name}. Uncover ancient traditions and breathtaking sites.`,
          image: randomImage,
        });
      }
      return [...actualItems, ...paddedItems];
    }
    
    return actualItems;
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
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {stateHeritageItems.map((item, idx) => {
              // Alternate heights to create a pure masonry collage effect
              const heights = ['h-[250px]', 'h-[350px]', 'h-[450px]', 'h-[300px]', 'h-[400px]', 'h-[500px]'];
              // Use a mix based on index to ensure consistent but varied heights
              const heightClass = heights[(idx * 7 + 3) % heights.length];
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * (idx % 15) }}
                  className={`group relative overflow-hidden rounded-xl bg-surface-light border border-primary/10 shadow-lg cursor-pointer break-inside-avoid w-full ${heightClass}`}
                >
                  <img 
                    src={item.image || item.images?.[0] || 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800'} 
                    alt={item.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:sepia-[0.3]"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs md:text-xs font-bold tracking-widest text-primary uppercase mb-2 block drop-shadow-md">
                      {item.type}
                    </span>
                    <h3 className="text-xl md:text-2xl font-cinzel font-semibold text-text-primary mb-2 line-clamp-2 drop-shadow-lg">
                      {item.name}
                    </h3>
                    <p className="text-xs md:text-sm text-text-secondary line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
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
