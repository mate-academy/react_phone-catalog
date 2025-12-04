import { ProductDetails } from './ProductDetails';

export type SpecKey = keyof Pick<
  ProductDetails,
  | 'screen'
  | 'resolution'
  | 'processor'
  | 'ram'
  | 'capacity'
  | 'camera'
  | 'zoom'
  | 'cell'
>;
