import React from 'react';
import { Typography } from '../../ui/base';
import { Banner } from '../../ui/modules';

import './HomePage.scss';

type Props = {};

export const HomePage: React.FC<Props> = () => {
  return (
    <>
      <Banner />
      <Typography type="title" level="1">
        Home Page
      </Typography>
    </>
  );
};
