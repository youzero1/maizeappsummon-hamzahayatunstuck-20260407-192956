'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { RESTAURANTS, ALLERGY_OPTIONS, Table, Booking } from '@/lib/data';
import { useBookingStore } from '@/lib/store';
import { FiStar, FiMapPin, FiClock, FiUsers, FiCheck, FiAlertCircle } from 'react-icons/fi';

export function RestaurantDetail({ restaurantId }: { restaurantId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const restaurant = RESTAURANTS.find((r) => r.id === restaurantId);
  const addBooking = useBookingStore((s) => s.addBooking);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [partySize, setPartySize] = useState(2);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [specialRequests, setSpecialRequests] = useState('');
  const [step, setStep] = useState(1);
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState('');

  if (!restaurant) return (
    <div style={{ paddingTop: '120px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
      Restaurant not found.
    </div>
  );

  const toggleAllergy = (allergy: string) => {
    setAllergies((prev) =>
      prev.includes(allergy) ? prev.filter((a) => a !== allergy) : [...prev, allergy]
    );
  };

  const handleBooking = () => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }
    if (!selectedDate || !selectedTime || !selectedTable) {
      setError('Please select a date, time, and table.');
      return;
    }
    const booking: Booking = {
      id: `b${Date.now()}`,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      tableId: selectedTable.id,
      tableNumber: selectedTable.number,
      tableLocation: selectedTable.location,
      userId: (session.user as any)?.id || 'guest',
      userName: session.user?.name || 'Guest',
      userEmail: session.user?.email || '',
      date: selectedDate,
      time: selectedTime,
      partySize,
      allergies,
      specialRequests,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    addBooking(booking);
    setBooked(true);
    setError('');
  };

  if (booked) {
    return (
      <div style={{ paddingTop: '120px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px', padding: '0 24px' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'rgba(76,175,130,0.15)',
            border: '2px solid var(--color-success)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
          }}>
            <FiCheck size={36} color="var(--color-success)" />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '12px' }}>Reservation Confirmed!</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '8px' }}>
            Your table at <strong style={{ color: 'var(--color-gold)' }}>{restaurant.name}</strong> is booked.
          </p>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '32px', fontSize: '0.9rem' }}>
            {selectedDate} at {selectedTime} · Table {selectedTable?.number} ({selectedTable?.location}) · {partySize} guests
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn-secondary" onClick={() => router.push('/')}>Browse More</button>
            <button className="btn-primary" onClick={() => router.push('/dashboard')}>View Bookings</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
        <Image src={restaurant.image} alt={restaurant.name} fill style={{ objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: '40px', left: '0', right: '0' }}>
          <div className="page-container">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <span className="badge badge-gold">{restaurant.priceRange}</span>
                  <span className="badge" style={{ background: 'rgba(0,0,0,0.5)', color: 'var(--color-text-muted)', border: '1px solid rgba(255,255,255,0.1)' }}>{restaurant.cuisine}</span>
                </div>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '800', marginBottom: '8px' }}>{restaurant.name}</h1>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-gold)' }}>
                    <FiStar size={16} fill="currentColor" />
                    <span style={{ fontWeight: '600' }}>{restaurant.rating}</span>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>({restaurant.reviewCount} reviews)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    <FiMapPin size={14} /><span>{restaurant.address}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    <FiClock size={14} /><span>{restaurant.openTime} – {restaurant.closeTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="page-container" style={{ padding: '40px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '40px', alignItems: 'start' }}>
          {/* Left */}
          <div>
            {/* Description */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '16px' }}>About</h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8 }}>{restaurant.description}</p>
            </div>

            {/* Tables */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '20px' }}>Available Tables</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                {restaurant.tables.map((table) => (
                  <div
                    key={table.id}
                    onClick={() => setSelectedTable(selectedTable?.id === table.id ? null : table)}
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border: selectedTable?.id === table.id ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                      background: selectedTable?.id === table.id ? 'rgba(200,169,110,0.08)' : 'var(--color-surface)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Table {table.number}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)' }}>{table.location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-muted)', fontSize: '0.8rem', marginBottom: '6px' }}>
                      <FiUsers size={12} /><span>Up to {table.capacity} guests</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-subtle)' }}>{table.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '20px' }}>Reviews</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {restaurant.reviews.map((review) => (
                  <div key={review.id} style={{ padding: '20px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '36px', height: '36px', borderRadius: '50%',
                          background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.8rem', fontWeight: '700', color: '#0a0a0a',
                        }}>{review.userName[0]}</div>
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{review.userName}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)' }}>{review.date}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FiStar key={i} size={12} color={i < review.rating ? 'var(--color-gold)' : 'var(--color-border)'} fill={i < review.rating ? 'var(--color-gold)' : 'none'} />
                        ))}
                      </div>
                    </div>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Panel */}
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            position: 'sticky',
            top: '90px',
          }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '24px' }}>Make a Reservation</h3>

            {error && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '12px', background: 'rgba(232,84,84,0.1)', border: '1px solid rgba(232,84,84,0.3)', borderRadius: 'var(--radius-sm)', marginBottom: '16px', color: 'var(--color-error)', fontSize: '0.875rem' }}>
                <FiAlertCircle size={16} />{error}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '6px', fontWeight: '500', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Date</label>
                <input type="date" className="input-field" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
                  style={{ colorScheme: 'dark' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '6px', fontWeight: '500', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Time</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {restaurant.availableSlots.map((slot) => (
                    <button
                      key={slot.id}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: selectedTime === slot.time ? 'none' : '1px solid var(--color-border)',
                        background: !slot.available ? 'var(--color-surface-2)' : selectedTime === slot.time ? 'linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))' : 'var(--color-surface-2)',
                        color: !slot.available ? 'var(--color-text-subtle)' : selectedTime === slot.time ? '#0a0a0a' : 'var(--color-text)',
                        fontSize: '0.85rem',
                        fontWeight: selectedTime === slot.time ? '600' : '400',
                        cursor: slot.available ? 'pointer' : 'not-allowed',
                        opacity: slot.available ? 1 : 0.4,
                        textDecoration: !slot.available ? 'line-through' : 'none',
                        transition: 'all 0.2s',
                      }}
                    >{slot.time}</button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '6px', fontWeight: '500', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Party Size</label>
                <select className="input-field" value={partySize} onChange={(e) => setPartySize(Number(e.target.value))}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>

              {selectedTable && (
                <div style={{ padding: '12px', background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.2)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-gold)', fontWeight: '600', marginBottom: '4px' }}>Selected Table</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text)' }}>Table {selectedTable.number} · {selectedTable.location} · Up to {selectedTable.capacity} guests</div>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '8px', fontWeight: '500', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Allergies & Dietary</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {ALLERGY_OPTIONS.map((a) => (
                    <button
                      key={a}
                      onClick={() => toggleAllergy(a)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '100px',
                        border: allergies.includes(a) ? 'none' : '1px solid var(--color-border)',
                        background: allergies.includes(a) ? 'rgba(200,169,110,0.2)' : 'transparent',
                        color: allergies.includes(a) ? 'var(--color-gold)' : 'var(--color-text-muted)',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >{a}</button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '6px', fontWeight: '500', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Special Requests</label>
                <textarea
                  className="input-field"
                  rows={3}
                  placeholder="Any special requests or notes..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button className="btn-primary" onClick={handleBooking} style={{ width: '100%', padding: '14px' }}>
                {session ? 'Confirm Reservation' : 'Sign In to Book'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
