import React, { FC } from 'react';
import { Container } from '../shared/Container';
import { Text } from '../shared/ui/Text';

import classes from './home.module.scss';
import { HeroCarousel } from './components/HeroCarousel';
import { NewProductsCarousel } from './components/NewProductsCarousel';
import { Categories } from './components/Categories';
import { HotPricesCarousel } from './components/HotPricesCarousel';

type Props = {};

export const Home: FC<Props> = ({}) => {
  return (
    <Container className={classes.page}>
      <h1 className="visually-hidden">Product Catalog</h1>

      <Text.H1 element="h2">Welcome to Nice Gadgets store!</Text.H1>
      <HeroCarousel className={classes.page__heroCarousel} />
      <NewProductsCarousel className={classes.page__newProductsCarousel} />
      <Categories className={classes.page__categories} />
      <HotPricesCarousel className={classes.page__hotPricesCarousel} />
    </Container>
  );
};
