import { findProduct } from "../services/productService";

export function getFormattedPathname(pathname: string): string[] {
  const path = pathname.split('/').filter(item => item !== '');

  if (path.length > 1) {
    const product = findProduct('itemId', path[1]);
    path[1] = product ? product.name : path[1];
  }
  return path;
}