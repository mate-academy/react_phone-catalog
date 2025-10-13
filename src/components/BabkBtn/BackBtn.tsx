import { useNavigate } from "react-router-dom";

import './BackBtn.scss';

export const BackBtn = () => {
  const navigate = useNavigate();

  return (
    <div className="back">
      <div className="back__img">
        <img src="./img/left.png" alt="back" className="back__img__link" />
      </div>
      <span onClick={() => navigate(-1)} className="back__btn">
        Back
      </span>
    </div>
  );
};
