import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Option } from '../../types/option';
import './style.scss';
import { useLocalStorage } from '../../helpers/customHooks';

type Props = {
  options: Option[],
  selectOption: (sorting: string) => void,
  localStorageName: string,
  localValueStart?: string,
  width: number,
};

export const Dropdown: React.FC<Props> = ({
  options,
  selectOption,
  localStorageName,
  localValueStart = '0',
  width,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [
    optionIndex,
    setOptionIndex,
  ] = useLocalStorage(localStorageName, localValueStart);
  const [
    selectedValue,
    setSelectedValue,
  ] = useState<Option>(options[+optionIndex]);
  const inputRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    window.addEventListener('click', handler);

    return () => {
      window.removeEventListener('click', handler);
    };
  });

  const handleInputClick = () => {
    setShowMenu(!showMenu);
  };

  const onItemClick = (option: Option, indexOption: number) => {
    setSelectedValue(option);
    setOptionIndex(String(indexOption));
    if (option.value !== selectedValue?.value) {
      selectOption(option.value);
    }
  };

  const isSelected = (option: Option) => {
    if (!selectedValue) {
      return false;
    }

    return selectedValue.value === option.value;
  };

  return (
    <div className="dropdown" style={{ width: `${width}px` }}>
      <div
        className="dropdown__input"
        onClick={handleInputClick}
        aria-hidden="true"
        ref={inputRef}
      >
        <div className="dropdown__selectedValue">{selectedValue.label}</div>
        <div className="dropdown__tools">
          <div className={classNames(
            'dropdown__tool',
            { 'dropdown__tool--active': showMenu },
          )}
          />
        </div>
      </div>
      {showMenu && (
        <div className="dropdown__menu">
          {options.map((option, index) => (
            <div
              onClick={() => onItemClick(option, index)}
              key={option.value}
              aria-hidden="true"
              className={
                classNames('dropdown__menuItem', {
                  'dropdown__menuItem--selected': isSelected(option),
                })
              }
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
