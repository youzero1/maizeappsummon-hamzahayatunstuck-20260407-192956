import { RestaurantDetail } from '@/components/RestaurantDetail';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { RESTAURANTS } from '@/lib/data';

export function generateStaticParams() {
  return RESTAURANTS.map((r) => ({ id: r.id }));
}

export default function RestaurantPage({ params }: { params: { id: string } }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <Navbar />
      <RestaurantDetail restaurantId={params.id} />
      <Footer />
    </div>
  );
}
