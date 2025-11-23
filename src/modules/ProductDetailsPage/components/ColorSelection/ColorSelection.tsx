import scss from './ColorSelection.module.scss';
import { COLOR_MAP } from '../../utility/colorMap';
import React from 'react';

interface Props {
  availableColors: (keyof typeof COLOR_MAP)[];
  currentColor: keyof typeof COLOR_MAP;
  setColor: React.Dispatch<React.SetStateAction<keyof typeof COLOR_MAP | null>>;
  id: number;
}

export const ColorSelection: React.FC<Props> = ({
  availableColors,
  currentColor,
  setColor,
  id,
}) => {
  return (
    <section>
      <div className={scss.colorSelection__spanWrapper}>
        <span className={scss.colorSelection__label}>Available colors</span>
        <span className={scss.colorSelection__id}>ID: {id}</span>
      </div>
      <div className={scss.colorSelection__colorOptions}>
        {availableColors.map(color => (
          <React.Fragment key={color}>
            <input
              type="radio"
              id={color}
              name="availableColors"
              value={color}
              className={scss.colorSelection__colorOption}
              onChange={() => setColor(color)}
              checked={currentColor === color}
            />
            <label
              htmlFor={color}
              className={scss.colorSelection__colorSwatch}
              style={{ backgroundColor: COLOR_MAP[color] }}
            >
              <span className={scss.srOnly}>{color}</span>
            </label>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
