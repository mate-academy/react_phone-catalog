import {
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { getHotPriceProducts } from '../../functions/getHotPriceProducts';

import { ApiProduct } from '../../types/ApiProduct';
import { ProductCard } from '../ProductCard';

const gap = 16;

export const ProductsSlider = () => {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [translate, setTranslate] = useState(0);
  const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(false);
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);

  const ref = useRef() as RefObject<HTMLDivElement>;

  const blockWidth = ref.current?.clientWidth || 0;

  const elementWidth = useMemo(() => (blockWidth + gap) / 4, [blockWidth]);

  useEffect(() => {
    getHotPriceProducts()
      .then(setProducts)
      .catch(() => new Error('Loading products error'));

    return () => setProducts(products);
  }, []);

  useEffect(() => {
    if (translate === 0) {
      setIsLeftButtonDisabled(true);
    } else if ((products.length - 4) * elementWidth === -translate) {
      setIsRightButtonDisabled(true);
    } else {
      setIsLeftButtonDisabled(false);
      setIsRightButtonDisabled(false);
    }
  }, [translate]);

  const onLeftClick = () => {
    setTranslate(currentTranslate => currentTranslate + elementWidth);
  };

  const onRightClick = () => {
    setTranslate(currentTranslate => currentTranslate - elementWidth);
  };

  return (
    <div className="slider slider--first">
      <div className="slider__panel">
        <h2 className="slider__title">
          Hot prices
        </h2>

        <div className="slider__buttons">
          <button
            className="slider__button slider__button--left"
            type="button"
            aria-label="Left button"
            onClick={onLeftClick}
            disabled={isLeftButtonDisabled}
          />

          <button
            className="slider__button slider__button--right"
            type="button"
            aria-label="Right button"
            onClick={onRightClick}
            disabled={isRightButtonDisabled}
          />
        </div>
      </div>

      <div
        className="slider__track-container"
        ref={ref}
      >
        <div
          className="slider__track"
          style={{ transform: `translate(${translate}px)` }}
        >
          {products.map(product => {
            return (
              <ProductCard
                product={product}
                key={product.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
