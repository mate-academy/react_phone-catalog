import styles from './ProductDescription.module.scss';
import { ProductDetails } from '../../types/ProductDetails';

type Props = {
  description: ProductDetails['description'];
};

export const ProductDescription: React.FC<Props> = ({ description }) => {
  return (
    <div className={styles.description}>
      <h3 className={styles.description__header}>About</h3>
      {description.map((section, index) => (
        <div key={index} className={styles.description__section}>
          <h4 className={styles.description__title}>{section.title}</h4>
          {section.text.map((paragraph, i) => (
            <p key={i} className={styles.description__text}>
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};
