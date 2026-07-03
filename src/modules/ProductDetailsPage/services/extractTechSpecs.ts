import { ProductDetails } from '../../shared/types/ProductDetails';
import { TechSpecs } from '../types/TechSpecs';

export function extractTechSpecs(product: ProductDetails | null) {
  if (!product) {
    return {};
  }

  const techSpecs: (keyof TechSpecs)[] = [
    'screen',
    'resolution',
    'processor',
    'ram',
    'camera',
    'zoom',
    'cell',
  ];

  const productTechSpecs: Record<string, string | string[]> = {};

  for (const key of techSpecs) {
    if (product[key]) {
      productTechSpecs[key] = product[key];
    }
  }

  return productTechSpecs;
}
