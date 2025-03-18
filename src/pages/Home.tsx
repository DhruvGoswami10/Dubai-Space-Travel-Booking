import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { destinations } from '../data/destinations';

const Home: React.FC = () => {
  return (
    <div className="space-y-24 pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-luxury-gradient" />
        <div className="absolute inset-0 bg-[url('https://i.imgur.com/hWlsN6Y.jpg')] bg-cover bg-center opacity-60" />
        <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="luxury-heading text-7xl text-black"
          >
            Dubai to the Stars
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="luxury-subheading max-w-2xl mx-auto text-black/80"
          >
            Experience the future of travel with the world's first commercial space travel hub. Where luxury meets the cosmos.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center space-x-4"
          >
            <Link to="/booking" className="luxury-button">
              <span>Book Your Journey</span>
            </Link>
            <Link to="/destinations" className="luxury-button-outline">
              <span>Explore Destinations</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="luxury-heading mb-4 text-black">Featured Destinations</h2>
            <p className="luxury-subheading text-black/80">
              Discover our most exclusive space travel experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.slice(0, 3).map((destination, index) => (
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
                    <p className="text-black/70 mb-4 line-clamp-2">{destination.description}</p>
                  </div>
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="text-black font-medium text-lg block">{destination.price}</span>
                        <span className="text-black/60 text-sm block">{destination.duration}</span>
                      </div>
                    </div>
                    <Link to={`/booking?destination=${destination.id}`} className="luxury-button-outline w-full text-center block">
                      <span>Book Now</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 