export interface Destination {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  features: string[];
}

export const destinations: Destination[] = [
  {
    id: 'lunar-gateway',
    name: 'Lunar Gateway Station',
    description: 'Experience the thrill of living in Earth\'s orbit at our state-of-the-art lunar gateway station. Enjoy panoramic views of Earth and the Moon while experiencing the unique sensation of microgravity.',
    price: 'Starting at $250,000',
    duration: '3-5 days',
    image: 'https://i.imgur.com/zaS3BCo.jpg',
    features: [
      'Earth observation deck',
      'Microgravity training',
      'Space suit experience',
      'Lunar surface simulation'
    ]
  },
  {
    id: 'mars-colony',
    name: 'Mars Colony Resort',
    description: 'Be among the first to experience life on Mars at our luxury resort. Built with cutting-edge technology, our facility offers a safe and comfortable environment while maintaining the authentic Martian experience.',
    price: 'Starting at $1,200,000',
    duration: '6-9 months',
    image: 'https://i.imgur.com/FIjO1r7.jpg',
    features: [
      'Martian surface exploration',
      'Red planet observation',
      'Mars habitat experience',
      'Space radiation protection training'
    ]
  },
  {
    id: 'space-hotel',
    name: 'Space Hotel Dubai',
    description: 'The world\'s first luxury space hotel, offering an unparalleled experience of living in orbit. Enjoy gourmet space cuisine, zero-gravity entertainment, and breathtaking views of Earth.',
    price: 'Starting at $350,000',
    duration: '2-4 hours',
    image: 'https://i.imgur.com/F5Hrgbh.jpg',
    features: [
      'Zero-gravity pool',
      'Space cuisine dining',
      'Earth observation lounge',
      'Orbital spacewalk experience'
    ]
  },
  {
    id: 'venus-cloud',
    name: 'Venus Cloud City',
    description: 'Float among the clouds of Venus in our revolutionary floating city. Experience the unique atmosphere and stunning views of the Venusian sky.',
    price: 'Starting at $850,000',
    duration: '3-5 months',
    image: 'https://i.imgur.com/FlTIPYX.jpg',
    features: [
      'Cloud-top observation decks',
      'Venusian atmosphere tours',
      'Floating city exploration',
      'High-pressure environment training'
    ]
  },
  {
    id: 'jupiter-moon',
    name: 'Jupiter\'s Moon Resort',
    description: 'Visit Europa, one of Jupiter\'s most fascinating moons. Experience the unique ice-covered surface and potential for discovering extraterrestrial life.',
    price: 'Starting at $1,500,000',
    duration: '1-2 years',
    image: 'https://i.imgur.com/vg1Bre5.jpg',
    features: [
      'Ice surface exploration',
      'Subsurface ocean tours',
      'Jupiter observation',
      'Extreme cold training'
    ]
  },
  {
    id: 'saturn-ring',
    name: 'Saturn Ring Station',
    description: 'Orbit Saturn and experience the breathtaking views of its iconic rings. Stay in our luxury station while observing the gas giant and its many moons.',
    price: 'Starting at $2,000,000',
    duration: '2-3 years',
    image: 'https://i.imgur.com/OZ9F0Tm.jpg',
    features: [
      'Ring system observation',
      'Saturn moon tours',
      'Long-duration space stay',
      'Advanced space training'
    ]
  }
]; 