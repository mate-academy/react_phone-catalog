import React from 'react';
import { Link } from 'react-router-dom';

import { useOnlineStatus } from '@/shared/hooks/useOnlineStatus';
import { ShopByCategoryProps } from './ShopByCategory.type';
import {
  CATEGORIES_CONFIG,
  ERROR_CATEGORIES_CONFIG,
} from './ShopByCategory.constants';

import cn from 'classnames';
import './ShopByCategory.scss';
import { itemsText } from '@/utils';

interface Props extends ShopByCategoryProps {
  hasError?: boolean;
}

export const ShopByCategory: React.FC<Props> = ({
  categoriesCount,
  hasError = false,
}) => {
  const isOnline = useOnlineStatus();
  const isFailed = hasError || !isOnline;
  const currentConfig = isFailed ? ERROR_CATEGORIES_CONFIG : CATEGORIES_CONFIG;

  return (
    <section className="shop-by-category container">
      <h2 className="shop-by-category__title">Shop by category</h2>
      <div className="shop-by-category__wrapper">
        {currentConfig.map(category => {
          const { id, title, path } = category;
          const count =
            categoriesCount[id as keyof typeof categoriesCount] ?? 0;

          return (
            <Link
              className={cn('shop-by-category__link', {
                'shop-by-category__link--disabled': hasError || !isOnline,
              })}
              to={path}
              key={id}
              tabIndex={hasError ? -1 : undefined}
              aria-disabled={hasError}
            >
              <div
                className={`shop-by-category__img-wrapper shop-by-category__img-wrapper--${id}`}
              >
                {isFailed && category.Icon ? (
                  <category.Icon
                    className="shop-by-category__placeholder-icon"
                    aria-hidden="true"
                  />
                ) : (
                  <img
                    className="shop-by-category__img"
                    src={category.img}
                    alt={category.alt}
                  />
                )}
              </div>
              <h3 className="shop-by-category__subtitle">{title}</h3>
              {!hasError && isOnline && (
                <div className="shop-by-category__count-models">
                  {count} {itemsText(count)}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
};
