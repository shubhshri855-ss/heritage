import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// 30 Verified Google Images (Festivals, Culture, Heritage)
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

// Shuffle images once deterministically so they intermix nicely
const mixImages = () => {
  const all = [...realImages];
  // Deterministic shuffle
  let currentIndex = all.length, randomIndex;
  let seed = 42;
  const random = () => {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  while (currentIndex !== 0) {
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex--;
    [all[currentIndex], all[randomIndex]] = [all[randomIndex], all[currentIndex]];
  }
  return all;
};

const allImages = mixImages();

const CollageBackground = () => {
  return (
    <div className="fixed inset-0 z-[-2] pointer-events-none w-full h-full overflow-hidden bg-[#0a0a0a]">
      {/* Refined Overlays for Premium Editorial Look */}
      {/* Base darkening layer */}
      <div className="absolute inset-0 z-20 bg-background/60" />
      
      {/* Subtle vignette/gradient to blend edges smoothly */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-background via-transparent to-background opacity-80" />
      
      {/* Soft blur just enough to push it to the background without losing image details */}
      <div className="absolute inset-0 z-20 backdrop-blur-[1px]" />
      
      {/* Full screen static grid to show all 30 images at once */}
      <div className="absolute inset-0 w-full h-full grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 p-2 opacity-45 z-10">
        {allImages.map((src, i) => (
          <div key={i} className="w-full h-full relative overflow-hidden rounded-lg shadow-xl">
            <img 
              src={src} 
              alt="" 
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover sepia-[0.3]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollageBackground;
