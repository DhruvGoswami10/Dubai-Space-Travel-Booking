import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Mock destinations data until ../data/destinations is created
const destinations = [
  {
    id: 1,
    name: "Lunar Orbit",
    description: "Experience weightlessness while orbiting Earth's moon",
    price: "$250,000",
    duration: "5 days",
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0",
    features: ["Zero gravity", "Moon views", "Space training"]
  },
  // Add more mock destinations as needed
];

const Destinations: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="luxury-heading mb-4">Space Travel Destinations</h1>
          <p className="luxury-subheading max-w-2xl mx-auto">
            Choose your next adventure in the cosmos. From lunar orbits to Mars colonies, experience the future of travel.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="luxury-card group hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <div className="aspect-[16/9] bg-luxury-gray rounded-xl overflow-hidden relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col flex-grow p-4">
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-2 text-black">{destination.name}</h3>
                  <p className="text-black/70 mb-4">{destination.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-black font-medium text-lg block">{destination.price}</span>
                        <span className="text-black/60 text-sm block">{destination.duration}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-black">Key Features:</h4>
                      <ul className="space-y-2 text-black/70">
                        {destination.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-black mr-2 mt-1">•</span>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Link to={`/booking?destination=${destination.id}`} className="luxury-button-outline w-full text-center block">
                    <span>Book Now</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations; 