import {
  FC, ReactNode, useContext, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';

import { SearchLink } from '../SearchLink';
import { SortKeys, SortMethod } from '../../types/SortMethod';
import { ItemsOnPage } from '../../types/ItemsOnPage';
import { Styles } from '../../types/Styles';

const styles: Styles = require('./Selector.module.scss');

const {
  Selector: selector,
  Selector__description: description,
  'Selector__description--dark': descriptionDark,
  Selector__button: button,
  'Selector__button--dark': buttonDark,
  'Selector__button--open': buttonOpen,
  'Selector__button--open-dark': buttonOpenDark,
  Selector__menu: menu,
  'Selector__menu--dark': menuDark,
  'Selector__menu-button': menuButton,
  'Selector__menu-button--dark': menuButtonDark,
  'Selector__menu-button--selected': menuButtonSelected,
  'Selector__menu-button--selected-dark': menuButtonSelectedDark,
} = styles;

type Props = {
  className?: string;
  selectItems: SortMethod[] | ItemsOnPage[];
  searchParam: 'sort' | 'itemsOnPage';
  children: ReactNode;
};

export const Selector: FC<Props> = ({
  className = '',
  selectItems,
  searchParam,
  children,
}) => {
  const { isThemeDark, theme } = useContext(ThemeContext);
  const block = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const selectedItem = searchParams.get(searchParam) || selectItems[0];

  const handleSelect = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!block.current?.contains(target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const getSearchValue = (item: SortMethod | ItemsOnPage) => {
    if (searchParam === 'sort') {
      const index = Object.values(SortMethod).indexOf(item as SortMethod);

      const key = Object.keys(SortMethod)[index];

      return key;
    }

    return item;
  };

  return (
    <div
      ref={block}
      className={cn(
        selector,
        className,
      )}
    >
      <p
        className={cn(
          description,
          { [descriptionDark]: isThemeDark },
        )}
      >
        {children}
      </p>

      <div>
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={cn(
            button,
            { [buttonDark]: isThemeDark },
            { [buttonOpen]: isMenuOpen },
            { [buttonOpenDark]: isThemeDark && isMenuOpen },
          )}
        >
          <span>
            {searchParam === 'sort'
              ? SortMethod[selectedItem as SortKeys] || SortMethod.age
              : selectedItem}
          </span>

          <img
            src={isMenuOpen
              ? `./icons/Arrow_up_${theme}.svg`
              : `./icons/Arrow_down_${theme}.svg`}
            alt=""
          />
        </button>

        {isMenuOpen && (
          <ul
            className={cn(
              menu,
              { [menuDark]: isThemeDark },
            )}
          >
            {selectItems.map(item => (
              <li
                key={item}
              >
                <SearchLink
                  params={{ [searchParam]: getSearchValue(item), page: '1' }}
                  onClick={handleSelect}
                  type="button"
                  className={cn(
                    menuButton,
                    { [menuButtonDark]: isThemeDark },
                    { [menuButtonSelected]: item === selectedItem },
                    {
                      [menuButtonSelectedDark]: item === selectedItem
                        && isThemeDark,
                    },
                  )}
                >
                  {item}
                </SearchLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

Selector.defaultProps = {
  className: '',
};
