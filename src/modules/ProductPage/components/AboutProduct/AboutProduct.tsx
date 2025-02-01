import styles from './AboutProduct.module.scss';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface DescriptionItem {
  title: string;
  text: string[];
}

interface Props {
  description: DescriptionItem[];
}

export const AboutProduct: React.FC<Props> = ({ description }) => {
  const { t } = useTranslation('common');

  return (
    <div className={styles.aboutProductContainer}>
      <h3 className={styles.aboutTitle}>{t('aboutTitle')}</h3>
      {description.map(({ title, text }) => {
        return (
          <div className={styles.descriptionContainer} key={title}>
            <p className={styles.descriptionTitle}>{title}</p>
            {text.map(paragraph => (
              <p className={styles.descriptionText} key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
};
