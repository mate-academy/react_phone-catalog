import React from 'react';
import styles from './TechSpecs.module.scss';
import { useTranslation } from 'react-i18next';
import { ProductCard } from '../../../../shared/types/ProductCard';

const techNames = [
  'screen',
  'resolution',
  'processor',
  'ram',
  'camera',
  'zoom',
  'cell',
];

const techNamesUK = [
  'Екран',
  'Роздільна здатність',
  'Процессор',
  'Оперативна Память',
  'Камера',
  'Зум',
  "Зв'язок",
];

type Props = {
  object: ProductCard;
};

export const TechSpecs: React.FC<Props> = ({ object }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.card__tech}>
      <h1 className={styles.card__techTitle}>{t('inf_tech')}</h1>
      {techNames.map(techName => {
        return (
          <div key={techName} className={styles.card__techItem}>
            <p className={styles.card__techName}>
              {i18n.language === 'en'
                ? techName
                : techNamesUK[techNames.indexOf(techName)]}
            </p>
            <p className={styles.card__techValue}>
              {object[techName] || 'not found'}
            </p>
          </div>
        );
      })}
    </div>
  );
};
