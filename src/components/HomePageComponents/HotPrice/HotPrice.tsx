import { useEffect, useState } from 'react';
import { CardSlider } from '../../CardSlider/CardSlider';
import { getProducts } from '../../../api';
import { Product } from '../../../types/ProductsType';

export const HotPrice = () => {
  const title = 'Hot prices';
  const [phones, setPhones] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(loadedProducts => {
        return loadedProducts
          .sort((phone1, phone2) => {
            return (
              phone1.fullPrice -
              phone1.price -
              (phone2.fullPrice - phone2.price)
            );
          })
          .filter(product => product.category === 'phones');
      })
      .then(filteredProducts => setPhones(filteredProducts));
  }, []);

  return (
    <div className="hot-prices">
      <CardSlider cardTitle={title} productCards={phones} />
    </div>
  );
};
