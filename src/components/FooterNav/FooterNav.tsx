import { Link } from 'react-router-dom';
import footerNavList from '../../api/footerNav.json';
import './FooterNav.scss';

export const FooterNav: React.FC = () => {
  return (
    <div className="footer__nav">
      {footerNavList.map(navItem => (
        <Link
          key={navItem.title}
          to={navItem.link}
          className="footer__link"
        >
          {navItem.title}
        </Link>
      ))}
    </div>
  );
};
