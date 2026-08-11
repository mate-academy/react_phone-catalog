import React from 'react';
import { useTranslation } from 'react-i18next';
import { Description } from '../../types/Description';
import styles from './ProductDescription.module.scss';

interface Props {
  description: Description[];
  className?: string;
}

export const ProductDescription: React.FC<Props> = ({ description, className }) => {
  const { t } = useTranslation();

  if (!description || description.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.productDescription} ${className || ''}`}>
      {/* Only the section header needs translation */}
      <h2 className={styles.title}>{t('about')}</h2>

      <div className={styles.content}>
        {description.map((desc, index) => (
          <div key={index} className={styles.block}>
            {/* Content comes pre-translated from the loaded JSON file */}
            <h3 className={styles.blockTitle}>{t(desc.title, { defaultValue: desc.title })}</h3>
            <div className={styles.blockContent}>
              {desc.text.map((paragraph, pIndex) => (
                <p key={pIndex} className={styles.paragraph}>
                  {t(paragraph, { defaultValue: paragraph })}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
