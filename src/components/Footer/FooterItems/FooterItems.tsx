import { Link } from 'react-router-dom';
import { footerLinks } from '../../../variables/footerLinks';

export const FooterItems = () => (
  <ul className="footer__items">
    {footerLinks.map((link) => (
      <li className="footer__item" key={link.id}>
        <Link
          to={link.path}
          className="footer__link"
          target={link.targetStatus ? '_blank' : ''}
        >
          {link.name}
        </Link>
      </li>
    ))}
  </ul>
);
