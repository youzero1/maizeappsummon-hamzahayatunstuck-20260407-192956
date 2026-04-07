import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { RestaurantGrid } from '@/components/RestaurantGrid';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <Navbar />
      <HeroSection />
      <RestaurantGrid />
      <Footer />
    </div>
  );
}
