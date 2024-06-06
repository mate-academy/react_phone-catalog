import React, { ComponentProps, FC } from 'react';
import cn from 'classnames';

import { Text } from '../../../shared/ui/Text';
import { Container } from '../../../shared/Container';
import { CategoriesPhones } from './CategoriesPhones';
import { CategoriesTablets } from './CategoriesTablets';
import { CategoriesAccessories } from './CategoriesAccessories';
import classes from './categories.module.scss';

type Props = ComponentProps<'div'>;

export const Categories: FC<Props> = ({ className, ...props }) => {
  return (
    <Container.Grid {...props} className={cn(classes.categories, className)}>
      <Text.H2 className={classes.categories__title} element="h2">
        Shop by category
      </Text.H2>
      <CategoriesPhones />
      <CategoriesTablets />
      <CategoriesAccessories />
    </Container.Grid>
  );
};
