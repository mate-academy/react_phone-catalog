import React, { FC } from 'react';
import { Container } from '../shared/Container';
import { Text } from '../shared/ui/Text';

import classes from './notFound.module.scss';

type Props = {};

export const NotFound: FC<Props> = ({}) => {
  return (
    <Container className={classes.page}>
      <Text.H1 className={classes.page__title} element="h1">
        Page not found
      </Text.H1>
    </Container>
  );
};
