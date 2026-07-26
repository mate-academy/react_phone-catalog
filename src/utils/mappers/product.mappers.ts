import { ProductCardData } from '../../types/product.types';
import { ProductHomeAPI, ProductCatalogAPI } from '../../types/api.types';

export const mapHomeToCard = (product: ProductHomeAPI): ProductCardData => ({
  id: product.itemId,
  category: product.category,
  itemId: product.itemId,
  name: product.name,
  fullPrice: product.fullPrice,
  price: product.price,
  screen: product.screen,
  capacity: product.capacity,
  color: product.color,
  ram: product.ram,
  year: product.year,
  image: product.image,
});

export const mapCatalogToCard = (
  product: ProductCatalogAPI,
): ProductCardData => {
  const imagePath = product.images?.[0] || '';
  const formattedImage = imagePath.startsWith('/')
    ? imagePath
    : `/${imagePath}`;

  return {
    id: product.id,
    category: product.category,
    itemId: product.id,
    name: product.name,
    fullPrice: product.priceRegular,
    price: product.priceDiscount,
    screen: product.screen,
    capacity: product.capacity,
    color: product.color,
    ram: product.ram,
    year: 2000,
    image: formattedImage || '/img/placeholder.png',
  };
};

export const mapHomeProducts = (
  products: ProductHomeAPI[],
): ProductCardData[] => {
  return products.map(mapHomeToCard);
};

export const mapCatalogProducts = (
  products: ProductCatalogAPI[],
): ProductCardData[] => {
  return products.map(mapCatalogToCard);
};
