import React from 'react';

import { MainNavLinks } from '../../../enums/MainNavLinks';
import { Products } from '../Products';

export const Phones: React.FC = () => <Products query={MainNavLinks.phones} />;
