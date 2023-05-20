import { useNavigate } from 'react-router-dom';
import arrowLeft from '../../assets/svg/arrowLeft.svg';

import './buttonBlack.scss';

export const ButtonBack = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="button-back"
      onClick={() => navigate(-1)}
    >
      <img src={arrowLeft} alt="Arrow Left" />
    </button>
  );
};
