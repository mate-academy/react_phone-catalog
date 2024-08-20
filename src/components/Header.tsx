import { MainLogo } from './MainLogo';
import { NavItem } from './NavItem';
import { twMerge } from 'tailwind-merge';
import { ButtonHeader } from './ButtonHeader';
import { useSearchParams } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { useDashboard } from '../hooks/useShoppingDashboard';
import { SearchParams, getSearchWith } from '../helpers/searchHelper';
import menuNavigation from '../images/icons/menu-header-icon.svg';
import closeAside from '../images/icons/close-icon-aside.svg';
import mainLogo from '../images/icons/main-logo-desktop.svg';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { dashboardItems } = useDashboard();
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
        `sticky inset-x-0	top-0 z-10 flex h-12
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

        <Navigation />
      </div>

      <div className="flex">
        {dashboardItems.map(itemBoard => (
          <NavItem
            key={itemBoard.id}
            to={itemBoard.to}
            className="hidden w-12 cursor-pointer
              items-center justify-center	border-l
              border-elements md:flex lg:w-16"
          >
            <img src={itemBoard.src} alt={itemBoard.alt} className="relative" />
            {!!itemBoard.count && (
              <small
                className="
                  absolute flex h-4 -translate-y-1/2 translate-x-1/2
                  items-center justify-center rounded-full border-[2px]
                  bg-red px-[3px] text-[9px] text-white
                "
              >
                {itemBoard.count}
              </small>
            )}
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
