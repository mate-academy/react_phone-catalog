import { Accessory } from '../../types/AccessorieTypes';
import { Phone } from '../../types/PhoneTypes';
import { Tablet } from '../../types/TabletType';
import styles from '../AboutProduct/AboutProduct.module.scss';
import { TechProduct } from '../TechSpecs/TechSpecs';

type Props = {
  product: Phone | Tablet | Accessory;
};

export const AboutProduct: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutHere}>
        <h3 className={styles.about}>About</h3>
        <div className={styles.line}></div>

        <div className={styles.aboutSection}>
          {Array.isArray(product.description) &&
            (product.description as { title: string; text: string[] }[]).map((section, index) => (
              <div className={styles.aboutSection} key={index}>
                <h4 className={styles.aboutSectionTitle}>{section.title}</h4>
                {section.text.map((paragraph, i) => (
                  <p className={styles.aboutSectionText} key={i}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
        </div>
      </div>
      <div className={styles.techContainer}>
        <h3 className={styles.techTitle}>Tech specs</h3>
        <div className={styles.line}></div>
        <TechProduct product={product} />
      </div>
    </div>
  );
};
