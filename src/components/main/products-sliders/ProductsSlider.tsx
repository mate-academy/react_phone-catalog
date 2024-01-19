import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { ProductsSliderList } from './ProductsSliderList';
import { Title } from '../Title';
import {
  getBrandNewProducts,
  getHotPriceProducts,
  getSuggestedProducts,
} from '../../../helpers/api/GetProducts';
import { ArrowDirections } from '../../../helpers/enums/ArrowDirections';
import {
  ProductsSlidersType,
} from '../../../helpers/enums/ProductsSliderType';
import { Product } from '../../../helpers/types/Product';
import { Arrow } from '../../Arrow';

type ProductsSliderProps = {
  children: React.ReactNode
  type: ProductsSlidersType
  withoutId?: string
};

const WIDTH = {
  LARGE: 1440,
  MEDIUM: 1024,
  SMALL: 700,
};

export const ProductsSlider = ({
  type, children, withoutId = '',
}: ProductsSliderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [firstProductIndex, setFirstProductIndex] = useState(0);

  let sliderCountProducts = 4;
  const screenWidth = document.documentElement.clientWidth;

  if (screenWidth < WIDTH.LARGE && screenWidth >= WIDTH.MEDIUM) {
    sliderCountProducts = 3;
  } else if (screenWidth < WIDTH.MEDIUM && screenWidth >= WIDTH.SMALL) {
    sliderCountProducts = 2;
  } else if (screenWidth < WIDTH.SMALL) {
    sliderCountProducts = 1;
  }

  const displayedProducts = products.slice(
    firstProductIndex,
    sliderCountProducts + firstProductIndex,
  );

  const isLeftArrowDisabled = firstProductIndex === 0;
  const isRightArrowDisabled
  = firstProductIndex + sliderCountProducts === products.length;
  const sliderClasses = classNames('products-slider', {
    'home__products-slider--down': type === ProductsSlidersType.newProducts,
    'home__products-slider--up': type === ProductsSlidersType.hotProducts,
    'product-details__slider': type === ProductsSlidersType.random,
  });

  const handleClickLeft = () => {
    if (firstProductIndex > 0) {
      setFirstProductIndex(firstProductIndex - 1);
    }
  };

  const handleClickRight = () => {
    if (firstProductIndex + sliderCountProducts < products.length) {
      setFirstProductIndex(firstProductIndex + 1);
    }
  };

  useEffect(() => {
    switch (type) {
      case ProductsSlidersType.newProducts:
        getBrandNewProducts()
          .then(setProducts);

        return;
      case ProductsSlidersType.random:
        getSuggestedProducts(withoutId)
          .then(setProducts);

        return;
      case ProductsSlidersType.hotProducts:
      default:
        getHotPriceProducts()
          .then(setProducts);
    }
  }, [withoutId]);

  return (
    <div className={sliderClasses}>
      <div className="products-slider__header">
        <Title>{children}</Title>

        <div className="cardsContainer__arrows">
          <Arrow
            direction={ArrowDirections.left}
            onClick={handleClickLeft}
            disabled={isLeftArrowDisabled}
          />

          <Arrow
            direction={ArrowDirections.right}
            onClick={handleClickRight}
            disabled={isRightArrowDisabled}
          />
        </div>
      </div>

      <ProductsSliderList
        products={displayedProducts}
      />
    </div>
  );
};

ProductsSlider.defaultProps = {
  withoutId: '',
};
