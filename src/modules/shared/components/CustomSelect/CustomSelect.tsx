import React, { useState } from 'react';
import styles from './CustomSelect.module.scss';
import { useSearchParams } from 'react-router-dom';
type Option = {
  label: string;
  value: string | number | null;
};

type CustomSelectProps = {
  arrayOptions: Option[];
  param: string;
  label: string;
  defaultOption?: number;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  arrayOptions,
  param,
  label,
  defaultOption = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentValue =
    searchParams.get(param) || String(arrayOptions[defaultOption].value);

  const currentLabel =
    arrayOptions.find(opt => String(opt.value) === currentValue)?.label ||
    arrayOptions[defaultOption].label;

  const handleSelect = (option: Option) => {
    const params = new URLSearchParams(searchParams);

    if (!option.value) {
      params.delete(param);
    } else {
      params.set(param, String(option.value));
    }

    setSearchParams(params);
    setIsOpen(false);
  };

  return (
    <div className={styles.customSelect}>
      <div className={styles.customSelect__label}>{label}</div>

      <div
        className={styles.customSelect__controls}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{currentLabel}</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.4715 5.52864C12.7318 5.78899 12.7318 6.2111 12.4715 6.47145L8.47149 10.4714C8.21114 10.7318 7.78903 10.7318 7.52868 10.4714L3.52868 6.47144C3.26833 6.2111 3.26833 5.78899 3.52868 5.52864C3.78903 5.26829 4.21114 5.26829 4.47149 5.52864L8.00008 9.05723L11.5287 5.52864C11.789 5.26829 12.2111 5.26829 12.4715 5.52864Z"
            fill="#B4BDC4"
          />
        </svg>
      </div>
      {isOpen && (
        <div className={styles.customSelect__options}>
          {arrayOptions.map(option => (
            <div
              key={String(option.value)}
              className={styles.customSelect__option}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
