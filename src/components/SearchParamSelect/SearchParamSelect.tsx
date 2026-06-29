import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '../Icon';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useTranslate } from '../../hooks/useTranslate';
import { scrollToTop } from '../../utils/scrollToTop';
import { setParam } from '../../utils/setParam';
import { INIT_CURRENT_PAGE } from '../../constants/Products/byCategory';
import { SelectOptions } from '../../types/SortProducts';
import style from './SearchParamSelect.module.scss';
import cn from 'classnames';

type Props = {
  options: SelectOptions[];
  title: string;
  searchParamKey: string;
  setCurrentPage: (page: number) => void;
};

export const SearchParamSelect: React.FC<Props> = props => {
  const { title, options, searchParamKey, setCurrentPage } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslate();

  const defaultOption = options[0].value;

  const currentValue = searchParams.get(searchParamKey) || defaultOption;
  const currentOption =
    options.find(o => o.value === currentValue) || options[0];

  const handleOptionSelect = (value: string) => {
    const newParams = setParam(searchParams, searchParamKey, value);

    setSearchParams(newParams);
    setIsOpen(false);
    setCurrentPage(INIT_CURRENT_PAGE);
    scrollToTop();
  };

  useClickOutside({
    ref: dropdownRef,
    isOpen,
    onClose: () => setIsOpen(false),
  });

  return (
    <div className={style.dropdownContainer} ref={dropdownRef}>
      <p className={style.dropdownTitle}>{title}</p>
      <div className={style.dropdownWrapper}>
        <button
          className={style.dropdownTrigger}
          onClick={() => setIsOpen(prev => !prev)}
          aria-label="Search"
        >
          {t(currentOption.title)}
          <Icon name={isOpen ? 'arrowUp' : 'arrowDown'} />
        </button>

        <ul className={cn(style.dropdown, { [style.dropdownOpen]: isOpen })}>
          {options.map(option => (
            <li key={option.value}>
              <button
                onClick={() => handleOptionSelect(option.value)}
                className={style.dropdownItem}
              >
                {t(option.title)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
