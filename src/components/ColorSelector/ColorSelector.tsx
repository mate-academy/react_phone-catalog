import styles from './ColorSelector.module.scss';

import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { OptionSelector } from '../OptionSelector';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.colorLink, {
    [styles['colorLink--active']]: isActive,
  });

type Props = {
  namespaceId: string;
  colorsAvailable: string[];
  currentCapacity: string;
};

export const ColorSelector: React.FC<Props> = ({
  namespaceId,
  colorsAvailable,
  currentCapacity,
}) => {
  const { category } = useParams();

  const getNewProductId = (newColor: string) => {
    return `${namespaceId}-${currentCapacity.toLowerCase()}-${newColor}`;
  };

  return (
    <OptionSelector
      label="Available colors"
      options={colorsAvailable}
      renderOption={color => (
        <NavLink
          to={`/${category}/${getNewProductId(color)}`}
          className={getLinkClass}
          style={{ backgroundColor: color }}
          aria-label={`Select ${color} color`}
        />
      )}
    />
  );
};
