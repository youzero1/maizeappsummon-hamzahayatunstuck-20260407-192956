'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useBookingStore } from '@/lib/store';
import { FiCalendar, FiMapPin, FiUsers, FiClock, FiCheckCircle, FiAlertCircle, FiXCircle } from 'react-icons/fi';

export function ConsumerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const bookings = useBookingStore((s) => s.bookings);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/signin');
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div style={{ paddingTop: '120px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
        Loading...
      </div>
    );
  }

  const userId = (session?.user as any)?.id || 'u1';
  const userBookings = bookings.filter((b) => b.userId === userId || b.userEmail === session?.user?.email);

  const statusIcon = (status: string) => {
    if (status === 'confirmed') return <FiCheckCircle size={16} color="var(--color-success)" />;
    if (status === 'pending') return <FiAlertCircle size={16} color="var(--color-warning)" />;
    return <FiXCircle size={16} color="var(--color-error)" />;
  };

  const statusClass = (s: string) => {
    if (s === 'confirmed') return 'badge badge-success';
    if (s === 'pending') return 'badge badge-warning';
    return 'badge badge-error';
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="page-container">
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: '700', marginBottom: '8px' }}>
            My <span className="gradient-text">Reservations</span>
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Welcome back, {session?.user?.name?.split(' ')[0]}</p>
        </div>

        {userBookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--color-text-muted)' }}>
            <FiCalendar size={48} style={{ marginBottom: '16px', opacity: 0.4 }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '8px', color: 'var(--color-text)' }}>No reservations yet</h3>
            <p style={{ marginBottom: '24px' }}>Discover and book exceptional dining experiences.</p>
            <button className="btn-primary" onClick={() => router.push('/')}>Browse Restaurants</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {userBookings.map((booking) => (
              <div key={booking.id} style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '16px',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>{booking.restaurantName}</h3>
                    <span className={statusClass(booking.status)}>
                      {statusIcon(booking.status)}
                      {booking.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                      <FiCalendar size={14} /><span>{booking.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                      <FiClock size={14} /><span>{booking.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                      <FiUsers size={14} /><span>{booking.partySize} guests</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                      <FiMapPin size={14} /><span>Table {booking.tableNumber} · {booking.tableLocation}</span>
                    </div>
                  </div>
                  {booking.allergies.length > 0 && (
                    <div style={{ marginTop: '10px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {booking.allergies.map((a) => (
                        <span key={a} className="badge badge-warning" style={{ fontSize: '0.7rem' }}>{a}</span>
                      ))}
                    </div>
                  )}
                  {booking.specialRequests && (
                    <p style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--color-text-subtle)', fontStyle: 'italic' }}>"{booking.specialRequests}"</p>
                  )}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)' }}>
                  Booked {new Date(booking.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
