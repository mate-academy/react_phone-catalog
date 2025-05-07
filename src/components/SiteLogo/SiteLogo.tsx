import { useContext } from 'react';
import { StateContext } from '../GlobalProvider';
import style from './SiteLogo.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export const SiteLogo = () => {
  const { inDarkMode } = useContext(StateContext);

  return (
    <Link
      to={'/'}
      className={classNames(style.logo_img, {
        [style.logo_img_darkmode]: inDarkMode,
      })}
    />
  );
};
