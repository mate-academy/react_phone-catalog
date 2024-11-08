import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import cn from 'classnames';

import { OptionContent } from '../option-content/OptionContent';
import styles from './OptionsList.module.scss';

type TProps = {
  currentValue: string;
  option: string;
  isColor?: boolean;
  onChange: (option: string) => void;
};

export const OptionsList: FC<TProps> = ({
  option,
  onChange,
  isColor,
  currentValue,
}) => {
  const { t } = useTranslation();

  const localOption = t(`value.${option}`);

  return (
    <button
      key={option}
      type="button"
      onClick={() => onChange(option)}
      className={cn(isColor ? styles.circle : styles.rectangle, {
        [styles.active]: option === currentValue,
      })}
      aria-label={localOption}
      aria-selected={option === currentValue}
      title={localOption}
    >
      <OptionContent option={option} isColor={isColor} />
    </button>
  );
};
