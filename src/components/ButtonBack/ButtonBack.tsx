import { useNavigate } from 'react-router-dom';
import './ButtonBack.scss';

export const ButtonBack = () => {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate('..');
  }

  return (
    <button type="button" className="ButtonBack" onClick={handleGoBack}>
      <img
        src="/icons/Arrow_Left_small.svg"
        alt="Button back"
        className="ButtonBack__img"
      />
      <div>
        <span className="ButtonBack__text">Back</span>
      </div>
    </button>
  );
};
