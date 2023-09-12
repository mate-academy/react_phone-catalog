import { MobileHome } from '../MobileHome/MobileHome';
import './style.scss';

export const PhoneDetails = () => {
  return (
    <div className="details">
      <MobileHome />
      <div className="details__content">
        <h1
          className="details__content-title"
        >
          NAME
        </h1>
        <div className="details__content-phone">
          <div className="details__content-phone-left">
            <img src="" alt="" />
          </div>
          <div className="details__content-phone-main">
            <img src="" alt="" />
          </div>
          <div className="details__content-phone-info">
            <p>Available colors</p>
            <a href="/">
              <img src="" alt="" />
            </a>
            <div className="line" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneDetails;
