import { useNavigate } from 'react-router-dom';

export const HistoryBack = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="history history--back"
      onClick={() => {
        navigate(-1);
      }}
      data-cy="backButton"
    >
      <span className="history__arrow history__arrow--back" />
      <p className="history__page history__page--last">Back</p>
    </button>
  );
};
