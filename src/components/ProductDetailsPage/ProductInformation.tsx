import { ProductDetails } from '../../types/Product';
import styles from './ProductDetailsPage.module.scss';

interface Props {
  details: ProductDetails;
  fullSpecs: string[][];
}

export const ProductInformation = ({ details, fullSpecs }: Props) => (
  <div className={styles.information}>
    <section aria-labelledby="product-about">
      <h2 className={styles.sectionTitle} id="product-about">
        About
      </h2>
      {details.description.map(section => (
        <div className={styles.description} key={section.title}>
          <h3>{section.title}</h3>
          {section.text.map(paragraph => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ))}
    </section>
    <section aria-labelledby="product-specs">
      <h2 className={styles.sectionTitle} id="product-specs">
        Tech specs
      </h2>
      <dl className={`${styles.specList} ${styles.fullSpecs}`}>
        {fullSpecs.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  </div>
);
