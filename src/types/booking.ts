export interface Booking {
  id: string;
  firstName: string;
  lastName: string;
  destinationName: string;
  departureDate: string;
  returnDate: string;
  cabinClass: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  price: number;
  launchPad: string;
} 