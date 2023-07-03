import { ArrowButton, Logo, Nav } from './index';

export const Footer = () => {
  const footerItems = ['github', 'contacts', 'rights'];

  return (
    <footer className="footer">
      <div className="footer__container">
        <Logo />
        <Nav items={footerItems} />
        <a href="#top" className="footer__action link">
          <div className="footer__action--description">Go to top</div>

          <ArrowButton type="up" />
        </a>
      </div>
    </footer>
  );
};
