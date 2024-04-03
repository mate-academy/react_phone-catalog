// eslint-disable
import { NavLink } from 'react-router-dom';
import './footer.scss';
import Logo from '../Logo';

type Props = {
  onClick: () => void,
};

export const Footer: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="footer">
      <Logo />
      <div className="footer-arrow-block">
        <NavLink
          to="https://github.com/mate-academy/react_phone-catalog/pull/361"
          className="footer-center-text mr-64"
        >
          Github
        </NavLink>
        <NavLink
          to="https://github.com/mate-academy/react_phone-catalog/pull/361"
          className="footer-center-text mr-64"
        >
          Contacts
        </NavLink>
        <NavLink
          to="https://github.com/mate-academy/react_phone-catalog/pull/361"
          className="footer-center-text mr-64"
        >
          Rights
        </NavLink>
      </div>
      <div
        className="footer-arrow-block"
        onClick={onClick}
        onKeyDown={onClick}
        role="button"
        tabIndex={0}
      >
        <div className="footer-arrow-text">Back to top</div>
        <div
          className="footer-arrow"
          style={{ marginRight: 24 }}
        >
          <img src="./img/icons/arrowTop.svg" alt="img" />
        </div>
      </div>

    </div>
  );
};
