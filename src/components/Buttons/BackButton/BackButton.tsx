import { useNavigate } from 'react-router-dom';

import leftArrow from '../../../assets/svg/l_arrow.svg';
import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="back-button" onClick={() => navigate(-1)} type="button">
      <img className="back-button__icon" src={leftArrow} alt="go back button" />
      Back
    </button>
  );
};
