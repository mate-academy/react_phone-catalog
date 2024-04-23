import { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { Logo } from '../Logo';
import './TopBar.scss';
import { MenuContext } from '../MenuContextProvider';
import { ScreenSizeContext, ScreenType } from '../ScreenSizeProvider';
import { PageNavigation } from '../PageNavigation';
import { Icon } from '../Icon';
import { IconType } from '../../types/IconTypes';
import { QuerySearchContext } from '../QuerySearchContext';
import { Search } from '../Search';

export const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useContext(MenuContext);
  const screenSize = useContext(ScreenSizeContext);
  const {
    isProductPage,
    isSearchBarOpen,
    setIsSearchBarOpen,
    onBlur,
    onSearchDelete,
  } = useContext(QuerySearchContext);

  const isSearchButtonVisible = useMemo(
    () => !isSearchBarOpen && isProductPage,
    [isProductPage, isSearchBarOpen],
  );

  const isSearchVisible = useMemo(
    () => screenSize === ScreenType.isMobile && isSearchBarOpen,
    [screenSize, isSearchBarOpen],
  );

  const areButtonsVisible = useMemo(
    () => screenSize === ScreenType.isMobile && !isSearchBarOpen,
    [screenSize, isSearchBarOpen],
  );

  const handleMenuClick = () => {
    window.scrollTo({ top: 0 });
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={classNames('top-bar', {
      'top-bar--active': isMenuOpen && screenSize === ScreenType.isMobile,
    })}
    >
      <div className="top-bar__content">
        <Logo />

        {screenSize !== ScreenType.isMobile && (
          <PageNavigation />
        )}

        {areButtonsVisible && (
          <div className="top-bar__buttons">
            {isSearchButtonVisible && (
              <button
                type="button"
                aria-label="search trigger"
                className={classNames(
                  'top-bar-button',
                  'top-bar__search-button',
                  {
                    'top-bar__search-button--hidden': isMenuOpen,
                  },
                )}
                onClick={() => setIsSearchBarOpen(true)}
              >
                <Icon iconType={IconType.search} />
              </button>
            )}

            <button
              type="button"
              className={classNames('top-bar-button', {
                'top-bar__button--active': isMenuOpen
                  && screenSize === ScreenType.isMobile,
              })}
              aria-label="open or close menu"
              onClick={handleMenuClick}
            >
              <Icon iconType={IconType.menu} />
            </button>
          </div>
        )}

        {isSearchVisible && (
          <Search
            searchName="query"
            onBlur={onBlur}
            onDelete={onSearchDelete}
            showSearchIcon={false}
          />
        )}
      </div>

      {screenSize === ScreenType.isMobile && (
        <aside className={classNames('menu', { 'menu--active': isMenuOpen })}>
          <PageNavigation />
        </aside>
      )}
    </div>
  );
};
