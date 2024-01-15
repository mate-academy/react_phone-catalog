import './Back.scss';
import { useNavigate } from 'react-router-dom';

export const Back = () => {
  const navigate = useNavigate();

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      className="back"
      type="button"
      onClick={() => navigate(-1)}
    >
      <i className="icon icon--arrow-left" />
      Back
    </button>
  );
};
