import { Navlist } from '../Enum/NavList';

export type LinkList = {
  path: Partial<Navlist> | string;
  title: string;
};
