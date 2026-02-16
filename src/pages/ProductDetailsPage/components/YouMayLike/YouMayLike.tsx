import React, { useEffect, useState } from 'react';
import { Product } from '../../../../types';
import { useStateContext } from '../../../../state/state';
import classNames from 'classnames';
import { ProductsSlider } from '../../../../components';

type Props = {
  className: string;
};

export const YouMayLike: React.FC<Props> = ({ className }) => {
  const { state } = useStateContext();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getSuggestedProducts = (
      products: Product[],
      count: number = 10,
    ): Product[] => {
      const shuffled = products.sort(() => 0.5 - Math.random());

      return shuffled.slice(0, count);
    };

    const products = getSuggestedProducts(state.products, 10);

    setSuggestedProducts(products);
  }, [state.products]);

  return (
    <section className={classNames(className, 'you-may-like')}>
      <ProductsSlider title="You may also like" slides={suggestedProducts} />
    </section>
  );
};
