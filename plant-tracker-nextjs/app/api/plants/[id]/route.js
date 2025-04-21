import { NextResponse } from 'next/server';

// Reference to the mock database
// We're importing this from the other file in a real app,
let plants = [
  {
    id: '1',
    name: 'Snake Plant',
    type: 'Indoor',
    lastWatered: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    wateringFrequency: 7,
    image: 'https://example.com/snake-plant.jpg',
  },
  {
    id: '2',
    name: 'Peace Lily',
    type: 'Indoor',
    lastWatered: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    wateringFrequency: 3,
    image: 'https://example.com/peace-lily.jpg',
  },
  {
    id: '3',
    name: 'Tomato Plant',
    type: 'Outdoor',
    lastWatered: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    wateringFrequency: 2,
    image: 'https://example.com/tomato.jpg',
  },
];

// Helper function to find a plant by ID
function findPlantById(id) {
  return plants.find(plant => plant.id === id);
}

// GET a single plant by ID
export async function GET(request, { params }) {
  const plant = findPlantById(params.id);
  
  if (!plant) {
    return NextResponse.json(
      { error: 'Plant not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(plant);
}

// PATCH - Update a plant (especially for watering)
export async function PATCH(request, { params }) {
  const data = await request.json();
  const plantIndex = plants.findIndex(p => p.id === params.id);
  
  if (plantIndex === -1) {
    return NextResponse.json(
      { error: 'Plant not found' },
      { status: 404 }
    );
  }
  
  // Update the plant object
  plants[plantIndex] = {
    ...plants[plantIndex],
    ...data,
  };
  
  return NextResponse.json(plants[plantIndex]);
}

// DELETE - Remove a plant
export async function DELETE(request, { params }) {
  const plantIndex = plants.findIndex(p => p.id === params.id);
  
  if (plantIndex === -1) {
    return NextResponse.json(
      { error: 'Plant not found' },
      { status: 404 }
    );
  }
  
  // Remove from "database"
  const deletedPlant = plants[plantIndex];
  plants = plants.filter(p => p.id !== params.id);
  
  return NextResponse.json(deletedPlant);
}