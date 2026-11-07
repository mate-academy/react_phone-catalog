import type React from 'react';
import classNames from 'classnames';
import { Icon } from '../Icon/Icon';

import { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'motion/react';
import confetti from 'canvas-confetti';

type Props = {
  className?: string;
  handleClick?: () => void;
  isDisabled?: boolean;
  isSelected?: boolean;
  src: string;
  animateIcon?: boolean;
};

const variant = {
  selected: 'border-elements dark:bg-primary',
};

export const ButtonIcon: React.FC<Props> = ({
  className,
  handleClick,
  isDisabled,
  isSelected,
  src,
  animateIcon,
}) => {
  const controls = useAnimationControls();
  const ref = useRef(isSelected);

  const positionRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!ref.current && isSelected && animateIcon && positionRef.current) {
      const rect = positionRef.current?.getBoundingClientRect();

      if (rect) {
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        controls.start({
          scale: [1, 1.2, 1],
          transition: { type: 'spring', stiffness: 400, damping: 10 },
        });
        confetti({
          particleCount: 45,
          spread: 360,
          startVelocity: 20,
          gravity: 0.8,
          scalar: 0.7,
          ticks: 100,
          colors: ['eb5757'],
          shapes: ['circle'],
          origin: { x, y },
        });
      }
    }
    ref.current = isSelected;
  }, [isSelected, controls, animateIcon]);

  return (
    <motion.button
      ref={positionRef}
      type="button"
      whileTap={{ scale: 0.85 }}
      className={classNames(
        'border flex justify-center items-center cursor-pointer',
        {
          'disabled:border-elements dark:disabled:border-elements': isDisabled,
          'enabled:hover:border-primary border-icons':
            !isSelected && !isDisabled,
          [variant.selected]: isSelected && !isDisabled,
        },
        className,
      )}
      onClick={handleClick}
      disabled={isDisabled}
    >
      <motion.span
        animate={controls}
        className="flex justify-center items-center"
      >
        <Icon
          isDisabled={isDisabled}
          src={src}
        />
      </motion.span>
    </motion.button>
  );
};
