import React from 'react';
import { Products } from '../Products';
import { MainNavLinks } from '../../../enums/MainNavLinks';

export const Phones: React.FC = () => <Products query={MainNavLinks.phones} />;
