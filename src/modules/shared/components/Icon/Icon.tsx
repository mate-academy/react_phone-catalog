import React from 'react';
import { icons } from '../../../../constants/icons';
import { useTheme } from '../../context/ThemeContext';
import styles from './Icon.module.scss';

type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  const { theme } = useTheme();

  const icon = icons[name][theme];

  return (
    <img
      src={icon.path}
      alt={icon.title}
      className={`${styles.icon} ${className ?? ''}`}
    />
  );
};
