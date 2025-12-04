import { useNavigate } from 'react-router-dom';

import s from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate(-1);
      }}
      className={s.backButton}
    >
      <img
        src="/img/icons/Arrow_left.svg"
        alt="back"
        className={s.backButton__icon}
      />
      <span>Back</span>
    </button>
  );
};
