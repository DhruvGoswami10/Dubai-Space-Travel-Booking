import { Booking } from '../types/booking';

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getSampleBooking = (): Booking => ({
  id: 'sample-1',
  firstName: 'John',
  lastName: 'Doe',
  destinationName: 'Lunar Gateway',
  departureDate: '2024-06-15',
  returnDate: '2024-06-20',
  cabinClass: 'luxury',
  status: 'confirmed',
  createdAt: new Date().toISOString(),
  price: 50000,
  launchPad: 'burj-khalifa'
}); 