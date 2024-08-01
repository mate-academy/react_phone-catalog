import classNames from 'classnames';
import { memo } from 'react';
import cls from './techSpecs.module.scss';
import { capitalizeFirstLetter } from '../../../lib/utils/capitalizeFirstLetter';

export enum TechSpecsSize {
  S = 'size_s',
  M = 'size_m',
}

export interface ITechSpecs {
  [key: string]: string;
}

interface Props {
  className?: string;
  techSpecs: ITechSpecs;
  size?: TechSpecsSize;
}

export const TechSpecs = memo(
  ({ techSpecs, className, size = TechSpecsSize.S }: Props) => {
    return (
      <ul className={classNames(className, cls.techSpecs, [cls[size]])}>
        {Object.entries(techSpecs).map(([nameSpec, value]) => (
          <li className={cls.techSpecs__item} key={nameSpec}>
            <span className={cls.techSpecs__name}>
              {capitalizeFirstLetter(nameSpec)}
            </span>
            <span className={cls.techSpecs__value}>{value}</span>
          </li>
        ))}
      </ul>
    );
  },
);
