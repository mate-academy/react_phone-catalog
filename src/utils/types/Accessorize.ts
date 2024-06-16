import { Gadget } from './Gadget';

export type Accessorize = Omit<Gadget, 'camera' | 'zoom'>;
