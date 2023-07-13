import { useMemo, useState, useCallback } from 'react';
import arrowRight from '../../imgs/icons/arrow-right.svg';
import arrowLeft from '../../imgs/icons/arrow-left.svg';
import { Phone } from '../../type/Phone';
import { Card } from '../Card/Card';

import './hotPrices.scss';

type Props = {
  list: Phone[];
};

export const HotPrices: React.FC<Props> = ({ list }) => {
  const [quantityBrand, setQuantityBrand] = useState(4);

  const hotPrices = useMemo(() => (
    [...list].slice(quantityBrand - 4, quantityBrand)
  ), [list, quantityBrand]);

  const onAddQuantity = useCallback(() => {
    setQuantityBrand(prev => prev + 1);
  }, []);

  const onRemoveQuantity = useCallback(() => {
    setQuantityBrand(prev => prev - 1);
  }, []);

  return (
    <div className="hotPrices">
      <div>
        <h1 className="hotPrices__title">Hot Prices</h1>

        <div className="brandNew__buttons">
          <button
            type="button"
            className="brandNew__button"
            onClick={onRemoveQuantity}
            disabled={quantityBrand === 4}
          >
            <img src={arrowLeft} alt="" />
          </button>

          <button
            type="button"
            className="brandNew__button"
            onClick={onAddQuantity}
            disabled={quantityBrand === list.length}
          >
            <img src={arrowRight} alt="" />
          </button>
        </div>
      </div>

      <div className="hotPrices__cards">
        {hotPrices.map(phone => <Card card={phone} key={phone.id} />)}
      </div>
    </div>
  );
};
