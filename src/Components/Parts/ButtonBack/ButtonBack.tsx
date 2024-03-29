import { useNavigate } from 'react-router-dom';

export const ButtonBack = () => {
  const navigate = useNavigate();

  const handleNavigate = () => navigate(-1);

  return (
    <button type="button" className="button__back" onClick={handleNavigate}>
      <div className="button__back--box">
        <img
          src="./img/svg/Arrow__right.svg"
          alt="Arrow Left"
          className="button__arrow--left"
        />
        Back
      </div>
    </button>
  );
};
