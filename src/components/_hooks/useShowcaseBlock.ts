import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, loadProducts } from '../../store';

export const useShowcaseBlock = (title: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts());
  }, [])

  const products: Product[] = useSelector(getProducts);
  const [position, setPosition] = useState(0);
  const [width, setWidth] = useState(0);

  const productCardRef = useCallback(node => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  const step = 2;
  const frameSize = 4;
  const marginWidth = 16;
  const itemWidth = width + marginWidth;
  const animationDuration = 700;

  const hotPricesProducts: Product[] = useMemo(() => {
    return products.filter(product => product.discount !== 0);
  }, [products]);

  const newProducts: Product[] = useMemo(() => {
    return products
      .filter(product => product.age < 10 && !product.discount);
  }, [products]);

  const currentProducts: Product[] = useMemo(() => {
    switch (title) {
      case 'Hot prices':
        return hotPricesProducts;
      case 'Brand new models':
        return newProducts;
      default:
        return [];
    }
  }, [title, hotPricesProducts, newProducts]);

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
    itemWidth,
    animationDuration,
    handleSlide,
    maxPosition,
    productCardRef,
    frameSize,
  };
};
