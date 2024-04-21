import { FC, useMemo } from 'react';
import './SelectionCounter.scss';

interface Props {
  quantity: number;
  className?: string;
}

export const SelectionCounter: FC<Props> = ({ quantity, className = '' }) => {
  const elementClass = useMemo(() => `selection-counter ${className}`, [className]);

  return (
    <div className={elementClass}>
      <span className="selection-counter__quantity">
        {quantity}
      </span>
    </div>
  );
};
