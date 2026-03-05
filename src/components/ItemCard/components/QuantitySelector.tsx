import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/typography';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
}) => {
  const isDisabled = quantity === 0;

  return (
    <div className="flex items-center border border-border rounded-md px-2">
      <button
        className="text-ring hover:text-foreground w-6 h-10 flex items-center justify-center transition-colors disabled:opacity-40"
        onClick={onDecrease}
        disabled={isDisabled}
      >
        <Minus size={14} />
      </button>

      <span className={`${TYPOGRAPHY.buttons} px-2 text-foreground`}>
        {quantity}
      </span>

      <button
        className="text-ring hover:text-foreground w-6 h-10 flex items-center justify-center transition-colors"
        onClick={onIncrease}
      >
        <Plus size={14} />
      </button>
    </div>
  );
};
