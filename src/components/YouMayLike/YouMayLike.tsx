import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../state/state';
import { ProductType } from '../../types/ProductType';
import classNames from 'classnames';
import { ProductSlider } from '../ProductSlider/ProductSlider';

import style from './YouMayLike.module.scss';

interface Props {
  className: string;
}

export const YouMayLike: React.FC<Props> = ({ className }) => {
  const { state } = useStateContext();

  const [suggestedProducts, setSuggestedProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const getSuggestedProducts = (
      products: ProductType[],
      count: number = 10,
    ): ProductType[] => {
      const shuffled = [...products];

      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      return shuffled.slice(0, count);
    };

    const products = getSuggestedProducts(state.products, 10);

    setSuggestedProducts(products);
  }, [state.products]);

  return (
    <section className={classNames(style.you_may_like, className)}>
      <ProductSlider title="You may also like" products={suggestedProducts} />
    </section>
  );
};
