import { useState } from 'react';

import MinusIcon from '@assets/images/icons/minus-icon.svg?react';
import PlusIcon from '@assets/images/icons/plus-icon.svg?react';

import { Box } from '@shared/base/Box';
import { IconButton } from '@shared/base/IconButton';
import { Text } from '@shared/base/Text';

import styles from './Counter.module.scss';

export interface CounterProps {
  value?: number;
  initialValue?: number;
  minValue?: number;
  maxValue?: number;
  onAdd?: (value: number) => void;
  onSubtract?: (value: number) => void;
}

export const Counter: React.FC<CounterProps> = ({
  initialValue = 0,
  value,
  maxValue = 99,
  minValue = 0,
  onAdd,
  onSubtract,
}) => {
  const [counter, setCounter] = useState(initialValue);

  const counterValue = value ?? counter;

  const handleAdd = () => {
    setCounter(prev => {
      const newValue = prev + 1;

      if (onAdd) {
        onAdd(newValue);
      }

      return newValue;
    });
  };

  const handleSubtract = () => {
    setCounter(prev => {
      const newValue = prev - 1;

      if (onSubtract) {
        onSubtract(newValue);
      }

      return newValue;
    });
  };

  return (
    <Box className={styles.counter}>
      <IconButton
        Icon={MinusIcon}
        onClick={handleSubtract}
        disabled={counterValue <= minValue}
      />

      <Text variant="body">{counterValue}</Text>

      <IconButton
        Icon={PlusIcon}
        onClick={handleAdd}
        disabled={counterValue >= maxValue}
      />
    </Box>
  );
};
