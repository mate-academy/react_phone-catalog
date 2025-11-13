import { Navlist } from '../Enum/NavList';

export const getPath = (button: Partial<Navlist>) => {
  switch (button) {
    case Navlist.phones:
    case Navlist.tablets:
    case Navlist.accessories:
      return `/${button.toLowerCase()}`;
    default:
      return '/';
  }
};
