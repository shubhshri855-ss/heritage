import React, { Suspense, lazy, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, MapPin, Clock } from 'lucide-react';
import Button from '../components/Button';
import LoadingScreen from '../components/LoadingScreen';
import PageTransition from '../components/PageTransition';
import { HERITAGE_SITES } from '../constants/heritageSites';
import { HERITAGE_CULTURE } from '../constants/heritageCulture';

const HeritageScene = lazy(() => import('../components/3d/HeritageScene'));

const Explore = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const location = HERITAGE_SITES.find(l => l.id === id) || HERITAGE_CULTURE.find(l => l.id === id);

  return (
    <PageTransition className="flex-1 bg-transparent text-text-primary font-sans flex flex-col min-h-screen relative overflow-hidden pt-24 lg:pt-32">
      {/* Abstract dark background pattern - reduced opacity so the main background is visible */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-surface)_0%,_var(--color-background)_100%)] opacity-30" />
      
      <div className="relative z-10 w-full flex-1 flex flex-col md:flex-row">
        
        {/* Left Side: 3D Scene */}
        <div className="flex-1 relative flex flex-col">
          <div className="absolute top-24 left-4 md:top-28 md:left-6 z-50">
            <Button 
              variant="secondary"
              icon={ArrowLeft}
              iconAnimation="translate"
              onClick={() => navigate('/')}
              className="bg-background/50 backdrop-blur-md hover:bg-white/10"
            >
              Return to Hub
            </Button>
          </div>
          
          <Suspense fallback={<LoadingScreen title={location?.name} />}>
            <div className="flex-1 relative w-full h-full flex">
              {location?.sketchfabEmbedUrl ? (
                <iframe 
                  title={`${location.name} 3D Model`}
                  frameBorder="0" 
                  allowFullScreen 
                  mozallowfullscreen="true" 
                  webkitallowfullscreen="true" 
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  src={location.sketchfabEmbedUrl}
                  className="w-full h-full"
                ></iframe>
              ) : (
                <HeritageScene monumentId={id} />
              )}
            </div>
          </Suspense>
        </div>

        {/* Right Side: Details Panel */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-surface/80 backdrop-blur-lg border-l border-white/5 flex flex-col gap-6 scrollbar-hide">

          <div className="space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] tracking-widest uppercase font-medium">
              {location?.category}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-text-primary leading-tight">
              {location?.name}
            </h1>
            
            <div className="flex flex-col gap-2 pt-2 text-sm text-text-secondary font-light">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary/70" />
                <span>{location?.location}, {location?.state}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-primary/70" />
                <span>{location?.period}</span>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-white/10 my-2" />

          <div className="prose prose-invert prose-p:text-text-secondary prose-p:font-light prose-p:leading-relaxed">
            <p>
              {location?.fullDescription || location?.description}
            </p>
          </div>

          {location?.wikipediaUrl && (
            <div className="mt-8 pt-6 border-t border-white/5">
              <a 
                href={location.wikipediaUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm tracking-widest uppercase font-medium text-text-secondary hover:text-primary transition-colors group"
              >
                <span>Read Full Article on Wikipedia</span>
                <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          )}

        </div>
      </div>
    </PageTransition>
  );
};

export default Explore;
