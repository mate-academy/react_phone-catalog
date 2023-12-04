import { useEffect } from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { Category } from '../../components/Category/Category';
import { useProducts } from '../../helpers/CatalogContext/CatalogContext';
import {
  client,
  getHotPriceProducts,
  getNewProducts,
} from '../../helpers/utils/fetchData';

enum Categories {
  Phones = 'phones',
}

export const HomePage: React.FC = () => {
  const {
    hotPricePhones,
    setHotPriceProducts,
    newPhones,
    setNewProducts,
  } = useProducts();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetchPhones();

        const mappedData = data.map((phone) => {
          return { ...phone, name: `${phone.name} (iMT9G2FS/A)` };
        });

        setHotPriceProducts(getHotPriceProducts(mappedData, Categories.Phones));
        setNewProducts(getNewProducts(mappedData, Categories.Phones));
      } catch (error) {
        throw new Error();
      }
    };

    fetchData();
  }, [setHotPriceProducts, setNewProducts]);

  return (
    <>
      <ProductSlider />
      <ProductCard
        discount
        title="Hot prices"
        products={hotPricePhones}
      />
      <Category />
      <ProductCard
        discount={false}
        title="Brand new models"
        products={newPhones}
      />
    </>
  );
};
