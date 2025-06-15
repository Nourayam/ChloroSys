'use client';
import { useState } from 'react';

export default function PlantDashboard() {
  const [plants, setPlants] = useState([
    { id: 1, name: 'Monstera Deliciosa', lastWatered: '2024-01-20', wateringFrequency: 7 },
    { id: 2, name: 'Snake Plant', lastWatered: '2024-01-15', wateringFrequency: 14 },
    { id: 3, name: 'Pothos', lastWatered: '2024-01-22', wateringFrequency: 5 },
  ]);

  const getWaterStatus = (lastWatered, frequency) => {
    const last = new Date(lastWatered);
    const today = new Date();
    const daysSince = Math.floor((today - last) / (1000 * 60 * 60 * 24));
    
    if (daysSince >= frequency) return { status: 'needs-water', text: '💧 Needs Water!' };
    if (daysSince >= frequency - 2) return { status: 'check-soon', text: '👀 Check Soon' };
    return { status: 'watered', text: '✅ Happy Plant' };
  };

  const waterPlant = (id) => {
    setPlants(plants.map(plant => 
      plant.id === id 
        ? { ...plant, lastWatered: new Date().toISOString().split('T')[0] }
        : plant
    ));
  };

  return (
    <div className="dashboard-container">
      <header className="app-header">
        <h1 className="app-title">🌿 Plant Watering Tracker</h1>
        <p className="app-subtitle">Keep your green friends happy and hydrated</p>
      </header>

      {plants.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🌱</div>
          <p className="empty-state-text">No plants yet! Add your first plant to get started.</p>
          <button className="btn btn-primary">
            <span>+</span> Add Your First Plant
          </button>
        </div>
      ) : (
        <div className="plant-grid">
          {plants.map(plant => {
            const waterStatus = getWaterStatus(plant.lastWatered, plant.wateringFrequency);
            return (
              <div key={plant.id} className="plant-card">
                <h3 className="plant-name">{plant.name}</h3>
                <p className="plant-info">
                  Water every {plant.wateringFrequency} days
                </p>
                <p className="plant-info">
                  Last watered: {new Date(plant.lastWatered).toLocaleDateString()}
                </p>
                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className={`water-status ${waterStatus.status}`}>
                    {waterStatus.text}
                  </span>
                  {waterStatus.status === 'needs-water' && (
                    <button 
                      className="btn btn-secondary"
                      onClick={() => waterPlant(plant.id)}
                    >
                      Water Now 💧
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      <button className="add-plant-btn">+</button>
    </div>
  );
}