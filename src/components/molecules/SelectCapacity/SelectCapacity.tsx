import { ButtonSelect } from '../../atoms/Buttons/ButtonSelect';
import { Typography } from '../../atoms/Typography/Typography';
import cn from 'classnames';

type Props = {
  availableCapacities: string[];
  selectedCapacity: string;
  handleClick: (selectedCapacity: string) => void;
};

export const SelectCapacity: React.FC<Props> = ({
  availableCapacities,
  selectedCapacity,
  handleClick,
}) => (
  <div className="flex flex-col gap-2">
    <Typography
      level="small"
      className="text-secondary"
    >
      Select capacity
    </Typography>
    <div className="flex gap-2">
      {availableCapacities.map((capacity) => (
        <ButtonSelect
          key={capacity}
          className={cn('px-2 pt-[7px] pb-1 hover-zoom-small transform-gpu', {
            'dark:bg-white dark:text-primary': selectedCapacity === capacity,
            'dark:text-white dark:hover:bg-elements':
              selectedCapacity !== capacity,
          })}
          handleClick={() => handleClick(capacity)}
          isSelected={selectedCapacity === capacity}
          content={capacity}
        />
      ))}
    </div>
  </div>
);
