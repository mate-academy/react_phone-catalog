import { useNavigate } from 'react-router-dom';
import './ButtonBack.scss';

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
      <img src="img/mine/icons/Arrow Left.svg" alt="arrowLeft" />
    </button>
  );
};
