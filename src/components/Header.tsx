import { Link, NavLink, useSearchParams } from 'react-router-dom';
import logoImg from '../images/logo.svg';
import burgerMenuIcon from '../images/icons/burger-menu.svg';
import closeIcon from '../images/icons/close.svg';
import favouritesIcon from '../images/icons/favourites.svg';
import cartIcon from '../images/icons/cart.svg';
import { getSearchWith } from '../helpers/functions';
import { SearchWithParams } from '../types/main';
import classNames from 'classnames';

export const Header: React.FC = () => {
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
      className="sticky top-0 flex min-h-12
    border-b-2 border-elements lg:min-h-16"
    >
      <nav className="flex w-full">
        <ul className="flex w-full items-center gap-4 lg:gap-6">
          <div className="px-4 lg:px-6">
            <li className="flex h-5.5 w-16 lg:h-7 lg:w-20">
              <Link to="/">
                <img src={logoImg} alt="Logo" />
              </Link>
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
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    classNames(
                      `relative flex h-full items-center
                      justify-center uppercase transition
                      after:absolute after:bottom-0 after:h-[3px]
                      after:w-0 after:bg-primary
                    after:transition-[width] hover:after:w-full
                    [&:not(.text-primary)]:text-secondary [&:not(.text-primary)]:hover:text-primary`,
                      {
                        'text-primary after:w-full': isActive,
                      },
                    )
                  }
                >
                  {text}
                </NavLink>
              </li>
            ))}
          </div>
          <div className="flex h-full w-full justify-end">
            {[
              ['Burger menu', burgerMenuIcon],
              ['Favorites menu', favouritesIcon, '/favorites'],
              ['Cart menu', cartIcon, 'cart'],
            ].map(([alt, srcImg, src]) => (
              <li
                key={alt}
                onClick={
                  alt === 'Burger menu' ? handleOpenBurgerMenu : undefined
                }
                className={classNames(
                  `flex aspect-square h-full cursor-pointer items-center
                  justify-center border-l-2
                  border-elements`,
                  {
                    'md:hidden': alt === 'Burger menu',
                    'hidden md:flex': alt !== 'Burger menu',
                  },
                )}
              >
                {alt === 'Burger menu' ? (
                  <img
                    src={
                      searchParams.get('burgerMenu') === 'open'
                        ? closeIcon
                        : srcImg
                    }
                    alt={alt}
                  />
                ) : (
                  <NavLink
                    to={src}
                    className={({ isActive }) =>
                      classNames(
                        `relative flex h-full w-full items-center justify-center
                        after:absolute after:bottom-0 after:h-[3px]
                        after:w-0 after:bg-primary after:transition-[width] hover:after:w-full`,
                        {
                          'after:w-full': isActive,
                        },
                      )
                    }
                  >
                    <img src={srcImg} alt={alt} />
                  </NavLink>
                )}
              </li>
            ))}
          </div>
        </ul>
      </nav>
    </header>
  );
};
