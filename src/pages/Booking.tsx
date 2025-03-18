import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { destinations } from '../data/destinations';
import { launchPads } from '../data/launchPads';

const orbitInfo = {
  'lunar-gateway': {
    distance: '384,000 km',
    availability: 'Every week (always in near orbit)',
    duration: '~3–5 days',
    alert: 'Available year-round with weekly departures'
  },
  'mars-colony': {
    distance: '~225 million km',
    availability: 'Every 26 months (Mars-Earth opposition)',
    duration: '~6–9 months',
    alert: 'Next launch window: 2027 (Mars-Earth opposition)'
  },
  'space-hotel': {
    distance: '~500 km',
    availability: 'Daily trips (continuous availability)',
    duration: '~2–4 hours',
    alert: 'Available daily with multiple departure times'
  },
  'venus-cloud': {
    distance: '~41 million km',
    availability: 'Every 19 months (Earth-Venus inferior conjunction)',
    duration: '~3–5 months',
    alert: 'Next launch window: 2026 (Venus inferior conjunction)'
  },
  'jupiter-moon': {
    distance: '~628 million km',
    availability: 'Every 13 months (best launch windows)',
    duration: '~1–2 years',
    alert: 'Next launch window: 2026 (Optimal gravity assist trajectory)'
  },
  'saturn-ring': {
    distance: '~1.2 billion km',
    availability: 'Every 12–15 months (long window)',
    duration: '~2–3 years',
    alert: 'Next launch window: 2027 (Extended gravity assist window)'
  }
};

const cabinClasses = {
  'lunar-gateway': {
    economy: { name: 'Economy Shuttle Seat', price: 250000 },
    luxury: { name: 'Private Cabin', price: 350000 },
    vip: { name: 'VIP Zero-G Elite', price: 500000, features: ['Spacewalk Experience', 'AI Concierge'] }
  },
  'mars-colony': {
    economy: { name: 'Economy Shuttle Seat', price: 1200000 },
    luxury: { name: 'Luxury Cabin', price: 1500000 },
    vip: { name: 'VIP Zero-G Elite', price: 2000000, features: ['VIP Pod', 'Mars Rover Tour'] }
  },
  'space-hotel': {
    economy: { name: 'Economy Shuttle Seat', price: 350000 },
    luxury: { name: 'Luxury Cabin', price: 500000 },
    vip: { name: 'VIP Zero-G Elite', price: 750000, features: ['Earth-View Suite', 'Space Spa Access'] }
  },
  'venus-cloud': {
    economy: { name: 'Economy Shuttle Seat', price: 850000 },
    luxury: { name: 'Luxury Cabin', price: 1000000 },
    vip: { name: 'VIP Zero-G Elite', price: 1300000, features: ['Cloud Cruise Experience', 'AI Guide'] }
  },
  'jupiter-moon': {
    economy: { name: 'Economy Shuttle Seat', price: 1500000 },
    luxury: { name: 'Luxury Cabin', price: 2000000 },
    vip: { name: 'VIP Zero-G Elite', price: 2500000, features: ['Europa Cave Tour', 'VIP Suite'] }
  },
  'saturn-ring': {
    economy: { name: 'Economy Shuttle Seat', price: 2000000 },
    luxury: { name: 'Luxury Cabin', price: 2500000 },
    vip: { name: 'VIP Zero-G Elite', price: 3200000, features: ['Ringside Villa', 'AI Butler'] }
  }
};

const Booking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    destination: searchParams.get('destination') || '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    cabinClass: 'economy',
    specialRequests: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    launchPad: '',
  });

  const [currentTip, setCurrentTip] = useState(0);
  const selectedDestination = destinations.find(dest => dest.id === formData.destination);

  const tips = [
    "Pro tip: Book during off-peak seasons for better rates and availability",
    "Consider adding travel insurance for peace of mind during your space journey",
    "Early booking can save you up to 20% on your space travel experience",
    "Our luxury suites offer the best views of Earth from space",
    "Zero-gravity training is recommended before your journey",
    "Pack light - we provide all necessary space gear",
    "Check our weather forecast for optimal launch conditions",
    "Join our pre-flight orientation for a smoother experience",
    "Our AI systems ensure the safest possible journey",
    "Experience the thrill of space with our expert crew"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000); // Change tip every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
    
    // Calculate price based on cabin class
    const price = selectedDestination && formData.cabinClass
      ? cabinClasses[selectedDestination.id as keyof typeof cabinClasses][formData.cabinClass as keyof typeof cabinClasses['lunar-gateway']].price
      : 0;

    // Create booking object
    const booking = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      price: price,
      destinationName: selectedDestination?.name || '',
      cabinClassName: selectedDestination && formData.cabinClass
        ? cabinClasses[selectedDestination.id as keyof typeof cabinClasses][formData.cabinClass as keyof typeof cabinClasses['lunar-gateway']].name
        : '',
      cabinClassFeatures: selectedDestination && formData.cabinClass === 'vip'
        ? cabinClasses[selectedDestination.id as keyof typeof cabinClasses].vip.features
        : []
    };

    // Get existing bookings or initialize empty array
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    
    // Add new booking
    localStorage.setItem('bookings', JSON.stringify([...existingBookings, booking]));

    // Show confirmation message
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Calculate minimum departure date based on selected destination
  const getMinDepartureDate = () => {
    if (!selectedDestination) return today;

    const now = new Date();
    const year = now.getFullYear();

    switch (selectedDestination.id) {
      case 'lunar-gateway':
      case 'space-hotel':
        return today; // Available daily
      case 'mars-colony':
        return '2027-01-01'; // Next Mars window
      case 'venus-cloud':
        return '2026-01-01'; // Next Venus window
      case 'jupiter-moon':
        return '2026-01-01'; // Next Jupiter window
      case 'saturn-ring':
        return '2027-01-01'; // Next Saturn window
      default:
        return today;
    }
  };

  // Calculate maximum departure date based on selected destination
  const getMaxDepartureDate = () => {
    if (!selectedDestination) return '';

    const now = new Date();
    const year = now.getFullYear();

    switch (selectedDestination.id) {
      case 'lunar-gateway':
      case 'space-hotel':
        return ''; // No maximum date
      case 'mars-colony':
        return '2027-12-31'; // Mars window
      case 'venus-cloud':
        return '2026-12-31'; // Venus window
      case 'jupiter-moon':
        return '2026-12-31'; // Jupiter window
      case 'saturn-ring':
        return '2027-12-31'; // Saturn window
      default:
        return '';
    }
  };

  // Calculate minimum return date based on selected destination
  const getMinReturnDate = () => {
    if (!formData.departureDate) return today;

    const departureDate = new Date(formData.departureDate);
    const minReturnDate = new Date(departureDate);

    if (!selectedDestination) return formData.departureDate;

    switch (selectedDestination.id) {
      case 'lunar-gateway':
        minReturnDate.setDate(departureDate.getDate() + 3); // Minimum 3 days
        break;
      case 'space-hotel':
        minReturnDate.setHours(departureDate.getHours() + 2); // Minimum 2 hours
        break;
      case 'mars-colony':
        minReturnDate.setMonth(departureDate.getMonth() + 6); // Minimum 6 months
        break;
      case 'venus-cloud':
        minReturnDate.setMonth(departureDate.getMonth() + 3); // Minimum 3 months
        break;
      case 'jupiter-moon':
        minReturnDate.setFullYear(departureDate.getFullYear() + 1); // Minimum 1 year
        break;
      case 'saturn-ring':
        minReturnDate.setFullYear(departureDate.getFullYear() + 2); // Minimum 2 years
        break;
    }

    return minReturnDate.toISOString().split('T')[0];
  };

  // Calculate maximum return date based on selected destination
  const getMaxReturnDate = () => {
    if (!formData.departureDate || !selectedDestination) return '';

    const departureDate = new Date(formData.departureDate);
    const maxReturnDate = new Date(departureDate);

    switch (selectedDestination.id) {
      case 'lunar-gateway':
        maxReturnDate.setDate(departureDate.getDate() + 5); // Maximum 5 days
        break;
      case 'space-hotel':
        maxReturnDate.setHours(departureDate.getHours() + 4); // Maximum 4 hours
        break;
      case 'mars-colony':
        maxReturnDate.setMonth(departureDate.getMonth() + 9); // Maximum 9 months
        break;
      case 'venus-cloud':
        maxReturnDate.setMonth(departureDate.getMonth() + 5); // Maximum 5 months
        break;
      case 'jupiter-moon':
        maxReturnDate.setFullYear(departureDate.getFullYear() + 2); // Maximum 2 years
        break;
      case 'saturn-ring':
        maxReturnDate.setFullYear(departureDate.getFullYear() + 3); // Maximum 3 years
        break;
    }

    return maxReturnDate.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl mx-auto px-4"
      >
        <div className="text-center mb-6">
          <h1 className="luxury-heading mb-2">Book Your Space Journey</h1>
          <p className="luxury-subheading text-sm">
            Experience the future of travel with our exclusive space destinations
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Destination Preview */}
          <div className="lg:col-span-1">
            <div className="luxury-card h-full">
              {selectedDestination ? (
                <div className="space-y-4">
                  <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                    <motion.img
                      key={selectedDestination.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      src={selectedDestination.image}
                      alt={selectedDestination.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <motion.div
                    key={`content-${selectedDestination.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">{selectedDestination.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3">{selectedDestination.description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>Duration: {selectedDestination.duration}</p>
                      <p>Price: ${selectedDestination.price.toLocaleString()}</p>
                    </div>
                  </motion.div>

                  {/* Orbit Information */}
                  <motion.div
                    key={`orbit-${selectedDestination.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      <span className="text-sm font-medium text-blue-700">Orbit Information</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-blue-600 font-medium">{orbitInfo[selectedDestination.id as keyof typeof orbitInfo].alert}</p>
                      <div className="text-gray-600">
                        <p>Distance: {orbitInfo[selectedDestination.id as keyof typeof orbitInfo].distance}</p>
                        <p>Availability: {orbitInfo[selectedDestination.id as keyof typeof orbitInfo].availability}</p>
                        <p>Journey Duration: {orbitInfo[selectedDestination.id as keyof typeof orbitInfo].duration}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                    <motion.img
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      src="https://i.imgur.com/hWlsN6Y.jpg"
                      alt="Default Space Destination"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <motion.div
                    key="default-content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center"
                  >
                    <p className="text-gray-600 font-medium">Select a destination</p>
                  </motion.div>
                </div>
              )}
              
              {/* AI Tip Advisor */}
              {!selectedDestination && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-sm font-medium text-gray-700">AI Travel Advisor</span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentTip}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="text-sm text-gray-600 italic"
                    >
                      {tips[currentTip]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="luxury-card space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1 text-black">Destination</label>
                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="luxury-input w-full focus:ring-black focus:border-black"
                  >
                    <option value="">Select Destination</option>
                    {destinations.map(dest => (
                      <option key={dest.id} value={dest.id}>{dest.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-black">Cabin Class</label>
                  <select
                    name="cabinClass"
                    value={formData.cabinClass}
                    onChange={handleChange}
                    className="luxury-input w-full focus:ring-black focus:border-black"
                  >
                    <option value="">Select Cabin Class</option>
                    {selectedDestination && cabinClasses[selectedDestination.id as keyof typeof cabinClasses] && (
                      <>
                        <option value="economy">
                          {cabinClasses[selectedDestination.id as keyof typeof cabinClasses].economy.name} - ${cabinClasses[selectedDestination.id as keyof typeof cabinClasses].economy.price.toLocaleString()}
                        </option>
                        <option value="luxury">
                          {cabinClasses[selectedDestination.id as keyof typeof cabinClasses].luxury.name} - ${cabinClasses[selectedDestination.id as keyof typeof cabinClasses].luxury.price.toLocaleString()}
                        </option>
                        <option value="vip">
                          {cabinClasses[selectedDestination.id as keyof typeof cabinClasses].vip.name} - ${cabinClasses[selectedDestination.id as keyof typeof cabinClasses].vip.price.toLocaleString()}
                        </option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-black">Departure Date</label>
                  <input
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleChange}
                    min={getMinDepartureDate()}
                    max={getMaxDepartureDate()}
                    className="luxury-input w-full focus:ring-black focus:border-black"
                  />
                  {selectedDestination && (
                    <p className="mt-1 text-xs text-gray-500">
                      {orbitInfo[selectedDestination.id as keyof typeof orbitInfo].availability}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-black">Return Date</label>
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleChange}
                    min={getMinReturnDate()}
                    max={getMaxReturnDate()}
                    className="luxury-input w-full focus:ring-black focus:border-black"
                  />
                  {selectedDestination && (
                    <div className="mt-1 space-y-1">
                      <p className="text-xs text-gray-500">
                        Minimum stay: {orbitInfo[selectedDestination.id as keyof typeof orbitInfo].duration}
                      </p>
                      <p className="text-xs text-gray-500">
                        Maximum stay: {orbitInfo[selectedDestination.id as keyof typeof orbitInfo].duration.replace('~', 'Maximum ')}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-black">Number of Passengers</label>
                  <input
                    type="number"
                    name="passengers"
                    min="1"
                    max="4"
                    value={formData.passengers}
                    onChange={handleChange}
                    className="luxury-input w-full focus:ring-black focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-black">Launch Pad</label>
                  <select
                    name="launchPad"
                    value={formData.launchPad}
                    onChange={handleChange}
                    className="luxury-input w-full focus:ring-black focus:border-black"
                    required
                  >
                    <option value="">Select Launch Pad</option>
                    {launchPads.map(pad => (
                      <option key={pad.id} value={pad.id}>{pad.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-black">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="luxury-input w-full focus:ring-black focus:border-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-black">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="luxury-input w-full focus:ring-black focus:border-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-black">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="luxury-input w-full focus:ring-black focus:border-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-black">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="luxury-input w-full focus:ring-black focus:border-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-black">Special Requests</label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows={2}
                  className="luxury-input w-full focus:ring-black focus:border-black"
                  placeholder="Any special requirements or preferences..."
                />
              </div>

              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="luxury-button group relative overflow-hidden px-8 py-2 active:scale-95 transition-transform duration-200"
                >
                  <span className="relative z-10 group-hover:text-white transition-all duration-500 ease-in-out">
                    Confirm Booking
                  </span>
                  <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out origin-left" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showConfirmation && (
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
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Booking Submitted!</h3>
                  <p className="text-gray-600 mb-4">
                    Your booking is pending confirmation. You will receive:
                    {formData.cabinClass === 'luxury' || formData.cabinClass === 'vip' ? (
                      <span className="block mt-2 text-blue-600">A call from our concierge team within 24 hours</span>
                    ) : (
                      <span className="block mt-2 text-blue-600">An email confirmation within 48 hours</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Booking; 