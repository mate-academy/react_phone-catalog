import { NavLink } from 'react-router-dom';
import s from './Error.module.scss';

type Props = {
  errorMEssage: string;
  action?: () => void;
};

export const Error: React.FC<Props> = ({ errorMEssage, action }) => {
  return (
    <main className={s.error}>
      <div className={s.error__info}>
        <h2 className={s.error__title}>Ooops!</h2>
        <p className={s.error__subtitle}>{errorMEssage}</p>

        {action ? (
          <button className={s.error__btn} onClick={action}>
            Reload
          </button>
        ) : (
          <NavLink to="/">
            <button className={s.error__btn}>Back home</button>
          </NavLink>
        )}
      </div>

      <img className={s.error__img} src="img/error.png" alt="error" />
    </main>
  );
};
