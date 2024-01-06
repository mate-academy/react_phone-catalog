import { useNavigate } from 'react-router-dom';
import './ButtonBack.scss';

export const ButtonBack = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="buttonBack">
      <button
        className="buttonBack__button"
        aria-label="button"
        type="button"
        onClick={goBack}
      >
        <div className="buttonBack__icon" />
      </button>

      <p className="buttonBack__text">Back</p>
    </div>
  );
};
