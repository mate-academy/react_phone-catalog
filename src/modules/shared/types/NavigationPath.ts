import { Navlist } from '../Enum/NavList';

export type NavigationPath = {
  path: Partial<Navlist> | string;
  title: string;
};
