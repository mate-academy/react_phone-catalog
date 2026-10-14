import { Category, Product, ProductDetails } from '../types/Product';
import { assetUrl } from '../utils/assets';

type RawProduct = Omit<Product, 'sortOrder'> & { id: number };
type RawProductDetails = Omit<ProductDetails, 'itemId'> & { id: string };

const requests = new Map<string, Promise<unknown>>();

function getData<T>(file: string): Promise<T> {
  if (!requests.has(file)) {
    const request = fetch(assetUrl(`api/${file}.json`))
      .then(response => {
        if (!response.ok) {
          throw new Error('Unable to load products');
        }

        return response.json();
      })
      .catch(error => {
        requests.delete(file);
        throw error;
      });

    requests.set(file, request);
  }

  return requests.get(file) as Promise<T>;
}

export const getProducts = () =>
  getData<RawProduct[]>('products').then(products =>
    products.map(({ id, ...product }) => ({ ...product, sortOrder: id })),
  );

export async function getCategoryDetails(category: Category) {
  const [details, products] = await Promise.all([
    getData<RawProductDetails[]>(category),
    getProducts(),
  ]);

  return details.map(({ id, ...detail }) => {
    const product = products.find(
      item =>
        item.category === category &&
        (item.itemId === id || item.name === detail.name),
    );

    return product
      ? {
          ...detail,
          itemId: product.itemId,
          priceRegular: product.fullPrice,
          priceDiscount: product.price,
        }
      : { ...detail, itemId: id };
  });
}

export async function getProductDetails(itemId: string) {
  const products = await getProducts();
  const product = products.find(item => item.itemId === itemId);

  if (!product) {
    return null;
  }

  const variants = await getCategoryDetails(product.category);

  return variants.find(item => item.itemId === itemId) || null;
}

export async function getSuggestedProducts(itemId: string) {
  const products = await getProducts();
  const candidates = products.filter(product => product.itemId !== itemId);

  for (let index = candidates.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [candidates[index], candidates[randomIndex]] = [
      candidates[randomIndex],
      candidates[index],
    ];
  }

  return candidates.slice(0, 12);
}
