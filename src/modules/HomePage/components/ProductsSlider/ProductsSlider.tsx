import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './ProductsSlider.module.scss';
import { Products } from '../../../shared/types/Products';
import { getProductsPerSlide } from '../../../shared/utils/variables';
import { Link } from 'react-router-dom';
import { useFavourites } from '../../../shared/contexts/FavouritesContext';
import { useCart } from '../../../shared/contexts/CartContext';

interface ProductsSliderProps {
  product: Products[];
  isShowDiscount?: boolean;
  title: string;
}

export const ProductsSlider = ({
  product,
  isShowDiscount = false,
  title,
}: ProductsSliderProps) => {
  const [slideCount, setSlideCount] = useState(0);

  const { favIconsId, toggleFavourite } = useFavourites();
  const { isInCart, addToCart } = useCart();

  const [productsPerSlide, setProductsPerSlide] = useState(getProductsPerSlide);

  useEffect(() => {
    const handleResize = () => {
      setProductsPerSlide(getProductsPerSlide());
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const lastSlideIndex = Math.max(
    0,
    Math.ceil(product.length / productsPerSlide) - 1,
  );

  const countStart = slideCount * productsPerSlide;
  const countEnd = countStart + productsPerSlide;

  const slidedDevice = product.slice(countStart, countEnd);

  return (
    <div className={styles.brandSlider}>
      <div className={styles.sliderInfo}>
        <h2 className={styles.sliderInfoTitle}>{title}</h2>
        <div className={styles.sliderNav}>
          <button
            type="button"
            className={classNames('icons', styles.scroll)}
            disabled={slideCount === 0}
            aria-label="Previous slide"
            onClick={() => setSlideCount(count => count - 1)}
          >
            <img
              src={`${import.meta.env.BASE_URL}/img/arrowLeft.svg`}
              alt=""
              className="arrow"
            />
          </button>

          <button
            type="button"
            className={classNames('icons', styles.scroll)}
            disabled={slideCount >= lastSlideIndex}
            aria-label="Next slide"
            onClick={() => setSlideCount(count => count + 1)}
          >
            <img
              src={`${import.meta.env.BASE_URL}/img/arrowRight.svg`}
              alt=""
              className="arrow"
            />
          </button>
        </div>
      </div>

      <div className={styles.products}>
        {slidedDevice.map(device => {
          const {
            id,
            name,
            priceRegular,
            priceDiscount,
            screen,
            capacity,
            ram,
            images,
          } = device;

          const isFavourite = favIconsId.includes(id);

          return (
            <div className={styles.catalog} key={id}>
              <Link to={`/product/${id}`} className={styles.catalogLink}>
                <img
                  src={images[0]}
                  alt="photo"
                  className={styles.catalogPhoto}
                />
              </Link>
              <Link to={`/product/${id}`} className={styles.catalogLink}>
                <p className={styles.catalogName}>{name}</p>
              </Link>
              <div className={styles.catalogPrice}>
                <p className={styles.catalogCurrentPrice}>
                  ${priceDiscount || priceRegular}
                </p>

                {isShowDiscount && priceDiscount && (
                  <p className={styles.catalogOldPrice}>${priceRegular}</p>
                )}
              </div>

              <div className={styles.catalogSettings}>
                <table className={styles.table}>
                  <tbody>
                    <tr>
                      <td className={styles.title}>screen</td>
                      <td className={styles.result}>{screen}</td>
                    </tr>
                    <tr>
                      <td className={styles.title}>capacity</td>
                      <td className={styles.result}>{capacity}</td>
                    </tr>
                    <tr>
                      <td className={styles.title}>RAM</td>
                      <td className={styles.result}>{ram}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.catalogButtons}>
                <button
                  className={classNames(styles.button, {
                    [styles.selectedPhone]: isInCart(id),
                    [styles.buttonsBuy]: !isInCart(id),
                  })}
                  onClick={() => {
                    addToCart(id);
                  }}
                >
                  {isInCart(id) ? 'Added to cart' : 'Add to cart'}
                </button>
                <button
                  className={classNames(
                    styles.button,
                    styles.buttonsLike,
                    'icons',
                  )}
                  onClick={() => toggleFavourite(id)}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}/img/${isFavourite ? 'likeClicked.svg' : 'like.svg'}`}
                    alt="logo"
                    className="logo"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
