import { CartType } from '../types/CartType';
import { FavouriteType } from '../types/FavouriteType';
import { ProductDetails } from '../types/ProductDetails';

export const convertToFavourite = (
  productDetails: ProductDetails,
): FavouriteType => {
  return {
    category: productDetails.category,
    phoneId: productDetails.id,
    itemId: productDetails.id,
    name: productDetails.name,
    fullPrice: productDetails.priceRegular,
    price: productDetails.priceDiscount,
    screen: productDetails.screen,
    capacity: productDetails.capacity,
    color: productDetails.color,
    ram: productDetails.ram,
    image: productDetails.images[0],
  };
};

export const convertToCart = (productDetails: ProductDetails): CartType => {
  return {
    image: productDetails.images[0],
    phoneId: productDetails.id,
    name: productDetails.name,
    price: productDetails.priceDiscount,
    quantity: 1,
  };
};
