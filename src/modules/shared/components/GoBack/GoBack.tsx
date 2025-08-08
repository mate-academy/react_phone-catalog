import React, { useContext } from 'react';
import cn from 'classnames';
import goBackClass from './goBack.module.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import { PagesLinkType, PagesType } from '../../../../types/PagesType';
import { Icon } from '../Icon';
import { IconEnum } from '../../../../types/iconsType';
import { ProductDetailContext } from '../../../../context/ProductDetailContext';

export const GoBack: React.FC = React.memo(() => {
  const { pathname } = useLocation();
  const { productId } = useParams();
  const { detailProduct } = useContext(ProductDetailContext);

  if (pathname === PagesType.home || pathname === PagesType.cart) {
    return null;
  }

  const category = pathname.split('/')[1];
  const name = PagesLinkType[`/${category}` as keyof typeof PagesLinkType];
  const to = PagesType[name?.toLowerCase() as keyof typeof PagesType];

  return (
    <div className={cn(goBackClass['go-back'], 'container')}>
      <Icon iconName={IconEnum.home} href={PagesType.home} />
      <div className={cn(goBackClass['go-back__icon'])}></div>
      <Link
        to={to}
        className={cn(goBackClass['go-back__link'], {
          [goBackClass['go-back__link--disabled']]: !productId,
        })}
      >
        {name}
      </Link>
      {productId && (
        <>
          <div className={cn(goBackClass['go-back__icon'])}></div>
          <p
            className={cn(
              goBackClass['go-back__link'],
              goBackClass['go-back__link--disabled'],
            )}
          >
            {detailProduct?.name}
          </p>
        </>
      )}
    </div>
  );
});

GoBack.displayName = 'GoBack';
