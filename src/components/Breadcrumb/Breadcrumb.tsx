import { Link, useLocation } from 'react-router-dom';
import style from './breadcrumb.module.scss';
import home from '@Images/icons/Home.svg';
import arrow from '@Images/icons/Arrow-black-right.svg';

export const Breadcrumb = () => {
  const { pathname } = useLocation();
  const categoryName = pathname.split('/')[1];

  return (
    <>
      <nav className={style.nav}>
        <ul className={style.list}>
          <li>
            <Link className={style.link} to="/">
              <img src={home} alt="" />
            </Link>
          </li>
          <li className={style.item}>
            <img className={style['item__img-arrow']} src={arrow} alt="" />
            <span className={style.item__text}>{categoryName}</span>
          </li>
        </ul>
      </nav>
    </>
  );
};
