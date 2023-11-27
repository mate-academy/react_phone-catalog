import { useMemo } from 'react';
import { Product } from '../../utils/types/Product';
import { Baner, Slider, Categories } from '../index';
import { Transition } from '../IntersectionTransition';

type Props = {
  products: Product[];
};

export const HomePage: React.FC<Props> = ({ products }) => {
  const lists = useMemo(() => {
    const hotPriceList = products
      .filter((item) => item.fullPrice && !item.name.includes('11'))
      .sort((a, b) => {
        return (b.fullPrice - b.price) - (a.fullPrice - a.price);
      });

    const brandList = products
      .filter(({ name }) => name
        .includes('11')).sort((a, b) => b.price - a.price);

    return { hotPriceList, brandList };
  }, [products]);

  return (
    <main>
      <Baner />
      <Slider
        products={lists.hotPriceList}
        title="Hot Prices"
      />
      <Transition>
        <Categories itemsLength={products.length} />
      </Transition>
      <Slider
        products={lists.brandList}
        title="Brand new models"
      />
    </main>

  );
};
