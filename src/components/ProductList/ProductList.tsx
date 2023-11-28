import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { Phones } from '../../types/Phones';
import './productList.scss';
import { DropDown } from '../DropDown';

type Props = {
  dataPhones: Phones[]
};

export const ProductList: React.FC<Props> = ({ dataPhones }) => {
  // const [searchParams] = useSearchParams();
  // const sort = searchParams.get('sort') || '';
  // const query = searchParams.get('query') || '';

  // const sortedPhoneList
  //   = getSortedProducts(dataPhones, sort, query);

  return (
    <div className="productList">
      <div className="productList__filters">
        <DropDown type="sort-by" />
        <DropDown type="items-on-page" />
      </div>
      <div className="productList__list">
        {dataPhones.map(phone => (
          <ProductCard
            key={phone.id}
            productData={phone}
            // priceToken={phone.price}
          />
        ))}
      </div>

    </div>
  );
};
