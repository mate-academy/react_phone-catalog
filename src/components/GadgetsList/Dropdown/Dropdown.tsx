import { MouseEvent, useEffect, useRef, useState } from 'react';
import style from './Dropdown.module.scss';
import classNames from 'classnames';
import { IconUp } from '../../Icons/IconUp';
import { IconDown } from '../../Icons/IconDown';
import { SortBy } from '../../../enums/SortBy';

interface DropdownProps {
  listItems: string[];
  titleDropdown: string;
  currentItem: string;
  setItem: (value: SortBy) => void;
  className: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  listItems,
  titleDropdown,
  currentItem,
  setItem,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const selectedText = target.textContent as SortBy;

    if (selectedText) {
      setItem(selectedText);
    }

    setOpen(false);
  };

  const toggleDropdown = () => {
    setOpen(prevOpen => !prevOpen);
  };

  useEffect(() => {
    const handler = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, [dropdownRef]);

  return (
    <div ref={dropdownRef} className={style.dropdown}>
      <p className={style.dropdown__titleSelecrors}>{titleDropdown}</p>
      <div
        onClick={toggleDropdown}
        ref={buttonRef}
        className={classNames(style.dropdown__dropdownBtn, className,{
          [style.dropdown__open]: open,
        })}
      >
        {currentItem}
        <span className={style.dropdown____toggleIcon}>
          {open ? (
            <IconUp className={style.dropdown____toggleIcon} />
          ) : (
            <IconDown className={style.dropdown____toggleIcon} />
          )}
        </span>
      </div>

      <div
        className={classNames(style.dropdown__content, {
          [style.dropdown__openContent]: open,
        })}
      >
        {listItems.map(item => (
          <div
            className={classNames(style.dropdown__item, {
              [style.dropdown__selectedItem]: item === currentItem,
            })}
            onClick={e => handleClick(e)}
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
