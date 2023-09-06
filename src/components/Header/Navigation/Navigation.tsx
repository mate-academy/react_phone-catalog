import { NavigationLink } from './NavigatioLink';
import './Navigation.scss';

const NAVIGATION_PAGES = ['home', 'phones', 'tablets', 'accessories'];

export const Navigation = () => (
  <nav className="Navigation">
    <ul className="Navigation__list">
      {NAVIGATION_PAGES.map(currentPage => (
        <li className="Navigation__item">
          <NavigationLink
            type="text"
            to={currentPage === 'home' ? '/' : currentPage.toString()}
          >
            {currentPage}
          </NavigationLink>
        </li>
      ))}
    </ul>
  </nav>
);
