import React from 'react';
import styles from './DashesPanel.module.scss';
import { DashButton } from '../../UI/Buttons/DashButton';

interface Props {
  dashCount: number;
  activeDash: number;
  goTo: (index: number) => void;
  classNames?: string;
}

export const DashesPanel: React.FC<Props> = ({
  dashCount,
  activeDash,
  classNames,
  goTo,
}) => {
  return (
    <div className={`${styles.dashes} ${classNames}`}>
      {[...Array(dashCount)].map((_, i) => (
        <DashButton
          key={i}
          onClick={() => goTo(i)}
          isActive={activeDash === i}
        />
      ))}
    </div>
  );
};
