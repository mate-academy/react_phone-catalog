import React from 'react';
import { Products } from '../Products';
import { NavLinks } from '../../../enums/NavLinks';

export const Accessories: React.FC = () => (
  <Products query={NavLinks.accessories} />
);
