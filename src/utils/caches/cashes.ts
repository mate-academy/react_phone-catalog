import { CachedResult } from '../../types/CachedResult';
import { Goods } from '../../types/Goods';
import { Product } from '../../types/Product';
import { QueryCache } from './queryCache';

export const productsCache = new QueryCache<CachedResult<Product>>();

export const goodsCache = new QueryCache<CachedResult<Goods>>();
