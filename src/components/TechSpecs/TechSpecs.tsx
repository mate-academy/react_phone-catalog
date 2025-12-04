import { Item } from '../../types/Item';
import { Product } from '../../types/Producst';
import s from './TechSpecs.module.scss';

type Props = {
  specs: string[];
  product: Item | Product;
};

export const TechSpecs: React.FC<Props> = ({ specs, product }) => {
  return (
    <div className={s.techSpecs}>
      <div className={s.techSpecs__wrapper}>
        {specs.map((spec, index) => {
          const title =
            spec.slice(0, 1).toLocaleUpperCase() + spec.slice(1, spec.length);

          return product[spec as keyof typeof product] ? (
            <div key={index} className={s.techSpecs__info}>
              <div className={s.techSpecs__char}>{title}</div>
              <div className={s.techSpecs__value}>
                {product[spec as keyof typeof product]}
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};
