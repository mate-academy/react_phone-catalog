import { useCallback, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Product } from '../types/Product';

export const useShuffledProducts = (products: Product[]) => {
  const [shuffledProducts, setShuffledProducts] = useState<Product[]>([]);

  useEffect(() => {
    setShuffledProducts([...products].sort(() => Math.random() - 0.5));
  }, [products]);

  const sortArray = useCallback(
    (type: string) => {
      const sortedProducts = [...shuffledProducts];

      switch (type) {
        case 'oldest':
          sortedProducts.sort((a, b) => a.year - b.year);
          break;
        case 'newest':
          sortedProducts.sort((a, b) => b.year - a.year);
          break;
        case 'cheapest':
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case 'expensive':
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        case 'alphabetically':
          sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }

      setShuffledProducts(sortedProducts);
    },
    [shuffledProducts],
  );

  const handleItem = useCallback(
    (item: string) => {
      const limit = item === 'all' ? products.length : parseInt(item, 10);

      setShuffledProducts(products.slice(0, limit));
    },
    [products],
  );

  return [shuffledProducts, sortArray, handleItem] as const;
};

export const useArrowSpacing = (sliderRef: React.RefObject<Slider | null>) => {
  const [arrowSpacing, setArrowSpacing] = useState(20);

  useEffect(() => {
    const updateArrowSpacing = () => {
      if (
        sliderRef.current &&
        sliderRef.current.innerSlider &&
        sliderRef.current.innerSlider.list
      ) {
        const sliderWidth = sliderRef.current.innerSlider.list.offsetWidth;
        const newSpacing = Math.max((sliderWidth - 100) / 2, 20);

        setArrowSpacing(newSpacing);
      }
    };

    window.addEventListener('resize', updateArrowSpacing);
    updateArrowSpacing();

    return () => window.removeEventListener('resize', updateArrowSpacing);
  }, [sliderRef]);

  return arrowSpacing;
};

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
};
