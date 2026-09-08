import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="back" onClick={() => navigate(-1)}>
      <div className="back__arrow">
        <img src="./img/icons/arrow-left-white.svg" alt="Arrow left" />
      </div>
      <span className="back__text">Back</span>
    </button>
  );
};
