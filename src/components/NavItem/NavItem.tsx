import { FC } from 'react';
import './NavItem.scss';

type Props = {
  type: string;
};

export const NavItem: FC<Props> = ({ type }) => {
  return <i className={`nav-item nav-item-${type}`} />;
};
