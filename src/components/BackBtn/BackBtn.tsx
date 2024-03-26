import { useNavigate } from 'react-router-dom';
import './BackBtn.scss';

export const BackBtn = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="back-btn"
      onClick={() => navigate(-1)}
      data-cy="backButton"
    >
      <i className="ico ico-left-dark" />
      <span className="back-btn--title">Back</span>
    </button>
  );
};
