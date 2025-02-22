import React from 'react';
import { Products } from '../Products';
import { NavLinks } from '../../../enums/NavLinks';

export const Phones: React.FC = () => <Products query={NavLinks.phones} />;
