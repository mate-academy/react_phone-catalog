import classNames from 'classnames';
import styles from './AboutSection.module.scss';
import { ProductDetail } from '../../../../types/productDetail';

type Props = {
  curProduct: ProductDetail;
};

export const AboutSection: React.FC<Props> = ({ curProduct }) => {
  return (
    <section className={classNames(styles.AboutSection)}>
      <h3>About</h3>

      <hr />

      {curProduct.description.map(content => (
        <div key={content.title} className={styles.AboutSection__content}>
          <h4 className={styles.AboutSection__title}>{content.title}</h4>
          <p className={styles.AboutSection__text}>{content.text}</p>
        </div>
      ))}
    </section>
  );
};
