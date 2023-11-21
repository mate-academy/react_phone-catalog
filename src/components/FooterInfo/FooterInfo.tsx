import { Link } from 'react-router-dom';
import './FooterInfo.scss';

export const FooterInfo = () => {
  return (
    <div className="footer__info">
      <Link
        to="https://github.com/illia-kots"
        className="footer__link"
      >
        <p>github</p>
      </Link>

      <Link
        to="https://github.com/illia-kots"
        className="footer__link"
      >
        <p>contacts</p>
      </Link>

      <Link
        to="https://github.com/illia-kots"
        className="footer__link"
      >
        <p>rights</p>
      </Link>
    </div>
  );
};
