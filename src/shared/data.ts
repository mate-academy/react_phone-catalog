import type { Product, Category } from './types';

export const products: Product[] = [
  {
    id: 1,
    category: 'phones',
    title: 'iPhone 11',
    price: 499,
    fullPrice: 599,
    year: 2019,
    capacity: '128GB',
    color: 'Black',
    description:
      'A powerful smartphone with a Liquid Retina display and advanced ' +
      'dual-camera system.',
    specs: [
      '6.1" Liquid Retina display',
      '12MP dual camera',
      '4GB RAM',
      'Lightning',
    ],
    image: '/img/phones/apple-iphone-11/black/00.webp',
  },
  {
    id: 2,
    category: 'phones',
    title: 'iPhone 11 Pro',
    price: 599,
    fullPrice: 699,
    year: 2019,
    capacity: '256GB',
    color: 'Midnight Green',
    description:
      'A premium smartphone with a Super Retina XDR display and ' +
      'triple-camera system.',
    specs: [
      '5.8" Super Retina XDR display',
      '12MP triple camera',
      '4GB RAM',
      'Fast charging',
    ],
    image: '/img/phones/apple-iphone-11-pro/midnightgreen/00.webp',
  },
  {
    id: 3,
    category: 'phones',
    title: 'iPhone 12',
    price: 649,
    fullPrice: 749,
    year: 2020,
    capacity: '128GB',
    color: 'Black',
    description:
      'A modern smartphone with an OLED display, A14 Bionic chip and ' +
      '5G connectivity.',
    specs: [
      '6.1" Super Retina XDR display',
      '12MP dual camera',
      '4GB RAM',
      '5G',
    ],
    image: '/img/phones/apple-iphone-12/black/00.webp',
  },
  {
    id: 4,
    category: 'phones',
    title: 'iPhone 13 mini',
    price: 699,
    fullPrice: 799,
    year: 2021,
    capacity: '128GB',
    color: 'Blue',
    description:
      'A compact smartphone with powerful performance, OLED display ' +
      'and advanced cameras.',
    specs: [
      '5.4" Super Retina XDR display',
      '12MP dual camera',
      '4GB RAM',
      '5G',
    ],
    image: '/img/phones/apple-iphone-13-mini/blue/00.webp',
  },
  {
    id: 5,
    category: 'phones',
    title: 'iPhone 13 Pro Max',
    price: 899,
    fullPrice: 999,
    year: 2021,
    capacity: '256GB',
    color: 'Graphite',
    description:
      'A large premium smartphone with ProMotion display and a ' +
      'professional camera system.',
    specs: [
      '6.7" Super Retina XDR display',
      '12MP Pro camera system',
      '6GB RAM',
      '120Hz ProMotion',
    ],
    image: '/img/phones/apple-iphone-13-pro-max/graphite/00.webp',
  },
  {
    id: 6,
    category: 'phones',
    title: 'iPhone 14 Pro',
    price: 999,
    fullPrice: 1099,
    year: 2022,
    capacity: '256GB',
    color: 'Space Black',
    description:
      'A professional smartphone with an advanced camera system, ' +
      'Dynamic Island and Always-On display.',
    specs: [
      '6.1" Super Retina XDR display',
      '48MP Pro camera system',
      '6GB RAM',
      'Dynamic Island',
    ],
    image: '/img/phones/apple-iphone-14-pro/spaceblack/00.webp',
  },
  {
    id: 7,
    category: 'tablets',
    title: 'iPad 10.2 2020',
    price: 329,
    fullPrice: 399,
    year: 2020,
    capacity: '32GB',
    color: 'Silver',
    description:
      'A versatile tablet for studying, browsing the web, entertainment ' +
      'and everyday tasks.',
    specs: ['10.2" Retina display', '8MP camera', '3GB RAM', 'Lightning'],
    image: '/img/tablets/apple-ipad-10-2-2020/silver/00.webp',
  },
  {
    id: 8,
    category: 'tablets',
    title: 'iPad Air 4',
    price: 499,
    fullPrice: 599,
    year: 2020,
    capacity: '64GB',
    color: 'Green',
    description:
      'A powerful and lightweight tablet with a modern design and ' +
      'excellent performance.',
    specs: ['10.9" Liquid Retina display', '12MP camera', '4GB RAM', 'USB-C'],
    image: '/img/tablets/apple-ipad-air-4th-gen/green/00.webp',
  },
  {
    id: 9,
    category: 'tablets',
    title: 'iPad mini 5',
    price: 399,
    fullPrice: 499,
    year: 2019,
    capacity: '64GB',
    color: 'Silver',
    description:
      'A compact tablet with a sharp Retina display and powerful ' +
      'performance.',
    specs: ['7.9" Retina display', '8MP camera', '3GB RAM', 'Lightning'],
    image: '/img/tablets/apple-ipad-mini-5th-gen/silver/00.webp',
  },
  {
    id: 10,
    category: 'tablets',
    title: 'iPad mini 6',
    price: 549,
    fullPrice: 649,
    year: 2021,
    capacity: '64GB',
    color: 'Pink',
    description:
      'A compact modern tablet with an edge-to-edge display and ' +
      'USB-C connectivity.',
    specs: ['8.3" Liquid Retina display', '12MP camera', '4GB RAM', 'USB-C'],
    image: '/img/tablets/apple-ipad-mini-6th-gen/pink/00.webp',
  },
  {
    id: 11,
    category: 'accessories',
    title: 'Apple Watch SE',
    price: 199,
    fullPrice: 249,
    year: 2020,
    capacity: '40mm',
    color: 'Gold',
    description:
      'A versatile smartwatch for notifications, workouts and everyday ' +
      'activity tracking.',
    specs: [
      'Retina OLED display',
      'GPS',
      'Heart-rate sensor',
      'Water resistant',
    ],
    image: '/img/accessories/apple-watch-se/gold/00.webp',
  },
  {
    id: 12,
    category: 'accessories',
    title: 'Apple Watch Series 3',
    price: 149,
    fullPrice: 199,
    year: 2017,
    capacity: '38mm',
    color: 'Silver',
    description:
      'A reliable smartwatch for activity tracking, notifications and ' +
      'everyday use.',
    specs: ['OLED display', 'GPS', 'Heart-rate sensor', 'Water resistant'],
    image: '/img/accessories/apple-watch-series-3/silver/00.webp',
  },
  {
    id: 13,
    category: 'accessories',
    title: 'Apple Watch Series 4',
    price: 179,
    fullPrice: 229,
    year: 2018,
    capacity: '40mm',
    color: 'Space Gray',
    description:
      'A stylish smartwatch with a larger display and advanced health ' +
      'features.',
    specs: ['LTPO OLED display', 'GPS', 'Heart-rate sensor', 'Water resistant'],
    image: '/img/accessories/apple-watch-series-4/space-gray/00.webp',
  },
  {
    id: 14,
    category: 'accessories',
    title: 'Apple Watch Series 6',
    price: 249,
    fullPrice: 299,
    year: 2020,
    capacity: '44mm',
    color: 'Blue',
    description:
      'An advanced smartwatch with health tracking, GPS and an ' +
      'always-on display.',
    specs: [
      'Always-On Retina display',
      'GPS',
      'Blood oxygen sensor',
      'Water resistant',
    ],
    image: '/img/accessories/apple-watch-series-6/blue/00.webp',
  },
];

export const categoryNames: Record<Category, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};
