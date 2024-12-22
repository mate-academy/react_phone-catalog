import { useCallback, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Product } from '../types/Product';
import { TShop } from '../types/TShop';

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

export const useLoader = (initialLoading = true, delay = 1500) => {
  const [isLoading, setIsLoading] = useState(initialLoading);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isLoading;
};

export const useHandleScroll = (shops: TShop[]) => {
  const [animationStyles, setAnimationStyles] = useState<{ [index: number]: React.CSSProperties }>(
    {},
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        const newAnimationStyles: { [index: number]: React.CSSProperties } = {};

        shops.forEach((_, index) => {
          newAnimationStyles[index] = {
            animationName: 'slidein',
            animationDuration: '1s',
            animationTimingFunction: 'ease-in-out',
            animationDelay: `${index * 0.3}s`,
            animationIterationCount: '1',
            animationFillMode: 'both',
          };
        });

        setAnimationStyles(newAnimationStyles);
      } else {
        setAnimationStyles({});
      }
    };

    handleScroll(); // Запускаємо одразу при першому рендері
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [shops]);

  return animationStyles;
};
