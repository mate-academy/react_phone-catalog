import React, { Fragment, useMemo } from 'react';
import { Link } from 'react-router-dom';

import styles from './Breadcrumbs.module.scss';

import { Icon } from '@components/Icon';
import { IconType } from '@sTypes/IconType';

import { IconButton } from '@components/IconButton';
import { IconButtonType } from '@sTypes/IconButtonType';

import { useAppSelector } from '@store/hooks';

type Props = {
  pathname: string;
};

export const Breadcrumbs: React.FC<Props> = ({ pathname }) => {
  const splitedPathname = pathname.split('/').filter(Boolean);
  const { products } = useAppSelector(state => state.products);

  const allProducts = useMemo(() => {
    return [...products.phones, ...products.tablets, ...products.accessories];
  }, [products.phones, products.tablets, products.accessories]);

  if (splitedPathname.length === 2) {
    const itemId = splitedPathname.at(-1);
    const foundProduct = allProducts.find(product => product.itemId === itemId);

    if (foundProduct) {
      splitedPathname[splitedPathname.length - 1] = foundProduct.name;
    }
  }

  return (
    <nav aria-label="Breadcrumbs" className={styles['top-navigation']}>
      <Link
        to={'/'}
        aria-label="Home"
        className={styles['top-navigation__home']}
      >
        <Icon type={IconType.home} />
      </Link>

      {splitedPathname.map((part, i, parts) => (
        <Fragment key={part}>
          <IconButton
            type={IconButtonType.arrowRight}
            disabled
            small
            hideBorders
            ariaHidden
          />

          <Link
            to={parts.slice(0, i + 1).join('/')}
            className={styles['top-navigation__item']}
          >
            {`${part[0].toUpperCase()}${part.slice(1)}`}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
};
