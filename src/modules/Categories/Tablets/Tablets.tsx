import React from 'react';
import { Products } from '../Products';
import { NavLinks } from '../../../enums/NavLinks';

export const Tablets: React.FC = () => <Products query={NavLinks.tablets} />;
