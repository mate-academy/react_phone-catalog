import { siteConfig } from '@/config/site';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from '@heroui/react';
import { Link, useLocation } from 'react-router-dom';
import { HeartStraightIcon } from '@phosphor-icons/react';
import { ShoppingBagOpenIcon } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import { Badge } from '@heroui/react';
import { useCart } from '@/store/CartContext';
import { useFavourites } from '@/store/FavouritesContext';
import React from 'react';

export function AppNavbar() {
  const location = useLocation(); // дізнаємось, на якій сторінці зараз користувач
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { cartItems } = useCart();
  const { favourites } = useFavourites();

  const totalQuantity = useMemo(
    () => Object.values(cartItems).reduce((a, b) => a + b, 0),
    [cartItems],
  );

  const totalQuantityFavourites = useMemo(
    () => favourites.length,
    [favourites],
  );

  const handleCloseMenu = () => {
    setIsClosing(true);

    // Завершити анімацію перед закриттям
    setTimeout(() => {
      setIsClosing(false);
      setIsMenuOpen(false);
    }, 250); // має співпадати з часом animation-duration
  };

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      className="bg-white w-full"
      classNames={{
        base: 'w-full',
        wrapper: 'w-full max-w-none h-12 xl:h-16 pr-0',
      }}
    >
      {/* Логотип */}
      <div className="flex gap-8">
        <NavbarBrand>
          <Link to="/">
            <img
              src="/img/logo.png"
              alt="logo"
              className="h-[22px] lg:w-[80px] lg:h-[28px]"
            />
          </Link>
        </NavbarBrand>

        {/* Центральне меню для великих екранів */}
        <NavbarContent justify="start" className="hidden sm:flex gap-8">
          {siteConfig.navItems.map(item => (
            <NavbarItem key={item.label} isActive={currentPath === item.href}>
              <Link
                to={item.href}
                className={`relative font-medium text-[12px] transition-colors duration-300 
                ${
                  currentPath === item.href
                    ? "text-gray-950 after:content-[''] after:absolute after:left-0 after:bottom-[-17px] xl:after:bottom-[-26px] after:h-[3px] after:w-full after:bg-gray-950"
                    : 'text-gray-600'
                }`}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      </div>

      {/* Іконки справа */}
      <NavbarContent justify="end" className="hidden sm:flex gap-0">
        <NavbarItem
          isActive={currentPath === '/favourites'}
          className="border-x border-gray-300"
        >
          <Link
            to="/favourites"
            className={`relative flex w-12 h-12 xl:w-16 xl:h-16 items-center justify-center ${
              currentPath === '/favourites'
                ? 'after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-gray-950'
                : ''
            }`}
          >
            <Badge
              content={totalQuantityFavourites}
              isInvisible={totalQuantityFavourites === 0}
              color="primary"
              shape="circle"
              placement="top-right"
              size="sm"
            >
              <HeartStraightIcon size={18} />
            </Badge>
          </Link>
        </NavbarItem>
        <NavbarItem isActive={currentPath === '/cart'}>
          <Link
            to="/cart"
            className={`relative flex w-12 h-12 xl:w-16 xl:h-16 items-center justify-center ${
              currentPath === '/cart'
                ? 'after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-gray-950'
                : ''
            }`}
          >
            <Badge
              content={totalQuantity}
              isInvisible={totalQuantity === 0}
              color="primary"
              shape="circle"
              placement="top-right"
              size="sm"
            >
              <div className="relative flex items-center justify-center">
                <ShoppingBagOpenIcon size={18} />
              </div>
            </Badge>
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Гамбургер для мобільних */}
      <NavbarMenuToggle className="border-l border-gray-200 rounded-none w-[48px] h-[48px] sm:hidden" />

      {/* Меню, що відкривається на мобільних */}
      <NavbarMenu
        className={`fixed left-0 right-0 top-12 bottom-0 w-screen
        bg-white z-50 overflow-y-auto overflow-x-hidden p-0 m-0
        border-t border-gray-200
        h-[calc(100dvh-3rem)] min-h-[calc(100dvh-3rem)]
        transition-transform duration-250
        ${isMenuOpen && !isClosing ? 'animate-slideIn' : ''}
        ${isClosing ? 'animate-slideOut' : ''}
          `}
      >
        <div className="flex min-h-full flex-1 flex-col justify-between">
          <div className="flex flex-col items-center gap-10 pt-10">
            {siteConfig.navItems.map(item => (
              <NavbarMenuItem key={item.label}>
                <Link
                  to={item.href}
                  onClick={handleCloseMenu}
                  className={`font-mont font-semibold 
                relative block py-2
                after:block after:h-[2px] after:rounded-full
                ${
                  currentPath === item.href
                    ? 'text-gray-800 after:w-full after:bg-gray-950'
                    : 'text-gray-400 after:w-0 after:bg-transparent'
                }
              `}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <NavbarMenuItem
              isActive={currentPath === '/favourites'}
              className="h-20 w-full flex flex-1 items-center justify-center border-t-3 border-r-3 border-gray-300"
            >
              <Link
                to="/favourites"
                onClick={handleCloseMenu}
                className={`relative flex w-full h-full items-center justify-center ${
                  currentPath === '/favourites'
                    ? 'after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-gray-950'
                    : ''
                }`}
              >
                <Badge
                  content={totalQuantityFavourites}
                  isInvisible={totalQuantityFavourites === 0}
                  color="primary"
                  shape="circle"
                  placement="top-right"
                >
                  <div className="relative flex items-center justify-center">
                    <HeartStraightIcon size={28} />
                  </div>
                </Badge>
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem
              isActive={currentPath === '/cart'}
              className="h-20 w-full flex flex-1 items-center justify-center border-t-3 border-gray-300"
            >
              <Link
                to="/cart"
                onClick={handleCloseMenu}
                className={`relative flex w-full h-full items-center justify-center ${
                  currentPath === '/cart'
                    ? 'after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-gray-950'
                    : ''
                }`}
              >
                <Badge
                  content={totalQuantity}
                  isInvisible={totalQuantity === 0}
                  color="primary"
                  shape="circle"
                  placement="top-right"
                >
                  <div className="relative flex items-center justify-center">
                    <ShoppingBagOpenIcon size={28} />
                  </div>
                </Badge>
              </Link>
            </NavbarMenuItem>
          </div>
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
