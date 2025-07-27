import { Logo } from '../../images/logos/Logo';
import { NavLink, useLocation } from 'react-router-dom';
import { CustomerBar } from '../CustomerBar.tsx/CustomerBar';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { GlassIcon } from '../../images/icons/GlassIcon';

import { ArrowDown } from '../../images/icons/ArrowDown';
import { useState } from 'react';
import { AuthButton } from '../AuthButton/AuthButton';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { t } = useTranslation('header');

  const { pathname } = useLocation();

  // State to control dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const headerClass =
    'header flex flex-row sticky top-0 justify-between items-center w-full gap-12 bg-white dark:bg-dark-background z-10000 mobile:h-12 desktop:h-16 pl-[18px] border-b border-elements dark:border-dark-border font-bold text-[12px]';
  const navItemClass =
    'flex items-center h-full relative hover:text-primary dark:hover:text-white';

  const isActive = ({ isActive }: { isActive: boolean }) =>
    `flex h-full w-full items-center relative before:content-[''] before:absolute before:bottom-[0] before:left-0 before:h-[3px] before:bg-black dark:before:bg-white before:transition-all hover:before:w-full hover:text-primary dark:hover:text-white focus:before:w-full focus:text-primary dark:focus:text-white ${
      isActive
        ? 'text-primary dark:text-dark-primary nav-active before:w-full'
        : 'text-secondary dark:text-dark-secondary before:w-0'
    }`;

  const isVisibleGlassButton =
    !pathname.includes('phones') &&
    !pathname.includes('tablets') &&
    !pathname.includes('accessories') &&
    !pathname.includes('allProducts');

  return (
    <>
      <header className={headerClass}>
        <nav className="h-full flex flex-row items-center text-center gap-11 sticky top-0 bg-white dark:bg-dark-background z-10000">
          <NavLink
            to={'/'}
            className="w-16 md:w-20 h-7 m:h-[22px]"
          >
            <Logo />
          </NavLink>
          <ul className="h-full flex flex-row justify-between gap-16 tablet:gap-12 items-center text-center uppercase text-secondary dark:text-dark-secondary mobile:hidden tablet:flex">
            <li className={navItemClass}>
              <NavLink
                to={'/'}
                className={isActive}
              >
                {t('main')}
              </NavLink>
            </li>
            <li className={navItemClass}>
              <NavLink
                to={'/phones'}
                className={isActive}
              >
                {t('phones')}
              </NavLink>
            </li>
            <li className={navItemClass}>
              <NavLink
                to={'/tablets'}
                className={isActive}
              >
                {t('tablets')}
              </NavLink>
            </li>
            <li className={navItemClass}>
              <NavLink
                to={'/accessories'}
                className={isActive}
              >
                {t('accessories')}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="right-container flex flex-row h-full dark:text-purple text-secondary ">
          {isVisibleGlassButton && (
            <NavLink
              to={'/allProducts'}
              className="flex items-center justify-center p-2 rounded transition-colors hover:bg-[#dfe1e4] dark:hover:bg-[#202937]"
              aria-label="Search"
            >
              <GlassIcon />
            </NavLink>
          )}

          {/* Dropdown for other buttons */}
          <div className="dropdown-icon relative">
            <button
              aria-label="More options"
              className=" dark:text-purple text-secondary flex items-center justify-center p-2 rounded h-full transition-colors hover:bg-[#dfe1e4] dark:hover:bg-[#202937] focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <ArrowDown className="h-5 w-5" />
            </button>
          </div>

          {isDropdownOpen && (
            <div className="items-center justify-center absolute right-20 mt-12 desktop:mt-16 w-35 bg-white dark:bg-dark-background border border-elements dark:border-dark-border rounded-md shadow-lg z-20000">
              <div className="flex flex-row items-center justify-center">
                {' '}
                <AuthButton />
                <div className="p-2">
                  <ThemeSwitcher />
                </div>
              </div>

              <LanguageSwitcher />
            </div>
          )}

          <CustomerBar />
        </div>
      </header>
    </>
  );
};
