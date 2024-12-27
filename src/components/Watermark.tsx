import { useState, useEffect } from 'react';
import { logoUrl } from '../utils/assets';

const Watermark = () => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Log environment and URL information
    console.log('Watermark debug info:', {
      logoUrl,
      isDev: import.meta.env.DEV,
      baseUrl: import.meta.env.BASE_URL,
      mode: import.meta.env.MODE,
      currentPath: typeof window !== 'undefined' ? window.location.pathname : 'unknown'
    });
  }, []);

  if (imageError) {
    console.warn('Watermark disabled due to image loading error');
    return null;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
      <img 
        src={logoUrl}
        alt="AAA Student Rentals Watermark" 
        className="w-[90%] max-w-2xl object-contain"
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          const target = e.target as HTMLImageElement;
          console.error('Watermark image error:', {
            src: target.src,
            naturalWidth: target.naturalWidth,
            naturalHeight: target.naturalHeight,
            complete: target.complete,
            currentSrc: target.currentSrc,
            error: e
          });
          setImageError(true);
        }}
        onLoad={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          const target = e.target as HTMLImageElement;
          console.log('Watermark loaded successfully:', {
            src: target.src,
            naturalWidth: target.naturalWidth,
            naturalHeight: target.naturalHeight,
            complete: target.complete,
            currentSrc: target.currentSrc
          });
        }}
      />
    </div>
  );
};

export default Watermark;