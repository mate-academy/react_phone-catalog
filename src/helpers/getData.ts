import { ProductsSliderLength } from '../constants';
import { DiscountProduct } from '../types/DiscountProduct';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { ShopByCategoryDataItem } from '../types/ShopByCategoryItem';

const API_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

const getProduct = async (id: string): Promise<Product | undefined> => {
  const data = await fetch(`${API_URL}/products.json`);

  const products: Product[] = await data.json();
  const phone = products.find(product => product.itemId === id);

  return phone;
};

const getProducts = async (catName: string): Promise<Product[]> => {
  const data = await fetch(`${API_URL}/products.json`);

  const allProducts: Product[] = await data.json();
  const products = allProducts.filter(product => product.category === catName);

  return products;
};

const getProductDetails = async (id: string): Promise<ProductDetails> => {
  const data = await fetch(`${API_URL}/products/${id}.json`);
  const product: ProductDetails = await data.json();

  return product;
};

const getSuggestedProducts = async (): Promise<Product[]> => {
  const data = await fetch(`${API_URL}/products.json`);
  const products: Product[] = await data.json();

  const randomProductsSet: Set<Product> = new Set();

  while (randomProductsSet.size < ProductsSliderLength) {
    randomProductsSet.add(
      products[Math.floor(Math.random() * products.length)],
    );
  }

  const randomFiveProducts: Product[] = Array.from(randomProductsSet);

  return randomFiveProducts;
};

type RespType = {
  hotPriceProducts: Product[];
  brandNew: Product[];
  shopByCategoryData: ShopByCategoryDataItem[];
};

const getHomePageData = async (): Promise<RespType> => {
  const data = await fetch(`${API_URL}/products.json`);
  const products: Product[] = await data.json();

  const productCount: Record<string, number> = {
    phones: 0,
    tablets: 0,
    accessories: 0,
  };

  const discountProductFullArr: DiscountProduct[] = products.map(product => {
    productCount[product.category] += 1;

    return {
      ...product,
      discount: product.fullPrice - product.price,
    };
  });

  return {
    hotPriceProducts: discountProductFullArr
      .sort((a, b) => b.discount - a.discount)
      .slice(0, ProductsSliderLength),

    brandNew: discountProductFullArr
      .filter(el => el.discount === 0)
      .sort((a, b) => b.price - a.price),
    shopByCategoryData: Object.entries(productCount).map(
      ([catName, catItemCount]) => ({
        catName,
        catLink: `/${catName}`,
        catItemCount,
      }),
    ),
  };
};

export const getData = {
  getProduct,
  getProducts,
  getProductDetails,
  getSuggestedProducts,

  getHomePageData,
};
