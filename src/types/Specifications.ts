/* eslint-disable @typescript-eslint/indent */
import { ProductDetail } from './ProductDetail';

export type SpecsPhone = Pick<
  ProductDetail,
  | 'screen'
  | 'resolution'
  | 'processor'
  | 'ram'
  | 'camera'
  | 'zoom'
  | 'cell'
  | 'capacity'
>;

export type SpecsPhoneSimple = Pick<
  ProductDetail,
  'screen' | 'resolution' | 'processor' | 'ram' | 'camera'
>;
