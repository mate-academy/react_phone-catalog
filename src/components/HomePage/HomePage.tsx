import React, { useEffect, useState } from 'react';
import { getProducts } from '../../api/api';
import ItemsWithCarusel from '../ItemsWithCarusel/ItemsWithCarusel';
import ProductsSlider from '../ProductsSlider/ProductsSlider';
import ByCategoty from '../ByCategory/ByCategory';
import { Item } from '../../types';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [hotPrice, setHotPrice] = useState([]);
  const [newModels, setNewModels] = useState([]);

  const phonesCount = products
    .filter((item: Item) => item.type === 'phone').length;

  const tabletCount = products
    .filter((item: Item) => item.type === 'tablet').length;

  const accessoriesCount = products
    .filter((item: Item) => item.type === 'accessorie').length;

  const handleGetPhones = async () => {
    try {
      const response = await getProducts();

      if (response.status === 200) {
        const allPhones = response.data;

        const getHotPrice = allPhones.filter((item: Item) => item.discount > 0)
          .sort((prev: Item, next: Item) => {
            return ((next.discount * next.price) / 100)
              - ((prev.discount * prev.price) / 100);
          });

        const getBrandNewProducts
          = allPhones.filter((item: Item) => item.discount === 0)
            .sort((prev: Item, next: Item) => {
              return next.price - prev.price;
            });

        setProducts(allPhones);
        setHotPrice(getHotPrice);
        setNewModels(getBrandNewProducts);
      }
    } catch {
      throw new Error('error');
    }
  };

  useEffect(() => {
    handleGetPhones();
  }, []);

  return (
    <>
      <div className="homePage container">
        <ProductsSlider />

        <ItemsWithCarusel items={hotPrice} title="Hot prices" />

        <ByCategoty
          phonesCount={phonesCount}
          tabletCount={tabletCount}
          accessoriesCount={accessoriesCount}
        />

        <ItemsWithCarusel items={newModels} title="Brand new models" />
      </div>
    </>
  );
};

export default HomePage;
