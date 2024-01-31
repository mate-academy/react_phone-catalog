import { SortQuery } from "../definitions/enums/Api";
import { Product } from "../definitions/types/Product";
import { ProductDetails } from "../definitions/types/ProductDetails";

export const getColorHex = (color: string) => {
  switch (color) {
    case 'black': return '#201D24';
    case 'rosegold': return '#B76E79';
    case 'gold': return '#f6e0c9';
    case 'silver': return '#E4E4E2';
    case 'spacegray': return '#25282A';
    case 'green': return '#364935';
    case 'yellow': return '#F3D060';
    case 'white': return '#F9F6EF';
    case 'purple': return '#B8AFE6';
    case 'red': return '#E23636';
    case 'midnightgreen': return '#4E5851';
    default: throw Error(`Unexpected color: ${color}`); // only for develop
  }
}

export const getSpecArrayFromProduct = (product: ProductDetails) => {
  return {
    screen: product.screen,
    resolution: product.resolution,
    processor: product.processor,
    ram: product.ram,
    capacity: product.capacity,
    camera: product.camera,
    zoom: product.zoom,
    cell: product.cell.join(', '),
  };
};

/**
 * Sort Products with mutation
 */

export const sortProducts = (products: Product[], sortQuery: SortQuery) => {
  switch (sortQuery) {
    case SortQuery.Unsorted: return products;
    case SortQuery.Alphabet: {
      return products.sort((product1, product2) => (
        product1.name.localeCompare(product2.name)
      ));
    }
    case SortQuery.Newest: {
      return products.sort((product1, product2) => (
        product2.year - product1.year
      ))
    }
    case SortQuery.Cheapest: {
      return products.sort((product1, product2) => (
        product1.price - product2.price
      ));
    }
  }
}
