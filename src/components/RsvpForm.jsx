import { useState } from 'react';
import { submitRSVP } from '../firebase';

const MIN_GUEST_COUNT = 1;
const MAX_GUEST_COUNT = 20;

function normalizeGuestCount(value) {
  const parsedValue = parseInt(value, 10);
  if (Number.isNaN(parsedValue)) return MIN_GUEST_COUNT;

  return Math.min(MAX_GUEST_COUNT, Math.max(MIN_GUEST_COUNT, parsedValue));
}

export default function RsvpForm({ onSubmitSuccess }) {
  const [guestName, setGuestName] = useState('');
  const [attending, setAttending] = useState(null); // null, 'yes', 'no'
  const [guestCount, setGuestCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (!guestName.trim()) {
      setErrorMsg('Vui lòng nhập tên của bạn.');
      return;
    }
    if (attending === null) {
      setErrorMsg('Vui lòng chọn trạng thái tham dự.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const payload = {
        guestName: guestName.trim(),
        attending: attending === 'yes',
        guestCount: attending === 'yes' ? normalizeGuestCount(guestCount) : 0
      };

      const res = await submitRSVP(payload);

      if (res.success) {
        // Callback to parent to open correct success modal
        onSubmitSuccess(payload.attending);

        // Reset form state
        setGuestName('');
        setAttending(null);
        setGuestCount(1);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Có lỗi xảy ra khi gửi xác nhận. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-section animate-fade-in" style={{ padding: 0, position: 'relative' }}>
      {/* Background Image */}
      <img
        src="/form-page.png"
        alt="RSVP Background"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />

      {/* Form Overlay */}
      <div style={{
        position: 'absolute',
        top: '42%', /* Moved down to avoid overlapping the text in the image */
        left: 0,
        width: '100%',
        padding: '0 15%', /* Increased padding to make the form width smaller */
        boxSizing: 'border-box',
        zIndex: 10
      }}>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {/* Guest name input */}
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label" htmlFor="guest-name" style={{ color: 'white', fontWeight: '500', marginBottom: '8px', display: 'block' }}>Tên của quý khách (*)</label>
            <input
              id="guest-name"
              type="text"
              className="input-text"
              placeholder="Nhập tên của quý khách"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              disabled={loading}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                boxSizing: 'border-box',
                backgroundColor: 'white',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                color: '#333',
                borderRadius: '8px',
                outline: 'none'
              }}
            />
          </div>

          {/* Attendance Selection */}
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label" style={{ color: 'white', fontWeight: '600', marginBottom: '8px', display: 'block', fontSize: '18px' }}>Bạn sẽ tham dự</label>
            <div className="radio-group" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label
                htmlFor="attending-yes"
                className={`radio-option ${attending === 'yes' ? 'selected' : ''}`}
                style={{
                  backgroundColor: 'white',
                  border: attending === 'yes' ? '2px solid #71866C' : '2px solid transparent',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <input
                  id="attending-yes"
                  type="radio"
                  className="radio-input"
                  name="attending"
                  value="yes"
                  checked={attending === 'yes'}
                  onChange={(e) => setAttending(e.target.value)}
                  disabled={loading}
                  style={{ display: 'none' }}
                />
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: attending === 'yes' ? '#71866C' : '#F0F4F8',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '12px',
                  color: attending === 'yes' ? '#FFFFFF' : '#554670',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  ✓
                </div>
                <span className="radio-label" style={{ color: '#554670', fontWeight: '600' }}>Tôi sẽ đến</span>
              </label>

              <label
                htmlFor="attending-no"
                className={`radio-option ${attending === 'no' ? 'selected' : ''}`}
                style={{
                  backgroundColor: 'white',
                  border: attending === 'no' ? '2px solid #EC5353' : '2px solid transparent',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <input
                  id="attending-no"
                  type="radio"
                  className="radio-input"
                  name="attending"
                  value="no"
                  checked={attending === 'no'}
                  onChange={(e) => setAttending(e.target.value)}
                  disabled={loading}
                  style={{ display: 'none' }}
                />
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: attending === 'no' ? '#EC5353' : '#F0F4F8',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '12px',
                  color: attending === 'no' ? '#FFFFFF' : '#554670',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  ✕
                </div>
                <span className="radio-label" style={{ color: '#554670', fontWeight: '600' }}>Rất tiếc, tôi không thể tham dự</span>
              </label>
            </div>
          </div>

          {/* Conditional Guest Count */}
          {attending === 'yes' && (
            <div className="form-group animate-fade-in" style={{ animationDuration: '0.4s', marginBottom: '16px' }}>
              <label className="form-label" htmlFor="guest-count" style={{ color: 'white', fontWeight: '500', marginBottom: '8px', display: 'block' }}>Số lượng khách (bao gồm bạn)</label>
              <input
                id="guest-count"
                type="number"
                className="input-text"
                min={MIN_GUEST_COUNT}
                max={MAX_GUEST_COUNT}
                value={guestCount}
                onChange={(e) => setGuestCount(normalizeGuestCount(e.target.value))}
                disabled={loading}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  boxSizing: 'border-box',
                  backgroundColor: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  color: '#333',
                  borderRadius: '8px',
                  outline: 'none'
                }}
              />
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <p style={{ color: 'var(--error)', fontSize: '14px', textAlign: 'center', marginBottom: '16px', fontWeight: '500' }}>
              {errorMsg}
            </p>
          )}

          {/* Submit button */}
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{
                width: '100%',
                textTransform: 'uppercase',
                gap: '8px',
                padding: '14px',
                borderRadius: '30px',
                fontWeight: 'bold',
                backgroundColor: '#554670',
                border: 'none',
                color: 'white'
              }}
            >
              {loading && <span className="loading-spinner"></span>}
              Gửi xác nhận
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
