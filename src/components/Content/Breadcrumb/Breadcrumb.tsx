import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

import style from './Breadcrumb.module.scss';

type Props = {
  path: string[];
};

export const Breadcrumb: React.FC<Props> = ({ path }) => {
  return (
    <div className={style.breadcrumb}>
      <Link to="/home">
        <img src="./img/svg/Home.svg" alt="" />
      </Link>

      {path.map(e => (
        <div key={e}>
          <IoIosArrowForward className={style.breadcrumb__arrow} />
          <Link to={`/${e.toLowerCase()}`} className={style.breadcrumb__path}>
            {e}
          </Link>
        </div>
      ))}
    </div>
  );
};
