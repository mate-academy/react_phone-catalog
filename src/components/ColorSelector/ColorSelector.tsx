import * as RadioGroup from '@radix-ui/react-radio-group';
import clsx from 'clsx';
import type { ColorKey } from '../../types/ColorKey';
import { appleColorsHex } from '../../constants/constants';

export type ColorSelectorProps = {
  colors: ColorKey[];
  selectedColor: string;
  onSelectColor: (color: ColorKey) => void;
};

export const ColorSelector = ({
  colors,
  selectedColor,
  onSelectColor,
}: ColorSelectorProps) => {
  return (
    <div>
      <RadioGroup.Root
        className="flex gap-4"
        value={selectedColor.replace(' ', '-')}
        onValueChange={value => {
          onSelectColor(value);
        }}
        aria-label="Available colors"
      >
        {colors.map(color => (
          <RadioGroup.Item
            key={color}
            value={color.replace(' ', '-')}
            className={clsx(
              'w-7 h-7 rounded-full bg-white',
              'flex items-center justify-center',
              'transition-all duration-200',
              'outline-none cursor-pointer',
              'border',
              'data-[state=checked]:border-black',
              'data-[state=unchecked]:border-elements',
            )}
          >
            <div
              className="w-[22px] h-[22px] rounded-full"
              style={{ backgroundColor: appleColorsHex[color] }}
            />
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </div>
  );
};
