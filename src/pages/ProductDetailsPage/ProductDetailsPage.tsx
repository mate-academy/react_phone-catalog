import { useLocation, useNavigate } from 'react-router-dom';
import homeImage from '../../images/home.svg';
import arrowRight from '../../images/arrow-right-secondary-color.svg';
import arrowLeft from '../../images/arrow-left-black.svg';

export const ProductDetailsPage: React.FC = () => {
  const location = useLocation();
  const phoneId = location.pathname.replace('/phones/', '');
  const upperPhoneId = phoneId.replace(phoneId[0], phoneId[0].toUpperCase());
  const navigate = useNavigate();

  return (
    <div className="phones">
      <div className="path">
        <img src={homeImage} alt="home_icon" />
        <img src={arrowRight} alt="arrow_right" />
        <h3 className="phones__prev-name">Phones</h3>
        <img src={arrowRight} alt="arrow_right" />
        <h3>{upperPhoneId}</h3>
      </div>
      <button type="button" className="left-back" onClick={() => navigate(-1)}>
        <img src={arrowLeft} alt="arrow_right" />
        <p>Back</p>
      </button>
      <h1 className="phones__title">{upperPhoneId}</h1>
    </div>
  );
};
