import { TProductBase } from './productBase.type';

export type TAccessories = Omit<TProductBase, 'camera' | 'zoom'>;
