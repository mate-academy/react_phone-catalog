import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  text: string;
  button?: boolean;
  icon?: string;
};

export const PageNavLink: React.FC<Props> = ({
  to, text, button, icon,
}) => {
  const classNamesLInk = (isActive: boolean) => {
    return classNames(
      'nav__link',
      { 'nav__link--active': isActive },
    );
  };

  const classNamesButton = (isActive: boolean) => {
    return classNames(
      'button',
      'header__button',
      `header__button--${icon}`,
      { 'header__button--active': isActive },
    );
  };

  return (
    <NavLink
      to={to}
      className={({ isActive }) => (
        button ? classNamesButton(isActive) : classNamesLInk(isActive)
      )}
    >
      {text}
    </NavLink>
  );
};
