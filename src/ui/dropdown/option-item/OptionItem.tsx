import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import cn from 'classnames';

import { TOptions } from '@utils/constants/optionsForSort';

import styles from './OptionItem.module.scss';

type TProps = {
  option: TOptions;
  selectedValue: string | number;
  onOptionSelect: (value: string | number) => void;
};

export const OptionItem: FC<TProps> = memo(
  ({ option, selectedValue, onOptionSelect }) => {
    const { t } = useTranslation();
    const { value, label } = option;

    const keyboardSelection = (
      e: React.KeyboardEvent<HTMLLIElement>,
      value: string | number,
    ) => {
      if (e.key === 'Enter') {
        onOptionSelect(value);
      }
    };

    const localOption = t(`dropdown.options.${label}`);

    return (
      <li
        role="menuitem"
        tabIndex={0}
        onClick={() => onOptionSelect(value)}
        onKeyDown={e => keyboardSelection(e, value)}
        className={cn(styles.option, {
          [styles.active]: selectedValue === label,
        })}
        aria-selected={selectedValue === value}
      >
        {localOption}
      </li>
    );
  },
);
