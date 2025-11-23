import React from 'react';
import scss from './CapacitySelection.module.scss';

interface Props {
  availableCapacities: string[];
  currentCapacity: string;
  setCapacity: (cap: string) => void;
}

export const CapacitySelection: React.FC<Props> = ({
  availableCapacities,
  currentCapacity,
  setCapacity,
}) => {
  return (
    <section>
      <span className={scss.capacitySelection__label}>Select capacity</span>
      <div className={scss.capacitySelection__capacityOptions}>
        {availableCapacities.map(capacity => {
          const inputId = `capacity-${capacity}`;

          return (
            <React.Fragment key={inputId}>
              <input
                type="radio"
                id={capacity}
                name="availableCapacity"
                value={capacity}
                className={scss.capacitySelection__input}
                onChange={() => setCapacity(capacity)}
                checked={currentCapacity === capacity}
              />
              <label
                htmlFor={capacity}
                className={scss.capacitySelection__option}
              >
                {capacity}
              </label>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};
