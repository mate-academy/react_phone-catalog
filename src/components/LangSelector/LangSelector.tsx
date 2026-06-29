import { useRef, useState } from 'react';
import { Lang } from '../../store/LangContext';
import { useLang } from '../../hooks/useLang';
import { useClickOutside } from '../../hooks/useClickOutside';
import { SelectOptions } from '../../types/SortProducts';
import style from './LangSelector.module.scss';
import cn from 'classnames';

type Props = {
  options: SelectOptions[];
};

export const LangSelector: React.FC<Props> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { lang, setLang } = useLang();

  const handleClick = (option: SelectOptions) => {
    setLang(option.value as Lang);
    setIsOpen(false);
  };

  useClickOutside({
    ref: dropdownRef,
    isOpen,
    onClose: () => setIsOpen(false),
  });

  return (
    <div className={style.dropdownContainer} ref={dropdownRef}>
      <button
        className={style.dropdownTrigger}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {lang}
      </button>

      <ul
        className={cn(style.dropdown, {
          [style.dropdownOpen]: isOpen,
        })}
      >
        {options.map(option => (
          <li key={option.value}>
            <button
              onClick={() => handleClick(option)}
              className={style.dropdownItem}
            >
              {option.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
