import { HashLink as Link } from 'react-router-hash-link';

export const FooterAnchor = () => (
  <div className="footer__anchor">
    <div className="text text--size-2 footer__label">Back to top</div>

    <Link to="#top" className="arrow-btn footer__btn">
      <img
        className="like-btn__icon"
        src="./img/arrow_right.svg"
        alt="arrow-btn"
        loading="lazy"
      />
    </Link>
  </div>
);
