import { Icons } from '../../types/enums/Icons';
import { scrollToTop } from '../../utils/functions';
import { Icon } from '../Icon';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <span className="footer__logo" />
      <ul className="footer__navigation">
        <li className="footer__navigation-item">GITHUB</li>
        <li className="footer__navigation-item">CONTACTS</li>
        <li className="footer__navigation-item">RIGHTS</li>
      </ul>

      <button
        aria-label="toTop"
        type="button"
        className="footer__button"
        onClick={scrollToTop}
      >
        <p className="footer__button-text">Back to top</p>
        <div className="footer__button-icon">
          <Icon icon={Icons.ArrowLeft} />
        </div>
      </button>

    </footer>
  );
};
