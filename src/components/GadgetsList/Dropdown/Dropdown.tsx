import { MouseEvent, useContext, useEffect, useRef } from 'react';
import style from './Dropdown.module.scss';
import classNames from 'classnames';
import { IconUp } from '../../Icons/IconUp';
import { IconDown } from '../../Icons/IconDown';
import { useSearchParams } from 'react-router-dom';
import { useModal } from '../../../utils/useModals';
import { LanguageContext } from '../../../store/LanguageProvider';

interface DropdownProps {
  listItems: string[];
  titleDropdown: string;
  currentItem: string;
  keySearchParams: string;
  className: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  listItems,
  titleDropdown,
  currentItem,
  keySearchParams,
  className = '',
}) => {
  const { t } = useContext(LanguageContext);
  const { isOpen, close, toggle } = useModal(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleClick = (event: MouseEvent<HTMLLIElement>) => {
    const target = event.currentTarget;
    const selectedText = target.textContent;

    if (selectedText) {
      params.set(keySearchParams, selectedText);
      setSearchParams(params);
    }

    close();
  };

  useEffect(() => {
    const handler = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        close();
      }
    };

    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, [dropdownRef, close]);

  return (
    <div ref={dropdownRef} className={style.dropdown}>
      <p className={style.dropdown__titleSelecrors}>{titleDropdown}</p>
      <div
        onClick={toggle}
        ref={buttonRef}
        className={classNames(style.dropdown__dropdownBtn, className, {
          [style.dropdown__open]: isOpen,
        })}
      >
        {t(currentItem)}
        <span className={style.dropdown____toggleIcon}>
          {isOpen ? (
            <IconUp className={style.dropdown____toggleIcon} />
          ) : (
            <IconDown className={style.dropdown____toggleIcon} />
          )}
        </span>
      </div>

      <ul
        className={classNames(style.dropdown__content, {
          [style.dropdown__openContent]: isOpen,
        })}
      >
        {listItems.map(item => (
          <li
            className={classNames(style.dropdown__item, {
              [style.dropdown__selectedItem]: item === currentItem,
            })}
            onClick={e => handleClick(e)}
            key={item}
          >
            {t(item.toLowerCase())}
          </li>
        ))}
      </ul>
    </div>
  );
};
