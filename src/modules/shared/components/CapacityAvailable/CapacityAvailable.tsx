import classNames from 'classnames';
import React from 'react';
import './CapacityAvailable.scss';
import { useLanguage } from '../../../../context/LanguageContext';

type Props = {
  className: string;
  activeCapacity: string;
  capacitysAvailable: string[];
  changeCapacity: (value: string) => void;
};

export const CapacityAvailable: React.FC<Props> = ({
  className,
  activeCapacity,
  capacitysAvailable,
  changeCapacity,
}) => {
  const { texts } = useLanguage();

  return (
    <div className={`capacity-available ${className}`}>
      <p className="capacity-available__title">{texts.selectCapacity}</p>
      <div className="capacity-available__options">
        {capacitysAvailable.map((capacity, index) => (
          <button
            className={classNames('capacity-available__option-capacity', {
              'capacity-available__option-capacity--is-active':
                activeCapacity === capacity,
            })}
            key={index}
            onClick={() => changeCapacity(capacity)}
          >
            <span
              className={classNames('capacity-available__value-capacity', {
                'capacity-available__value-capacity--is-active':
                  activeCapacity === capacity,
              })}
            >
              {capacity}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
