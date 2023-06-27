import { useNavigate } from 'react-router-dom';

import leftArrow from '../../../assets/svg/l_arrow.svg';
import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} type="button" className="back">
      <img className="back__icon" src={leftArrow} alt="go back button" />
      <span className="back__text">Back</span>
    </button>
  );
};
