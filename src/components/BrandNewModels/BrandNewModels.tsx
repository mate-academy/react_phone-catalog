import { useState, useMemo, useCallback } from 'react';
import { Phone } from '../../type/Phone';
import arrowRight from '../../imgs/icons/arrow-right.svg';
import arrowLeft from '../../imgs/icons/arrow-left.svg';
import { Card } from '../Card/Card';
import './brandNewModels.scss';

type Props = {
  list: Phone[],
};

export const BrandNewModels: React.FC<Props> = ({ list }) => {
  const [quantityBrand, setQuantityBrand] = useState(4);

  const listOfBrandNew = useMemo(() => (
    [...list].slice(quantityBrand - 4, quantityBrand)
  ), [list, quantityBrand]);

  const onAddQuantity = useCallback(() => {
    setQuantityBrand(prev => prev + 1);
  }, []);

  const onRemoveQuantity = useCallback(() => {
    setQuantityBrand(prev => prev - 1);
  }, []);

  return (
    <div className="brandNew">
      <div className="brandNew__top">
        <h4 className="brandNew__title">Brand new models</h4>

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

      <div className="brandNew__content">
        {listOfBrandNew.map(phone => <Card card={phone} key={phone.id} />)}
      </div>
    </div>
  );
};
