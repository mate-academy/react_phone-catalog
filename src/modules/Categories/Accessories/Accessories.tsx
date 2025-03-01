import React from 'react';
import { Products } from '../Products';
import { MainNavLinks } from '../../../enums/MainNavLinks';

export const Accessories: React.FC = () => (
  <Products query={MainNavLinks.accessories} />
);
