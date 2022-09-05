import './HotPrice.scss';
import React, { useMemo } from 'react';
import { Phone } from '../../types/Phone';
import { ItemCarousel } from '../ItemCarousel';

type Props = {
  products: Phone[],
  addFavorite: CallableFunction,
  addWithdraw: CallableFunction,
};

export const HotPrice: React.FC<Props> = ({
  products,
  addFavorite,
  addWithdraw,
}) => {
  const hotPhones = useMemo(() => {
    const phonesSorted = products.sort((phone1, phone2) => (
      phone2.discount - phone1.discount));

    return (phonesSorted.filter(phone => phone.discount > 0));
  },
  [products]);

  return (
    <section className="hotPrice">
      {hotPhones
        && (
          <ItemCarousel
            title="Hot prices"
            items={hotPhones}
            addFavorite={addFavorite}
            addWithdraw={addWithdraw}
          />
        )}
    </section>
  );
};
