import styles from './AboutProduct.module.scss';
import { AllProduct } from '../../../../types/AllProduct';

type Props = {
  selectedProduct: AllProduct;
};

export const AboutProduct = ({ selectedProduct }: Props) => {
  return (
    <div className={styles.about}>
      <div className={styles.about__contentAbout}>
        <h2 className={styles.about__title}>About</h2>

        <div className={styles.about__divider}></div>
        {selectedProduct.description.map(({ title, text }) => (
          <div className={styles.about__textWrapper} key={title}>
            <p className={styles.about__secTitle}>{title}</p>
            {text.map((paragraph, index) => (
              <p className={styles.about__paragraph} key={index}>
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.about__contentTech}>
        <h2 className={styles.about__title}>Tech specs</h2>

        <div className={styles.about__divider}></div>

        <div className={styles.about__techWrapper}>
          {[
            { label: 'Screen', value: selectedProduct.screen },
            { label: 'Resolution', value: selectedProduct.resolution },
            { label: 'Processor', value: selectedProduct.processor },
            { label: 'RAM', value: selectedProduct.ram },
            { label: 'Camera', value: selectedProduct.camera },
            { label: 'Zoom', value: selectedProduct.zoom },
            { label: 'Cell', value: selectedProduct.cell?.join(', ') },
          ]
            .filter(item => item.value)
            .map((item, index) => (
              <div key={index} className={styles.about__techItem}>
                <span className={styles.about__techLabel}>{item.label}</span>
                <span className={styles.about__techValue}>{item.value}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
