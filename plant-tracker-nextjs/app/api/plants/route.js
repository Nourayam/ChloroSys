import { NextResponse } from 'next/server';

// Mock database - in a real app, you would use a database
// This will be lost on server restart
let plants = [
  {
    id: '1',
    name: 'Snake Plant',
    type: 'Indoor',
    lastWatered: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    wateringFrequency: 7, // days
    image: 'https://example.com/snake-plant.jpg',
  },
  {
    id: '2',
    name: 'Peace Lily',
    type: 'Indoor',
    lastWatered: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    wateringFrequency: 3, // days
    image: 'https://example.com/peace-lily.jpg',
  },
  {
    id: '3',
    name: 'Tomato Plant',
    type: 'Outdoor',
    lastWatered: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    wateringFrequency: 2, // days
    image: 'https://example.com/tomato.jpg',
  },
];

// GET all plants
export async function GET() {
  return NextResponse.json(plants);
}

// POST - Add a new plant
export async function POST(request) {
  const data = await request.json();
  
  // Validate required fields
  if (!data.name || !data.type || !data.wateringFrequency) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }
  
  // Create a new plant with generated ID
  const newPlant = {
    id: Date.now().toString(), // Simple ID generation
    name: data.name,
    type: data.type,
    lastWatered: data.lastWatered || new Date().toISOString(),
    wateringFrequency: parseInt(data.wateringFrequency),
    image: data.image || `https://example.com/${data.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
  };
  
  // Add to "database"
  plants.push(newPlant);
  
  return NextResponse.json(newPlant, { status: 201 });
}