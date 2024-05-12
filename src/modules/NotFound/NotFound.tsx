import React, { FC } from 'react';
import { Container } from '../shared/Container';
import { Text } from '../shared/ui/Text';

import classes from './notFound.module.scss';

type Props = {};

export const NotFound: FC<Props> = ({}) => {
  return (
    <Container className={classes.page}>
      <Text className={classes.page__title} variant="heading-1" element="h1">
        Page not found
      </Text>
    </Container>
  );
};
