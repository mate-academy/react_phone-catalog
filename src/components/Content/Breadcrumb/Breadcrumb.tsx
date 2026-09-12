import {IoIosArrowForward} from 'react-icons/io';
import {Link} from 'react-router-dom';

import style from './Breadcrumb.module.scss';

type Props = {
  path: string[];
};

export const Breadcrumb: React.FC<Props> = ({path}) => {
  return (
    <div className={style.breadcrumb}>
      <Link
        to="/home"
        className={style.breadcrumb__home}
        aria-label="Phone Catalog home"
      >
        <img src="./img/svg/Home.svg" alt="" />
      </Link>

      {path.map((item, index) => (
        <div key={item} className={style.breadcrumb__map}>
          <IoIosArrowForward className={style.breadcrumb__arrow} />
          {index === path.length - 1 ? (
            <span className={style.breadcrumb__path} aria-current="page">
              {item}
            </span>
          ) : (
            <Link
              to={`/${item.toLowerCase()}`}
              className={style.breadcrumb__path}
            >
              {item}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};
