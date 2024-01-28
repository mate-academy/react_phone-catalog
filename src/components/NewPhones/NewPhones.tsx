import { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

import './NewPhones.scss';
import { ProductsSlider } from '../ProductsSlider';

interface Props {
  phones: Product[];
}

export const NewPhones: React.FC<Props> = ({ phones }) => {
  // const visibleCards = 4;
  const [visibleCards, setVisibleCards] = useState(4);
  const [start, setStart] = useState(0);
  const end = start + visibleCards;

  const sortedPhones = phones.sort((a, b) => (
    (b.age) - (a.age)
  ));

  const arrLength = sortedPhones.length;

  const updateVisibleCards = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth > 1439) {
      setVisibleCards(4);
    } else if (windowWidth > 1144 && windowWidth <= 1489) {
      setVisibleCards(3);
    } else if (windowWidth > 850 && windowWidth <= 1144) {
      setVisibleCards(2);
    } else if (windowWidth > 300 && windowWidth <= 850) {
      setVisibleCards(1);
    }
  };

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);

    return () => {
      window.removeEventListener('resize', updateVisibleCards);
    };
  }, []);

  return (
    <div className="container">
      <div className="hot-phones">
        <ProductsSlider
          title="Brand new models"
          visibleCards={visibleCards}
          start={start}
          setStart={setStart}
          arrLength={arrLength}
          end={end}
        />
        <div className="hot-phones__phones">
          <ul className="product__slider">
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
