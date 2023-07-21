import { useMemo, useState, useCallback } from 'react';
import arrowRight from '../imgs/icons/arrow-right.svg';
import arrowLeft from '../imgs/icons/arrow-left.svg';
import { Phone } from '../type/Phone';
import { Card } from './Card';

type Props = {
  list: Phone[];
  title: string;
};

export const CatalogShortCut: React.FC<Props> = ({ list, title }) => {
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
    <div className="CatalogShortCut">
      <div className="CatalogShortCut__top">
        <h1 className="CatalogShortCut__title">{title}</h1>

        <div className="CatalogShortCut__buttons">
          <button
            type="button"
            className="CatalogShortCut__button"
            onClick={onRemoveQuantity}
            disabled={quantityBrand === 4}
          >
            <img src={arrowLeft} alt="" />
          </button>

          <button
            type="button"
            className="CatalogShortCut__button"
            onClick={onAddQuantity}
            disabled={quantityBrand === list.length}
          >
            <img src={arrowRight} alt="" />
          </button>
        </div>
      </div>

      <div className="CatalogShortCut__cards">
        {hotPrices.map(phone => <Card card={phone} key={phone.id} />)}
      </div>
    </div>
  );
};
