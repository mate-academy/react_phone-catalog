import styles from './Breadcrumbs.module.scss';
import React, { Fragment } from 'react'; // Обов'язково імпортуй Fragment

import Home from '../../assets/Icons/Home.svg';
import ArrowRight from '../../assets/Icons/Arrow_right.svg';

import { Link, useLocation, useParams } from 'react-router-dom';
type Crumb = { label: string; to?: string };
interface Props {
  // опціонально: можна передати додаткові crumbs зверху
  extra?: Crumb[];
  // для product page: можна передати productTitle і category якщо вже завантажені
  productTitle?: string;
  productCategory?: string; // 'phones' | 'tablets' | 'accessories'
}
const prettyName = (seg: string) => {
  if (seg === 'phones') {
    return 'Phones';
  }

  if (seg === 'tablets') {
    return 'Tablets';
  }

  if (seg === 'accessories') {
    return 'Accessories';
  }

  return seg.charAt(0).toUpperCase() + seg.slice(1);
};

export const Breadcrumbs: React.FC<Props> = ({
  extra = [],
  productTitle,
  productCategory,
}) => {
  const location = useLocation();
  const params = useParams(); // може містити productId
  // базовий Home crumb
  const crumbs: Crumb[] = [{ label: 'Home', to: '/' }, ...extra];
  const segments = location.pathname.split('/').filter(Boolean);

  // приклад: /phones -> ['phones']; /product/123 -> ['product','123']
  // логіка побудови: якщо маршрут містить явну категорію — додаємо її
  if (segments.length) {
    // випадок: /phones або /tablets або /accessories
    const first = segments[0];

    if (['phones', 'tablets', 'accessories'].includes(first)) {
      crumbs.push({ label: prettyName(first), to: `/${first}` });
    }

    // product page: /product/:id
    if (first === 'product' && params.productId) {
      // якщо в компонент передано дані productCategory/productTitle — використовуємо їх
      if (productCategory) {
        crumbs.push({
          label: prettyName(productCategory),
          to: `/${productCategory}`,
        });
      }

      // останній елемент — назва продукту (без посилання)
      crumbs.push({ label: productTitle ?? `Product ${params.productId}` });
    }
  }

  // Якщо на category page (наприклад /phones) і ми вже додали category,
  // зробимо останнім елементом текст (без лінку). Тому мапимо і робимо останній не-клікабельним.
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
      <ol>
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;

          return (
            <Fragment key={i}>
              <li>
                {isLast || !c.to ? (
                  <span aria-current={isLast ? 'page' : undefined}>
                    {c.label}
                  </span>
                ) : i === 0 ? (
                  <Link to={c.to}>
                    <img src={Home} alt="Home" />
                  </Link>
                ) : (
                  <Link to={c.to}>{c.label}</Link>
                )}
              </li>

              {!isLast && (
                <li className={styles.separator} aria-hidden="true">
                  <img src={ArrowRight} alt="arrow_right" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
