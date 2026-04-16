import React, { useEffect } from 'react';
import { Player } from '@lordicon/react';

import styles from './HeartIcon.module.scss';

import heartbeat from '../../img/heartbeat.json';

import { useLordicon } from '../../hooks/useLordicon';

interface HeartIconProps {
  isSelected?: boolean;
  trigger?: number;
}

export const HeartIcon: React.FC<HeartIconProps> = ({
  isSelected = false,
  trigger,
}) => {
  const { playerRef, handleMouseEnter } = useLordicon();
  const iconColor = isSelected ? '#EB5757' : '#808080';

  useEffect(() => {
    if (isSelected && playerRef.current) {
      playerRef.current?.playFromBeginning();
    }
  }, [isSelected, trigger, playerRef]);

  return (
    <div className={styles.heartIcon} onMouseEnter={handleMouseEnter}>
      <Player
        icon={heartbeat}
        ref={playerRef}
        colors={`primary:${iconColor}, secondary:${iconColor}`}
      />
    </div>
  );
};
