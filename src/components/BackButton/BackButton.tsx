import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

import ArrowLeft from '../../Images/Icons/ArrowLeft.svg';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button
      type="button"
      className="back-button"
      onClick={handleGoBack}
      aria-hidden
      data-cy="backButton"
    >
      <div className="back-button__icon">
        <img src={ArrowLeft} alt="ArrowLeft" />
      </div>

      <span className="back-button__text">Back</span>
    </button>
  );
};
