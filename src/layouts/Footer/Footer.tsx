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
    to: 'https://github.com/KuzmenkoGit',
    text: 'Github',
  },
  {
    to: 'https://github.com/KuzmenkoGit',
    text: 'Contacts',
  },
  {
    to: 'https://github.com/KuzmenkoGit',
    text: 'Rights',
  },
];

export default function Footer() {
  return (
    <div className="Footer">
      <div className="Footer__wrapper">
        <div className="Footer__logo">
          <img src="img/Logo.svg" alt="" />
        </div>
        <nav className="Footer__nav">
          {NAV_LINKS_FOOTER.map(item => (
            <a
              className="Footer__nav--link"
              href={item.to}
              key={item.text}
              target="_blank"
              rel="noreferrer"
            >
              {item.text}
            </a>
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
