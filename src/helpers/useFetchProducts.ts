import { useCallback, useEffect, useState } from 'react';
import { getAccessories } from '../api/accessories';
import { getProducts } from '../api/products';
import { getTablets } from '../api/tablets';
import { getPhones } from '../api/phones';
import { ProductInfo } from '../types/ProductInfo';
import { Product } from '../types/Product';

type ProductType = 'products' | 'phones' | 'tablets' | 'accessories';

type UseFetchProductsReturn = {
  loading: Record<ProductType, boolean>;
  products: Product[];
  phones: ProductInfo[];
  tablets: ProductInfo[];
  accessories: ProductInfo[];
  fetchProducts: (type: ProductType) => Promise<void>;
};

export const useFetchProducts = (
  productType: ProductType,
): UseFetchProductsReturn => {
  const [loading, setLoading] = useState<Record<ProductType, boolean>>({
    products: false,
    phones: false,
    tablets: false,
    accessories: false,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<ProductInfo[]>([]);
  const [tablets, setTablets] = useState<ProductInfo[]>([]);
  const [accessories, setAccessories] = useState<ProductInfo[]>([]);

  const fetchProducts = useCallback(async (type: ProductType) => {
    setLoading(prev => ({ ...prev, [type]: true }));
    try {
      if (type === 'phones') {
        const phonesData = await getPhones();

        setPhones(phonesData);
      } else if (type === 'tablets') {
        const tabletsData = await getTablets();

        setTablets(tabletsData);
      } else if (type === 'accessories') {
        const accessoriesData = await getAccessories();

        setAccessories(accessoriesData);
      } else {
        const productsData = await getProducts();

        setProducts(productsData);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error fetching ${type}:`, error);
    } finally {
      setLoading(prev => ({ ...prev, [type]: false }));
    }
  }, []);

  useEffect(() => {
    fetchProducts(productType);
  }, [productType, fetchProducts]);

  return { loading, products, phones, tablets, accessories, fetchProducts };
};
