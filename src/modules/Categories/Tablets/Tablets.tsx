import React from 'react';
import { Products } from '../Products';
import { MainNavLinks } from '../../../enums/MainNavLinks';

export const Tablets: React.FC = () => (
  <Products query={MainNavLinks.tablets} />
);
