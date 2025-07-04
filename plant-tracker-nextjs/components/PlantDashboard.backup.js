﻿'use client';
import { useState, useEffect } from 'react';
import AddPlantForm from './AddPlantForm';

export default function PlantDashboard() {
  const [plants, setPlants] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [plantToDelete, setPlantToDelete] = useState(null);

  // Load plants from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPlants = localStorage.getItem('plantTrackerData');
      if (savedPlants) {
        setPlants(JSON.parse(savedPlants));
      }
      setIsLoading(false);
    }
  }, []);

  // Save plants to localStorage whenever they change
  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      localStorage.setItem('plantTrackerData', JSON.stringify(plants));
    }
  }, [plants, isLoading]);

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
  
  const addPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  const deletePlant = (id) => {
    setPlants(plants.filter(plant => plant.id !== id));
    setPlantToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-leaf">🌿</div>
        <p>Loading your garden...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="background-decoration">
        <div className="leaf-pattern leaf-1">🌿</div>
        <div className="leaf-pattern leaf-2">🌱</div>
        <div className="leaf-pattern leaf-3">🍃</div>
        <div className="leaf-pattern leaf-4">🌾</div>
      </div>
      
      <div className="dashboard-container">
        <header className="app-header">
          <div className="header-decoration">🌿</div>
          <h1 className="app-title">ChloroSys</h1>
          <p className="app-subtitle">Keep Your Plants Happy, Healthy & Hydrated</p>
        </header>

        {plants.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🌱</div>
            <p className="empty-state-text">No plants yet! Add your first plant to get started.</p>
            <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
              <span>+</span> Add Your First Plant
            </button>
          </div>
        ) : (
          <>
            <div className="stats-bar">
              <div className="stat-item">
                <span className="stat-icon">🌿</span>
                <span className="stat-number">{plants.length}</span>
                <span className="stat-label">Plants</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">💧</span>
                <span className="stat-number">
                  {plants.filter(p => getWaterStatus(p.lastWatered, p.wateringFrequency).status === 'needs-water').length}
                </span>
                <span className="stat-label">Need Water</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">✅</span>
                <span className="stat-number">
                  {plants.filter(p => getWaterStatus(p.lastWatered, p.wateringFrequency).status === 'watered').length}
                </span>
                <span className="stat-label">Happy</span>
              </div>
            </div>

            <div className="plant-grid">
              {plants.map(plant => {
                const waterStatus = getWaterStatus(plant.lastWatered, plant.wateringFrequency);
                return (
                  <div key={plant.id} className={`plant-card ${waterStatus.status}`}>
                    <div className="plant-card-header">
                      <h3 className="plant-name">{plant.name}</h3>
                      <div className="card-actions">
                        <button 
                          className="btn-icon-action delete-btn"
                          onClick={() => setPlantToDelete(plant)}
                          title="Delete plant"
                        >
                          🗑️
                        </button>
                        <span className="plant-emoji">🪴</span>
                      </div>
                    </div>
                    <div className="plant-details">
                      <p className="plant-info">
                        <span className="info-icon">📅</span>
                        Water every {plant.wateringFrequency} days
                      </p>
                      <p className="plant-info">
                        <span className="info-icon">💧</span>
                        Last watered: {new Date(plant.lastWatered).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="plant-actions">
                      <span className={`water-status ${waterStatus.status}`}>
                        {waterStatus.text}
                      </span>
                      {waterStatus.status === 'needs-water' && (
                        <button 
                          className="btn btn-water"
                          onClick={() => waterPlant(plant.id)}
                        >
                          Water Now
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        
        <button className="add-plant-btn" onClick={() => setShowAddForm(true)}>
          <span className="btn-icon">+</span>
        </button>
        
        {showAddForm && (
          <AddPlantForm 
            onAddPlant={addPlant}
            onClose={() => setShowAddForm(false)}
          />
        )}

        {plantToDelete && (
          <div className="modal-overlay" onClick={() => setPlantToDelete(null)}>
            <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
              <h2 className="modal-title">🌱 Delete Plant?</h2>
              <p className="delete-message">
                Are you sure you want to remove <strong>{plantToDelete.name}</strong> from your garden?
              </p>
              <div className="form-actions">
                <button 
                  className="btn btn-cancel" 
                  onClick={() => setPlantToDelete(null)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-danger" 
                  onClick={() => deletePlant(plantToDelete.id)}
                >
                  Delete Plant
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
