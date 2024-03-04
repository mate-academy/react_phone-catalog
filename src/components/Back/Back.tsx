import { useNavigate } from 'react-router-dom';
import './Back.scss';

export const Back = () => {
  const navigate = useNavigate();

  return (
    <div className="back" data-cy="backButton">
      <button
        type="button"
        className="back__button"
        onClick={() => navigate('..')}
      >
        <div className="back__icon">
          <span className="icon icon--arrow-left" />
        </div>
        <p className="back__button-label">Back</p>
      </button>
    </div>
  );
};
