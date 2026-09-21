import { Product } from '../types/Product';

export const getProducts = async (): Promise<Product[]> => {
  const baseUrl = import.meta.env.BASE_URL;
  const response = await fetch(`${baseUrl}api/products.json`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const data: Product[] = await response.json();

  return data.map(product => {
    const rawImage =
      product.image || (Array.isArray(product.images) ? product.images[0] : '');
    let cleanPath = rawImage
      ? rawImage.replace(/^api\//, '').replace(/^\//, '')
      : '';

    if (cleanPath && !cleanPath.startsWith('img/')) {
      cleanPath = `img/${cleanPath}`;
    }

    // Безопасное извлечение цен
    const price = product.price ?? product.priceDiscount ?? 0;
    const fullPrice = product.fullPrice ?? product.priceRegular ?? price;

    return {
      ...product,
      image: cleanPath ? `${cleanPath}` : '',
      price,
      fullPrice,
    };
  });
};
