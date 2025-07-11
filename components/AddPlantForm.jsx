// Plant Form Addition Component
"use client";

import { useState } from 'react';

export default function AddPlantForm({ onAddPlant }) {
  const [plantData, setPlantData] = useState({
    name: '',
    type: 'Indoor',
    wateringFrequency: 7
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlantData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!plantData.name.trim()) {
      alert('Please enter a plant name');
      return;
    }
    
    if (isNaN(plantData.wateringFrequency) || plantData.wateringFrequency < 1) {
      alert('Please enter a valid watering frequency (minimum 1 day)');
      return;
    }
    
    // Submit the new plant
    onAddPlant({
      ...plantData,
      lastWatered: new Date().toISOString(),
    });
    
    // Reset form
    setPlantData({
      name: '',
      type: 'Indoor',
      wateringFrequency: 7
    });
  };

  return (
    <div className="border rounded-lg shadow-sm p-6 bg-white">
      <h2 className="text-xl font-bold mb-4">Add New Plant</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">Plant Name</label>
          <input
            id="name"
            name="name"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Snake Plant"
            value={plantData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium mb-1">Plant Type</label>
          <select 
            id="type"
            name="type"
            className="w-full px-3 py-2 border rounded-md"
            value={plantData.type} 
            onChange={handleChange}
            required
          >
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Herb">Herb</option>
            <option value="Succulent">Succulent</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
            <option value="Flower">Flower</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="wateringFrequency" className="block text-sm font-medium mb-1">
            Watering Frequency (days)
          </label>
          <input
            id="wateringFrequency"
            name="wateringFrequency"
            type="number"
            min="1"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="7"
            value={plantData.wateringFrequency}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="flex justify-between">
          <button 
            type="button" 
            className="px-4 py-2 border border-gray-300 rounded"
            onClick={() => {
              setPlantData({
                name: '',
                type: 'Indoor',
                wateringFrequency: 7
              });
            }}
          >
            Reset
          </button>
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Plant
          </button>
        </div>
      </form>
    </div>
  );
}