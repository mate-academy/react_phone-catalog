import { useTranslation } from 'react-i18next';
import styles from './ProductDescription.module.scss';

interface Description {
  title: string;
  text: string[];
}

interface ProductDescriptionProps {
  description: Description[];
}

export const ProductDescription = ({
  description,
}: ProductDescriptionProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.description}>
      <h2 className={styles.title}>{t('product.about')}</h2>
      <div className={styles.divider} />
      {description.map(({ title, text }) => (
        <div key={title} className={styles.section}>
          <h3 className={styles.sectionTitle}>{title}</h3>
          {text.map((paragraph, i) => (
            <p key={i} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};
