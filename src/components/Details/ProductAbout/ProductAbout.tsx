import { DetailedProduct } from '../../../api/productDetails';
import styles from './ProductAbout.module.scss';

type ProductAboutProps = {
  product: DetailedProduct;
};

export const ProductAbout = ({ product }: ProductAboutProps) => {
  return (
    <section className={styles.about}>
      <div className={styles.about__title}>
        <p>About</p>
      </div>

      {product.description.map(section => (
        <div key={section.title} className={styles.about__block}>
          <div className={styles['about__block--subtitle']}>
            <p>{section.title}</p>
          </div>

          <div className={styles['about__block--details']}>
            {section.text.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};
