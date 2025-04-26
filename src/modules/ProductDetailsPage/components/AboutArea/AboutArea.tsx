import { useContext } from 'react';
import styles from './AboutArea.module.scss';
import { ProductDetailsContext } from 'store/ProductDetailsContext';

export const AboutArea = () => {
  const { product } = useContext(ProductDetailsContext);

  if (!product) {
    return;
  }

  return (
    <div className={styles.container}>
      <span className={styles.container__title}>About</span>
      <hr />
      <div className={styles.container__blocks}>
        {product.description.map(item => (
          <div key={item.title} className={styles.container__blocks__item}>
            <span className={styles.container__blocks__item__subtitle}>
              {item.title}
            </span>
            {item.text.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
