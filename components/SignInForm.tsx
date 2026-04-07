'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'consumer' | 'restaurant'>('consumer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await signIn('credentials', {
      email,
      password,
      role,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError('Invalid email or password.');
    } else {
      if (role === 'restaurant') {
        router.push('/restaurant-dashboard');
      } else {
        router.push('/dashboard');
      }
    }
  };

  const fillDemo = (r: 'consumer' | 'restaurant') => {
    setRole(r);
    if (r === 'consumer') {
      setEmail('consumer@maiz.com');
      setPassword('password123');
    } else {
      setEmail('restaurant@maiz.com');
      setPassword('password123');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link href="/">
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.5rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #ddc08c, #c8a96e, #a8893e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '4px',
            }}>MAIZ</span>
          </Link>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '8px', fontSize: '0.95rem' }}>Welcome back</p>
        </div>

        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '32px',
        }}>
          {/* Role Toggle */}
          <div style={{
            display: 'flex',
            background: 'var(--color-surface-2)',
            borderRadius: 'var(--radius-md)',
            padding: '4px',
            marginBottom: '28px',
          }}>
            {(['consumer', 'restaurant'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 'calc(var(--radius-md) - 4px)',
                  border: 'none',
                  background: role === r ? 'var(--color-surface-3)' : 'transparent',
                  color: role === r ? 'var(--color-gold)' : 'var(--color-text-muted)',
                  fontWeight: role === r ? '600' : '400',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textTransform: 'capitalize',
                }}
              >{r === 'consumer' ? 'Diner' : 'Restaurant'}</button>
            ))}
          </div>

          {/* Demo credentials */}
          <div style={{
            background: 'rgba(200,169,110,0.06)',
            border: '1px solid rgba(200,169,110,0.15)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 16px',
            marginBottom: '24px',
            fontSize: '0.8rem',
          }}>
            <div style={{ color: 'var(--color-gold)', fontWeight: '600', marginBottom: '8px' }}>Demo Credentials</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button onClick={() => fillDemo('consumer')} style={{
                padding: '4px 10px', borderRadius: '100px', border: '1px solid rgba(200,169,110,0.3)',
                background: 'transparent', color: 'var(--color-gold)', fontSize: '0.75rem', cursor: 'pointer',
              }}>Fill Diner</button>
              <button onClick={() => fillDemo('restaurant')} style={{
                padding: '4px 10px', borderRadius: '100px', border: '1px solid rgba(200,169,110,0.3)',
                background: 'transparent', color: 'var(--color-gold)', fontSize: '0.75rem', cursor: 'pointer',
              }}>Fill Restaurant</button>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '6px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <FiMail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-subtle)' }} />
                <input
                  type="email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{ paddingLeft: '42px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '6px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <FiLock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-subtle)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ paddingLeft: '42px', paddingRight: '42px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--color-text-subtle)', cursor: 'pointer' }}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ padding: '10px 14px', background: 'rgba(232,84,84,0.1)', border: '1px solid rgba(232,84,84,0.3)', borderRadius: 'var(--radius-sm)', color: 'var(--color-error)', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ width: '100%', padding: '14px', marginTop: '8px', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            <Link href="/" style={{ color: 'var(--color-gold)' }}>← Back to home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
