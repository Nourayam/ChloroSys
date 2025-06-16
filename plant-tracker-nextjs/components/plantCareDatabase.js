// Plant care database with common plants and their care instructions
export const plantCareDatabase = {
  // Common houseplants
  'monstera': {
    commonNames: ['monstera', 'swiss cheese plant', 'monstera deliciosa'],
    wateringFrequency: 7,
    careNotes: 'Bright indirect light. Water when top 2 inches of soil are dry. Loves humidity. Wipe leaves monthly to remove dust. Can grow aerial roots.',
    plantType: 'tropical',
    emoji: '🌿'
  },
  'pothos': {
    commonNames: ['pothos', 'devils ivy', 'golden pothos'],
    wateringFrequency: 7,
    careNotes: 'Very forgiving plant! Tolerates low light but thrives in bright indirect light. Water when soil feels dry. Can grow in water. Trim to encourage bushiness.',
    plantType: 'tropical',
    emoji: '🌿'
  },
  'snake plant': {
    commonNames: ['snake plant', 'sansevieria', 'mother in laws tongue'],
    wateringFrequency: 14,
    careNotes: 'Extremely low maintenance. Tolerates neglect and low light. Water sparingly - let soil dry completely between waterings. Can go weeks without water.',
    plantType: 'succulent',
    emoji: '🌿'
  },
  'fiddle leaf fig': {
    commonNames: ['fiddle leaf fig', 'ficus lyrata'],
    wateringFrequency: 7,
    careNotes: 'Bright indirect light. Water when top inch of soil is dry. Sensitive to overwatering. Rotate plant monthly for even growth. Dust leaves regularly.',
    plantType: 'tropical',
    emoji: '🌳'
  },
  'spider plant': {
    commonNames: ['spider plant', 'chlorophytum'],
    wateringFrequency: 5,
    careNotes: 'Easy to grow! Bright indirect light. Keep soil lightly moist. Produces baby plants (spiderettes). Non-toxic to pets.',
    plantType: 'houseplant',
    emoji: '🌱'
  },
  'peace lily': {
    commonNames: ['peace lily', 'spathiphyllum'],
    wateringFrequency: 5,
    careNotes: 'Medium to low light. Droops when thirsty - water when leaves start to droop. Loves humidity. White flowers appear with proper care.',
    plantType: 'tropical',
    emoji: '🌺'
  },
  'aloe vera': {
    commonNames: ['aloe', 'aloe vera'],
    wateringFrequency: 21,
    careNotes: 'Bright indirect light. Water deeply but infrequently - let soil dry completely. Medicinal properties in leaves. Avoid overwatering.',
    plantType: 'succulent',
    emoji: '🌵'
  },
  'rubber plant': {
    commonNames: ['rubber plant', 'ficus elastica', 'rubber tree'],
    wateringFrequency: 7,
    careNotes: 'Bright indirect light. Water when top inch of soil is dry. Wipe leaves to maintain shine. Can grow quite tall - prune to control size.',
    plantType: 'tropical',
    emoji: '🌳'
  },
  'zz plant': {
    commonNames: ['zz plant', 'zamioculcas zamiifolia', 'zanzibar gem'],
    wateringFrequency: 14,
    careNotes: 'Extremely drought tolerant. Low to bright indirect light. Water sparingly - can go weeks without water. Perfect for beginners or busy people.',
    plantType: 'houseplant',
    emoji: '🌿'
  },
  'philodendron': {
    commonNames: ['philodendron', 'heartleaf philodendron'],
    wateringFrequency: 7,
    careNotes: 'Easy care! Medium to bright indirect light. Water when top inch of soil is dry. Fast growing vine - can trail or climb.',
    plantType: 'tropical',
    emoji: '🌿'
  },
  'orchid': {
    commonNames: ['orchid', 'phalaenopsis', 'moth orchid'],
    wateringFrequency: 7,
    careNotes: 'Bright indirect light. Water by soaking for 15 minutes weekly. Needs good drainage. Humidity 50-70%. Blooms can last months.',
    plantType: 'flower',
    emoji: '🌺'
  },
  'succulent': {
    commonNames: ['succulent', 'echeveria', 'jade plant'],
    wateringFrequency: 14,
    careNotes: 'Bright light. Water thoroughly but infrequently. Let soil dry completely between waterings. Well-draining soil is essential.',
    plantType: 'succulent',
    emoji: '🌵'
  },
  'cactus': {
    commonNames: ['cactus', 'cacti'],
    wateringFrequency: 21,
    careNotes: 'Bright direct light. Very drought tolerant. Water sparingly - less is more. Use cactus soil for proper drainage.',
    plantType: 'cactus',
    emoji: '🌵'
  },
  'fern': {
    commonNames: ['fern', 'boston fern', 'maidenhair fern'],
    wateringFrequency: 3,
    careNotes: 'Indirect light - no direct sun. Keep soil consistently moist but not waterlogged. High humidity required. Mist regularly.',
    plantType: 'houseplant',
    emoji: '🌿'
  },
  'bonsai': {
    commonNames: ['bonsai', 'bonsai tree'],
    wateringFrequency: 3,
    careNotes: 'Bright indirect light. Check soil daily - water when slightly dry. Requires regular pruning and shaping. Humidity tray recommended.',
    plantType: 'tree',
    emoji: '🌲'
  },
  'basil': {
    commonNames: ['basil', 'sweet basil'],
    wateringFrequency: 3,
    careNotes: 'Full sun (6+ hours). Keep soil moist but not waterlogged. Pinch flowers to encourage leaf growth. Harvest frequently.',
    plantType: 'herb',
    emoji: '🌿'
  },
  'mint': {
    commonNames: ['mint', 'peppermint', 'spearmint'],
    wateringFrequency: 3,
    careNotes: 'Partial shade to full sun. Keep soil consistently moist. Very invasive - best grown in containers. Harvest frequently.',
    plantType: 'herb',
    emoji: '🌿'
  },
  'rosemary': {
    commonNames: ['rosemary'],
    wateringFrequency: 7,
    careNotes: 'Full sun. Let soil dry between waterings. Drought tolerant once established. Prune after flowering. Great for cooking.',
    plantType: 'herb',
    emoji: '🌿'
  },
  'lavender': {
    commonNames: ['lavender'],
    wateringFrequency: 10,
    careNotes: 'Full sun. Well-draining soil essential. Water sparingly - hates wet feet. Prune after flowering. Fragrant and attracts pollinators.',
    plantType: 'flower',
    emoji: '🌸'
  },
  'tomato': {
    commonNames: ['tomato', 'tomatoes'],
    wateringFrequency: 2,
    careNotes: 'Full sun (6-8 hours). Deep, consistent watering. Support with stakes or cages. Feed weekly when fruiting. Watch for pests.',
    plantType: 'vegetable',
    emoji: '🌱'
  }
};

// Function to find plant care info based on name
export function findPlantCare(plantName) {
  const searchName = plantName.toLowerCase().trim();
  
  // Check each plant in database
  for (const [key, plant] of Object.entries(plantCareDatabase)) {
    // Check if search name matches any common names
    if (plant.commonNames.some(name => searchName.includes(name) || name.includes(searchName))) {
      return plant;
    }
  }
  
  // If no specific plant found, return general care based on keywords
  if (searchName.includes('succulent') || searchName.includes('cactus')) {
    return plantCareDatabase.succulent;
  }
  if (searchName.includes('fern')) {
    return plantCareDatabase.fern;
  }
  if (searchName.includes('orchid')) {
    return plantCareDatabase.orchid;
  }
  
  return null;
}

// Function to get care tips by plant type
export function getCareByType(plantType) {
  const careTips = {
    houseplant: 'Water when top inch of soil is dry. Most prefer bright indirect light. Rotate occasionally for even growth.',
    succulent: 'Water sparingly - let soil dry completely. Needs bright light and well-draining soil. Less is more!',
    tropical: 'Loves humidity and warmth. Keep soil lightly moist. Mist leaves regularly. Bright indirect light.',
    herb: 'Most herbs need full sun and consistent moisture. Harvest frequently to encourage growth. Good drainage essential.',
    flower: 'Deadhead spent blooms to encourage more flowers. Feed during growing season. Water needs vary by species.',
    vegetable: 'Full sun and consistent watering crucial. Rich soil and regular feeding needed. Monitor for pests.',
    tree: 'Deep watering less frequently is better than shallow frequent watering. Prune for shape and health.',
    cactus: 'Minimal water needed. Full sun preferred. Use special cactus soil. Water more in summer, less in winter.',
    other: 'Research your specific plant\'s needs. Most plants prefer bright indirect light and moderate watering.'
  };
  
  return careTips[plantType] || careTips.other;
}