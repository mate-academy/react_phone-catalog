import { NavLink, useLocation, useParams } from 'react-router-dom';
import s from './Crumb.module.scss';
import { useProductContext } from '../../context/ShopContext/ProductContext';

export const Crumb = () => {
  const location = useLocation();
  const { products } = useProductContext();
  const { productId } = useParams();
  const findProduct = products.find(item => item.itemId === productId);
  const pathname = productId
    ? [findProduct?.category, findProduct?.name]
    : location.pathname.split('/').filter(Boolean);

  return (
    <nav className={s.crumb}>
      <ol className={s.crumb__list}>
        <li className={s.crumb__item}>
          <NavLink className={s.crumb__link} to={'/'}>
            <img
              className={s.crumb__icon}
              src="/img/icons/Home.svg"
              alt="home"
            />
          </NavLink>
        </li>

        {pathname.map((crumb, index) => {
          return index === pathname.length - 1 ? (
            <li className={s.crumb__item} key={index}>
              <img
                className={s.crumb__icon}
                src="/img/icons/back.svg"
                alt="back"
              />
              <span className={s.crumb__text}>{crumb}</span>
            </li>
          ) : (
            <li className={s.crumb__item} key={index}>
              <img
                className={s.crumb__icon}
                src="/img/icons/back.svg"
                alt="back"
              />
              <NavLink className={s.crumb__link} to={`/${crumb}`}>
                {crumb}
              </NavLink>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
