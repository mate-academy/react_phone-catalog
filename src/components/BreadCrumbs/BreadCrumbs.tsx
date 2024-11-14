import { NavLink, useLocation } from 'react-router-dom';
import style from './BreadCrumbs.module.scss';
import classNames from 'classnames';
import { sentenseFormating } from '../../utils/sentenseFormating';
import { Product } from '../../types/Product';
import { ProductItem } from '../../types/ProductItem';

type Props = {
  product?: Product | ProductItem;
};
export const BreadCrumbs: React.FC<Props> = ({ product }) => {
  const location = useLocation();

  return (
    <div className={style.breadcrumbs_container}>
      {location.pathname.split('/').map((crumb, index, arr) => {
        const icon = (
          <div className={classNames(style.icon_container)}>
            <div className={classNames(style.icon, style.icon_right)} />
          </div>
        );

        if (index !== arr.length - 1) {
          if (index === 0) {
            return (
              <div
                key={index}
                className={classNames(style.crumb_container)}
              >
                <NavLink
                  to={'/home'}
                  className={classNames(style.crumb, style.crumb_home)}
                >
                  <div className={classNames(style.icon_container)}>
                    <div className={classNames(style.icon, style.icon_home)} />
                  </div>
                </NavLink>
                {icon}
              </div>
            );
          }

          return (
            <div
              key={index}
              className={classNames(style.crumb_container)}
            >
              <NavLink
                to={`/${crumb}`}
                className={classNames(style.crumb)}
              >
                {sentenseFormating(crumb)}
              </NavLink>
              {icon}
            </div>
          );
        }

        return (
          <NavLink
            key={index}
            to={''}
            className={classNames(style.crumb, style.crumb_last)}
          >
            {product ? product.name : sentenseFormating(crumb)}
          </NavLink>
        );
      })}
    </div>
  );
};
