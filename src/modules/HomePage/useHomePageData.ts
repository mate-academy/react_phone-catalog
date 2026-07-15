import { useEffect, useMemo, useState } from 'react';
import { HeroCardData } from './components/HeroCarousel/types';
import { Product } from '../shared/types/Product';

const HERO_PHOTOS: HeroCardData[] = [
  {
    id: 1,
    srcMobile: 'HomePage/banner-mobile.png',
    srcTablet: 'HomePage/banner-tablet.png',
    srcDesktop: 'HomePage/banner-desktop.png',
    alt: 'Iphone 14 PRO is available',
  },
  {
    id: 2,
    srcMobile: 'HomePage/banner-mobile.png',
    srcTablet: 'HomePage/banner-tablet.png',
    srcDesktop: 'HomePage/banner-desktop.png',
    alt: 'Iphone 14 PRO is available',
  },
  {
    id: 3,
    srcMobile: 'HomePage/banner-mobile.png',
    srcTablet: 'HomePage/banner-tablet.png',
    srcDesktop: 'HomePage/banner-desktop.png',
    alt: 'Iphone 14 PRO is available',
  },
];

interface ProductWithDiscount extends Product {
  fullPrice: number;
}

export const useHomePageData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}/api/products.json`,
        );

        if (!response.ok) {
          throw new Error('Internal server error');
        }

        const data: Product[] = await response.json();

        setProducts(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const newProducts: Product[] = useMemo(() => {
    return products
      .toSorted((a: Product, b: Product) => b.year - a.year)
      .slice(0, 10);
  }, [products]);

  const productsOnSale: Product[] = useMemo(() => {
    return products
      .filter((p): p is ProductWithDiscount => !!p.fullPrice)
      .toSorted((b, a) => a.fullPrice - a.price - (b.fullPrice - b.price))
      .slice(0, 10);
  }, [products]);

  return {
    photos: HERO_PHOTOS,
    newProducts,
    productsOnSale,
    isLoading,
    isError,
  };
};
