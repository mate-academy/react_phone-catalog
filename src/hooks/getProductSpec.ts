// // import { Products } from '../types/Products';
// import { TypesOfProducts } from '../types/TypesOfProducts';

import { Spec } from '../components/ProductSpec/ProductSpec';
import { TypesOfProducts } from '../types/TypesOfProducts';

// export type ProductSpecKey =
//   | 'screen'
//   | 'resolution'
//   | 'processor'
//   | 'capacity'
//   | 'camera'
//   | 'zoom'
//   | 'cell'
//   | 'ram';

// export type Spec = [string, ProductSpecKey];

// export const PRODUCT_SPEC: Spec[] = [
//   ['Screen', 'screen'],
//   ['Resolution', 'resolution'],
//   ['Processor', 'processor'],
//   ['Capacity', 'capacity'],
//   ['Camera', 'camera'],
//   ['Zoom', 'zoom'],
//   ['Cell', 'cell'],
//   ['RAM', 'ram'],
// ];

// export const getProductSpec = (
//   product: TypesOfProducts,
//   keys: ProductSpecKey[],
// ): Spec[] => {
//   return PRODUCT_SPEC.filter(([, key]) => keys.includes(key))
//     .map(([label, key]) => {
//       if (!(key in product)) {
//         return null;
//       }

//       const value = product[key as keyof TypesOfProducts];

//       if (!value) {
//         return null;
//       }

//       return [
//         label,
//         Array.isArray(value) ? value.join(', ') : String(value),
//       ] as Spec;
//     })
//     .filter((val): val is Spec => val !== null);
// };

export const getProductSpec = (currentProduct: TypesOfProducts): Spec[] => {
  const specTech: Spec[] = [
    ['Screen', currentProduct.screen],
    ['Resolution', currentProduct.resolution],
    ['Processor', currentProduct.processor],
    ['RAM', currentProduct.ram],
    ['Built in memory', currentProduct.capacity],
  ];

  if ('camera' in currentProduct && currentProduct.camera) {
    specTech.push(['Camera', currentProduct.camera]);
  }

  if ('zoom' in currentProduct && currentProduct.zoom) {
    specTech.push(['Zoom', currentProduct.zoom]);
  }

  if ('cell' in currentProduct && currentProduct.cell) {
    specTech.push(['Cell', currentProduct.cell.join(', ')]);
  }

  return specTech;
};
