'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiMapPin, FiCalendar, FiUsers } from 'react-icons/fi';

export function HeroSection() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('2');

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      paddingTop: '72px',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1206 50%, #0a0a0a 100%)',
      }} />

      {/* Ambient orbs */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,101,74,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Grain texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        maxWidth: '800px',
        padding: '0 24px',
      }}>
        {/* Label */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(200,169,110,0.1)',
          border: '1px solid rgba(200,169,110,0.2)',
          borderRadius: '100px',
          padding: '6px 16px',
          marginBottom: '32px',
          fontSize: '0.8rem',
          fontWeight: '600',
          color: 'var(--color-gold)',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-gold)', display: 'inline-block' }} />
          Premium Restaurant Reservations
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: '800',
          lineHeight: 1.05,
          marginBottom: '24px',
          color: 'var(--color-text)',
        }}>
          Dine at the
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #ddc08c, #c8a96e, #a8893e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Finest Tables</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'var(--color-text-muted)',
          marginBottom: '48px',
          maxWidth: '560px',
          margin: '0 auto 48px',
          lineHeight: 1.7,
        }}>
          Discover and reserve exceptional dining experiences at New York's most coveted restaurants.
        </p>

        {/* Search Bar */}
        <div style={{
          background: 'rgba(20,20,20,0.95)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 'var(--radius-xl)',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          flexWrap: 'wrap',
          maxWidth: '760px',
          margin: '0 auto',
          boxShadow: '0 8px 64px rgba(0,0,0,0.6)',
        }}>
          <div style={{
            flex: '1',
            minWidth: '160px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 16px',
            borderRight: '1px solid rgba(255,255,255,0.06)',
          }}>
            <FiMapPin size={18} color="var(--color-gold)" />
            <input
              type="text"
              placeholder="Restaurant or cuisine..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text)',
                fontSize: '0.9rem',
                outline: 'none',
                width: '100%',
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 16px',
            borderRight: '1px solid rgba(255,255,255,0.06)',
            minWidth: '140px',
          }}>
            <FiCalendar size={18} color="var(--color-gold)" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                color: date ? 'var(--color-text)' : 'var(--color-text-subtle)',
                fontSize: '0.9rem',
                outline: 'none',
                colorScheme: 'dark',
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 16px',
            minWidth: '100px',
          }}>
            <FiUsers size={18} color="var(--color-gold)" />
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text)',
                fontSize: '0.9rem',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n} style={{ background: '#1e1e1e' }}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
          </div>

          <button
            className="btn-primary"
            onClick={() => router.push('/#restaurants')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 28px',
              borderRadius: 'calc(var(--radius-xl) - 8px)',
              fontSize: '0.9rem',
            }}
          >
            <FiSearch size={16} />
            Search
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '48px',
          marginTop: '56px',
          flexWrap: 'wrap',
        }}>
          {[
            { value: '500+', label: 'Restaurants' },
            { value: '50K+', label: 'Bookings Made' },
            { value: '4.9★', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.8rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #ddc08c, #c8a96e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>{stat.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-subtle)', marginTop: '4px', letterSpacing: '1px', textTransform: 'uppercase' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
