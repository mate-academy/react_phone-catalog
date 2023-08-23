import {
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Phone } from '../../types/Phone';

import { getBrandNewProducts } from '../../functions/getBrandNewProducts';

import { SliderContent } from '../SliderContent';

const title = 'Brands new models';

const gap = 16;

export const NewBrands = () => {
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
    getBrandNewProducts()
      .then(setProducts)
      .catch(() => new Error('Loading products error'));

    return () => setProducts([]);
  }, []);

  useEffect(() => {
    if (translate === 0) {
      setIsLeftButtonDisabled(true);

      return;
    }

    if ((products.length - 4) * elementWidth === -translate) {
      setIsRightButtonDisabled(true);

      return;
    }

    setIsLeftButtonDisabled(false);
    setIsRightButtonDisabled(false);
  }, [translate]);

  const onLeftClick = () => {
    setTranslate(currentTranslate => currentTranslate + elementWidth);
  };

  const onRightClick = () => {
    setTranslate(currentTranslate => currentTranslate - elementWidth);
  };

  return (
    <div className="slider">
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
