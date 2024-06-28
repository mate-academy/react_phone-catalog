/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable  @typescript-eslint/indent */
import React, { FC } from 'react';
import cn from 'classnames';

import {
  fetchPhones,
  selectPhones,
} from '../../app/features/detailedProduct/phones';
import { useFetchedData } from '../../hooks/useFetchedData';
import { getSpecsFromObject } from '../shared/ui/SpecsList';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { LinkBack } from '../shared/LinkBack';
import { Container } from '../shared/Container';
import { useFoundProduct } from './hooks/useFoundProduct';
import { Display } from './components/Display';
import { AvailableColors } from './components/AvailableColors';
import { AvailableOptions } from './components/AvailableOptions';
import { ActionButtons } from './components/ActionButtons';
import { Prices } from './components/Prices';
import { Title } from './components/Title';
import { SuggestedProducts } from './components/SuggestedProducts';
import { Description } from './components/Description';
import { ProductId } from './components/ProductId';
import { MainSpecList } from './components/MainSpecList';
import classes from './details.module.scss';

type Props = {};

export const PhoneDetails: FC<Props> = ({}) => {
  const { status, phones } = useFetchedData(fetchPhones(), selectPhones);
  const isLoaded = status === 'fulfilled';
  const phone = useFoundProduct(phones, isLoaded);

  const mainSpecs = getSpecsFromObject({
    Screen: phone?.screen || '',
    Resolution: phone?.resolution || '',
    Processor: phone?.processor || '',
    RAM: phone?.ram || '',
  });

  const allSpecs = mainSpecs.concat(
    getSpecsFromObject({
      'Built in memory': phone?.capacity || '',
      Camera: phone?.camera || '',
      Zoom: phone?.zoom || '',
      Cell: phone?.cell.join(', ') || '',
    }),
  );

  return (
    <Container className={classes.page}>
      <Breadcrumbs className={classes.page__breadCrumbs} />
      <LinkBack className={classes.page__linkBack} />
      <Title isLoaded={isLoaded} className={classes.page__title}>
        {phone?.name}
      </Title>
      <Display
        key={phone?.id}
        className={classes.page__mainInfo}
        isLoaded={isLoaded}
        images={phone?.images || []}
        extraSlot={<ProductId productId={phone?.id || ''} />}
        info={
          <>
            <AvailableColors
              className={classes.page__options}
              productId={phone?.id || ''}
              colors={phone?.colorsAvailable || []}
              isLoaded={isLoaded}
            />
            <AvailableOptions
              title="Select capacity"
              className={cn(
                classes.page__options,
                classes.page__options_capacity,
              )}
              options={phone?.capacityAvailable || []}
              productId={phone?.id || ''}
              isLoaded={isLoaded}
            />
            <Prices
              className={classes.page__prices}
              isLoaded={isLoaded}
              regularPrice={phone?.priceRegular || 0}
              discountPrice={phone?.priceDiscount}
            />
            <ActionButtons
              className={classes.page__actionButtons}
              productId={phone?.id || ''}
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
        about={phone?.description || []}
        isLoaded={isLoaded}
        specs={allSpecs}
      />
      <SuggestedProducts
        productId={phone?.id || ''}
        className={classes.page__suggestedProducts}
      />
    </Container>
  );
};
