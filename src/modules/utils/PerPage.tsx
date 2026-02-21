import { BaseProduct } from '../../types';

export function PerPage(products: BaseProduct[], perPage: string) {
  if (perPage === 'all') {
    return [...products];
  } else {
    return [...products].slice(0, Number(perPage));
  }
}
