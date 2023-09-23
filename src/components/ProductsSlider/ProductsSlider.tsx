import { useEffect, useState } from 'react';
import { fetchProducts } from '../../api';
import { Product } from '../../types/Product';
import { Direction, filterProducts } from './utils';
import { SliderButton } from './SliderButton';
import { ProductCard } from '../ProductCard';

import './ProductsSlider.scss';

type Props = {
  title: string;
  filter: string;
  sortBy: string;
};

const sliderSettings = {
  containerWidth: 1040,
  cardWidth: 272,
  cardGap: 16,
  cardsPerPage: 4,
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  filter,
  sortBy,
}) => {
  const {
    cardWidth,
    cardGap,
  } = sliderSettings;

  let { cardsPerPage } = sliderSettings;

  if (window.innerWidth < 600) {
    cardsPerPage = 1;
  } else if (window.innerWidth < 884) {
    cardsPerPage = 2;
  } else if (window.innerHeight < 1120) {
    cardsPerPage = 3;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [lastVisibleCard, setLastVisibleCard] = useState(cardsPerPage);
  const totalCards = products.length;

  const scroll = -(lastVisibleCard - cardsPerPage) * (cardWidth + cardGap);
  const styles = {
    transform: `translateX(${scroll}px)`,
    transition: 'transform 0.5s',
  };

  useEffect(() => {
    fetchProducts()
      .then(productsFromServer => {
        const processedProducts = filterProducts(
          filter,
          sortBy,
          productsFromServer,
        );

        setProducts(processedProducts);
        setLoading(false);
      })
      .catch((error) => setErrorMessage(error));
  }, []);

  const handleCardsChange = (direction: Direction) => {
    let newCard;

    if (direction === Direction.NEXT) {
      newCard = lastVisibleCard + cardsPerPage;

      if (newCard > totalCards) {
        newCard = totalCards;
      }
    } else {
      newCard = lastVisibleCard - cardsPerPage;

      if (newCard < cardsPerPage) {
        newCard = cardsPerPage;
      }
    }

    setLastVisibleCard(newCard);
  };

  return (
    <div className="ProductsSlider">
      <div className="ProductsSlider__top">
        <h2 className="ProductsSlider__title">{title}</h2>

        <div className="ProductsSlider__buttons">
          <SliderButton
            direction={Direction.PREV}
            handleClick={handleCardsChange}
            disabled={lastVisibleCard === cardsPerPage}
          />
          <SliderButton
            direction={Direction.NEXT}
            handleClick={handleCardsChange}
            disabled={lastVisibleCard === totalCards}
          />
        </div>
      </div>

      {errorMessage && <span>Something went wrong</span>}

      {!loading && (
        <div className="ProductsSlider__products-container">
          <div
            className="ProductsSlider__products"
            data-cy="cardsContainer"
          >
            {products.map(product => (
              <div key={product.id} style={styles}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
