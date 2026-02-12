/* eslint-disable max-len */
import { RootState } from '../../app/store';
import { Accessories } from '../Accessories';
import { Phones } from '../Phones';
import { Tablets } from '../Tablets';

export type ProductsGroup = Accessories | Phones | Tablets;

// eslint-disable-next-line prettier/prettier
export type ProductCategoryState = Pick<RootState, 'accessories' | 'phones' | 'tablets'>;
