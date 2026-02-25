import React from 'react';
import { RadioGroup } from '../../../shared/components/RadioGroup/RadioGroup';
import styles from './ProductConfigurator.module.scss';
import { useProductPath } from '../../hooks/useProductPath';
import { useTranslation } from 'react-i18next';
interface Props {
  colors: string[];
  activeColor: string;
  capacity: string[];
  activeCapacity: string;
}

export const ProductConfigurator: React.FC<Props> = ({
  colors,
  activeColor,
  capacity,
  activeCapacity,
}) => {
  const { changeCapacity, changeColor } = useProductPath();
  const { t } = useTranslation();
  return (
    <div className={styles.configurator}>
      <div className={styles.redactor}>
        <RadioGroup
          type="color"
          label={t('details_page.radio_color_label')}
          options={colors}
          onChangeColor={changeColor}
          active={activeColor}
        />

        <span className={styles.line} />

        <RadioGroup
          type="text"
          label={t('details_page.radio_capacity_label')}
          options={capacity}
          onChangeCapacity={changeCapacity}
          active={activeCapacity}
        />

        <span className={styles.line} />
      </div>
    </div>
  );
};
