import React from 'react';
import styles from './Breadcrumbs.module.scss';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnyDetailedProduct } from '../../types/DetailedProductTypes';
import { BreadcrumbProduct } from '../../types/Product';
import classNames from 'classnames';
import useLanguageStore from '../../stores/useLanguageStore';
import { ArrowIcon, HomeIcon } from '../icons';

interface BreadcrumbsProps {
  product: AnyDetailedProduct | BreadcrumbProduct | null; // product може бути null поки завантажується
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ product }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguageStore();

  const handleGoBack = () => {
    navigate(-1); // Повертається на одну сторінку назад в історії браузера
  };

  // Перевірка, чи це повний продукт (для детальної сторінки)
  const isDetailedProduct = product && 'namespaceId' in product; // Проста перевірка на наявність itemId
  const isFavouritesPage = location.pathname.includes('/favourites');
  const isCartPage = location.pathname.includes('/cart');

  let categoryLinkText = '';

  if (product?.category) {
    // Назва категорії тут перекладається за ключем t('nav_phones')
    categoryLinkText = t(`nav_${product.category}`);
  }

  const productName = isDetailedProduct ? product.name : ''; // Тільки якщо це повний продукт

  return (
    <div className={styles['breadcrumbs-container']}>
      {/* Хлібні крихти */}
      {(product || isFavouritesPage) && (
        <nav className={styles.breadcrumbs} aria-label="breadcrumb">
          <ol className={styles.breadcrumbs__list}>
            {/* КРИХТА 1: HOME (статика) */}
            <li className={styles.breadcrumbs__item}>
              <NavLink
                to="/"
                className={classNames(
                  styles.breadcrumbs__link,
                  styles.breadcrumbs__link__main,
                )}
              >
                <HomeIcon />
              </NavLink>
            </li>

            {/* КРИХТА 2: КАТЕГОРІЯ АБО КАРТКА/ФАВОРИТИ (Динаміка) */}
            {product && (
              <>
                <li
                  className={classNames(
                    styles.breadcrumbs__item,
                    styles.breadcrumbs__separator,
                  )}
                >
                  <ArrowIcon />
                </li>

                <li className={styles.breadcrumbs__item}>
                  <NavLink
                    to={`/${product.category}`}
                    className={classNames(styles.breadcrumbs__link, {
                      [styles.breadcrumbs__link__main]: isDetailedProduct,
                    })}
                  >
                    {categoryLinkText}
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
                      <ArrowIcon />
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
                  <ArrowIcon />
                </li>
                <li
                  className={classNames(
                    styles.breadcrumbs__item,
                    styles.breadcrumbs__current,
                  )}
                >
                  {t('nav_favourites')}
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
          aria-label={t('button_back')}
        >
          <span className={styles['arrow-left']}>
            <ArrowIcon direction="left" />
          </span>
          <span className={styles['back-button__label']}>
            {t('button_back')}
          </span>
        </button>
      )}
    </div>
  );
};

export default Breadcrumbs;
