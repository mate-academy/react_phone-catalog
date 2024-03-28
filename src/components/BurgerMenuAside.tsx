import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import favouritesIcon from '../images/icons/favourites.svg';
import cartIcon from '../images/icons/cart.svg';

export const BurgerMenuAside: React.FC = () => {
  return (
    <aside className="w-full flex-1">
      <nav className="flex h-full">
        <ul
          className="flex h-full w-full flex-col 
          items-center justify-between pt-6"
        >
          <div className="flex flex-col items-center gap-4">
            {[
              ['Home', '/'],
              ['Phones', '/phones'],
              ['Tablets', '/tablets'],
              ['Accessories', '/accessories'],
            ].map(([text, path]) => (
              <li className="w-fit" key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    classNames(
                      `relative flex h-full items-center justify-center
                      py-2 uppercase transition
                      after:absolute after:bottom-0 after:h-[3px]
                      after:w-0 after:bg-primary
                    after:transition-[width] hover:after:w-full
                    [&:not(.text-primary)]:text-secondary 
                    [&:not(.text-primary)]:hover:text-primary`,
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
          <div className="flex h-16 w-full justify-end">
            {[
              ['Favorites menu', favouritesIcon, '/favorites'],
              ['Cart menu', cartIcon, 'cart'],
            ].map(([alt, srcImg, src]) => (
              <li
                key={alt}
                className="flex h-full w-full cursor-pointer items-center
                  justify-center border-r-2 border-t-2 border-elements
                  last:border-r-0"
              >
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
              </li>
            ))}
          </div>
        </ul>
      </nav>
    </aside>
  );
};
