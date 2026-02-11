import { ProductCategory } from '../../../types/ProductCategory';
import { ProductForCard } from '../../../types/Product/Product';
import { fetchApi } from '../fetchApi';

function pickRandom<T>(arr: T[], count: number): T[] {
  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy.slice(0, count);
}

let allProductCache: ProductForCard[] | null = null;

async function fetchAllProduct(): Promise<ProductForCard[]> {
  if (allProductCache) {
    return allProductCache;
  }

  const allProducts = await fetchApi<ProductForCard[]>('/products.json');

  allProductCache = allProducts;

  return allProducts;
}

export async function fetchRandomSuggestions(
  category: ProductCategory,
  currentNamespaceId: string,
  count = 15,
): Promise<ProductForCard[]> {
  const allCards = await fetchAllProduct();
  const sameCategory = allCards.filter(
    (c: ProductForCard) => c.category === category,
  );

  const excludeCurrentModel = sameCategory.filter(
    (c: ProductForCard) =>
      c.itemId !== currentNamespaceId &&
      !c.itemId.startsWith(`${currentNamespaceId}-`),
  );

  return pickRandom(excludeCurrentModel, count);
}
