import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '../../img/ArrowLeft';
import './backButton.scss';

export const BackButton:React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="back-button"
      onClick={handleGoBack}
      aria-hidden
      data-cy="backButton"
    >
      <div className="back-button__icon">
        <ArrowLeft />
      </div>

      <span className="back-button__text">Back</span>
    </div>
  );
};
