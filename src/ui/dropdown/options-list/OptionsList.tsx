import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { TOptions } from '@utils/constants/optionsForSort';

import { OptionItem } from '../option-item/OptionItem';
import styles from './OptionsList.module.scss';

type TProps = {
  options: TOptions[];
  selectedValue: string | number;
  onOptionSelect: (value: string | number) => void;
};

export const OptionsList: FC<TProps> = memo(
  ({ options, selectedValue, onOptionSelect }) => {
    const { t } = useTranslation();
    const localAriaLabel = t('dropdown.ariaLabel.list');

    return (
      <div className={styles.optionsList} aria-label={localAriaLabel}>
        <ul role="menu" className={styles.options}>
          {options.map(option => (
            <OptionItem
              key={option.value}
              option={option}
              selectedValue={selectedValue}
              onOptionSelect={onOptionSelect}
            />
          ))}
        </ul>
      </div>
    );
  },
);
