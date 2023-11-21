import { useLocation, useNavigate } from 'react-router-dom';
import './go-back-button.scss';

export const GoBackButton = () => {
  const { state: prevLocation } = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(prevLocation || '..');
  };

  return (
    <button
      type="button"
      className="go-back-button"
      onClick={goBack}
    >
      <img
        className="go-back-button__arrow"
        src="./img/icons/LeftArrow.svg"
        alt="Left Arrow"
      />
      Back
    </button>
  );
};
