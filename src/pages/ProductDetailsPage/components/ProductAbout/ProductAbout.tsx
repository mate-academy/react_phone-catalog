import { useTranslation } from '../../../../hooks';
import type { ProductDetailsFromServer } from '../../../../types/product';
import styles from '../../ProductDetailsPage.module.scss';

type Props = {
  product: ProductDetailsFromServer;
};

export const ProductAbout = ({ product }: Props) => {
  const t = useTranslation();

  return (
    <div className={styles.about}>
      <h2 className={styles.sectionTitle}>{t.productDetails.about}</h2>

      <div className={styles.sectionDivider} />

      {product.description.map(section => (
        <article className={styles.descriptionSection} key={section.title}>
          <h3 className={styles.descriptionTitle}>{section.title}</h3>

          {section.text.map(paragraph => (
            <p className={styles.descriptionText} key={paragraph}>
              {paragraph}
            </p>
          ))}
        </article>
      ))}
    </div>
  );
};
