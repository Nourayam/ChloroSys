'use client';
import { useState, useEffect } from 'react';

export default function EditPlantForm({ plant, onUpdatePlant, onClose }) {
  const [plantName, setPlantName] = useState(plant.name);
  const [wateringFrequency, setWateringFrequency] = useState(plant.wateringFrequency.toString());
  
  useEffect(() => {
    setPlantName(plant.name);
    setWateringFrequency(plant.wateringFrequency.toString());
  }, [plant]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (plantName.trim()) {
      onUpdatePlant({
        ...plant,
        name: plantName.trim(),
        wateringFrequency: parseInt(wateringFrequency)
      });
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">✏️ Edit Plant</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="editPlantName">Plant Name</label>
            <input
              id="editPlantName"
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
            <label htmlFor="editWateringFrequency">Water Every (days)</label>
            <select
              id="editWateringFrequency"
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
              Save Changes 💾
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
