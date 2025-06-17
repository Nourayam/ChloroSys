'use client';
import { useState, useEffect } from 'react';
import { findPlantCare, getCareByType } from './plantCareDatabase';

export default function AddPlantForm({ onAddPlant, onClose }) {
  const [plantName, setPlantName] = useState('');
  const [wateringFrequency, setWateringFrequency] = useState('7');
  const [plantType, setPlantType] = useState('houseplant');
  const [location, setLocation] = useState('indoor');
  const [plantEmoji, setPlantEmoji] = useState('🪴');
  const [careNotes, setCareNotes] = useState('');
  const [suggestedCare, setSuggestedCare] = useState(null);
  
  const plantEmojis = ['🪴', '🌿', '🌱', '🌵', '🌺', '🌻', '🌷', '🌹', '🌾', '🌳', '🌲', '🌴', '🍀', '🌸', '🌼'];
  
  // Auto-suggest care when plant name changes
  useEffect(() => {
    if (plantName.length > 2) {
      const plantInfo = findPlantCare(plantName);
      if (plantInfo) {
        setSuggestedCare(plantInfo);
      } else {
        setSuggestedCare(null);
      }
    }
  }, [plantName]);

  // Update care notes when plant type changes (if no specific plant found)
  useEffect(() => {
    if (!suggestedCare && !careNotes) {
      setCareNotes(getCareByType(plantType));
    }
  }, [plantType, suggestedCare, careNotes]);

  const applySuggestion = () => {
    if (suggestedCare) {
      setWateringFrequency(suggestedCare.wateringFrequency.toString());
      setPlantType(suggestedCare.plantType);
      setPlantEmoji(suggestedCare.emoji);
      setCareNotes(suggestedCare.careNotes);
      setSuggestedCare(null);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (plantName.trim()) {
      onAddPlant({
        id: Date.now(),
        name: plantName.trim(),
        lastWatered: new Date().toISOString().split('T')[0],
        wateringFrequency: parseInt(wateringFrequency),
        plantType,
        location,
        plantEmoji,
        careNotes: careNotes.trim(),
        wateringHistory: [new Date().toISOString().split('T')[0]]
      });
      // Reset form
      setPlantName('');
      setWateringFrequency('7');
      setPlantType('houseplant');
      setLocation('indoor');
      setPlantEmoji('🪴');
      setCareNotes('');
      setSuggestedCare(null);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content enhanced-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">🌱 Add New Plant</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="plantName">Plant Name</label>
              <input
                id="plantName"
                type="text"
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
                placeholder="e.g., Monstera, Snake Plant, Basil..."
                className="form-input"
                autoFocus
                required
              />
              {suggestedCare && (
                <div className="care-suggestion">
                  <p className="suggestion-text">
                    🤖 I found care info for this plant!
                  </p>
                  <button 
                    type="button" 
                    className="btn btn-suggestion"
                    onClick={applySuggestion}
                  >
                    Apply Suggested Care Settings
                  </button>
                </div>
              )}
            </div>
            
            <div className="form-group form-group-small">
              <label>Icon</label>
              <div className="emoji-picker">
                <div className="selected-emoji">{plantEmoji}</div>
                <div className="emoji-grid">
                  {plantEmojis.map(emoji => (
                    <button
                      key={emoji}
                      type="button"
                      className={`emoji-option ${plantEmoji === emoji ? 'active' : ''}`}
                      onClick={() => setPlantEmoji(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="plantType">Plant Type</label>
              <select
                id="plantType"
                value={plantType}
                onChange={(e) => setPlantType(e.target.value)}
                className="form-select"
              >
                <option value="houseplant">Houseplant</option>
                <option value="succulent">Succulent</option>
                <option value="tropical">Tropical</option>
                <option value="herb">Herb</option>
                <option value="flower">Flower</option>
                <option value="vegetable">Vegetable</option>
                <option value="tree">Tree</option>
                <option value="cactus">Cactus</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <select
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="form-select"
              >
                <option value="indoor">Indoor</option>
                <option value="outdoor">Outdoor</option>
                <option value="balcony">Balcony</option>
                <option value="greenhouse">Greenhouse</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="wateringFrequency">Water Every (days)</label>
            <select
              id="wateringFrequency"
              value={wateringFrequency}
              onChange={(e) => setWateringFrequency(e.target.value)}
              className="form-select"
            >
              <option value="2">2 days</option>
              <option value="3">3 days</option>
              <option value="5">5 days</option>
              <option value="7">7 days (weekly)</option>
              <option value="10">10 days</option>
              <option value="14">14 days (bi-weekly)</option>
              <option value="21">21 days</option>
              <option value="30">30 days (monthly)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="careNotes">
              Care Notes 
              {careNotes && <span className="auto-label"> (auto-filled)</span>}
            </label>
            <textarea
              id="careNotes"
              value={careNotes}
              onChange={(e) => setCareNotes(e.target.value)}
              placeholder="Care instructions will appear here automatically..."
              className="form-textarea"
              rows="4"
            />
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