import { useNavigate } from 'react-router-dom';

export const NotResults = () => {
  const navigate = useNavigate();

  return (
    <div className="not-res">
      <div className="not-res__title">We are sorry, products not found</div>
      <button
        className="not-res__button button"
        type="button"
        onClick={() => navigate('/')}
      >
        Go Home
      </button>
    </div>
  );
};
