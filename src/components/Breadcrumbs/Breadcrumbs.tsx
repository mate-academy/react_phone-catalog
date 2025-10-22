import React from 'react';
import styles from './Breadcrumbs.module.scss';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnyDetailedProduct } from '../../types/DetailedProductTypes';
import { BreadcrumbProduct } from '../../types/Product';
import classNames from 'classnames';

interface BreadcrumbsProps {
  product: AnyDetailedProduct | BreadcrumbProduct | null; // product може бути null поки завантажується
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ product }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Функція для капіталізації першої літери (наприклад, "phones" -> "Phones")
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleGoBack = () => {
    navigate(-1); // Повертається на одну сторінку назад в історії браузера
  };

  // Перевірка, чи це повний продукт (для детальної сторінки)
  const isDetailedProduct = product && 'namespaceId' in product; // Проста перевірка на наявність itemId
  const isFavouritesPage = location.pathname.includes('/favourites');
  const isCartPage = location.pathname.includes('/cart');

  // Визначення назви категорії для відображення
  const categoryName = product?.category
    ? capitalizeFirstLetter(product.category)
    : '';

  const productName = isDetailedProduct ? product.name : ''; // Тільки якщо це повний продукт

  return (
    <div className={styles['breadcrumbs-container']}>
      {/* Хлібні крихти */}
      {(product || isFavouritesPage) && (
        <nav className={styles.breadcrumbs} aria-label="breadcrumb">
          <ol className={styles.breadcrumbs__list}>
            <li className={styles.breadcrumbs__item}>
              <NavLink to="/" className={styles.breadcrumbs__link}>
                <span className={styles['icon-home']}></span>
              </NavLink>
            </li>
            {product && (
              <>
                <li
                  className={classNames(
                    styles.breadcrumbs__item,
                    styles.breadcrumbs__separator,
                  )}
                >
                  <span className={styles['icon-arrow-right']}></span>
                </li>

                <li className={styles.breadcrumbs__item}>
                  <NavLink
                    to={`/${product.category}`}
                    className={styles.breadcrumbs__link}
                  >
                    {categoryName}
                  </NavLink>
                </li>

                {isDetailedProduct && ( // Цю ланку показуємо тільки для детального продукту
                  <>
                    <li
                      className={classNames(
                        styles.breadcrumbs__item,
                        styles.breadcrumbs__separator,
                      )}
                    >
                      <span className={styles['icon-arrow-right']}></span>
                    </li>
                    <li
                      className={classNames(
                        styles.breadcrumbs__item,
                        styles.breadcrumbs__current,
                      )}
                    >
                      {productName}
                    </li>
                  </>
                )}
              </>
            )}

            {/* Блок для сторінки "Улюблені" */}
            {isFavouritesPage && (
              <>
                <li
                  className={classNames(
                    styles.breadcrumbs__item,
                    styles.breadcrumbs__separator,
                  )}
                >
                  <span className={styles['icon-arrow-right']}></span>
                </li>
                <li
                  className={classNames(
                    styles.breadcrumbs__item,
                    styles.breadcrumbs__current,
                  )}
                >
                  {capitalizeFirstLetter('favourites')}
                </li>
              </>
            )}
          </ol>
        </nav>
      )}

      {/* Кнопка "Back" */}
      {(isDetailedProduct || isCartPage) && (
        <button
          onClick={handleGoBack}
          className={styles['back-button']}
          aria-label="Go back"
        >
          <span className={styles['icon-arrow-left']}></span>
          <span className={styles['back-button__label']}>Back</span>
        </button>
      )}
    </div>
  );
};

export default Breadcrumbs;
