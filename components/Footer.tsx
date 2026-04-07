'use client';
import Link from 'next/link';

export function Footer() {
  return (
    <footer style={{
      background: 'var(--color-surface)',
      borderTop: '1px solid var(--color-border)',
      padding: '48px 0 32px',
    }}>
      <div className="page-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '32px', marginBottom: '40px' }}>
          <div style={{ maxWidth: '280px' }}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.8rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #ddc08c, #c8a96e, #a8893e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '3px',
              display: 'block',
              marginBottom: '12px',
            }}>MAIZ</span>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.7 }}>
              Premium restaurant reservations for discerning diners in New York City.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-text)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px' }}>Discover</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[['Restaurants', '/'], ['Book a Table', '/'], ['Reviews', '/']].map(([label, href]) => (
                  <Link key={label} href={href} style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-text)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px' }}>Account</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[['Sign In', '/auth/signin'], ['My Bookings', '/dashboard'], ['Restaurant Portal', '/restaurant-dashboard']].map(([label, href]) => (
                  <Link key={label} href={href} style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ color: 'var(--color-text-subtle)', fontSize: '0.8rem' }}>© 2024 MAIZ. All rights reserved.</p>
          <p style={{ color: 'var(--color-text-subtle)', fontSize: '0.8rem' }}>Crafted with care for exceptional dining</p>
        </div>
      </div>
    </footer>
  );
}
