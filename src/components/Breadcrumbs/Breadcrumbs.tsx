import { NavLink, useLocation } from 'react-router-dom';
import style from './Breadcrumbs.module.scss';
import classNames from 'classnames';
import home from '../../assets/img/icons/home.svg';
import rightArrow from '../../assets/img/icons/arrow-right.svg';

const getActiveLink = ({ isActive }: { isActive: boolean }) =>
  classNames(style.path__direction, {
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
        <img src={home} alt="Home" className={style.path__home} />
      </NavLink>
      <img src={rightArrow} alt="Right Arrow" className={style.path__arrow} />
      <NavLink to={`/${category}`} className={getActiveLink} relative="path">
        {category}
      </NavLink>

      {/* added !, to prevent it from showing  */}
      {!name && (
        <>
          <img
            src={rightArrow}
            alt="Right Arrow"
            className={style.path__arrow}
          />
          <p className={style.path__product}>{name}</p>
        </>
      )}
    </div>
  );
};
