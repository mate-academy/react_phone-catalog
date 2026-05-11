import { useNavigate } from 'react-router-dom';
import s from './Back.module.scss';

export const Back = () => {
  const navigate = useNavigate();

  return (
    <button className={s.back} onClick={() => navigate(-1)}>
      <img className={s.back__chevron} src="./img/icons/chevron-right.svg" />
      <div className={s.back__title}>Back</div>
    </button>
  );
};
