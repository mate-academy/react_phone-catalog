import { useNavigate } from 'react-router-dom';
import './not-res.scss';

export const NotResults = () => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate('/');

  return (
    <div className="not-res">
      <div className="not-res__title">
        Products caught in a game of hide-and-seek.
        We&apos;ll find them, no peeking!
      </div>
      <button
        className="not-res__button button"
        type="button"
        onClick={handleNavigate}
      >
        Go Home
      </button>
    </div>
  );
};
