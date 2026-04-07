export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  address: string;
  image: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  description: string;
  openTime: string;
  closeTime: string;
  tables: Table[];
  reviews: Review[];
  availableSlots: TimeSlot[];
};

export type Table = {
  id: string;
  restaurantId: string;
  number: number;
  capacity: number;
  location: string;
  description: string;
};

export type Review = {
  id: string;
  restaurantId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
};

export type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
};

export type Booking = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  tableId: string;
  tableNumber: number;
  tableLocation: string;
  userId: string;
  userName: string;
  userEmail: string;
  date: string;
  time: string;
  partySize: number;
  allergies: string[];
  specialRequests: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
};

export const ALLERGY_OPTIONS = [
  'Gluten',
  'Dairy',
  'Nuts',
  'Shellfish',
  'Eggs',
  'Soy',
  'Fish',
  'Sesame',
  'Wheat',
  'Peanuts',
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Casa Maiz',
    cuisine: 'Mexican Contemporary',
    location: 'Manhattan, NY',
    address: '123 Fifth Avenue, New York, NY 10001',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    rating: 4.8,
    reviewCount: 342,
    priceRange: '$$$',
    description: 'Award-winning contemporary Mexican cuisine in the heart of Manhattan. Our chefs blend traditional flavors with modern techniques.',
    openTime: '11:00',
    closeTime: '23:00',
    tables: [
      { id: 't1', restaurantId: '1', number: 1, capacity: 2, location: 'Window', description: 'Romantic window seat with city view' },
      { id: 't2', restaurantId: '1', number: 2, capacity: 4, location: 'Main Floor', description: 'Central dining area' },
      { id: 't3', restaurantId: '1', number: 3, capacity: 6, location: 'Private Room', description: 'Semi-private dining area' },
      { id: 't4', restaurantId: '1', number: 4, capacity: 2, location: 'Bar Area', description: 'Adjacent to the cocktail bar' },
      { id: 't5', restaurantId: '1', number: 5, capacity: 8, location: 'Patio', description: 'Outdoor terrace seating' },
    ],
    reviews: [
      { id: 'r1', restaurantId: '1', userName: 'Sarah M.', userAvatar: '', rating: 5, comment: 'Absolutely incredible food and ambiance. The mole negro is divine!', date: '2024-07-15' },
      { id: 'r2', restaurantId: '1', userName: 'James K.', userAvatar: '', rating: 4, comment: 'Great service, amazing tacos. Will definitely come back.', date: '2024-07-10' },
      { id: 'r3', restaurantId: '1', userName: 'Lisa P.', userAvatar: '', rating: 5, comment: 'Best Mexican food in NYC. The chef table experience was memorable.', date: '2024-07-08' },
    ],
    availableSlots: [
      { id: 's1', time: '12:00', available: true },
      { id: 's2', time: '12:30', available: true },
      { id: 's3', time: '13:00', available: false },
      { id: 's4', time: '18:00', available: true },
      { id: 's5', time: '18:30', available: true },
      { id: 's6', time: '19:00', available: true },
      { id: 's7', time: '19:30', available: false },
      { id: 's8', time: '20:00', available: true },
      { id: 's9', time: '20:30', available: true },
      { id: 's10', time: '21:00', available: true },
    ],
  },
  {
    id: '2',
    name: 'El Elote',
    cuisine: 'Modern Mexican',
    location: 'Brooklyn, NY',
    address: '456 Atlantic Avenue, Brooklyn, NY 11217',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    rating: 4.6,
    reviewCount: 218,
    priceRange: '$$',
    description: 'Vibrant and casual dining featuring seasonal corn-based dishes inspired by regional Mexican traditions.',
    openTime: '12:00',
    closeTime: '22:00',
    tables: [
      { id: 't6', restaurantId: '2', number: 1, capacity: 2, location: 'Garden', description: 'Outdoor garden seating' },
      { id: 't7', restaurantId: '2', number: 2, capacity: 4, location: 'Main Floor', description: 'Main dining room' },
      { id: 't8', restaurantId: '2', number: 3, capacity: 4, location: 'Main Floor', description: 'Near the open kitchen' },
      { id: 't9', restaurantId: '2', number: 4, capacity: 6, location: 'Lounge', description: 'Relaxed lounge area' },
    ],
    reviews: [
      { id: 'r4', restaurantId: '2', userName: 'Mike T.', userAvatar: '', rating: 5, comment: 'Hidden gem! The street corn appetizer is worth the trip alone.', date: '2024-07-12' },
      { id: 'r5', restaurantId: '2', userName: 'Anna L.', userAvatar: '', rating: 4, comment: 'Loved the atmosphere and the margaritas are superb.', date: '2024-07-05' },
    ],
    availableSlots: [
      { id: 's11', time: '12:00', available: true },
      { id: 's12', time: '13:00', available: true },
      { id: 's13', time: '14:00', available: true },
      { id: 's14', time: '18:00', available: false },
      { id: 's15', time: '19:00', available: true },
      { id: 's16', time: '20:00', available: true },
      { id: 's17', time: '21:00', available: false },
    ],
  },
  {
    id: '3',
    name: 'Tortilla Sky',
    cuisine: 'Upscale Mexican',
    location: 'West Village, NY',
    address: '789 Hudson Street, New York, NY 10014',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    rating: 4.9,
    reviewCount: 567,
    priceRange: '$$$$',
    description: 'An elevated dining experience celebrating the rich heritage of Mexican gastronomy with a rooftop terrace overlooking the city.',
    openTime: '17:00',
    closeTime: '23:30',
    tables: [
      { id: 't10', restaurantId: '3', number: 1, capacity: 2, location: 'Rooftop', description: 'Rooftop with skyline view' },
      { id: 't11', restaurantId: '3', number: 2, capacity: 2, location: 'Rooftop', description: 'Intimate rooftop table' },
      { id: 't12', restaurantId: '3', number: 3, capacity: 4, location: 'Main Floor', description: "Chef's counter experience" },
      { id: 't13', restaurantId: '3', number: 4, capacity: 6, location: 'Private Dining', description: 'Exclusive private room' },
      { id: 't14', restaurantId: '3', number: 5, capacity: 8, location: 'Main Floor', description: 'Large group table' },
    ],
    reviews: [
      { id: 'r6', restaurantId: '3', userName: 'Carlos R.', userAvatar: '', rating: 5, comment: 'The tasting menu is a work of art. Every dish tells a story.', date: '2024-07-14' },
      { id: 'r7', restaurantId: '3', userName: 'Emily W.', userAvatar: '', rating: 5, comment: 'Perfect anniversary dinner. The rooftop at sunset is magical.', date: '2024-07-09' },
      { id: 'r8', restaurantId: '3', userName: 'David N.', userAvatar: '', rating: 4, comment: 'Exceptional cuisine but pricey. Worth the splurge for special occasions.', date: '2024-07-02' },
    ],
    availableSlots: [
      { id: 's18', time: '17:30', available: true },
      { id: 's19', time: '18:00', available: false },
      { id: 's20', time: '18:30', available: true },
      { id: 's21', time: '19:00', available: true },
      { id: 's22', time: '19:30', available: false },
      { id: 's23', time: '20:00', available: true },
      { id: 's24', time: '20:30', available: true },
      { id: 's25', time: '21:00', available: false },
      { id: 's26', time: '21:30', available: true },
    ],
  },
  {
    id: '4',
    name: 'Maizal',
    cuisine: 'Mexican Fusion',
    location: 'Soho, NY',
    address: '321 Spring Street, New York, NY 10013',
    image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&q=80',
    rating: 4.5,
    reviewCount: 189,
    priceRange: '$$$',
    description: 'Where Mexican tradition meets global culinary innovation. Our fusion menu surprises and delights at every turn.',
    openTime: '11:30',
    closeTime: '22:30',
    tables: [
      { id: 't15', restaurantId: '4', number: 1, capacity: 2, location: 'Window', description: 'Street-facing window table' },
      { id: 't16', restaurantId: '4', number: 2, capacity: 4, location: 'Main Floor', description: 'Central dining area' },
      { id: 't17', restaurantId: '4', number: 3, capacity: 4, location: 'Mezzanine', description: 'Upper level overlooking main floor' },
      { id: 't18', restaurantId: '4', number: 4, capacity: 6, location: 'Basement', description: 'Intimate underground dining cave' },
    ],
    reviews: [
      { id: 'r9', restaurantId: '4', userName: 'Priya S.', userAvatar: '', rating: 5, comment: 'The Korean-Mexican tacos are a revelation. Must try!', date: '2024-07-11' },
      { id: 'r10', restaurantId: '4', userName: 'Tom B.', userAvatar: '', rating: 4, comment: 'Creative menu and great cocktail list. Service could be faster.', date: '2024-07-06' },
    ],
    availableSlots: [
      { id: 's27', time: '11:30', available: true },
      { id: 's28', time: '12:00', available: true },
      { id: 's29', time: '12:30', available: false },
      { id: 's30', time: '13:00', available: true },
      { id: 's31', time: '18:00', available: true },
      { id: 's32', time: '18:30', available: true },
      { id: 's33', time: '19:00', available: false },
      { id: 's34', time: '19:30', available: true },
      { id: 's35', time: '20:00', available: true },
    ],
  },
  {
    id: '5',
    name: 'Pueblo Verde',
    cuisine: 'Traditional Mexican',
    location: 'Astoria, NY',
    address: '654 Ditmars Blvd, Astoria, NY 11105',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
    rating: 4.7,
    reviewCount: 423,
    priceRange: '$$',
    description: 'Authentic family recipes passed down through generations. A true taste of Mexico in the heart of Queens.',
    openTime: '10:00',
    closeTime: '22:00',
    tables: [
      { id: 't19', restaurantId: '5', number: 1, capacity: 4, location: 'Main Floor', description: 'Family-style central table' },
      { id: 't20', restaurantId: '5', number: 2, capacity: 6, location: 'Courtyard', description: 'Open-air courtyard' },
      { id: 't21', restaurantId: '5', number: 3, capacity: 2, location: 'Counter', description: 'Counter seating watching the kitchen' },
      { id: 't22', restaurantId: '5', number: 4, capacity: 8, location: 'Private Room', description: 'Large family room' },
    ],
    reviews: [
      { id: 'r11', restaurantId: '5', userName: 'Maria G.', userAvatar: '', rating: 5, comment: 'This is exactly how my abuela cooks. Authentic and heartwarming.', date: '2024-07-13' },
      { id: 'r12', restaurantId: '5', userName: 'Kevin O.', userAvatar: '', rating: 5, comment: 'Best value in NYC for real Mexican food. The enchiladas are perfection.', date: '2024-07-07' },
      { id: 'r13', restaurantId: '5', userName: 'Rachel H.', userAvatar: '', rating: 4, comment: 'Lovely neighborhood spot. The horchata is housemade and delicious.', date: '2024-07-03' },
    ],
    availableSlots: [
      { id: 's36', time: '10:00', available: true },
      { id: 's37', time: '11:00', available: true },
      { id: 's38', time: '12:00', available: true },
      { id: 's39', time: '13:00', available: false },
      { id: 's40', time: '14:00', available: true },
      { id: 's41', time: '18:00', available: true },
      { id: 's42', time: '19:00', available: true },
      { id: 's43', time: '20:00', available: false },
      { id: 's44', time: '21:00', available: true },
    ],
  },
  {
    id: '6',
    name: 'Mezcal & Corn',
    cuisine: 'Oaxacan Mexican',
    location: 'Lower East Side, NY',
    address: '987 Orchard Street, New York, NY 10002',
    image: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=800&q=80',
    rating: 4.8,
    reviewCount: 294,
    priceRange: '$$$',
    description: 'Specializing in the bold, smoky flavors of Oaxaca with an extensive mezcal selection and artisanal tortillas made fresh daily.',
    openTime: '16:00',
    closeTime: '00:00',
    tables: [
      { id: 't23', restaurantId: '6', number: 1, capacity: 2, location: 'Bar', description: 'Mezcal bar seating' },
      { id: 't24', restaurantId: '6', number: 2, capacity: 4, location: 'Main Floor', description: 'Main dining room' },
      { id: 't25', restaurantId: '6', number: 3, capacity: 4, location: 'Main Floor', description: 'Near the mezcal display wall' },
      { id: 't26', restaurantId: '6', number: 4, capacity: 6, location: 'Cellar', description: 'Underground barrel room' },
    ],
    reviews: [
      { id: 'r14', restaurantId: '6', userName: 'Sofia B.', userAvatar: '', rating: 5, comment: 'The mole negro and their mezcal selection is unmatched in the city.', date: '2024-07-16' },
      { id: 'r15', restaurantId: '6', userName: 'Alex F.', userAvatar: '', rating: 4, comment: 'Dark, moody atmosphere. Perfect date night spot. The tlayuda is a must.', date: '2024-07-04' },
    ],
    availableSlots: [
      { id: 's45', time: '16:00', available: true },
      { id: 's46', time: '17:00', available: true },
      { id: 's47', time: '18:00', available: false },
      { id: 's48', time: '19:00', available: true },
      { id: 's49', time: '20:00', available: true },
      { id: 's50', time: '21:00', available: true },
      { id: 's51', time: '22:00', available: false },
      { id: 's52', time: '23:00', available: true },
    ],
  },
];

export const DEMO_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    restaurantId: '1',
    restaurantName: 'Casa Maiz',
    tableId: 't1',
    tableNumber: 1,
    tableLocation: 'Window',
    userId: 'u1',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    date: '2024-07-20',
    time: '19:00',
    partySize: 2,
    allergies: ['Gluten', 'Dairy'],
    specialRequests: 'Anniversary dinner, please prepare a surprise',
    status: 'confirmed',
    createdAt: '2024-07-15T10:30:00Z',
  },
  {
    id: 'b2',
    restaurantId: '1',
    restaurantName: 'Casa Maiz',
    tableId: 't2',
    tableNumber: 2,
    tableLocation: 'Main Floor',
    userId: 'u2',
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    date: '2024-07-20',
    time: '20:00',
    partySize: 4,
    allergies: ['Nuts'],
    specialRequests: '',
    status: 'confirmed',
    createdAt: '2024-07-14T14:00:00Z',
  },
  {
    id: 'b3',
    restaurantId: '1',
    restaurantName: 'Casa Maiz',
    tableId: 't3',
    tableNumber: 3,
    tableLocation: 'Private Room',
    userId: 'u3',
    userName: 'Bob Wilson',
    userEmail: 'bob@example.com',
    date: '2024-07-20',
    time: '18:30',
    partySize: 6,
    allergies: [],
    specialRequests: 'Business dinner',
    status: 'pending',
    createdAt: '2024-07-16T09:00:00Z',
  },
  {
    id: 'b4',
    restaurantId: '1',
    restaurantName: 'Casa Maiz',
    tableId: 't5',
    tableNumber: 5,
    tableLocation: 'Patio',
    userId: 'u4',
    userName: 'Alice Chen',
    userEmail: 'alice@example.com',
    date: '2024-07-20',
    time: '19:30',
    partySize: 8,
    allergies: ['Shellfish', 'Fish'],
    specialRequests: 'Outdoor seating preferred',
    status: 'confirmed',
    createdAt: '2024-07-13T11:30:00Z',
  },
  {
    id: 'b5',
    restaurantId: '1',
    restaurantName: 'Casa Maiz',
    tableId: 't4',
    tableNumber: 4,
    tableLocation: 'Bar Area',
    userId: 'u5',
    userName: 'Mark Davis',
    userEmail: 'mark@example.com',
    date: '2024-07-20',
    time: '21:00',
    partySize: 2,
    allergies: ['Soy'],
    specialRequests: '',
    status: 'confirmed',
    createdAt: '2024-07-17T16:00:00Z',
  },
];
