//#region imports
import cn from 'classnames';
import React from 'react';
import { capitalizeFirstWord } from '../../../../services/capitalizeFirstWord';
import { TechSpecs } from '../../types/TechSpecs';
import { useTranslation } from 'react-i18next';
import baseStyles from './base.module.scss';
import styles from './TechSpecsList.module.scss';
//#endregion

type Props = {
  specs: Partial<TechSpecs>;
  variant?: 'summary' | 'full';
};

export const TechSpecsList: React.FC<Props> = ({ specs, variant = 'full' }) => {
  const { t } = useTranslation('productDetails');

  return (
    <dl className={baseStyles.techSpecsList} aria-label={t('techSpecs')}>
      {Object.entries(specs).map(([name, value]) => (
        <div
          className={cn(baseStyles.specification, styles.specification, {
            [styles.summary]: variant === 'summary',
          })}
          key={`${variant}-${name}`}
        >
          <dt className={styles.specificationName}>
            {capitalizeFirstWord(t(`techSpecsList.${name}`))}
          </dt>

          <dd className={styles.specificationValue}>
            {Array.isArray(value) ? value.join(', ') : value}
          </dd>
        </div>
      ))}
    </dl>
  );
};
