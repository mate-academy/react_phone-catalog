import {
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { getHotPriceProducts } from '../../functions/getHotPriceProducts';

import { Phone } from '../../types/Phone';

import { SliderContent } from '../SliderContent';

const title = 'Hot prices';

const gap = 16;

export const ProductsSlider = () => {
  const [products, setProducts] = useState<Phone[]>([]);
  const [translate, setTranslate] = useState(0);
  const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(false);
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);

  const ref = useRef() as RefObject<HTMLDivElement>;

  const blockWidth = ref.current?.clientWidth || 0;

  const elementWidth = useMemo(() => {
    if (blockWidth === (71 * gap)) {
      return (blockWidth + gap) / 4;
    }

    if (blockWidth === (53 * gap)) {
      return (blockWidth + gap) / 3;
    }

    if (blockWidth === (35 * gap)) {
      return (blockWidth + gap) / 2;
    }

    return blockWidth + gap;
  }, [blockWidth]);

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
      <SliderContent
        title={title}
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
        isLeftButtonDisabled={isLeftButtonDisabled}
        isRightButtonDisabled={isRightButtonDisabled}
        reference={ref}
        translate={translate}
        products={products}
      />
    </div>
  );
};
