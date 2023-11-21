import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

export const BackButton:React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="backButton"
      onClick={handleGoBack}
      aria-hidden
      data-cy="backButton"
    >
      <div className="backButton__icon" />

      <span className="backButton__text">Back</span>
    </div>
  );
};
