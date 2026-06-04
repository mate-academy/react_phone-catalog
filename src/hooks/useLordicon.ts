import { useRef } from 'react';
import { Player } from '@lordicon/react';

export const useLordicon = () => {
  const playerRef = useRef<Player | null>(null);

  const handleMouseEnter = () => {
    playerRef.current?.playFromBeginning();
  };

  return { playerRef, handleMouseEnter };
};
