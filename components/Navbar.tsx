'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { FiMenu, FiX, FiUser, FiLogOut, FiGrid } from 'react-icons/fi';

export function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const role = (session?.user as any)?.role;

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(10,10,10,0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 24px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #ddc08c, #c8a96e, #a8893e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '4px',
          }}>MAIZ</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link href="/" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}>
            Discover
          </Link>
          {session && role === 'consumer' && (
            <Link href="/dashboard" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}>
              My Bookings
            </Link>
          )}
          {session && role === 'restaurant' && (
            <Link href="/restaurant-dashboard" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}>
              Dashboard
            </Link>
          )}
        </div>

        {/* Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {session ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '100px',
                  padding: '8px 16px',
                  color: 'var(--color-text)',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: '#0a0a0a',
                }}>
                  {session.user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                {session.user?.name?.split(' ')[0]}
              </button>
              {userMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: '48px',
                  right: 0,
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '8px',
                  minWidth: '200px',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 1001,
                }}>
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--color-border)', marginBottom: '4px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Signed in as</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-gold)' }}>{session.user?.email}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)', marginTop: '2px', textTransform: 'capitalize' }}>{role} account</div>
                  </div>
                  {role === 'restaurant' && (
                    <Link href="/restaurant-dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '10px 12px', borderRadius: 'var(--radius-sm)',
                        color: 'var(--color-text-muted)', fontSize: '0.9rem',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-surface-2)'; e.currentTarget.style.color = 'var(--color-text)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                    >
                      <FiGrid size={16} /> Restaurant Dashboard
                    </Link>
                  )}
                  {role === 'consumer' && (
                    <Link href="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '10px 12px', borderRadius: 'var(--radius-sm)',
                        color: 'var(--color-text-muted)', fontSize: '0.9rem',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-surface-2)'; e.currentTarget.style.color = 'var(--color-text)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                    >
                      <FiUser size={16} /> My Bookings
                    </Link>
                  )}
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '10px 12px', borderRadius: 'var(--radius-sm)',
                      color: 'var(--color-error)', fontSize: '0.9rem',
                      background: 'none', border: 'none', width: '100%',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(232,84,84,0.1)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <FiLogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth/signin" className="btn-secondary" style={{ padding: '9px 20px', fontSize: '0.875rem' }}>
                Sign In
              </Link>
              <Link href="/auth/signin" className="btn-primary" style={{ padding: '9px 20px', fontSize: '0.875rem' }}>
                Book Now
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
