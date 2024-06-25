/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable  @typescript-eslint/indent */
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import {
  useTablets,
  selectTablets,
} from '../../app/features/detailedProduct/tablets';
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

export const Tablets: FC<Props> = ({}) => {
  const { status, tablets } = useTablets(selectTablets);
  const { productId } = useParams();

  const currentTablet = tablets.find(tablet => tablet.id === productId);
  const isLoaded = status === 'fulfilled';

  if (isLoaded && !currentTablet) {
    throw new Response('Not found', { status: 404 });
  }

  const mainSpecs = getSpecsFromObject({
    Screen: currentTablet?.screen || '',
    Resolution: currentTablet?.resolution || '',
    Processor: currentTablet?.processor || '',
    RAM: currentTablet?.ram || '',
  });

  const allSpecs = mainSpecs.concat(
    getSpecsFromObject({
      'Built in memory': currentTablet?.capacity || '',
      Camera: currentTablet?.camera || '',
      Zoom: currentTablet?.zoom || '',
      Cell: currentTablet?.cell.join(', ') || '',
    }),
  );

  return (
    <Container className={classes.page}>
      <Breadcrumbs className={classes.page__breadCrumbs} />
      <LinkBack className={classes.page__linkBack} />
      <Title isLoaded={isLoaded} className={classes.page__title}>
        {currentTablet?.name}
      </Title>
      <Display
        className={classes.page__mainInfo}
        isLoaded={isLoaded}
        images={currentTablet?.images || []}
        extraSlot={productId && <ProductId productId={productId} />}
        info={
          <>
            <AvailableColors
              className={classes.page__options}
              productId={currentTablet?.id || ''}
              colors={currentTablet?.colorsAvailable || []}
              isLoaded={isLoaded}
            />
            <AvailableOptions
              title="Select capacity"
              className={cn(
                classes.page__options,
                classes.page__options_capacity,
              )}
              options={currentTablet?.capacityAvailable || []}
              productId={currentTablet?.id || ''}
              isLoaded={isLoaded}
            />
            <Prices
              className={classes.page__prices}
              isLoaded={isLoaded}
              regularPrice={currentTablet?.priceRegular || 0}
              discountPrice={currentTablet?.priceDiscount}
            />
            <ActionButtons
              className={classes.page__actionButtons}
              productId={currentTablet?.id || ''}
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
        about={currentTablet?.description || []}
        isLoaded={isLoaded}
        specs={allSpecs}
      />
      <SuggestedProducts className={classes.page__suggestedProducts} />
    </Container>
  );
};
