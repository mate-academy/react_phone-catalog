import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string,
  text: string,
  setMenuOpened: (value: boolean) => void,
};

export const PageNavLink: React.FC<Props> = ({ to, text, setMenuOpened }) => {
  return (
    <NavLink
      className={({ isActive }) => (
        classNames('header__link uppercase',
          { 'header__link--active': isActive })
      )}
      to={to}
      onClick={() => {
        setMenuOpened(false);
      }}
    >
      {text}
    </NavLink>
  );
};
