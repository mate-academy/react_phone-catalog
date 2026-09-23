import { Product } from '../types/Product';
import { getBaseUrl } from '../utils/BaseUrl';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${getBaseUrl()}api/products.json`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const data: Product[] = await response.json();

  return data.map(product => {
    // 1. Нормализация пути к изображению
    const rawImage =
      product.image || (Array.isArray(product.images) ? product.images[0] : '');
    let cleanPath = rawImage
      ? rawImage.replace(/^api\//, '').replace(/^\//, '')
      : '';

    if (cleanPath && !cleanPath.startsWith('img/')) {
      cleanPath = `img/${cleanPath}`;
    }

    const fullPrice = Number(
      product.fullPrice ?? product.priceRegular ?? product.price ?? 0,
    );

    const rawDiscountPrice = product.priceDiscount ?? product.price;
    const price = rawDiscountPrice ? Number(rawDiscountPrice) : fullPrice;

    return {
      ...product,
      image: cleanPath ? `${cleanPath}` : '',
      price,
      fullPrice,
    };
  });
};
