'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RESTAURANTS } from '@/lib/data';
import { FiStar, FiMapPin, FiClock } from 'react-icons/fi';

export function RestaurantGrid() {
  const [filter, setFilter] = useState('All');
  const cuisines = ['All', ...Array.from(new Set(RESTAURANTS.map((r) => r.cuisine)))];

  const filtered = filter === 'All' ? RESTAURANTS : RESTAURANTS.filter((r) => r.cuisine === filter);

  return (
    <section id="restaurants" style={{ padding: '80px 0', background: 'var(--color-bg)' }}>
      <div className="page-container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            marginBottom: '16px',
          }}>
            Featured <span className="gradient-text">Restaurants</span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto' }}>
            Handpicked dining experiences for the discerning palate
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
          {cuisines.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              style={{
                padding: '8px 18px',
                borderRadius: '100px',
                border: filter === c ? 'none' : '1px solid var(--color-border)',
                background: filter === c ? 'linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))' : 'transparent',
                color: filter === c ? '#0a0a0a' : 'var(--color-text-muted)',
                fontSize: '0.85rem',
                fontWeight: filter === c ? '600' : '400',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid-3">
          {filtered.map((restaurant) => (
            <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`} style={{ display: 'block' }}>
              <div className="card" style={{ cursor: 'pointer' }}>
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                  }} />
                  <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                    <span className="badge badge-gold">{restaurant.priceRange}</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
                    <span style={{
                      background: 'rgba(0,0,0,0.7)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '100px',
                      padding: '4px 10px',
                      fontSize: '0.75rem',
                      color: 'var(--color-text-muted)',
                    }}>{restaurant.cuisine}</span>
                  </div>
                </div>

                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '600' }}>
                      {restaurant.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-gold)' }}>
                      <FiStar size={14} fill="currentColor" />
                      <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{restaurant.rating}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)' }}>({restaurant.reviewCount})</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <FiMapPin size={12} />
                    <span>{restaurant.location}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-subtle)', fontSize: '0.8rem', marginBottom: '16px' }}>
                    <FiClock size={12} />
                    <span>{restaurant.openTime} - {restaurant.closeTime}</span>
                  </div>

                  <div style={{
                    borderTop: '1px solid var(--color-border)',
                    paddingTop: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-subtle)' }}>
                      {restaurant.availableSlots.filter((s) => s.available).length} slots available
                    </span>
                    <span style={{
                      color: 'var(--color-gold)',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                    }}>Reserve →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
