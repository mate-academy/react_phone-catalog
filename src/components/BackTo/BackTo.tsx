import { Link } from 'react-router-dom';
import s from './BackTo.module.scss';

export const BackTo = () => {
  return (
    <Link to="/" className={s.BackTo}>
      <div className={s.BackTo__iconArrow}>
        <img src="/img/icons/icon-arrowLeft.svg" alt="" />
      </div>
      <p className={s.BackTo__textBack}>Back</p>
    </Link>
  );
};
