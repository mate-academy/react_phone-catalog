import './BackButton.scss';
import { useNavigate } from 'react-router-dom';
import LeftArrow from './../../../../img/left-arrow.png';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="back-button" onClick={() => navigate(-1)}>
      <div className="back-button__img">
        <img src={LeftArrow} alt="arrow" />
      </div>
      <div className="back-button__text">Back</div>
    </div>
  );
};
