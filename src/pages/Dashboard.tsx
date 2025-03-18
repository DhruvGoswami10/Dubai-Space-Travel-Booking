import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { destinations } from '../data/destinations';
import { getStatusColor, formatDate, getSampleBooking } from '../utils/bookingUtils';

interface Booking {
  id: string;
  firstName: string;
  lastName: string;
  destinationName: string;
  departureDate: string;
  returnDate: string;
  cabinClass: string;
  cabinClassName: string;
  cabinClassFeatures: string[];
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  price: number;
  launchPad: string;
}

// Mock user data
const userData = {
  firstName: 'Elon',
  lastName: 'Musk',
  profilePicture: 'https://i.imgur.com/4OxXYmW.jpg',
  tripsCompleted: 3,
  lightYears: 25000
};

const Dashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showBoardingPass, setShowBoardingPass] = useState<string | null>(null);

  // Calculate upcoming trips based on bookings (only pending and confirmed)
  const upcomingTrips = bookings.filter(booking => 
    booking.status === 'pending' || booking.status === 'confirmed'
  ).length;

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]') as Booking[];
    
    // If no bookings exist, add the sample booking
    if (savedBookings.length === 0) {
      const sampleBooking: Booking = {
        id: 'DA2024-001',
        firstName: 'Elon',
        lastName: 'Musk',
        destinationName: 'Mars Colony',
        departureDate: '2024-12-25',
        returnDate: '2025-09-25',
        cabinClass: 'luxury',
        cabinClassName: 'Luxury',
        cabinClassFeatures: [],
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        price: 250000,
        launchPad: 'burj-khalifa'
      };
      localStorage.setItem('bookings', JSON.stringify([sampleBooking]));
      setBookings([sampleBooking]);
    } else {
      setBookings(savedBookings);
    }
  }, []);

  const handleCancelBooking = (bookingId: string) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: 'cancelled' as const } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="luxury-heading mb-8">Your Space Travel Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* User Profile Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="luxury-card p-6"
            >
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-black">
                  <img
                    src={userData.profilePicture}
                    alt={`${userData.firstName} ${userData.lastName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-1">{userData.firstName}</h2>
                <h2 className="text-2xl font-bold mb-6">{userData.lastName}</h2>
                
                <div className="w-full space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Trips Completed</p>
                    <p className="text-2xl font-bold">{userData.tripsCompleted}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Upcoming Trips</p>
                    <p className="text-2xl font-bold">{upcomingTrips}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Light Years</p>
                    <p className="text-2xl font-bold">{userData.lightYears.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bookings Section */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-6">
              {bookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="luxury-card p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {booking.destinationName}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>Passenger: {booking.firstName} {booking.lastName}</p>
                        <p>Departure: {formatDate(booking.departureDate)}</p>
                        <p>Return: {formatDate(booking.returnDate)}</p>
                        <p>Cabin: {booking.cabinClassName}</p>
                        {booking.cabinClassFeatures && booking.cabinClassFeatures.length > 0 && (
                          <div className="mt-2">
                            <p className="font-medium text-blue-600">VIP Features:</p>
                            <ul className="list-disc list-inside">
                              {booking.cabinClassFeatures.map((feature, index) => (
                                <li key={index} className="text-blue-600">{feature}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <p>Launch Pad: {booking.launchPad}</p>
                        <p>Price: ${booking.price.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      
                      <div className="flex gap-2">
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="luxury-button bg-red-600 hover:bg-red-700"
                          >
                            Cancel Booking
                          </button>
                        )}
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => setShowBoardingPass(booking.id)}
                            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                          >
                            View Boarding Pass
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Boarding Pass Modal */}
        <AnimatePresence>
          {showBoardingPass && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg p-8 max-w-md w-full mx-4"
              >
                <div className="text-center">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-black mr-4">
                      <img
                        src={userData.profilePicture}
                        alt={`${userData.firstName} ${userData.lastName}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl font-bold">{userData.firstName}</h3>
                      <h3 className="text-2xl font-bold">{userData.lastName}</h3>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <p className="text-sm text-gray-600">Space Travel Boarding Pass</p>
                      <p className="text-3xl font-bold mt-2">DubAI Space</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div>
                        <p className="text-sm text-gray-600">Flight</p>
                        <p className="font-semibold">DA{showBoardingPass.slice(-4)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Light Years</p>
                        <p className="font-semibold">{userData.lightYears.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">From</p>
                        <p className="font-semibold">Dubai</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">To</p>
                        <p className="font-semibold">
                          {bookings.find(b => b.id === showBoardingPass)?.destinationName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-semibold">
                          {formatDate(bookings.find(b => b.id === showBoardingPass)?.departureDate || '')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Launch Pad</p>
                        <p className="font-semibold">
                          {bookings.find(b => b.id === showBoardingPass)?.launchPad}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <button
                        onClick={() => setShowBoardingPass(null)}
                        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard; 