import { Product } from '../Product/Product';
import { ProductType } from '../../types/ProductType';
import { useEffect, useState } from 'react';

import './productList.scss';

export interface Props {
  title: string;
  productList: ProductType[];
}

type Ways = 'next' | 'back';

export const ProductList: React.FC<Props> = ({ title, productList }) => {
  const [models, setModels] = useState<ProductType[]>([]);

  useEffect(() => {
    if (productList) {
      setModels(productList);
    }
  }, [productList]);

  const handlePagin = (way: Ways) => {
    if (way === 'back') {
      setModels(m => {
        return [...m.slice(1, m.length), ...m.slice(0, 1)];
      });
    }

    if (way === 'next') {
      setModels(m => {
        return [...m.slice(m.length - 1), ...m.slice(0, m.length - 1)];
      });
    }
  };

  return (
    <div className="product-list">
      <div className="titleAndPagination">
        <h2 className="titleAndPagination-title">{title}</h2>
        <div className="titleAndPagination__pagination">
          <button
            onClick={() => handlePagin('next')}
            className="titleAndPagination__button
        titleAndPagination__button--left"
          ></button>
          <button
            onClick={() => handlePagin('back')}
            className="titleAndPagination__button
        titleAndPagination__button--right"
          ></button>
        </div>
      </div>
      <div className="product-list__list">
        {models.map(model => (
          <Product model={model} key={model.id} />
        ))}
      </div>
    </div>
  );
};
