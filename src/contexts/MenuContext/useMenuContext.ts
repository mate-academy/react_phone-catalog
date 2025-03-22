import { useContext } from 'react';

import { MenuContext } from './MenuContext';

export const useMenuContext = () => useContext(MenuContext);
