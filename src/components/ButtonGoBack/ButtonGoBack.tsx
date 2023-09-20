import { useLocation, useNavigate } from 'react-router-dom';
import './style.scss';

export const ButtonGoBack = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const goBack = () => {
    navigate({ pathname: '..', search: state?.search });
  };

  return (
    <button
      className="button-back"
      type="button"
      onClick={goBack}
    >
      <img
        className="button-back__arrow"
        src="./icons/chevron-left.svg"
        alt="Arrow left"
      />
      <span className="button-back__text">Back</span>
    </button>
  );
};
