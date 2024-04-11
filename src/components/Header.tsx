import favoritesGoods from '../images/icons/favourites-goods.svg';
import shoppingBag from '../images/icons/shopping-bag.svg';
import closeAside from '../images/icons/close-icon-aside.svg';
import menuNavigation from '../images/icons/menu-header-icon.svg';
import { MainLogo } from './MainLogo';
import { NavItem } from './NavItem';
import { twMerge } from 'tailwind-merge';
import { ButtonHeader } from './ButtonHeader';
import { useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../helpers/searchHelper';
import mainLogo from '../images/icons/main-logo-desktop.svg';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const aside = searchParams.get('aside') || '';

  const setSearchWith = (param: SearchParams) => {
    const search = getSearchWith(param, searchParams);

    setSearchParams(search);
  };

  const toggleMenuAside = () => {
    setSearchWith({ aside: aside === 'menu' ? null : 'menu' });
  };

  return (
    <header
      className={twMerge(
        `sticky	inset-x-0 top-0 flex h-12
        border-b border-elements bg-white lg:h-16`,
        className,
      )}
    >
      <div className="flex w-full md:gap-4 lg:gap-6">
        <MainLogo>
          <img
            className="h-5.5 w-16 cursor-pointer lg:mx-6 lg:h-7 lg:w-20"
            src={mainLogo}
            alt="Main Logo"
          />
        </MainLogo>

        <nav className={twMerge(`hidden md:flex`, className)}>
          <ul
            className="
              flex h-full flex-col gap-4 md:flex-row md:gap-8 lg:gap-16
            "
          >
            {[
              { id: 1, title: 'home', link: '/' },
              { id: 2, title: 'phones', link: 'phones' },
              { id: 3, title: 'tablets', link: 'tablets' },
              { id: 4, title: 'accessories', link: 'accessories' },
            ].map(item => (
              <li className="flex h-7 justify-center md:h-full" key={item.id}>
                <NavItem to={item.link}>{item.title}</NavItem>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex">
        {[
          {
            id: 1,
            to: '/',
            src: favoritesGoods,
            alt: 'Favorites Goods',
          },
          {
            id: 2,
            to: '/',
            src: shoppingBag,
            alt: 'Shopping Bag',
          },
        ].map(item => (
          <NavItem
            key={item.id}
            to={item.to}
            className="hidden w-12 cursor-pointer
              items-center justify-center	border-l
              border-elements md:flex lg:w-16"
          >
            <img src={item.src} alt={item.alt} />
          </NavItem>
        ))}

        <ButtonHeader
          onClick={toggleMenuAside}
          className="flex w-12 cursor-pointer items-center
            justify-center border-l	border-elements
            before:hidden md:hidden lg:w-16"
        >
          <img
            src={aside ? closeAside : menuNavigation}
            alt="Menu Navigation"
          />
        </ButtonHeader>
      </div>
    </header>
  );
};
