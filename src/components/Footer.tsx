/* eslint-disable import/no-cycle */
import { ArrowButton, Logo, Nav } from './index';
import { footerItems } from '../utils/listsNames';

export const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <Logo />
      <div className="footer__nav">
        <Nav items={footerItems} />
      </div>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0 })}
        className="footer__action link"
      >
        <div className="footer__action--description">Go to top</div>

        <ArrowButton type="up" />
      </button>
    </div>
  </footer>

);
