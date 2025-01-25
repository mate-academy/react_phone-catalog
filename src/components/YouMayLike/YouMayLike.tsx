import React, { useEffect, useState } from 'react';
import style from './YouMayLike.module.scss';
import { useStateContext } from '../../state/state';
import { ProductType } from '../../types/ProductType';
import classNames from 'classnames';
import { ProductSlider } from '../ProductSlider/ProductSlider';

interface Props {
  className: string;
}

export const YouMayLike: React.FC<Props> = ({ className }) => {
  const { state } = useStateContext();

  const [suggestedProducts, setSuggestedProduct] = useState<ProductType[]>([]);

  useEffect(() => {
    const getSuggestedProducts = (
      products: ProductType[],
      count: number = 10,
    ): ProductType[] => {
      const shufled = products.sort(() => 0.5 - Math.random());

      return shufled.slice(0, count);
    };

    const products = getSuggestedProducts(state.products, 10);

    setSuggestedProduct(products);
  }, [state.products]);

  return (
    <section className={classNames(style.you_may_like, className)}>
      <ProductSlider title="You may also like" products={suggestedProducts} />
    </section>
  );
};
