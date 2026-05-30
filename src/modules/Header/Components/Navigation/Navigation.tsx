import React from 'react';
import { TabValues } from '../../headerTypes';
import { NavBarItem } from '../NavBarItem/NavBarItem';

export const Navigation: React.FC = () => {
  return (
    <ul className="nav">
      {Object.values(TabValues).map(value => (
        <NavBarItem key={value} tabValue={value} />
      ))}
    </ul>
  );
};
