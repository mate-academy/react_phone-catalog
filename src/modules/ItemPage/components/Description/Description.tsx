import { ProductDescription } from '../../../shared/types/ProductDetails';
import styles from './Description.module.scss';

interface Props {
  descriptions: ProductDescription[];
}

export const Description: React.FC<Props> = ({ descriptions }) => {
  return (
    <div className={styles.description}>
      <h3 className={styles.description__title}>About</h3>

      <dl className={styles.description__list}>
        {descriptions.map(({ title, text }) => (
          <div key={title} className={styles.description__item}>
            <dt className={styles.description__term}>{title}</dt>
            <dd className={styles.description__definition}>{text}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
