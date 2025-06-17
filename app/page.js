import PlantDashboard from '../components/PlantDashboard';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <PlantDashboard />
      <Link href="/calendar" className="calendar-nav-btn">
        📅 View Calendar
      </Link>
    </main>
  );
}