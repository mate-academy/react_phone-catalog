import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { LikeIcon } from '../../images/icons/LikeIcon';
import { CartIcon } from '../../images/icons/CartIcon';
import burgerMenuIcon from '../../images/icons/burger-menu-icon.svg';
import closeIcon from '../../images/icons/close-icon.svg';
import { slide as Menu } from 'react-burger-menu';
import { menuClassName } from './BurgerMenuStyles';
import { itemListClassName } from './BurgerMenuStyles';
import { itemClassName } from './BurgerMenuStyles';
import { burgerButtonClassName } from './BurgerMenuStyles';
import { customStyles } from './BurgerMenuStyles';

interface BurgerMenuProps {
  favouritesCount: number;
  cartCount: number;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({
  favouritesCount,
  cartCount,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  return (
    <div className="burgerMenu w-12 h-12 tablet:w-16 tablet:h-16 flex items-center justify-center border-r border-elements dark:border-dark-elements tablet:hidden bg-white dark:bg-dark-background">
      <Menu
        right
        isOpen={isMobile}
        onStateChange={({ isOpen }) => setIsMobile(isOpen)}
        customBurgerIcon={
          isMobile ? (
            <img
              src={closeIcon}
              alt="Close"
              className="dark:invert"
            />
          ) : (
            <img
              src={burgerMenuIcon}
              alt="Menu"
              className="dark:invert"
            />
          )
        }
        customCrossIcon={false}
        menuClassName={clsx(menuClassName, 'bg-white dark:bg-dark-background')}
        itemListClassName={clsx(
          itemListClassName,
          'text-primary dark:text-dark-primary',
        )}
        itemClassName={clsx(
          itemClassName,
          'text-primary dark:text-dark-primary hover:text-purple dark:hover:text-dark-purple',
        )}
        burgerButtonClassName={burgerButtonClassName}
        styles={{
          ...customStyles,
          bmMenuWrap: {
            ...customStyles.bmMenuWrap,
            backgroundColor: '',
          },
        }}
      >
        <NavLink
          to={'/'}
          className="menu-item"
          onClick={() => setIsMobile(false)}
        >
          Home
        </NavLink>
        <NavLink
          to={'/phones'}
          className="menu-item"
          onClick={() => setIsMobile(false)}
        >
          Phones
        </NavLink>
        <NavLink
          to={'/tablets'}
          className="menu-item"
          onClick={() => setIsMobile(false)}
        >
          Tablets
        </NavLink>
        <NavLink
          to={'/accessories'}
          className="menu-item"
          onClick={() => setIsMobile(false)}
        >
          Accessories
        </NavLink>
      </Menu>

      <div
        className={clsx(
          'flex flex-row w-full h-16 fixed bottom-0 left-0 right-0',
          'border-elements dark:border-dark-elements',
          'bg-white dark:bg-dark-background',
          'transition-all duration-300 ease-in-out',
          {
            'translate-y-0 opacity-100 delay-150': isMobile,
            'translate-y-full opacity-0': !isMobile,
          },
        )}
      >
        <NavLink
          to={'/favourites'}
          className={clsx(
            'w-[50%] h-16 flex justify-center items-center',
            'bg-white dark:bg-dark-background',
            'border border-elements dark:border-dark-elements',
            'tablet:w-12 desktop:w-16',
          )}
          onClick={() => setIsMobile(false)}
        >
          <LikeIcon
            isMobile={isMobile}
            favouritesCount={favouritesCount}
          />
        </NavLink>
        <NavLink
          to={'/cart'}
          className={clsx(
            'w-[50%] h-16 flex justify-center items-center',
            'bg-white dark:bg-dark-background',
            'border border-elements dark:border-dark-elements',
            'tablet:w-12 desktop:w-16',
          )}
          onClick={() => setIsMobile(false)}
        >
          <CartIcon
            isMobile={isMobile}
            cartCount={cartCount}
          />
        </NavLink>
      </div>
    </div>
  );
};
