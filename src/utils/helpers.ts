import { ItemCard, Product, FavoriteItem } from '../constants/common';

export const mapToFavoriteItem = (
  product: Product | ItemCard,
): FavoriteItem => {
  const id =
    typeof product.id === 'number' ? (product as Product).itemId : product.id;

  return {
    id,
    name: product.name,
    image: 'image' in product ? product.image : `/${product.images[0]}`,
    price: 'price' in product ? product.price : product.priceDiscount,
    fullPrice:
      'fullPrice' in product ? product.fullPrice : product.priceRegular,
    category: product.category,
    screen: product.screen,
    capacity: product.capacity,
    ram: product.ram,
  };
};
