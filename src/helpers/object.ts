import { Product } from '../types/product';
import { ProductDetails } from '../types/productDetails';
import { Specifications } from '../types/specifications';

export const prepareObject = (product: ProductDetails): Product => {
  return {
    image: product.images[0],
    category: product.images[0].split('/')[1],
    price: product.priceDiscount,
    fullPrice: product.priceRegular,
    itemId: product.id,
    year: 0,
    ...product,
  };
};

export const getProductSpecs = ({
  screen,
  resolution,
  processor,
  ram,
  capacity,
  camera,
  zoom,
  cell,
}: ProductDetails): Specifications => ({
  Screen: screen,
  Resolution: resolution,
  Processor: processor,
  RAM: ram,
  'Built in memory': capacity,
  Camera: camera,
  Zoom: zoom,
  Cell: cell,
});
