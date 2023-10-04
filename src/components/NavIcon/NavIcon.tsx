import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Counter } from 'components/Counter';
import './NavIcon.scss';

type Props = {
  path: string,
  alt: string,
  src: string,
  count: number,
};

export const NavIcon: React.FC<Props> = ({
  path,
  alt,
  src,
  count,
}) => {
  const navbarItemClass = ({ isActive }: {
    isActive: boolean
  }) => classNames('nav-icon', {
    'nav-icon__link nav-icon__link--is-active': isActive,
  });

  return (
    <NavLink
      className={navbarItemClass}
      to={path}
    >
      <img
        alt={alt}
        src={src}
        className="nav-icon__img"
      />

      {count > 0 && (
        <Counter count={count} />
      )}
    </NavLink>
  );
};
