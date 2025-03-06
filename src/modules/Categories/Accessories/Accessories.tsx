import React from 'react';

import { MainNavLinks } from '../../../enums/MainNavLinks';
import { Products } from '../Products';

export const Accessories: React.FC = () => (
  <Products query={MainNavLinks.accessories} />
);
