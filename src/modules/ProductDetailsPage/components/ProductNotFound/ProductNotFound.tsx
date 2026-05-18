import { useNavigate } from 'react-router-dom';
import styles from './ProductNotFound.module.scss';

export const ProductNotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <span onClick={() => navigate(-1)} className="App__link">
        Back
      </span>
      <div className={styles.prnf__img_container}>
        {' '}
        <img
          className={styles.prnf__image}
          src="/img/product-not-found.png"
          alt="Nice Gadgets"
        />
      </div>
    </>
  );
};
