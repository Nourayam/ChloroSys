'use client';
import { useState } from 'react';

export default function AddPlantForm({ onAddPlant, onClose }) {
  const [plantName, setPlantName] = useState('');
  const [wateringFrequency, setWateringFrequency] = useState('7');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (plantName.trim()) {
      onAddPlant({
        id: Date.now(),
        name: plantName.trim(),
        lastWatered: new Date().toISOString().split('T')[0],
        wateringFrequency: parseInt(wateringFrequency)
      });
      setPlantName('');
      setWateringFrequency('7');
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">🌱 Add New Plant</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="plantName">Plant Name</label>
            <input
              id="plantName"
              type="text"
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
              placeholder="e.g., Fiddle Leaf Fig"
              className="form-input"
              autoFocus
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="wateringFrequency">Water Every (days)</label>
            <select
              id="wateringFrequency"
              value={wateringFrequency}
              onChange={(e) => setWateringFrequency(e.target.value)}
              className="form-select"
            >
              <option value="3">3 days</option>
              <option value="5">5 days</option>
              <option value="7">7 days (weekly)</option>
              <option value="10">10 days</option>
              <option value="14">14 days (bi-weekly)</option>
              <option value="21">21 days</option>
              <option value="30">30 days (monthly)</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Plant 🌿
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}