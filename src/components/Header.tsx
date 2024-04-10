import { useSearchParams } from 'react-router-dom';
import * as cartTypes from '../types/cart';
import burgerMenuIcon from '../images/icons/burger-menu.svg';
import closeIcon from '../images/icons/close.svg';
import favouritesIcon from '../images/icons/favourites.svg';
import cartIcon from '../images/icons/cart.svg';
import { getSearchWith } from '../helpers/functions';
import { SearchWithParams } from '../types/main';
import { Logo } from './Logo';
import { NavItem } from './NavItem';
import { twJoin } from 'tailwind-merge';
import { useReadLocalStorage } from 'usehooks-ts';

export const Header: React.FC = () => {
  const favourites = useReadLocalStorage<number[]>('favourites');
  const cart = useReadLocalStorage<cartTypes.CartItem[]>('cart');
  const [searchParams, setSearchParams] = useSearchParams();

  const setSearchWith = (params: SearchWithParams) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const handleOpenBurgerMenu = () => {
    setSearchWith({
      burgerMenu: searchParams.get('burgerMenu') ? null : 'open',
    });
  };

  return (
    <header
      className="sticky top-0 z-40 flex
    min-h-12 w-full border-b-2 border-elements bg-white lg:min-h-16"
    >
      <nav className="flex w-full">
        <ul className="flex w-full items-center gap-4 lg:gap-6">
          <div className="px-4 lg:px-6">
            <li>
              <Logo />
            </li>
          </div>
          <div className="hidden h-full gap-8 md:visible md:flex lg:gap-16">
            {[
              ['Home', '/'],
              ['Phones', '/phones'],
              ['Tablets', '/tablets'],
              ['Accessories', '/accessories'],
            ].map(([text, path]) => (
              <li key={path}>
                <NavItem path={path}>{text}</NavItem>
              </li>
            ))}
          </div>
          <div className="flex h-full w-full justify-end">
            {[
              { alt: 'Burger menu', srcImg: burgerMenuIcon },
              {
                alt: 'Favourites menu',
                srcImg: favouritesIcon,
                src: '/favourites',
                storageCount: favourites?.length,
              },
              {
                alt: 'Cart menu',
                srcImg: cartIcon,
                src: '/cart',
                storageCount: cart?.reduce((a, b) => a + (b.quantity || 1), 0),
              },
            ].map(({ alt, srcImg, src, storageCount }) => (
              <li
                key={alt}
                onClick={
                  alt === 'Burger menu' ? handleOpenBurgerMenu : undefined
                }
                className={twJoin(
                  `flex aspect-square h-full cursor-pointer items-center
                  justify-center border-l-2
                  border-elements`,
                  alt === 'Burger menu' && 'md:hidden',
                  alt !== 'Burger menu' && 'hidden md:flex',
                )}
              >
                {alt === 'Burger menu' || !src ? (
                  <img
                    src={
                      searchParams.get('burgerMenu') === 'open'
                        ? closeIcon
                        : srcImg
                    }
                    alt={alt}
                  />
                ) : (
                  <NavItem path={src} className="w-full">
                    {!!storageCount && (
                      <div
                        className="absolute flex
                        h-3.5 -translate-y-1/2 translate-x-1/2 items-center
                        justify-center rounded-full border-[2px]
                        border-white bg-red px-0.5 text-[9px]
                        text-white"
                      >
                        {storageCount}
                      </div>
                    )}
                    <img src={srcImg} alt={alt} />
                  </NavItem>
                )}
              </li>
            ))}
          </div>
        </ul>
      </nav>
    </header>
  );
};
