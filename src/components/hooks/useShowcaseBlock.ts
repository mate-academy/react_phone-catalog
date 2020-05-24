import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { getProducts } from '../../helpers/api';

export const useShowcaseBlock = (heading: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [position, setPosition] = useState(0);

  const step = 2;
  const frameSize = 4;
  const marginWidth = 16;
  const itemWidth = 272 + marginWidth;
  const animationDuration = 700;

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data));
  }, []);

  const hotPricesProducts: Product[] = useMemo(() => {
    return products.filter(product => product.discount !== 0);
  }, [products]);

  const newProducts: Product[] = useMemo(() => {
    return products
      .filter(product => product.age < 10 && product.discount === 0);
  }, [products]);

  const currentProducts: Product[] = useMemo(() => {
    switch (heading) {
      case 'Hot prices':
        return hotPricesProducts;
      case 'Brand new models':
        return newProducts;
      default:
        return [];
    }
  }, [heading, hotPricesProducts, newProducts]);

  const stepWidth = itemWidth * step;
  const frameWidth = itemWidth * frameSize;
  const carouselWidth = itemWidth * currentProducts.length;
  const maxPosition = frameWidth - carouselWidth;

  const handleSlide = useCallback((direction: string) => {
    if (direction === 'left') {
      if (position + stepWidth > 0) {
        setPosition(0);
      } else {
        setPosition(position + stepWidth);
      }
    } else if (position - stepWidth < maxPosition) {
      setPosition(maxPosition);
    } else {
      setPosition(position - stepWidth);
    }
  }, [position, maxPosition, stepWidth]);

  return {
    currentProducts,
    position,
    step,
    frameSize,
    itemWidth,
    animationDuration,
    handleSlide,
    maxPosition,
  };
};
