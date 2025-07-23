import clsx from 'clsx';

export type CapacitySelectorProps = {
  availableCapacities: string[];
  selectedCapacity: string;
  onSelectCapacity: (capacity: string) => void;
};

export const CapacitySelector = ({
  availableCapacities,
  selectedCapacity,
  onSelectCapacity,
}: CapacitySelectorProps) => {
  return (
    <div className="flex gap-2">
      {availableCapacities.map(capacity => {
        const isSelected = selectedCapacity === capacity;

        return (
          <label
            key={capacity}
            className={clsx(
              'w-[56px] h-[32px]',
              'flex flex-col items-center justify-center',
              'cursor-pointer select-none',
              'border text-default',
              'transition-colors',
              isSelected
                ? 'bg-primary dark:bg-dark-button-purple text-white border-primary dark:border-dark-button-purple'
                : 'bg-white dark:bg-dark-background text-primary dark:text-dark-primary border-elements dark:border-dark-elements hover:border-secondary dark:hover:border-purple',
            )}
          >
            <input
              type="radio"
              name="capacity"
              value={capacity}
              checked={isSelected}
              onChange={e => {
                onSelectCapacity(e.target.value);
              }}
              className="sr-only"
            />
            <span className="block">{capacity}</span>
          </label>
        );
      })}
    </div>
  );
};
