import WateringCalendar from '../../components/WateringCalendar';
import Link from 'next/link';

export default function CalendarPage() {
  return (
    <main>
      <Link href="/" className="back-nav-btn">
        ← Back to Plants
      </Link>
      <WateringCalendar />
    </main>
  );
}