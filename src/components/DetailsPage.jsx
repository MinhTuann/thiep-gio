import { useEffect } from 'react';

export default function DetailsPage({ onNavigateToRsvp }) {
  useEffect(() => {
    let animationFrameId;
    let isScrolling = true;
    let currentY = 0;
    let resumeTimeoutId;

    const scrollStep = () => {
      if (!isScrolling) return;
      
      currentY += 0.35; // Adjust this value for speed (higher is faster)
      window.scrollTo(0, currentY);

      // Check if we reached the bottom (allow 2px margin of error)
      if (Math.ceil(window.scrollY + window.innerHeight) < document.documentElement.scrollHeight - 2) {
        animationFrameId = requestAnimationFrame(scrollStep);
      }
    };

    const startScroll = () => {
      currentY = window.scrollY;
      isScrolling = true;
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    // Start scrolling after a 1.5-second delay initially
    resumeTimeoutId = setTimeout(startScroll, 1500);

    // Pause scrolling when user interacts, and set a timer to resume it
    const handleUserInteraction = () => {
      isScrolling = false;
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resumeTimeoutId);

      // Resume scrolling after 2 seconds of inactivity
      resumeTimeoutId = setTimeout(startScroll, 2000);
    };

    window.addEventListener('wheel', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    window.addEventListener('touchmove', handleUserInteraction, { passive: true });
    window.addEventListener('mousedown', handleUserInteraction, { passive: true });

    return () => {
      clearTimeout(resumeTimeoutId);
      isScrolling = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('touchmove', handleUserInteraction);
      window.removeEventListener('mousedown', handleUserInteraction);
    };
  }, []);

  return (
    <section className="page-section animate-fade-in" style={{ padding: 0, position: 'relative' }}>
      <img 
        src={`${import.meta.env.BASE_URL}details-page.png`}
        alt="Chi tiết thiệp mời" 
        style={{ width: '100%', height: 'auto', display: 'block' }} 
      />
      {/* Invisible clickable overlay over the image's button */}
      <button 
        onClick={onNavigateToRsvp}
        style={{ 
          position: 'absolute',
          bottom: '15.5%', /* Adjust this percentage so it exactly covers the image button vertically */
          left: '50%',
          transform: 'translateX(-50%)',
          width: '45%', /* Reduced to better fit the button */
          height: '4.5%', /* Reduced to better fit the button */
          backgroundColor: 'rgba(255, 0, 0, 0.0)', /* Change 0.0 to 0.4 to see the clickable area in red for debugging */
          border: 'none',
          cursor: 'pointer',
          zIndex: 10
        }}
        aria-label="Xác nhận tham dự"
      />
    </section>
  );
}
