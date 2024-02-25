import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '../../assets/icons/ArrowLeft';
import './GoBack.scss';

export const GoBack = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="goBack"
      data-cy="backButton"
      onClick={() => navigate(-1)}
    >
      <ArrowLeft className="goBack__arrow" />
      Back
    </button>
  );
};
