import { FC } from 'react';
import './CharacteristicProduct.scss';
import classNames from 'classnames';
import { Size } from '../../../types/Size';

type Props = {
  charProd: { keys: string[]; values: string[] };
  size: Size;
};

export const CharacteristicProduct: FC<Props> = ({ charProd, size }) => {
  const { keys, values } = charProd;

  return (
    <div className="characteristic-product">
      <ul
        className={classNames('characteristic-product__list', {
          'characteristic-product__list--medium': size === Size.Medium,
        })}
      >
        {keys.map(key => (
          <li key={key} className="characteristic-product__key">
            {key}
          </li>
        ))}
      </ul>

      <ul
        className={classNames('characteristic-product__list', {
          'characteristic-product__list--medium': size === Size.Medium,
        })}
      >
        {values.map(value => (
          <li key={value} className="characteristic-product__value">
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
