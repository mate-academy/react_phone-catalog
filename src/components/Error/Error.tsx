import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './Error.module.scss';
import { ErrorText } from '../../constants/errorText';
import emptyCart from '../../images/cart-is-empty.png';
import pageNotFound from '../../images/page-not-found.png';
import productNotFound from '../../images/product-not-found.png';

export const getErrorImg = (error: ErrorText) => {
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
  errorText: ErrorText;
};

export const Error: React.FC<Props> = ({ errorText }) => {
  const navigate = useNavigate();
  const bgImage = getErrorImg(errorText);

  useEffect(() => {
    setTimeout(() => {
      navigate('../');
    }, 999000);
  }, [navigate]);

  return (
    <section className={styles.container}>
      <h1 className="text--section-title">{errorText}</h1>
      {errorText === ErrorText.default && (
        <button
          className={`${styles.buttonReload} button button--black`}
          onClick={() => {
            navigate(0);
          }}
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
    </section>
  );
};
