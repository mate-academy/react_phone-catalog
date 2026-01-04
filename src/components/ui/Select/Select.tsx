import { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';
import './Select.scss';
import classNames from 'classnames';
type Props = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export default function Select({ label, options, value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toogleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="Select" ref={selectRef}>
      <div className="Select__label">{label}</div>
      <div className="Select__trigger" onClick={() => toogleDropdown()}>
        <div className="Select ">{value}</div>
        {isOpen ? <Icon name="arrow-up" /> : <Icon name="arrow-down" />}
      </div>
      <div
        className={classNames('Select__dropdown', {
          active: isOpen,
        })}
      >
        <ul className="Select__list">
          {options.map(option => {
            return (
              <li
                className={classNames('Select__item', {
                  active: value === option,
                })}
                key={option}
                onClick={() => {
                  onChange(option);
                  toogleDropdown();
                }}
              >
                {option}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
