import styles from './Breadcrumbs.module.scss';
import React, { Fragment } from 'react'; // Обов'язково імпортуй Fragment

import Home from '../../assets/Icons/Home.svg';
import ArrowRight from '../../assets/Icons/Arrow_right.svg';

import { Link, useLocation } from 'react-router-dom';
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
  // const params = useParams();
  // базовий Home crumb
  const crumbs: Crumb[] = [{ label: 'Home', to: '/' }, ...extra];
  const segments = location.pathname.split('/').filter(Boolean);
  // Приклад: /phones -> ['phones']; /phones/apple-iphone -> ['phones', 'apple-iphone']

  if (segments.length > 0) {
    const firstSegment = segments[0];

    // 1. Додаємо категорію (якщо це phones, tablets або accessories)
    if (['phones', 'tablets', 'accessories'].includes(firstSegment)) {
      crumbs.push({ label: prettyName(firstSegment), to: `/${firstSegment}` });
    } else if (firstSegment === 'product' && productCategory) {
      // Якщо URL починається з /product, але ми знаємо категорію з пропсів
      crumbs.push({
        label: prettyName(productCategory),
        to: `/${productCategory}`,
      });
    }

    // 2. Додаємо назву продукту (якщо є другий сегмент у URL)
    if (segments.length > 1) {
      const urlProductId = segments[1]; // Це і є твій ID з URL

      // Якщо нам передали productTitle (наприклад, "Apple iPhone 11"),
      // показуємо його. Якщо ні - показуємо просто ID з URL.
      crumbs.push({ label: productTitle ?? urlProductId });
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
