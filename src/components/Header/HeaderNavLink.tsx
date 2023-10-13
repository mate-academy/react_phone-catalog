import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  link: string,
  className: string,
  quantity?: number,
  onClick?: () => void,
  children: React.ReactNode
};

export const HeaderNavLink: React.FC<Props> = ({
  link, className, quantity = 0, children, onClick,
}) => {
  const selected = `${className}--selected`;

  return (
    <NavLink
      to={link === 'home' ? '/' : `/${link}`}
      className={({ isActive }) => classNames(className, {
        [selected]: isActive,
      })}
      onClick={onClick}
    >
      {children}

      {quantity > 0 && (
        <div className="icon__count">
          {quantity}
        </div>
      )}
    </NavLink>
  );
};
