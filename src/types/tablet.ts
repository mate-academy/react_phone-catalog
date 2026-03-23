import { Good } from './good';

export type Tablet = Good & {
  camera: string;
  zoom: string;
  processor: string;
};
