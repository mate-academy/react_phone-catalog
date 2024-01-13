import { useNavigate } from 'react-router-dom';
import './ButtonBack.scss';

export const ButtonBack = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <button
      className="buttonBack"
      aria-label="button"
      type="button"
      onClick={goBack}
    >
      <div className="buttonBack__icon" />
      <p className="buttonBack__text">Back</p>
    </button>
  );
};
