import { Phone } from '../interfaces/Product';

export const colorMap: Record<string, string> = {
  // Standard colors
  // Apple-accurate standard colors
  black: '#1A1A1A', // fine as is
  white: '#F5F5F0', // fine as is
  red: '#BF0011', // (PRODUCT)RED — deep, almost dark red, not bright
  blue: '#2A5A8C', // Pacific Blue — muted steel blue, not vivid
  green: '#A8B8A0', // sage/muted green (iPhone 13/14/15 green)
  yellow: '#F5E27A', // very pale pastel yellow (iPhone 14 yellow)
  purple: '#D7C9E0', // very light lavender (iPhone 12/14 purple)
  pink: '#F2C4C0', // soft pastel pink, almost blush
  coral: '#FF6B52', // fine as is — XR coral was punchy

  // Apple-specific grays & blacks
  spacegray: '#4A4A4F',
  'space gray': '#4A4A4F', // same, with space
  graphite: '#535358',
  spaceblack: '#2C2C2E',

  // Apple-specific greens
  midnightgreen: '#004953',

  // Apple-specific blues
  sierrablue: '#6AABCA',
  'sky blue': '#87CEEB',

  // Apple-specific golds & pinks
  gold: '#F4D5A0',
  rosegold: '#E8C4B8',
  'rose gold': '#E8C4B8', // same, with space

  // Apple-specific neutrals
  silver: '#C8C8CC',
  starlight: '#F2E8D9', // warm creamy white
  midnight: '#1C2B3A', // very dark navy blue
};

export const phone: Phone = {
  id: 'apple-iphone-11-pro-max-64gb-gold',
  category: 'phones',
  namespaceId: 'apple-iphone-11-pro-max',
  name: 'Apple iPhone 11 Pro Max 64GB Gold',
  capacityAvailable: ['64GB', '256GB', '512GB'],
  capacity: '64GB',
  priceRegular: 1480,
  priceDiscount: 1400,
  colorsAvailable: ['spacegray', 'midnightgreen', 'gold', 'silver'],
  color: 'gold',
  images: [
    'img/phones/apple-iphone-11-pro-max/gold/00.webp',
    'img/phones/apple-iphone-11-pro-max/gold/01.webp',
    'img/phones/apple-iphone-11-pro-max/gold/02.webp',
  ],
  description: [
    {
      title: 'And then there was Pro',
      text: [
        // eslint-disable-next-line max-len
        'A transformative triple-camera system that adds tons of capability without complexity.',
        'An unprecedented leap in battery life...',
      ],
    },
  ],
  screen: "6.5' OLED",
  resolution: '2688х1242',
  processor: 'Apple A13 Bionic',
  ram: '4GB',
  camera: '12 Mp + 12 Mp + 12MP',
  zoom: 'Digital, 10x / Optical, 2x',
  cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE'],
};
