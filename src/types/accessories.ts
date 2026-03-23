import { Good } from './good';

export type Accessories = Good & {
  processor: string;
};
