import { Link } from 'react-router-dom';
import './Footer.scss';
import { Icon } from '../../components/ui/Icon/Icon';
const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const NAV_LINKS_FOOTER = [
  {
    to: 'github.com',
    text: 'Github',
  },
  {
    to: 'github.com',
    text: 'Contacts',
  },
  {
    to: 'github.com',
    text: 'Rights',
  },
];

export default function Footer() {
  return (
    <div className="Footer">
      <div className="Footer__wrapper">
        <div className="Footer__logo">
          <img src="/public/img/Logo.svg" alt="" />
        </div>
        <nav className="Footer__nav">
          {NAV_LINKS_FOOTER.map(item => (
            <Link className="Footer__nav--link" to={item.to} key={item.text}>
              {item.text}
            </Link>
          ))}
        </nav>
        <div className="Footer__toTop" onClick={scrollTop}>
          <div className="Footer__toTop--text">Back to Top</div>
          <div className="Footer__toTop--button">
            <Icon name="arrow-up" />
          </div>
        </div>
      </div>
    </div>
  );
}
