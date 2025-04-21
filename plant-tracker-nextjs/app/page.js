import PlantDashboard from '../components/PlantDashboard';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Plant Watering Tracker</h1>
        <PlantDashboard />
      </div>
    </main>
  );
}