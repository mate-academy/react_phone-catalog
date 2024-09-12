import { useNavigate } from 'react-router-dom';
import styles from './Error.module.scss';
import { ErrorText } from '../../constants/errorText';
import emptyCart from '../../images/cart-is-empty.png';
import pageNotFound from '../../images/page-not-found.png';
import productNotFound from '../../images/product-not-found.png';
import classNames from 'classnames';
import { useContext, useEffect, useRef } from 'react';
import { ProductContext } from '../../store/ProductContext';
import { NewProducts } from '../../pages/HomePage/components/NewProducts';
import { getButtonClass } from '../../utils/getButtonClass';

export const getErrorImg = (error: string) => {
  switch (error) {
    case ErrorText.emptyCart:
      return emptyCart;
    case ErrorText.noPage:
      return pageNotFound;
    default:
      return productNotFound;
  }
};

type Props = {
  errorText: string;
};

export const Error: React.FC<Props> = ({ errorText }) => {
  const { darkTheme } = useContext(ProductContext);
  const navigate = useNavigate();
  const bgImage = getErrorImg(errorText);
  const timerId = useRef(0);

  useEffect(() => {
    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      navigate(-1);
    }, 5000);

    return window.clearTimeout(timerId.current);
  }, [navigate]);

  return (
    <section className={styles.container}>
      <h1 className="text--section-title">{errorText}</h1>
      {errorText === ErrorText.noFavourites && (
        <h2 className={styles.text}>
          Browse our collection and click the heart icon to add items to your
          favorites.
        </h2>
      )}
      {errorText === ErrorText.default && (
        <button
          className={classNames(
            `${styles.buttonReload} ${getButtonClass.main(darkTheme)}`,
          )}
          onClick={() => navigate(0)}
        >
          Reload
        </button>
      )}
      <div
        className={styles.img}
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      ></div>

      {errorText === ErrorText.noFavourites && (
        <article className={styles.catalog}>
          <NewProducts />
        </article>
      )}
    </section>
  );
};
