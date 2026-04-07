import { ConsumerDashboard } from '@/components/ConsumerDashboard';
import { Navbar } from '@/components/Navbar';

export default function DashboardPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <Navbar />
      <ConsumerDashboard />
    </div>
  );
}
