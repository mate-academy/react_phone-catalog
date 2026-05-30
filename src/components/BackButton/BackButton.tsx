import { useNavigate, useLocation } from 'react-router-dom';
import './BackButton.scss';

import ArrowLeft from '../../Images/Icons/ArrowLeft.svg';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    const path = location.pathname.toLowerCase();

    if (path.startsWith('/phones')) {
      navigate('/phones');

      return;
    }

    if (path.startsWith('/tablets')) {
      navigate('/tablets');

      return;
    }

    if (path.startsWith('/accessories')) {
      navigate('/accessories');

      return;
    }

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
