import React, { forwardRef, useEffect, useCallback } from 'react';
import { Player } from '@lordicon/react';

import styles from './WiredTrolley.module.scss';

import wiredTrolley from '../../img/wiredTrolley1.json';
import classNames from 'classnames';

interface WiredTrolleyProps {
  className?: string;
  trigger?: number;
}

export const WiredTrolley = forwardRef<Player, WiredTrolleyProps>(
  ({ className, trigger }, ref) => {
    const playerRef = ref as React.RefObject<Player>;

    const playAnimation = useCallback(() => {
      playerRef.current?.playFromBeginning();
    }, [playerRef]);

    useEffect(() => {
      if (trigger && trigger > 0) {
        playAnimation();
      }
    }, [trigger, playAnimation]);

    return (
      <div
        className={classNames(styles.wiredTrolley, className)}
        onMouseEnter={playAnimation}
      >
        <Player icon={wiredTrolley} ref={playerRef} />
      </div>
    );
  },
);

WiredTrolley.displayName = 'WiredTrolley';
