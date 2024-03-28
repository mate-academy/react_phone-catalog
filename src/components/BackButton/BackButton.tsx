import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="back-button-box mb-16"
      onClick={() => navigate('..')}
      onKeyDown={() => navigate(-1)}
      role="button"
      tabIndex={0}
    >
      <div className="back-button-align mr-4">
        <img src="./img/icons/arrowBackBlack.svg" alt="img" />
      </div>
      <div className="back-button">Back</div>
    </div>
  );
};
