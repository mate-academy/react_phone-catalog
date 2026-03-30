import { Link, useLocation } from 'react-router-dom';
import style from './Breadcrumbs.module.scss';
import { useTheme } from '../../store/ThemeContext';
import { ICONS } from '../../assets/icons';

export const Breadcrumbs = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  if (pathnames.length === 0) {
    return null;
  }

  return (
    <div className={style.breadcrumbs}>
      <Link to="/" className={style.breadcrumbs__link}>
        <img src={theme === 'dark' ? ICONS.darkHome : ICONS.home} alt="home" />
      </Link>
      {pathnames.map((name, index) => {
        const isLast = index === pathnames.length - 1;
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

        return (
          <>
            <img src="/img/arrow-next.svg" alt="arrow-next" />
            {isLast ? (
              <span className={style.breadcrumbs__categoryActive}>
                {formattedName}
              </span>
            ) : (
              <Link to={routeTo} className={style.breadcrumbs__link}>
                <span className={style.breadcrumbs__category}>
                  {formattedName}
                </span>
              </Link>
            )}
          </>
        );
      })}
    </div>
  );
};
