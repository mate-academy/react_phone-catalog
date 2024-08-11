/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable  @typescript-eslint/indent */
import React, { FC } from 'react';
import cn from 'classnames';

import {
  fetchTablets,
  selectTablets,
} from '../../app/features/detailedProduct/tablets';
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
import { useFetchedData } from '../../hooks/useFetchedData';
import classes from './details.module.scss';

type Props = {};

export const TabletDetails: FC<Props> = ({}) => {
  const { status, tablets } = useFetchedData(fetchTablets(), selectTablets);
  const isLoaded = status === 'fulfilled';
  const tablet = useFoundProduct(tablets, isLoaded);

  const mainSpecs = getSpecsFromObject({
    Screen: tablet?.screen || '',
    Resolution: tablet?.resolution || '',
    Processor: tablet?.processor || '',
    RAM: tablet?.ram || '',
  });

  const allSpecs = mainSpecs.concat(
    getSpecsFromObject({
      'Built in memory': tablet?.capacity || '',
      Camera: tablet?.camera || '',
      Zoom: tablet?.zoom || '',
      Cell: tablet?.cell.join(', ') || '',
    }),
  );

  return (
    <Container className={classes.page}>
      <Breadcrumbs className={classes.page__breadCrumbs} />
      <LinkBack className={classes.page__linkBack} />
      <Title isLoaded={isLoaded} className={classes.page__title}>
        {tablet?.name}
      </Title>
      <Display
        key={tablet?.id}
        className={classes.page__mainInfo}
        isLoaded={isLoaded}
        images={tablet?.images || []}
        extraSlot={<ProductId productId={tablet?.id || ''} />}
        info={
          <>
            <AvailableColors
              className={classes.page__options}
              productId={tablet?.id || ''}
              colors={tablet?.colorsAvailable || []}
              isLoaded={isLoaded}
            />
            <AvailableOptions
              title="Select capacity"
              className={cn(
                classes.page__options,
                classes.page__options_capacity,
              )}
              options={tablet?.capacityAvailable || []}
              productId={tablet?.id || ''}
              isLoaded={isLoaded}
            />
            <Prices
              className={classes.page__prices}
              isLoaded={isLoaded}
              regularPrice={tablet?.priceRegular || 0}
              discountPrice={tablet?.priceDiscount}
            />
            <ActionButtons
              className={classes.page__actionButtons}
              productId={tablet?.id || ''}
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
        about={tablet?.description || []}
        isLoaded={isLoaded}
        specs={allSpecs}
      />
      <SuggestedProducts
        productId={tablet?.id || ''}
        className={classes.page__suggestedProducts}
      />
    </Container>
  );
};
