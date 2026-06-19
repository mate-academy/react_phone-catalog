import { Product } from '../types/Product';

export const isPhone = (p: Product) => p.category === 'phones';
