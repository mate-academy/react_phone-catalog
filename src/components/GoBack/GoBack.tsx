import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from '../../assets/images/icons/ArrowRightIcon';
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
      <ArrowRightIcon className="go-back__arrow" />
      Back
    </button>
  );
};
