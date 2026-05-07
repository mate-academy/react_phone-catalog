import { Link } from 'react-router-dom';
import s from './Back.module.scss';

export const Back = () => {
  return (
    <Link to=".." className={s.back}>
      <img className={s.back__chevron} src="./img/icons/chevron-right.svg" />
      <div>Back</div>
    </Link>
  );
};
