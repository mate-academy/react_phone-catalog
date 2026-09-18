import { useState, useRef, useEffect } from 'react';
import './ProductsSlider.scss';
import { Link } from 'react-router-dom';
import { AddToCartButton } from '../addToCart';
import { ProductDetails } from '../ProductDetailsPage';
import { useFavourites } from '../FavouritesContext';

export interface Product {
  id: number;
  itemId: string;
  category: string;
  name: string;
  price: number;
  screen: string;
  capacity: string;
  ram: string;
  image: string;
  year: number;
}

interface Props {
  products: Product[];
  title?: string;
}

export const ProductsSlider: React.FC<Props> = ({
  products,
  title = 'Brand new models',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const { isFavourite, toggleFavourite } = useFavourites();

  const sortedProducts = [...products].sort((a, b) => b.year - a.year);

  const finalProducts = sortedProducts.slice(0, 12);

  const checkScrollPosition = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

      setIsAtStart(scrollLeft <= 0);
      setIsAtEnd(Math.ceil(scrollLeft + clientWidth) >= scrollWidth);
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
    }

    return () => container?.removeEventListener('scroll', checkScrollPosition);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) {
      return;
    }

    const scrollAmount = 228;

    containerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="products-slider">
      <div className="products-slider__top">
        <h2 className="products-slider__title">{title}</h2>

        <div className="products-slider__buttons">
          <button
            type="button"
            className={`products-slider__btn ${
              isAtStart ? 'products-slider__btn--disabled' : ''
            }`}
            onClick={() => handleScroll('left')}
            disabled={isAtStart}
            aria-label="Previous"
          >
            <img
              className="products-slider__icon"
              src="./img/VectorBack.svg"
              alt="Previous"
            />
          </button>
          <button
            type="button"
            className={`products-slider__btn ${
              isAtEnd ? 'products-slider__btn--disabled' : ''
            }`}
            onClick={() => handleScroll('right')}
            disabled={isAtEnd}
            aria-label="Next"
          >
            <img
              className="products-slider__icon"
              src="./img/VectorNext.svg"
              alt="Next"
            />
          </button>
        </div>
      </div>

      <div className="products-slider__container" ref={containerRef}>
        {finalProducts.map(product => {
          const isFav = isFavourite(product.itemId);

          const cardDetails: ProductDetails = {
            id: product.itemId,
            category: product.category,
            namespaceId: '',
            name: product.name,
            capacityAvailable: [],
            capacity: product.capacity,
            priceRegular: product.price,
            priceDiscount: product.price,
            colorsAvailable: [],
            color: '',
            images: [product.image],
            description: [],
          };

          return (
            <Link
              key={product.id}
              to={`/${product.category}/${product.itemId}`}
              className="product-card"
            >
              <div className="product-card__image-wrapper">
                <img
                  src={`./${product.image}`}
                  alt={product.name}
                  className="product-card__image"
                />
              </div>

              <h3 className="product-card__title">{product.name}</h3>
              <p className="product-card__price">${product.price}</p>

              <div className="product-card__divider" />

              <div className="product-card__specs">
                <div className="product-card__spec">
                  <span>Screen</span>
                  <span>{product.screen}</span>
                </div>
                <div className="product-card__spec">
                  <span>Capacity</span>
                  <span>{product.capacity}</span>
                </div>
                <div className="product-card__spec">
                  <span>RAM</span>
                  <span>{product.ram}</span>
                </div>
              </div>

              <div className="product-card__actions">
                <AddToCartButton
                  productSummary={product}
                  productDetails={cardDetails}
                  selectedImage={product.image}
                  className="product-card__add-btn"
                  onClick={e => e.preventDefault()}
                />
                <button
                  type="button"
                  className={`product-card__favorite-btn ${
                    isFav ? 'product-card__favorite-btn--active' : ''
                  }`}
                  aria-label="Add to favorites"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavourite(product.itemId);
                  }}
                >
                  <img
                    src={
                      isFav ? './img/FavouritesFilled.svg' : './img/love.svg'
                    }
                    alt="Favorites"
                    className="product-card__love-icon"
                  />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
