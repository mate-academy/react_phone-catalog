import { Device } from './Device';

export type Accessories = Omit<Device, 'camers' | 'zoom'>;
