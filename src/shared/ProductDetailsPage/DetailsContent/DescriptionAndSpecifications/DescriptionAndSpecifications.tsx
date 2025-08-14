/* eslint-disable @typescript-eslint/indent */
import { ProductFullInfo } from '../../../../types/ProductFullInfo';
import styles from './DescriptionAndSpecifications.module.scss';

type DescriptionAndSpecificationsProps = {
  chosedItem: ProductFullInfo;
};

export const DescriptionAndSpecifications: React.FC<
  DescriptionAndSpecificationsProps
> = ({ chosedItem }) => {
  return (
    <>
      {/* Product description */}

      <div className={styles.wrapper}>
        <section className={styles.description}>
          <h3 className={styles.description_title}>About</h3>
          <div className={styles.underline}></div>
          <div className={styles.description_sections}>
            {chosedItem?.description.map(article => (
              <section className={styles.feature} key={article.title}>
                <h4 className={styles.feature_title}>{article.title}</h4>
                <p className={styles.feature_text}>{article.text}</p>
              </section>
            ))}
          </div>
        </section>
        {/* Tech specs */}
        <section className={styles.specifications}>
          <h3 className={styles.specifications_title}>Tech specs</h3>
          <div className={styles.underline}></div>
          <div className={styles.specifications_list}>
            <div className={styles.specifications_options}>
              <span className={styles.specifications_option}>Screen</span>
              <span className={styles.specifications_option}>Resolution</span>
              <span className={styles.specifications_option}>Processor</span>
              <span className={styles.specifications_option}>RAM</span>
              <span className={styles.specifications_option}>Cell</span>
            </div>
            <div className={styles.specifications_values}>
              <span className={styles.specifications_value}>
                {chosedItem?.screen}
              </span>
              <span className={styles.specifications_value}>
                {chosedItem?.resolution}
              </span>
              <span className={styles.specifications_value}>
                {chosedItem?.processor}
              </span>
              <span className={styles.specifications_value}>
                {chosedItem?.ram}
              </span>
              <span className={styles.specifications_cell}>
                {chosedItem?.cell.join(', ')}
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
