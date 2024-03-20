/* eslint-disable @typescript-eslint/indent */
import { ProductDetail } from './ProductDetail';

export const SpecificationsPhone: Array<keyof ProductDetail> = [
  'screen',
  'resolution',
  'processor',
  'ram',
  'capacity',
  'camera',
  'zoom',
  'cell',
];

export const SpecificationsPhoneSimplified: Array<keyof ProductDetail> = [
  'screen',
  'resolution',
  'processor',
  'ram',
];
