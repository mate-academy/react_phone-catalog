import { useState, useEffect } from 'react';
import { getProducts } from '../api/getProducts';
import { getPhones } from '../api/getPhones';
import { getTablets } from '../api/getTablets';
import { getAccessories } from '../api/getAccessories';
import { getProductsWithDetails } from '../api/getProductsWithDetails';
import type { Product } from '../types/Product';
import type { Phone } from '../types/Phone';
import type { Tablet } from '../types/Tablet';
import type { Accessory } from '../types/Accessory';
import type { ProductWithDetails } from '../types';

interface UseLoadingReturn {
  isLoading: boolean;
  products: Product[];
  phones: Phone[];
  tablets: Tablet[];
  accessories: Accessory[];
  productsWithDetails: ProductWithDetails[];
  errors: string[];
}

export const AllCategory = {
  AllProducts: 'allProducts',
  Phones: 'phones',
  Tablets: 'tablets',
  Accessories: 'accessories',
} as const;

export type AllCategory = (typeof AllCategory)[keyof typeof AllCategory];

export const useLoading = (): UseLoadingReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [productsWithDetails, setProductsWithDetails] = useState<
    ProductWithDetails[]
  >([]);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setIsLoading(true);

        const [
          productsWithDetailsResult,
          productsResult,
          phonesResult,
          tabletsResult,
          accessoriesResult,
        ] = await Promise.allSettled([
          getProductsWithDetails(),
          getProducts(),
          getPhones(),
          getTablets(),
          getAccessories(),
        ]);

        if (productsWithDetailsResult.status === 'fulfilled') {
          setProductsWithDetails(productsWithDetailsResult.value);
        } else {
          setErrors(prev => [...prev, AllCategory.AllProducts]);
        }

        if (productsResult.status === 'fulfilled') {
          setProducts(productsResult.value);
        } else {
          setErrors(prev => [...prev, AllCategory.AllProducts]);
        }

        if (phonesResult.status === 'fulfilled') {
          setPhones(phonesResult.value);
        } else {
          setErrors(prev => [...prev, AllCategory.Phones]);
        }

        if (tabletsResult.status === 'fulfilled') {
          setTablets(tabletsResult.value);
        } else {
          setErrors(prev => [...prev, AllCategory.Tablets]);
        }

        if (accessoriesResult.status === 'fulfilled') {
          setAccessories(accessoriesResult.value);
        } else {
          setErrors(prev => [...prev, AllCategory.Accessories]);
        }
      } catch (err) {
        console.error('Помилка при завантаженні даних:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllData();
  }, []);

  return {
    isLoading,
    products,
    phones,
    tablets,
    accessories,
    productsWithDetails,
    errors,
  };
};
