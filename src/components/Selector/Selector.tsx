import classNames from 'classnames';
import React from 'react';
import styles from './Selector.module.scss';
import { COLORS_MAP } from '../../modules/ProductDetailsPage/constants/colorsMap';

interface SelectorProps {
  options: string[];
  selectedOption: string | null;
  onSelect: (option: string) => void;
  type?: 'color' | 'text';
}

export const Selector: React.FC<SelectorProps> = ({
  options,
  selectedOption,
  onSelect,
  type = 'text',
}) => {
  const getBackgroundColor = (colorName: string) => {
    const normalizedKey = colorName.toLowerCase().replace(/[\s-]/g, '');

    return COLORS_MAP[normalizedKey] || colorName;
  };

  const isColorType = type === 'color';

  return (
    <div
      className={classNames(styles.container, 'body-text', {
        [styles.colorContainer]: isColorType,
        [styles.textContainer]: !isColorType,
      })}
    >
      {options.map(option => {
        const isSelected = selectedOption === option;

        const buttonClasses = classNames(styles.selector, {
          [styles.selected]: isSelected,
          [styles.colorSelector]: isColorType,
          [styles.textSelector]: !isColorType,
        });

        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={buttonClasses}
            style={isColorType ? { backgroundColor: getBackgroundColor(option) } : {}}
            aria-label={`Select ${option}`}
            aria-pressed={isSelected}
          >
            {!isColorType && option}
          </button>
        );
      })}
    </div>
  );
};
