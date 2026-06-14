import { useEffect, useState } from 'react';
import { getRSVPs } from '../firebase';

export default function Dashboard() {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRSVPs();
        setRsvps(data);
      } catch (error) {
        console.error("Failed to fetch RSVPs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalSubmissions = rsvps.length;
  const totalAttendingGuests = rsvps
    .filter(rsvp => rsvp.attending)
    .reduce((sum, rsvp) => sum + (Number(rsvp.guestCount) || 0), 0);
  
  const tablesNeeded = Math.ceil(totalAttendingGuests / 10);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#554670', marginBottom: '30px' }}>Admin Dashboard</h1>
      
      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ backgroundColor: '#F0F4F8', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#554670', fontSize: '18px' }}>Tổng lượt xác nhận</h3>
          <p style={{ margin: 0, fontSize: '36px', fontWeight: 'bold', color: '#71866C' }}>{totalSubmissions}</p>
        </div>
        <div style={{ backgroundColor: '#F0F4F8', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#554670', fontSize: '18px' }}>Tổng khách tham dự</h3>
          <p style={{ margin: 0, fontSize: '36px', fontWeight: 'bold', color: '#71866C' }}>{totalAttendingGuests}</p>
        </div>
        <div style={{ backgroundColor: '#F0F4F8', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#554670', fontSize: '18px' }}>Số bàn dự kiến (10 khách/bàn)</h3>
          <p style={{ margin: 0, fontSize: '36px', fontWeight: 'bold', color: '#71866C' }}>{tablesNeeded}</p>
        </div>
      </div>

      {/* Data Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <h2 style={{ padding: '20px', margin: 0, borderBottom: '1px solid #EEE', color: '#554670' }}>Danh sách chi tiết</h2>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Đang tải dữ liệu...</div>
        ) : rsvps.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Chưa có xác nhận nào.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #EEE' }}>
                  <th style={{ padding: '16px 20px', color: '#554670', fontWeight: '600' }}>Tên khách</th>
                  <th style={{ padding: '16px 20px', color: '#554670', fontWeight: '600' }}>Tham dự</th>
                  <th style={{ padding: '16px 20px', color: '#554670', fontWeight: '600' }}>Số người</th>
                  <th style={{ padding: '16px 20px', color: '#554670', fontWeight: '600' }}>Thời gian xác nhận</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.map((rsvp, idx) => (
                  <tr key={rsvp.id || idx} style={{ borderBottom: '1px solid #EEE' }}>
                    <td style={{ padding: '16px 20px', color: '#333', fontWeight: '500' }}>{rsvp.guestName}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: '500',
                        backgroundColor: rsvp.attending ? '#E8F5E9' : '#FFEBEE',
                        color: rsvp.attending ? '#2E7D32' : '#C62828'
                      }}>
                        {rsvp.attending ? 'Có' : 'Không'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', color: '#333' }}>{rsvp.attending ? rsvp.guestCount : '-'}</td>
                    <td style={{ padding: '16px 20px', color: '#888', fontSize: '14px' }}>
                      {rsvp.createdAt?.toDate ? rsvp.createdAt.toDate().toLocaleString() : new Date(rsvp.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
