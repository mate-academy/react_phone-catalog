import { Product } from '../types/Product';

// Shared dummy products array
const dummyProducts: Product[] = [
  {
    id: 1,
    category: 'phones',
    name: 'Apple iPhone 11',
    fullPrice: 1100,
    price: 1050,
    screen: "6.1' IPS",
    capacity: '64GB',
    color: 'black',
    ram: '4GB',
    year: 2019,
    image: '/images/iphone11.jpg',
    colorsAvailable: ['black', 'white', 'red'],
    capacityAvailable: ['64GB', '128GB'],
    images: ['/images/iphone11.jpg', '/images/iphone11-2.jpg'],
    description: [{ title: 'Overview', text: ['This is a powerful iPhone.'] }],
    processor: 'Apple A13 Bionic',
  },
  {
    id: 2,
    category: 'phones',
    name: 'Apple iPhone 7',
    fullPrice: 400,
    price: 375,
    screen: "4.7' IPS",
    capacity: '32GB',
    color: 'black',
    ram: '2GB',
    year: 2016,
    image: '/images/iphone7.jpg',
    colorsAvailable: ['black', 'red'],
    capacityAvailable: ['32GB', '64GB'],
    images: ['/images/iphone7.jpg', '/images/iphone7-2.jpg'],
    description: [{ title: 'Overview', text: ['Classic and reliable.'] }],
    processor: 'Apple A10 Fusion',
  },
];

// Simulate fetching a product by its ID.
export const getProductById = async (
  productId: string,
): Promise<Product | null> => {
  return dummyProducts.find(p => p.id.toString() === productId) || null;
};

// Simulate fetching suggested products.
export const getSuggestedProducts = async (
  currentProductId: string,
): Promise<Product[]> => {
  return dummyProducts.filter(p => p.id.toString() !== currentProductId);
};
