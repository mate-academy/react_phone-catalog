import { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { ProductCard } from '../ProductCard';
import { SliderButton } from './SliderButton';
import { getProcessedProducts } from './utils';
import { fetchProducts } from '../../api';
import './ProductsSlider.scss';

type Props = {
  title: string,
  filterCriteria: ProductSliderFilters,
  sortBy: ProductSliderSorting,
};

const sliderSettings = {
  containerWidth: 1040,
  cardWidth: 272,
  cardGap: 16,
  cardsPerPage: 4,
};

export const ProductsSlider:React.FC<Props> = ({
  title,
  filterCriteria,
  sortBy,
}) => {
  const {
    cardWidth,
    cardGap,
    cardsPerPage,
  } = sliderSettings;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [lastVisibleCard, setLastVisibleCard] = useState(cardsPerPage);
  const scroll = -(lastVisibleCard - cardsPerPage) * (cardWidth + cardGap);
  const styles = {
    transform: `translateX(${scroll}px)`,
    transition: 'transform 0.5s',
  };

  useEffect(() => {
    fetchProducts()
      .then((productsFromServer) => {
        const processedProducts = getProcessedProducts(
          filterCriteria,
          sortBy,
          productsFromServer,
        );

        setProducts(processedProducts);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }, []);

  const handleCardChange = (direction: 'next' | 'prev') => {
    const totalCards = products.length;
    let newCard: number;

    if (direction === 'next') {
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
    <div className="products-slider">
      <div className="products-slider__header grid">
        <h2 className="products-slider__title">
          {title}
        </h2>
        <SliderButton
          direction="prev"
          handleClick={handleCardChange}
          disabled={lastVisibleCard === cardsPerPage}
        />
        <SliderButton
          direction="next"
          handleClick={handleCardChange}
          disabled={lastVisibleCard === products.length}
        />
      </div>
      {loading ? <Loader /> : (
        <div className="products-slider__products-container">
          <div className="products-slider__products">
            {products.map((product) => (
              <div
                key={product.id}
                style={styles}
                className="products-slider__product-container"
              >
                <ProductCard
                  {...product}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {errorMessage && (
        <div className="products-slider__error-message">
          {errorMessage}
        </div>
      )}
    </div>
  );
};
