import { Device } from './Device';

export type Cart = {
  [id: string]: {
    item: Device;
    quantity: number;
  };
};
