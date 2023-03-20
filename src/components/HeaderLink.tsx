import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string,
  text?: string,
  className: string,
};

export const HeaderLink: React.FC<Props> = ({
  children,
  to,
  text,
  className,
}) => {
  return (
    <NavLink
      to={to}
      className={
        ({ isActive }) => classNames(
          className,
          { active: isActive },
        )
      }
    >
      {text ? (<p className="uppercase_text">{text}</p>) : children}
    </NavLink>
  );
};
