import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import '../../style/GlobalStyle.scss';
import style from './ProductSlider.module.scss';
import { Product } from '../../interface/interface';
import { addToCart } from '../../features/cartSlice';
import { toggleFavorite } from '../../features/favoritesSlice';
import classNames from 'classnames';

interface Props {
  title: string;
  products?: Product[];
  hasDiscount?: boolean;
}

export const ProductsSlider = ({
  title,
  products: customProducts,
  hasDiscount = true,
}: Props) => {
  const dispatch = useAppDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { items: globalProducts } = useAppSelector(state => state.products);
  const favoriteItems = useAppSelector(state => state.favorites.items) || [];
  const cartItems = useAppSelector(state => state.cart.items) || [];

  const products = customProducts || globalProducts;

  const visibleCount = 4;
  const maxIndex = Math.max(0, products.length - visibleCount);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const stepWidth = 288;

  return (
    <div className={style.sliderContainer}>
      <div className={style.header}>
        <h2 className={style.title}>{title}</h2>

        <div className={style.buttons}>
          <button
            type="button"
            className={style.arrowButton}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            ‹
          </button>
          <button
            type="button"
            className={style.arrowButton}
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
          >
            ›
          </button>
        </div>
      </div>

      <div className={style.sliderWindow}>
        <div
          className={style.sliderTrack}
          style={{ transform: `translateX(-${currentIndex * stepWidth}px)` }}
        >
          {products.map((product: Product) => {
            const isFavorite = favoriteItems.some(
              item => item.itemId === product.itemId || item.id === product.id,
            );
            const isInCart = cartItems.some(
              item =>
                item.product.itemId === product.itemId ||
                item.product.id === product.id,
            );
            const showDiscount =
              hasDiscount &&
              product.fullPrice &&
              product.price !== product.fullPrice;

            return (
              <div key={product.id} className={style.slide}>
                <div className={style['gadget-cart']}>
                  <Link
                    to={`/${product.category}/${product.itemId}`}
                    className={style['gadget-link']}
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                  >
                    <div className={style['gadget-img-box']}>
                      <img
                        src={`${product.image}`}
                        alt={product.name}
                        className={style['gadget-img']}
                      />
                    </div>
                    <p
                      className={classNames(style['gadget-title'], 'body-text')}
                    >
                      {product.name}
                    </p>

                    <div className={style['price-block']}>
                      <p className={classNames(style['gadget-price'], 'h3')}>
                        ${product.price}
                      </p>
                      {showDiscount && (
                        <p
                          className={classNames(
                            style['gadget-price-sale'],
                            'h3',
                          )}
                        >
                          ${product.fullPrice}
                        </p>
                      )}
                    </div>

                    <div className={style['params-block']}>
                      <p
                        className={classNames(
                          style['params-name'],
                          'small-text',
                        )}
                      >
                        Screen
                      </p>
                      <p
                        className={classNames(
                          style['params-value'],
                          'small-text',
                        )}
                      >
                        {product.screen}
                      </p>
                    </div>
                    <div className={style['params-block']}>
                      <p
                        className={classNames(
                          style['params-name'],
                          'small-text',
                        )}
                      >
                        Capacity
                      </p>
                      <p
                        className={classNames(
                          style['params-value'],
                          'small-text',
                        )}
                      >
                        {product.capacity}
                      </p>
                    </div>
                    <div className={style['params-block']}>
                      <p
                        className={classNames(
                          style['params-name'],
                          'small-text',
                        )}
                      >
                        RAM
                      </p>
                      <p
                        className={classNames(
                          style['params-value'],
                          'small-text',
                        )}
                      >
                        {product.ram}
                      </p>
                    </div>
                  </Link>
                  <div className={style['add-buttons-block']}>
                    <button
                      type="button"
                      className={
                        isInCart ? 'button-standart active' : 'button-standart'
                      }
                      onClick={e => {
                        e.preventDefault();
                        dispatch(addToCart(product));
                      }}
                    >
                      {isInCart ? 'Added to cart' : 'Add to cart'}
                    </button>
                    <button
                      type="button"
                      className={`${style['favourites-buttons']} ${isFavorite ? style.active : ''}`}
                      onClick={e => {
                        e.preventDefault();
                        dispatch(toggleFavorite(product));
                      }}
                    >
                      {isFavorite ? (
                        <img
                          src="img/icons/favouritesActive.svg"
                          alt="Active favourite"
                        />
                      ) : (
                        <img
                          src="img/icons/favourites.svg"
                          alt="Add to favourites"
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
