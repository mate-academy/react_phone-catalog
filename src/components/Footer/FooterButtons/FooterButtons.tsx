import './FooterButtons.scss';
import { NavLink } from 'react-router-dom';

export const FooterButtons = () => {
  return (
    <div className="foobuttons">
      <ul className="foobuttons__menu">
        <li
          className="foobuttons__menuitem"
        >
          <NavLink
            to="/"
            className="foobuttons__link"
          >
            Github
          </NavLink>
        </li>

        <li className="foobuttons__menuitem">
          <NavLink
            to="/"
            className="foobuttons__link"
          >
            Contacts
          </NavLink>
        </li>

        <li className="foobuttons__menuitem">
          <NavLink
            to="/"
            className="foobuttons__link"
          >
            rights
          </NavLink>
        </li>
      </ul>

    </div>
  );
};
