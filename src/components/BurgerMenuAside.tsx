import favouritesIcon from '../images/icons/favourites.svg';
import cartIcon from '../images/icons/cart.svg';
import { Header } from './Header';
import { NavItem } from './NavItem';

export const BurgerMenuAside: React.FC = () => {
  return (
    <aside
      className="fixed inset-0 z-50 flex
    min-h-12 flex-col gap-6 bg-white"
    >
      <Header />
      <nav className="flex h-full">
        <ul
          className="flex h-full w-full flex-col
          items-center justify-between"
        >
          <div className="flex flex-col items-center gap-4">
            {[
              ['Home', '/'],
              ['Phones', '/phones'],
              ['Tablets', '/tablets'],
              ['Accessories', '/accessories'],
            ].map(([text, path]) => (
              <li className="w-fit" key={path}>
                <NavItem path={path}>{text}</NavItem>
              </li>
            ))}
          </div>
          <div className="flex h-16 w-full justify-end">
            {[
              ['Favourites menu', favouritesIcon, '/favourites'],
              ['Cart menu', cartIcon, '/cart'],
            ].map(([alt, srcImg, src]) => (
              <li
                key={alt}
                className="flex h-full w-full cursor-pointer items-center
                  justify-center border-r-2 border-t-2 border-elements
                  last:border-r-0"
              >
                <NavItem path={src} className="w-full">
                  <img src={srcImg} alt={alt} />
                </NavItem>
              </li>
            ))}
          </div>
        </ul>
      </nav>
    </aside>
  );
};
