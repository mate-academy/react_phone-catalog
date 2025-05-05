import ArrowIcon from '../../img/icons/icon-arrow.svg?react';
import s from './BackTo.module.scss';
import { Link } from 'react-router-dom';

export const BackTo = () => {
  return (
    <Link to="/" className={s.BackTo}>
      <div className={s.BackTo__iconBlock}>
        <ArrowIcon className="icon icon--left" />
      </div>
      <p className={s.BackTo__text}>Back</p>
    </Link>
  );
};
