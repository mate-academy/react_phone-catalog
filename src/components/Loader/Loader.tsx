import './Loader.scss';
import AppleLogo from '../../images/icons/png-apple-logo.png';

export const Loader = () => (
  <div className="loader" data-cy="Loader">
    <div className="loader__content">
      <div className="loader__logo">
        <img
          src={AppleLogo}
          alt=""
          className="loader__image"
        />
      </div>
    </div>
  </div>
);
