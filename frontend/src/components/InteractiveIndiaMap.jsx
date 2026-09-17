import React, { useState, useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { geoMercator } from 'd3-geo';
import { X } from 'lucide-react';
import { STATE_DATA } from '../constants/stateData';

// GeoJSON URL for correct Indian official boundaries
const geoUrl = "https://raw.githubusercontent.com/geohacker/india/master/state/india_telengana.geojson";

const InteractiveIndiaMap = () => {
  const [fullscreenState, setFullscreenState] = useState(null);
  const [fullscreenGeo, setFullscreenGeo] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const hoverTimeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (geo) => {
    if (fullscreenGeo) return; // Do nothing if a modal is already open

    const stateName = geo.properties.NAME_1;
    if (!stateName) return;

    const matchedState = STATE_DATA.find(s => 
      s.name.toLowerCase().includes(stateName.toLowerCase()) || 
      stateName.toLowerCase().includes(s.name.toLowerCase())
    );

    setFullscreenGeo(geo);
    if (matchedState) {
      setFullscreenState(matchedState);
    } else {
      setFullscreenState({
        id: stateName,
        name: stateName,
        fact: "Explore the diverse heritage of this beautiful state."
      });
    }
  };

  const closeMapModal = () => {
    setFullscreenGeo(null);
    setFullscreenState(null);
  };

  // Generate a custom projection that perfectly fits the state inside the ComposableMap
  const stateProjection = useMemo(() => {
    if (!fullscreenGeo) return geoMercator();
    
    // Wrap the single feature in a FeatureCollection to ensure D3 calculates bounds correctly
    const geoObject = {
      type: "FeatureCollection",
      features: [fullscreenGeo]
    };
    
    // We use the default ComposableMap viewBox of 800x600.
    // fitExtent fits the GeoJSON into the 800x600 box with 50px padding on all sides.
    return geoMercator().fitExtent([[50, 50], [750, 550]], geoObject);
  }, [fullscreenGeo]);

  const modalStateName = fullscreenGeo ? fullscreenGeo.properties.NAME_1 : '';

  const modalContent = (
    <AnimatePresence>
      {fullscreenGeo && fullscreenState && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-8 bg-background/90 backdrop-blur-xl"
        >
          <div className="relative w-full max-w-6xl h-full max-h-[85vh] bg-background/80 border border-primary/40 rounded-3xl shadow-[0_0_100px_rgba(212,163,115,0.2)] flex flex-col md:flex-row overflow-hidden">
            
            {/* Close Button */}
            <button 
              onClick={closeMapModal}
              className="absolute top-6 right-6 z-20 p-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors border border-primary/30 hover:border-primary"
            >
              <X size={28} />
            </button>

            {/* State Map Area */}
            <div className="w-full md:w-[45%] h-1/2 md:h-full bg-primary/5 flex items-center justify-center p-8 relative">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full scale-75" />
              
              <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
                <ComposableMap
                  projection={stateProjection}
                  className="w-full h-full drop-shadow-[0_20px_50px_rgba(212,163,115,0.3)] z-10"
                >
                  <Geography
                    geography={fullscreenGeo}
                    style={{
                      default: { fill: "rgba(212, 163, 115, 0.4)", outline: "none", stroke: "#d4a373", strokeWidth: 3 },
                      hover: { fill: "rgba(212, 163, 115, 0.6)", outline: "none", stroke: "#d4a373", strokeWidth: 3 },
                      pressed: { fill: "rgba(212, 163, 115, 0.8)", outline: "none" }
                    }}
                  />
                </ComposableMap>
              </div>
            </div>

            {/* State Info Area */}
            <div className="w-full md:w-[55%] h-1/2 md:h-full p-8 md:p-16 flex flex-col justify-center overflow-y-auto custom-scrollbar">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-cinzel font-bold text-primary mb-6"
              >
                {modalStateName}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-24 h-1.5 bg-primary mb-8 rounded-full"
              />

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-text-secondary font-light leading-relaxed mb-10"
              >
                {fullscreenState.fact}
              </motion.p>
              
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4 }}
              >
                <button 
                  onClick={() => {
                    navigate(`/state/${fullscreenState.id}`);
                    closeMapModal();
                  }}
                  className="px-10 py-4 bg-primary/10 hover:bg-primary text-primary hover:text-background border-2 border-primary font-cinzel font-bold text-lg rounded-xl transition-all duration-300"
                >
                  Explore Culture Heritage
                </button>
              </motion.div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      
      {/* 3D Container for the Main India Map */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative w-[500px] h-[550px]"
      >
        <div className="absolute inset-0 bg-primary/5 rounded-3xl border border-primary/20 backdrop-blur-md shadow-[0_0_50px_rgba(212,163,115,0.1)] flex items-center justify-center overflow-hidden p-2 md:p-6">
           <ComposableMap
             projection="geoMercator"
             projectionConfig={{
               scale: 1370, // Reduced scale to prevent the top/bottom borders from clipping
               center: [80.5, 23] // Re-centered to fit perfectly within the viewBox
             }}
             className="w-full h-full opacity-90 drop-shadow-[0_0_5px_#c9a25b]"
           >
             <Geographies geography={geoUrl}>
               {({ geographies }) =>
                 geographies.map((geo) => (
                   <Geography
                     key={geo.rsmKey}
                     geography={geo}
                     onClick={() => handleClick(geo)}
                     onMouseEnter={() => {
                       setTooltipContent(geo.properties.NAME_1);
                     }}
                     onMouseLeave={() => {
                       setTooltipContent("");
                     }}
                     onMouseMove={(e) => {
                       setMousePosition({ x: e.clientX, y: e.clientY });
                     }}
                     style={{
                       default: { fill: "rgba(201, 162, 91, 0.25)", outline: "none", stroke: "#c9a25b", strokeWidth: 1 },
                       hover: { fill: "rgba(201, 162, 91, 0.8)", outline: "none", cursor: "pointer", stroke: "#fdfbf7", strokeWidth: 2 },
                       pressed: { fill: "#c9a25b", outline: "none" }
                     }}
                   />
                 ))
               }
             </Geographies>
           </ComposableMap>
        </div>
      </motion.div>

      {/* Decorative Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Tooltip */}
      {mounted && tooltipContent && createPortal(
        <div 
          className="fixed z-[100000] pointer-events-none px-3 py-1.5 bg-[#1a1a1a] border border-[#d4a373]/50 text-[#fdfbf7] text-sm rounded-md shadow-lg font-medium tracking-wide transition-opacity duration-150"
          style={{
            left: `${mousePosition.x + 15}px`,
            top: `${mousePosition.y + 15}px`
          }}
        >
          {tooltipContent}
        </div>,
        document.body
      )}

      {/* Portal the Modal to the document body so it renders OVER the navbar */}
      {mounted && createPortal(modalContent, document.body)}

    </div>
  );
};

export default InteractiveIndiaMap;
