import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/DispatchSelector';
import { Product } from '../../types/Product';
import s from './Navigate.module.scss';

export const Navigates = () => {
  const location = useLocation();
  const navigate = location.pathname.split('/').filter(path => path);
  const products = useAppSelector(state => state.products);
  const currentProduct = products.find(
    (product: Product) => product.itemId === navigate[navigate.length - 1],
  ) || { name: navigate[navigate.length - 1] };

  navigate.pop();
  navigate.push(currentProduct.name);

  return (
    <div className={s.navigate}>
      <Link to="/" className={(s.navigate__item, navigate__item__link)}>
        <img
          src="./img/icons/home.svg"
          alt="Home"
          className={s.navigate__item__image}
        />
      </Link>
      {navigate.map((crumb, index) => {
        const routeTo = `/${navigate.slice(0, index + 1).join('/')}`;
        const isLast = index === navigate.length - 1;
        const crumbName = crumb.charAt(0).toUpperCase() + crumb.slice(1);

        return (
          <div key={index} className={s.navigate__item}>
            <img src="./img/icons/arrow-right.svg" alt="Arrow right" />
            {!isLast ? (
              <Link to={routeTo} className={s.navigate__item__link}>
                {crumbName}
              </Link>
            ) : (
              <span className={(s.navigate__item, navigate__item__last)}>
                {crumbName}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
