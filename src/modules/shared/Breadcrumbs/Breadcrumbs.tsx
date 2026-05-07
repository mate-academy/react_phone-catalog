import { Link } from 'react-router-dom';
import s from './Breadcrumbs.module.scss';
import { capitalizeFirstLetter } from '../../../utils/string';

type Props = {
  type: string;
  name?: string;
};

export const Breadcrumbs = ({ type, name }: Props) => {
  return (
    <nav className={s.breadcrumbs}>
      <ol className={s.breadcrumbs__list}>
        <li className={s.breadcrumbs__home}>
          <Link to="/">
            <img src="./img/icons/home.svg" alt="home" />
          </Link>
        </li>
        <li className={s.breadcrumbs__item}>
          <img
            src="./img/icons/chevron-right-light.svg"
            className={s.breadcrumbs__chevron}
            alt="chevron-right"
          />
          <Link to={`/${type}`} className={s.breadcrumbs__itemLink}>
            {capitalizeFirstLetter(type)}
          </Link>
        </li>
        {name && (
          <li className={s.breadcrumbs__itemName}>
            <img
              src="./img/icons/chevron-right-light.svg"
              className={s.breadcrumbs__chevron}
              alt="chevron-right"
            />
            <div className={s.breadcrumbs__name}>{name}</div>
          </li>
        )}
      </ol>
    </nav>
  );
};
