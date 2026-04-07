'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useBookingStore } from '@/lib/store';
import { RESTAURANTS } from '@/lib/data';
import { Navbar } from './Navbar';
import { GanttChart } from './GanttChart';
import { FiUsers, FiCalendar, FiTrendingUp, FiGrid } from 'react-icons/fi';

export function RestaurantDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const bookings = useBookingStore((s) => s.bookings);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/signin');
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
        Loading...
      </div>
    );
  }

  const restaurantId = (session?.user as any)?.restaurantId || '1';
  const restaurant = RESTAURANTS.find((r) => r.id === restaurantId) || RESTAURANTS[0];
  const restaurantBookings = bookings.filter((b) => b.restaurantId === restaurantId);
  const todayBookings = restaurantBookings.filter((b) => b.date === selectedDate);
  const confirmedToday = todayBookings.filter((b) => b.status === 'confirmed');
  const totalGuests = confirmedToday.reduce((sum, b) => sum + b.partySize, 0);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <Navbar />
      <div style={{ paddingTop: '100px', paddingBottom: '80px' }}>
        <div className="page-container">
          {/* Header */}
          <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: '700', marginBottom: '8px' }}>
                <span className="gradient-text">{restaurant.name}</span> Dashboard
              </h1>
              <p style={{ color: 'var(--color-text-muted)' }}>Welcome, {session?.user?.name}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <label style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input-field"
                style={{ width: 'auto', colorScheme: 'dark' }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid-4" style={{ marginBottom: '40px' }}>
            {[
              { icon: <FiCalendar size={22} />, value: todayBookings.length, label: 'Reservations Today' },
              { icon: <FiUsers size={22} />, value: totalGuests, label: 'Expected Guests' },
              { icon: <FiTrendingUp size={22} />, value: confirmedToday.length, label: 'Confirmed' },
              { icon: <FiGrid size={22} />, value: restaurant.tables.length, label: 'Total Tables' },
            ].map((stat) => (
              <div key={stat.label} style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
              }}>
                <div style={{ color: 'var(--color-gold)', marginBottom: '12px' }}>{stat.icon}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', marginBottom: '4px' }}>{stat.value}</div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Gantt Chart */}
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            marginBottom: '40px',
          }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '24px' }}>Table Timeline — {selectedDate}</h2>
            <GanttChart restaurant={restaurant} bookings={todayBookings} />
          </div>

          {/* Bookings List */}
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
          }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '24px' }}>Reservations for {selectedDate}</h2>
            {todayBookings.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '40px' }}>No reservations for this date.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                      {['Guest', 'Table', 'Time', 'Party', 'Allergies', 'Requests', 'Status'].map((h) => (
                        <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: '500', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {todayBookings.map((booking, i) => (
                      <tr key={booking.id} style={{ borderBottom: i < todayBookings.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ fontWeight: '600' }}>{booking.userName}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{booking.userEmail}</div>
                        </td>
                        <td style={{ padding: '14px 16px', color: 'var(--color-text-muted)' }}>#{booking.tableNumber} · {booking.tableLocation}</td>
                        <td style={{ padding: '14px 16px', color: 'var(--color-gold)', fontWeight: '600' }}>{booking.time}</td>
                        <td style={{ padding: '14px 16px', color: 'var(--color-text-muted)' }}>{booking.partySize} guests</td>
                        <td style={{ padding: '14px 16px' }}>
                          {booking.allergies.length > 0 ? (
                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                              {booking.allergies.map((a) => (
                                <span key={a} className="badge badge-warning" style={{ fontSize: '0.68rem' }}>{a}</span>
                              ))}
                            </div>
                          ) : (
                            <span style={{ color: 'var(--color-text-subtle)' }}>—</span>
                          )}
                        </td>
                        <td style={{ padding: '14px 16px', color: 'var(--color-text-muted)', fontSize: '0.85rem', maxWidth: '200px' }}>
                          {booking.specialRequests || '—'}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <span className={`badge badge-${booking.status === 'confirmed' ? 'success' : booking.status === 'pending' ? 'warning' : 'error'}`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
