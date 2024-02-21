import { useNavigate } from 'react-router-dom';
import { RightBtn } from '../../assets/icons/RightBtn';
import './GoBack.scss';

export const GoBack = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="go-back"
      onClick={() => navigate(-1)}
      data-cy="backButton"
    >
      <RightBtn className="go-back__arrow" />
      Back
    </button>
  );
};
