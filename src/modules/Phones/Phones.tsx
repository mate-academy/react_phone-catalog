/* eslint-disable @typescript-eslint/no-throw-literal */
import React, { FC } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';

import {
  usePhones,
  selectPhones,
} from '../../app/features/detailedProduct/phones';
import { selectProducts, useProducts } from '../../app/features/products';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { LinkBack } from '../shared/LinkBack';
import { Container } from '../shared/Container';
import { Spec, SpecsList, getSpecsFromObject } from '../shared/ui/SpecsList';
import { Display } from './components/Display';
import { AvailableColors } from './components/AvailableColors';
import { AvailableCapacity } from './components/AvailableCapacity';
import { ActionButtons } from './components/ActionButtons';
import { Prices } from './components/Prices';
import { Title } from './components/Title';
import { SuggestedProducts } from './SuggestedProducts';
import classes from './phones.module.scss';
import { Description } from './components/Description';

type Props = {};

export const Phones: FC<Props> = ({}) => {
  const { status: phonesStatus, phones } = usePhones(selectPhones);
  const { products, status: productsStatus } = useProducts(selectProducts);
  const { productId } = useParams();

  const currentPhone = phones.find(phone => phone.id === productId);
  const isLoaded =
    phonesStatus === 'fulfilled' && productsStatus === 'fulfilled';
  const foundProduct = products.find(product => product.itemId === productId);

  if (
    phonesStatus === 'fulfilled' &&
    productsStatus === 'fulfilled' &&
    (!currentPhone || !foundProduct)
  ) {
    throw new Response('Not found', { status: 404 });
  }

  const mainSpecs: Spec[] = getSpecsFromObject({
    Screen: currentPhone?.screen || '',
    Resolution: currentPhone?.resolution || '',
    Processor: currentPhone?.processor || '',
    RAM: currentPhone?.ram || '',
  });

  const allSpecs: Spec[] = [
    ...mainSpecs,
    ...getSpecsFromObject({
      'Built in memory': currentPhone?.capacity || '',
      Camera: currentPhone?.camera || '',
      Zoom: currentPhone?.zoom || '',
      Cell: currentPhone?.cell.join(', ') || '',
    }).concat(),
  ];

  return (
    <Container className={classes.page}>
      <Breadcrumbs className={classes.page__breadCrumbs} />

      <LinkBack className={classes.page__linkBack} />

      <Title isLoaded={isLoaded} className={classes.page__title}>
        {currentPhone?.name}
      </Title>

      <Display
        className={classes.page__mainInfo}
        isLoaded={phonesStatus === 'fulfilled'}
        images={currentPhone?.images || []}
        info={
          <>
            <AvailableColors
              className={classes.page__options}
              productId={currentPhone?.id}
              colors={currentPhone?.colorsAvailable}
              isLoaded={isLoaded}
            />
            <AvailableCapacity
              className={cn(
                classes.page__options,
                classes.page__options_capacity,
              )}
              capacity={currentPhone?.capacityAvailable || []}
              productId={currentPhone?.id || ''}
              isLoaded={isLoaded}
            />
            <Prices
              className={classes.page__prices}
              isLoaded={isLoaded}
              regularPrice={currentPhone?.priceRegular}
              discountPrice={currentPhone?.priceDiscount}
            />
            <ActionButtons
              className={classes.page__actionButtons}
              productId={currentPhone?.id || ''}
              isLoaded={isLoaded}
            />
            <SpecsList
              isLoaded={isLoaded}
              specs={mainSpecs}
              className={classes.page__mainSpecs}
            />
          </>
        }
      />

      <Description
        className={classes.page__description}
        about={currentPhone?.description ?? []}
        isLoaded={isLoaded}
        specs={allSpecs}
      />
      <SuggestedProducts
        className={classes.page__suggestedProducts}
        status={productsStatus}
        products={products}
      />
    </Container>
  );
};
