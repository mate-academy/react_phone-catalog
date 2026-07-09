import type { ProductFull } from '../../../../types/ProductFull';
import { capitalizeFirstLetter } from '../../../../utils/string';
import s from './TechSpecsList.module.scss';

type Props = {
  specs: Partial<ProductFull>;
};

export const TechSpecsList = ({ specs }: Props) => {
  return (
    <div className={s.specsList}>
      {Object.keys(specs).map(key => {
        const typedKey = key as keyof ProductFull;

        if (!specs[typedKey]) {
          return;
        }

        return (
          <div key={typedKey} className={s.specsList__item}>
            <div className={s.specsList__label}>
              {capitalizeFirstLetter(typedKey)}
            </div>
            <div className={s.specsList__value}>
              {Array.isArray(specs[typedKey])
                ? specs[typedKey]?.join(', ')
                : specs[typedKey]}
            </div>
          </div>
        );
      })}
    </div>
  );
};
