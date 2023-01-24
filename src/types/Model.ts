import { Capacity } from './Capacity';
import { ColorAvailable } from './ColorAvailable';

export type Model = {
  capacity: Capacity;
  fullPrice: number;
  discountPrice: number;
  colorsAvailable: ColorAvailable;
};
