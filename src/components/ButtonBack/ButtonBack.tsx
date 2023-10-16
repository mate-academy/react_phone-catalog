import { useNavigate } from 'react-router-dom';
import arrowLeft from '../../assets/svg/arrowLeft.svg';
import './button-back.scss';

export const ButtonBack = () => {
  const navigate = useNavigate();
  const back = () => navigate(-1);

  return (
    <button
      type="button"
      className="button-back"
      data-cy="backButton"
      onClick={back}
    >
      <img src={arrowLeft} alt="arrowLeft" />
    </button>
  );
};
