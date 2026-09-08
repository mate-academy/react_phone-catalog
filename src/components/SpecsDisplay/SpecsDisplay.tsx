import React from 'react';
import useLanguageStore from '../../stores/useLanguageStore';
import { translateDynamicValue } from '../../utils/constants';
import { SpecItem } from '../../types/SpecItem';
import styles from './SpecsDisplay.module.scss';
import classNames from 'classnames';

type Props = {
  specs: SpecItem[];
  size: 'small' | 'large'; // 'small' для картки, 'large' для сторінки деталей
};

export const SpecsDisplay: React.FC<Props> = ({ specs, size }) => {
  const { t, currentLanguage } = useLanguageStore();

  return (
    <div className={styles.specs}>
      {specs.map((spec, index) => (
        <div key={index} className={styles['specs-item']}>
          <span
            className={classNames(styles['specs-name'], {
              [styles['specs-name--small']]: size === 'small',
              [styles['specs-name--large']]: size === 'large',
            })}
          >
            {t(spec.labelKey)}
          </span>

          <span
            className={classNames(styles['specs-value'], {
              [styles['specs-value--small']]: size === 'small',
              [styles['specs-value--large']]: size === 'large',
            })}
          >
            {translateDynamicValue(spec.value, currentLanguage)}
          </span>
        </div>
      ))}
    </div>
  );
};
