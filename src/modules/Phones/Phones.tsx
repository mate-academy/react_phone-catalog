/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable  @typescript-eslint/indent */
import React, { FC } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';

import {
  usePhones,
  selectPhones,
} from '../../app/features/detailedProduct/phones';
import { getSpecsFromObject } from '../shared/ui/SpecsList';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { LinkBack } from '../shared/LinkBack';
import { Container } from '../shared/Container';
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
import classes from './phones.module.scss';

type Props = {};

export const Phones: FC<Props> = ({}) => {
  const { status, phones } = usePhones(selectPhones);
  const { productId } = useParams();

  const currentPhone = phones.find(phone => phone.id === productId);
  const isLoaded = status === 'fulfilled';

  if (isLoaded && !currentPhone) {
    throw new Response('Not found', { status: 404 });
  }

  const mainSpecs = getSpecsFromObject({
    Screen: currentPhone?.screen || '',
    Resolution: currentPhone?.resolution || '',
    Processor: currentPhone?.processor || '',
    RAM: currentPhone?.ram || '',
  });

  const allSpecs = mainSpecs.concat(
    getSpecsFromObject({
      'Built in memory': currentPhone?.capacity || '',
      Camera: currentPhone?.camera || '',
      Zoom: currentPhone?.zoom || '',
      Cell: currentPhone?.cell.join(', ') || '',
    }),
  );

  return (
    <Container className={classes.page}>
      <Breadcrumbs className={classes.page__breadCrumbs} />
      <LinkBack className={classes.page__linkBack} />
      <Title isLoaded={isLoaded} className={classes.page__title}>
        {currentPhone?.name}
      </Title>
      <Display
        className={classes.page__mainInfo}
        isLoaded={isLoaded}
        images={currentPhone?.images || []}
        extraSlot={productId && <ProductId productId={productId} />}
        info={
          <>
            <AvailableColors
              className={classes.page__options}
              productId={currentPhone?.id || ''}
              colors={currentPhone?.colorsAvailable || []}
              isLoaded={isLoaded}
            />
            <AvailableOptions
              title="Select capacity"
              className={cn(
                classes.page__options,
                classes.page__options_capacity,
              )}
              options={currentPhone?.capacityAvailable || []}
              productId={currentPhone?.id || ''}
              isLoaded={isLoaded}
            />
            <Prices
              className={classes.page__prices}
              isLoaded={isLoaded}
              regularPrice={currentPhone?.priceRegular || 0}
              discountPrice={currentPhone?.priceDiscount}
            />
            <ActionButtons
              className={classes.page__actionButtons}
              productId={currentPhone?.id || ''}
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
        about={currentPhone?.description || []}
        isLoaded={isLoaded}
        specs={allSpecs}
      />
      <SuggestedProducts className={classes.page__suggestedProducts} />
    </Container>
  );
};
