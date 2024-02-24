import { useSelector } from 'react-redux';
import {
  memo, useCallback, useMemo, useState,
} from 'react';
import { Icons } from '../../types/Icons';
import { Icon } from '../Icon';
import { ProductCard } from '../ProductCard';
import './ProductSlider.scss';
import { selectCart } from '../../store/selectors/cartSlice';
import { selectFavorites } from '../../store/selectors/favoritesSlice';
import { ProductSliderProps } from './types';

export const ProductSlider = memo<ProductSliderProps>(({ title, products }) => {
  const {
    cart,
  } = useSelector(selectCart);

  const {
    favorites,
  } = useSelector(selectFavorites);

  const [position, setPosition] = useState(0);

  const ITEM_WIDTH = 272;
  const GAP = 16;

  const onScrollNext = useCallback(() => {
    setPosition(position - (ITEM_WIDTH + GAP));
  }, [position]);

  const onScrollPrev = useCallback(() => {
    setPosition(position + (ITEM_WIDTH + GAP));
  }, [position]);

  const maxPosition = useMemo(() => {
    return (products?.length - 4) * (ITEM_WIDTH + GAP);
  }, [products]);

  const canScrollNext = position > maxPosition * -1;
  const canScrollPrev = position < 0;

  const isInCart = useCallback((id: string) => {
    return cart?.some(item => item.product.id === id);
  }, [cart]);

  const isInFavorites = useCallback((id: string) => {
    return favorites?.some(item => item.id === id);
  }, [favorites]);

  return (
    <div className="productSlider">
      <div className="productSlider__header">
        <h1 className="productSlider__title">{title}</h1>
        <div className="productSlider__controls">
          <button
            aria-label="<"
            type="button"
            className="productSlider__button"
            onClick={onScrollPrev}
            disabled={!canScrollPrev}
          >
            <Icon icon={Icons.ArrowLeft} />
          </button>
          <button
            aria-label=">"
            type="button"
            className="productSlider__button"
            onClick={onScrollNext}
            disabled={!canScrollNext}
          >
            <Icon icon={Icons.ArrowRight} />
          </button>
        </div>
      </div>
      <ul className="productSlider__container">
        {products.map(product => {
          return (
            <li
              key={product?.id}
              style={{
                listStyle: 'none',
                transform: `translateX(${position}px)`,
                transition: '0.5s',
              }}
            >
              <ProductCard
                item={product}
                key={product.itemId}
                isInCart={isInCart(product.id)}
                isInFav={isInFavorites(product.id)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
});
