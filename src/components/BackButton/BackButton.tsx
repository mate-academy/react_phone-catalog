import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import './backButton.scss';

export const BackButton:React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-2);
  };

  return (
    <div
      className="back-button"
      onClick={handleGoBack}
      aria-hidden
      data-cy="backButton"
    >
      <div className="back-button__icon">
        <ReactSVG src="img/icons/ArrowLeft.svg" />
      </div>

      <span className="back-button__text">Back</span>
    </div>
  );
};
