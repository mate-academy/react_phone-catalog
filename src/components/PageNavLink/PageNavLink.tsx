import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './PageNavLink.scss';

type Props = {
  to: string;
  text: string;
};

const PageNavlink:React.FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames('nav__link', {
        'nav__link--active': isActive,
      })}
    >
      {text}
    </NavLink>
  );
};

export default PageNavlink;
