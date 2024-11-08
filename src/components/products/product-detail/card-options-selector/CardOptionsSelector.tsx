import { FC } from 'react';

import styles from './CardOptionsSelector.module.scss';
import { OptionsList } from './options-list/OptionsList';

type TProps = {
  currentValue: string;
  options: string[];
  label: string;
  onChange: (option: string) => void;
  isColor?: boolean;
};

export const CardOptionsSelector: FC<TProps> = ({
  currentValue,
  options,
  label,
  onChange,
  isColor,
}) => {
  return (
    <div className={isColor ? styles.colors : styles.capacity}>
      <span>{label}</span>
      {options.map(option => (
        <OptionsList
          key={option}
          option={option}
          currentValue={currentValue}
          isColor={isColor}
          onChange={onChange}
        />
      ))}
    </div>
  );
};
