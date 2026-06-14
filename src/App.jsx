import { useState, useEffect, useRef } from 'react';
import LandingPage from './components/LandingPage';
import DetailsPage from './components/DetailsPage';
import RsvpForm from './components/RsvpForm';
import SuccessModal from './components/SuccessModal';
import Dashboard from './components/Dashboard';

export default function App() {
  const [cardOpened, setCardOpened] = useState(false);
  const [showRsvp, setShowRsvp] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [attendingStatus, setAttendingStatus] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  // Audio state
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/avem-maria.mp3');
    audioRef.current.loop = true;

    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  if (currentPath === '/dashboard') {
    return <Dashboard />;
  }

  const handleOpenCard = () => {
    setCardOpened(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Start playing background music when user interacts
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Auto-play prevented by browser:", e));
    }
  };

  // Transition from Details -> RSVP Form
  const handleNavigateToRsvp = () => {
    setShowRsvp(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Form submission success handler
  const handleSubmitSuccess = (attending) => {
    setAttendingStatus(attending);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {!cardOpened ? (
        <LandingPage onOpenCard={handleOpenCard} />
      ) : !showRsvp ? (
        <DetailsPage onNavigateToRsvp={handleNavigateToRsvp} />
      ) : (
        <>
          {/* RSVP Form Section */}
          <RsvpForm onSubmitSuccess={handleSubmitSuccess} />

          {/* Confirmation Success Modal Popup */}
          <SuccessModal
            isOpen={modalOpen}
            isAttending={attendingStatus}
            onClose={handleCloseModal}
          />
        </>
      )}

      {/* Floating Music Toggle Button - only show after card is opened */}
      {cardOpened && (
        <button
          onClick={toggleAudio}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid rgba(113, 134, 108, 0.3)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            zIndex: 100,
            transition: 'all 0.3s ease'
          }}
          aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
        >
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#71866C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#554670" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          )}
        </button>
      )}
    </>
  );
}
