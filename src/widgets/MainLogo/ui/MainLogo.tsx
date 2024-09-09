import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Theme, useTheme } from '../../../app/providers/ThemeProvider';
import { RoutePaths } from '../../../shared/config/routeConfig';
import cls from './mainLogo.module.scss';

export const MainLogo = memo(() => {
  const { theme } = useTheme();

  return (
    <Link to={RoutePaths.home} className={cls.mainLogo}>
      {theme === Theme.LIGHT ? (
        <img src="img/logo.svg" alt="logo" />
      ) : (
        <img src="img/logo-dark.svg" alt="logo" />
      )}
    </Link>
  );
});
