import style from './Breadcrumbs.module.scss';
import home from '../../assets/img/icons/home-icon.svg';
import rightArrow from '../../assets/img/icons/arrow-right.svg';
import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';

const getActiveLink = ({ isActive }: { isActive: boolean }) =>
  cn(style.path__direction, {
    [style['path__direction--active']]: isActive,
  });

type Props = {
  name?: string | undefined;
};

export const Breadcrumbs: React.FC<Props> = ({ name }) => {
  const category = useLocation().pathname.split('/').slice(1, 2).join();

  return (
    <div className={style.path}>
      <NavLink to="/" className={style.path__link}>
        <img src={home} className={style.path__home} />
      </NavLink>
      <img src={rightArrow} className={style.path__arrow} />
      <NavLink to={`/${category}`} relative="path" className={getActiveLink}>
        {category}
      </NavLink>
      {name && (
        <>
          <img src={rightArrow} className={style.path__arrow} />
          <p className={style.path__product}>{name}</p>
        </>
      )}
    </div>
  );
};
