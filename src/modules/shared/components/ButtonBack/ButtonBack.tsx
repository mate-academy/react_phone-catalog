import { useNavigate } from 'react-router-dom';
import scss from './ButtonBack.module.scss';

export const ButtonBack = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={scss.buttonBack}
      onClick={() => navigate(-1)}
    >
      <svg className={scss.buttonBack__icon}>
        <use href={`${import.meta.env.BASE_URL}icons/icons.svg#arrow`}></use>
      </svg>
      <span className={scss.buttonBack__text}>Back</span>
    </button>
  );
};
