import { useNavigate } from 'react-router-dom';

export const BackPath = () => {
  const navigate = useNavigate();

  return (
    <div className="backPath">
      <button onClick={() => navigate(-1)} className="backPath__box">
        <img
          src="img/icons/arrow-left.svg"
          alt="arrow left"
          className="backPath__img"
        />
        <p className="backPath__text">Back</p>
      </button>
    </div>
  );
};
