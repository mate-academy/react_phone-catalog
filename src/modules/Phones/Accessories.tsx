/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable  @typescript-eslint/indent */
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import {
  useAccessories,
  selectAccessories,
} from '../../app/features/detailedProduct/accessories';
import { getSpecsFromObject } from '../shared/ui/SpecsList';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { Container } from '../shared/Container';
import { LinkBack } from '../shared/LinkBack';
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
import classes from './phones.module.scss';

type Props = {};

export const Accessories: FC<Props> = ({}) => {
  const { status, accessories } = useAccessories(selectAccessories);
  const { productId } = useParams();

  const currentAccessory = accessories.find(
    accessory => accessory.id === productId,
  );
  const isLoaded = status === 'fulfilled';

  if (isLoaded && !currentAccessory) {
    throw new Response('Not found', { status: 404 });
  }

  const mainSpecs = getSpecsFromObject({
    Screen: currentAccessory?.screen || '',
    Resolution: currentAccessory?.resolution || '',
    Processor: currentAccessory?.processor || '',
    RAM: currentAccessory?.ram || '',
  });

  const allSpecs = mainSpecs.concat(
    getSpecsFromObject({
      'Built in memory': currentAccessory?.capacity || '',
      Cell: currentAccessory?.cell.join(', ') || '',
    }),
  );

  return (
    <Container className={classes.page}>
      <Breadcrumbs className={classes.page__breadCrumbs} />
      <LinkBack className={classes.page__linkBack} />
      <Title isLoaded={isLoaded} className={classes.page__title}>
        {currentAccessory?.name}
      </Title>
      <Display
        className={classes.page__mainInfo}
        isLoaded={isLoaded}
        images={currentAccessory?.images || []}
        extraSlot={productId && <ProductId productId={productId} />}
        info={
          <>
            <AvailableColors
              className={classes.page__options}
              productId={currentAccessory?.id || ''}
              colors={currentAccessory?.colorsAvailable || []}
              isLoaded={isLoaded}
            />
            <AvailableOptions
              title="Select size"
              className={cn(
                classes.page__options,
                classes.page__options_capacity,
              )}
              options={currentAccessory?.capacityAvailable || []}
              productId={currentAccessory?.id || ''}
              isLoaded={isLoaded}
            />
            <Prices
              className={classes.page__prices}
              isLoaded={isLoaded}
              regularPrice={currentAccessory?.priceRegular || 0}
              discountPrice={currentAccessory?.priceDiscount}
            />
            <ActionButtons
              className={classes.page__actionButtons}
              productId={currentAccessory?.id || ''}
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
        about={currentAccessory?.description || []}
        isLoaded={isLoaded}
        specs={allSpecs}
      />
      <SuggestedProducts className={classes.page__suggestedProducts} />
    </Container>
  );
};
