import { useEffect, useRef } from 'react';
import { HolyDove } from './FloralDecorations';

// Initialize the invokers polyfill if necessary (dynamic load on client side)
if (typeof window !== 'undefined' && !('commandForElement' in HTMLButtonElement.prototype)) {
  import('invokers-polyfill').catch(err => console.error("Failed to load invokers polyfill", err));
}

export default function SuccessModal({ isOpen, isAttending, onClose }) {
  const dialogRef = useRef(null);

  // Sync React state with native Dialog open/close methods
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      // Prevents double showModal calling errors
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Handle Close event from browser (e.g. Esc key pressed)
  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
  };

  // Fallback backdrop click (light dismiss) for Safari or older browsers that do not support closedby="any"
  const handleBackdropClick = (event) => {
    const dialog = dialogRef.current;
    if (!dialog || event.target !== dialog) return;

    // Check if click was outside dialog content box (on the backdrop)
    const rect = dialog.getBoundingClientRect();
    const isDialogContent = (
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width
    );

    if (!isDialogContent) {
      onClose();
    }
  };

  return (
    <dialog 
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      // Modern standard attribute for light-dismiss (Esc + backdrop click + mobile dismiss gestures)
      closedby="any"
    >
      <div 
        className="modal-card" 
        style={{ 
          backgroundColor: '#FFFFFF', 
          borderRadius: '32px', 
          padding: '40px 24px', 
          textAlign: 'center', 
          position: 'relative',
          maxWidth: '400px',
          margin: '0 auto'
        }}
      >
        {/* Close Button 'X' */}
        <button 
          onClick={onClose}
          aria-label="Đóng"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#F0F4F8',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            color: '#16172B',
            fontSize: '20px',
            padding: 0
          }}
        >
          ✕
        </button>

        {/* Holy Dove Icon container */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px', marginTop: '16px' }}>
          <img 
            src="/success-modal.png" 
            alt="Dove" 
            style={{ width: '120px', height: '120px', borderRadius: '50%' }} 
          />
        </div>

        {/* Title */}
        <h2 style={{ 
          color: '#16172B', 
          fontSize: '24px', 
          fontWeight: '700', 
          marginBottom: '16px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          Cám ơn quý khách!
        </h2>

        {/* Success message body */}
        <p style={{ 
          color: '#16172B', 
          fontSize: '16px', 
          lineHeight: '1.6', 
          margin: 0,
          fontWeight: '400'
        }}>
          {isAttending ? (
            <>
              Gia đình chúng tôi đã nhận được xác nhận của bạn. Rất mong được gặp lại bạn vào Thứ bảy, ngày 11/07/2026 lúc 17:30 tại Thánh Đường Giáo Xứ Tân Chí Linh
            </>
          ) : (
            <>
              Gia đình chúng tôi đã nhận được xác nhận của bạn. Cám ơn bạn đã hồi âm.<br/>
              Xin Chúa ban muôn ơn lành đến với bạn.
            </>
          )}
        </p>
      </div>
    </dialog>
  );
}
