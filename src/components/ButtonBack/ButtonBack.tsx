import { useNavigate } from 'react-router-dom';
import arrowLeft from '../../assets/svg/arrowLeft.svg';

import './buttonBlack.scss';

export const ButtonBack = () => {
  const navigate = useNavigate();

  const handleNavigate = () => navigate(-1);

  return (
    <button
      type="button"
      className="button-back"
      onClick={handleNavigate}
    >
      <img src={arrowLeft} alt="Arrow Left" />
    </button>
  );
};
