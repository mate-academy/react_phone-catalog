import footerNavList from '../../api/footerNav.json';
import './FooterNav.scss';

export const FooterNav: React.FC = () => {
  return (
    <div className="footer__nav">
      {footerNavList.map(navItem => (
        <a
          key={navItem.title}
          href={navItem.link}
          className="footer__link"
        >
          {navItem.title}
        </a>
      ))}
    </div>
  );
};
