/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable  @typescript-eslint/indent */
import React, { FC } from 'react';
import cn from 'classnames';

import {
  fetchAccessories,
  selectAccessories,
} from '../../app/features/detailedProduct/accessories';
import { useFetchedData } from '../../hooks/useFetchedData';
import { getSpecsFromObject } from '../shared/ui/SpecsList';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { Container } from '../shared/Container';
import { LinkBack } from '../shared/LinkBack';
import { useFoundProduct } from './hooks/useFoundProduct';
import { ActionButtons } from './components/ActionButtons';
import { AvailableOptions } from './components/AvailableOptions';
import { AvailableColors } from './components/AvailableColors';
import { Description } from './components/Description';
import { Display } from './components/Display';
import { Prices } from './components/Prices';
import { SuggestedProducts } from './components/SuggestedProducts';
import { Title } from './components/Title';
import { ProductId } from './components/ProductId';
import { MainSpecList } from './components/MainSpecList';
import classes from './details.module.scss';

type Props = {};

export const AccessoryDetails: FC<Props> = ({}) => {
  const { status, accessories } = useFetchedData(
    fetchAccessories(),
    selectAccessories,
  );
  const isLoaded = status === 'fulfilled';
  const accessory = useFoundProduct(accessories, isLoaded);

  const mainSpecs = getSpecsFromObject({
    Screen: accessory?.screen || '',
    Resolution: accessory?.resolution || '',
    Processor: accessory?.processor || '',
    RAM: accessory?.ram || '',
  });

  const allSpecs = mainSpecs.concat(
    getSpecsFromObject({
      'Built in memory': accessory?.capacity || '',
      Cell: accessory?.cell.join(', ') || '',
    }),
  );

  return (
    <Container className={classes.page}>
      <Breadcrumbs className={classes.page__breadCrumbs} />
      <LinkBack className={classes.page__linkBack} />
      <Title isLoaded={isLoaded} className={classes.page__title}>
        {accessory?.name}
      </Title>
      <Display
        key={accessory?.id}
        className={classes.page__mainInfo}
        isLoaded={isLoaded}
        images={accessory?.images || []}
        extraSlot={<ProductId productId={accessory?.id || ''} />}
        info={
          <>
            <AvailableColors
              className={classes.page__options}
              productId={accessory?.id || ''}
              colors={accessory?.colorsAvailable || []}
              isLoaded={isLoaded}
            />
            <AvailableOptions
              title="Select size"
              className={cn(
                classes.page__options,
                classes.page__options_capacity,
              )}
              options={accessory?.capacityAvailable || []}
              productId={accessory?.id || ''}
              isLoaded={isLoaded}
            />
            <Prices
              className={classes.page__prices}
              isLoaded={isLoaded}
              regularPrice={accessory?.priceRegular || 0}
              discountPrice={accessory?.priceDiscount}
            />
            <ActionButtons
              className={classes.page__actionButtons}
              productId={accessory?.id || ''}
              isLoaded={isLoaded}
            />
            <MainSpecList
              isLoaded={isLoaded}
              specs={mainSpecs}
              className={classes.page__mainSpecs}
            />
          </>
        }
      />
      <Description
        className={classes.page__description}
        about={accessory?.description || []}
        isLoaded={isLoaded}
        specs={allSpecs}
      />
      <SuggestedProducts
        productId={accessory?.id || ''}
        className={classes.page__suggestedProducts}
      />
    </Container>
  );
};
