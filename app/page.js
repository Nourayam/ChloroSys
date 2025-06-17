'use client';
import Link from 'next/link';

export default function CalendarButton() {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Link href="/calendar" className="calendar-nav-btn">
        📅 View Calendar
      </Link>
    </div>
  );
}
