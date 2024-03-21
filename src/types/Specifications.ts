import type { ProductDetail } from '.';

const SpecificationsPhone: Array<keyof ProductDetail> = [
  'screen',
  'resolution',
  'processor',
  'ram',
  'capacity',
  'camera',
  'zoom',
  'cell',
];

const SpecificationsPhoneSimplified: Array<keyof ProductDetail> = [
  'screen',
  'resolution',
  'processor',
  'ram',
];

export { SpecificationsPhone, SpecificationsPhoneSimplified };
