import { DescriptionBlock } from '../../../../types/ProductDetails';
import styles from './ProductAbout.module.scss';

type Props = {
  descriptions: DescriptionBlock[];
};

export const ProductAbout: React.FC<Props> = ({ descriptions }) => {
  return (
    <div className={styles.productAbout}>
      <h2 className={styles.productAboutTitle}>About</h2>

      {descriptions.map(info => {
        return (
          <section key={info.title} className={styles.productAboutSection}>
            <h3 className={styles.productAboutSubtitle}>{info.title}</h3>
            {info.text.map(text => {
              return (
                <p key={text} className={styles.productAboutText}>
                  {text}
                </p>
              );
            })}
          </section>
        );
      })}
    </div>
  );
};
