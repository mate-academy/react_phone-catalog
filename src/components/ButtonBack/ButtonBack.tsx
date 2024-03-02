import { useNavigate } from "react-router-dom";
import "./ButtonBack.scss";

export const ButtonBack = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="top-back"
      data-cy="backButton"
      onClick={() => navigate(-1)}
    >
      <img src="/img/ArrowLeft.png" alt="left" className="top-back__img" />

      <p>Back</p>
    </button>
  );
};
