import { SpecKey } from '@/types/SpecKey';

export const DEFAULT_PER_PAGE = 16;
type SpecConfigItem = {
  label: string;
  key: SpecKey;
  optional?: boolean;
};

export const sortOptions = [
  { label: 'Newest', value: 'age' },
  { label: 'Alphabetically', value: 'title' },
  { label: 'Cheapest', value: 'price' },
];
export const links = [
  { path: '/', label: 'HOME' },
  { path: '/phones', label: 'PHONES' },
  { path: '/tablets', label: 'TABLETS' },
  { path: '/accessories', label: 'ACCESSORIES' },
];

export const perPageOptions = [
  { label: '4', value: '4' },
  { label: '8', value: '8' },
  { label: '16', value: '16' },
  { label: 'All', value: 'all' },
];

export const specsConfig: SpecConfigItem[] = [
  { label: 'Screen', key: 'screen' },
  { label: 'Resolution', key: 'resolution' },
  { label: 'Processor', key: 'processor' },
  { label: 'RAM', key: 'ram' },
  { label: 'Built in memory', key: 'capacity' },
  { label: 'Camera', key: 'camera', optional: true },
  { label: 'Zoom', key: 'zoom', optional: true },
  { label: 'Cell', key: 'cell' },
];

export const COLOR_MAP: Record<string, string> = {
  // Existing
  midnight: '#1e2248',
  yellow: '#ffe680',
  purple: '#bab7ff',
  red: '#ff3b30',
  blue: '#007aff',
  starlight: '#f5f2e9',

  // Added from product list
  black: '#1f2020',
  coral: '#ee7762',
  gold: '#fae7cf',
  graphite: '#5c5b57',
  green: '#afe3d0', // Muted mint green (iPhone 11 style)
  midnightgreen: '#4e5851',
  pink: '#fae0d8',
  rosegold: '#e6c7c2',
  sierrablue: '#9bb5ce',
  silver: '#e2e4e1',
  spaceblack: '#302e32',
  'space-gray': '#535150',
  spacegray: '#535150',
  white: '#f0f0f0',
};
