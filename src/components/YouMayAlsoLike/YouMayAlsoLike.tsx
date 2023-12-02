import { useState } from 'react';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

import { ProductsSlider } from '../ProductsSlider';

interface Props {
  phones: Product[];
}

export const YouMayAlsoLikes: React.FC<Props> = ({ phones }) => {
  const visibleCards = 4;
  const [start, setStart] = useState(0);
  const end = start + visibleCards;

  const sortedPhones = phones
    .map((phone) => ({ phone, order: Math.random() }))
    .sort((a, b) => a.order - b.order)
    .map((entry) => entry.phone);

  const arrLength = sortedPhones.length;

  return (
    <div className="container">
      <div className="hot-phones">
        <ProductsSlider
          title="You may also like"
          visibleCards={visibleCards}
          start={start}
          setStart={setStart}
          arrLength={arrLength}
          end={end}
        />
        <div className="hot-phones__phones">
          <ul className="product">
            {sortedPhones.slice(start, end).map((phone: Product) => (
              <li
                className="product__item"
                key={phone.id}
              >
                <ProductCard
                  phone={phone}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
