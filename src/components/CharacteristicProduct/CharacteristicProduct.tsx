import { FC } from 'react';
import './characteristic-product.scss';

type Props = {
  charProd: { keys: string[]; values: string[]; };
};

export const CharacteristicProduct: FC<Props> = ({ charProd }) => {
  const { keys, values } = charProd;

  return (
    <div className="characteristic-product">
      <ul className="characteristic-product__list">
        {keys.map((key) => (
          <li key={key} className="characteristic-product__key">
            {key}
          </li>
        ))}
      </ul>

      <ul className="characteristic-product__list">
        {values.map((value) => (
          <li key={value} className="characteristic-product__value">
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
