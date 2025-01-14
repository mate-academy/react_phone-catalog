import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  const theme = useAppSelector(state => state.themeSwitcher.theme);
  const notPageTitle = `notPage__title theme-${theme}`;

  return (
    <div className="notPage">
      <div className="notPage__container">
        <h1 className={notPageTitle}>Page not found</h1>
      </div>

      <div className="notPage__home">
        <NavLink to="/" className="notPage__homeLink">
          return to home page
        </NavLink>
      </div>
    </div>
  );
};
