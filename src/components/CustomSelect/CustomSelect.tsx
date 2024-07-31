import { useState } from 'react';
import styles from './CustomSelect.module.scss';
import { Icon } from '../Icon';
import classNames from 'classnames';

type CustomSelectProps = {
  options: string[];
  label?: string;
};

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const placeHolder = label === 'page' ? '1' : 'Sort by...';

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    // onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.customSelect}>
      <div
        className={classNames(
          'button-text',
          styles.customSelect__selectedOption,
        )}
        onClick={toggleDropdown}
      >
        {selectedOption ? selectedOption : placeHolder}
        {isOpen ? (
          <span className={styles['customSelect__arrow-icon']}>
            <Icon iconName="up" />
          </span>
        ) : (
          <span className={styles['customSelect__arrow-icon']}>
            <Icon iconName="down" />
          </span>
        )}
      </div>
      {isOpen && (
        <ul className={styles.customSelect__optionsList}>
          {options.map(option => (
            <li
              key={option}
              className={classNames(
                'body-text',
                styles.customSelect__optionItem,
              )}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
