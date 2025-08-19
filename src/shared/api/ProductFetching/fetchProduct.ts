import { FullProductDetails } from '../../../types/Product/FullProductDetails';
import { ProductForCard } from '../../../types/Product/Product';
import { ProductCategory } from '../../../types/ProductCategory';
import { isProductCategory } from '../../utils/isProductCategory';
import { fetchApi } from '../fetchApi';

const categoryCache: Partial<Record<ProductCategory, FullProductDetails[]>> =
  {};

export async function fetchCategoryFull(
  category: ProductCategory,
): Promise<FullProductDetails[]> {
  if (categoryCache[category]) {
    return categoryCache[category];
  }

  const data = await fetchApi<FullProductDetails[]>(`${category}.json`);

  categoryCache[category] = data;

  return data;
}

export async function loadProductBundleById(productId: string) {
  const allProductsShort = await fetchApi<ProductForCard[]>('products.json');

  const shortProducts = allProductsShort.find(p => p.itemId === productId);

  if (!shortProducts) {
    throw new Error(
      `Product with ID "${productId}" not found. Available IDs: ${allProductsShort
        .map(p => p.itemId)
        .slice(0, 5)
        .join(', ')}...`,
    );
  }

  const { category } = shortProducts;

  const numericId = shortProducts.id;

  if (!isProductCategory(category)) {
    throw new Error(`Invalid category found: ${category}`);
  }

  const detailedDataForCategory = await fetchCategoryFull(category);

  const product = detailedDataForCategory.find(p => p.id === productId);

  if (!product) {
    throw new Error('Product not found in detailed list');
  }

  const variants = detailedDataForCategory.filter(
    p => p.namespaceId === product.namespaceId,
  );

  const colors = Array.from(new Set(variants.map(v => v.color)));
  const capacities = Array.from(new Set(variants.map(v => v.capacity)));

  return { product, variants, colors, capacities, numericId };
}
