import classNames from 'classnames';

import React from 'react';
import styles from './CapacityPicker.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  capacities: string[];
  activeCapacity: string;
  onChange: (capacity: string) => void;
  disabled: boolean;
};

export const CapacityPicker: React.FC<Props> = ({
  capacities,
  activeCapacity,
  onChange,
  disabled,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className={styles.title}>{t('product.selectCapacity')}</div>

      <div className={styles.capacity}>
        {capacities.map(capacity => (
          <button
            key={capacity}
            type="button"
            className={classNames(styles.capacityOption, {
              [styles.capacityActive]: capacity === activeCapacity,
            })}
            onClick={() => onChange(capacity)}
            disabled={disabled}
          >
            {capacity}
          </button>
        ))}
      </div>
    </div>
  );
};
