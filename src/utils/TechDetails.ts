import { Product } from '../types/Product';

export const TechDetails = {
  Screen: 'screen',
  Resolution: 'resolution',
  Processor: 'processor',
  RAM: 'ram',
  'Built in memory': 'capacity',
  Camera: 'camera',
  Zoom: 'zoom',
  Cell: 'cell',
} as Record<string, keyof Product>;
