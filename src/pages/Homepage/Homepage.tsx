import React, { useContext, useEffect, useState } from 'react';
import { NewPhoneModelsSlider } from '../../components/NewPhoneModelsSlider/NewPhoneModelsSlider';
import { Carousel } from '../../components/Carousel/Carousel';
import { Categories } from '../../components/Categories/Categories';
import { HotPricesSlider } from '../../components/HotPricesSlider/HotPricesSlider';
import { getProducts } from '../../api/api';
import { getHotDeals, getNewModels } from '../../api/function';
import { ProductType } from '../../api/type/ProductType';
import { FavoritesContext } from '../../context/FavoritesContext';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export const HomePage: React.FC = () => {
  const [phones, setPhones] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useContext(FavoritesContext);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data: ProductType[] = await getProducts();
        setPhones(data);
      } catch (error) {
        console.error('Error', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const newPhones = getHotDeals(phones);
  const newModels = getNewModels(phones);

  return (
    <main className="main">
      <h1 className="visuallyHidden">Product Catalog</h1>

      <h2
        className={classNames('title', {
          dark: theme === 'dark',
        })}
      >
        {t('welcome')}
      </h2>

      <Carousel />

      <NewPhoneModelsSlider newModels={newModels} isLoading={isLoading} />

      <Categories />

      <HotPricesSlider newPhones={newPhones} isLoading={isLoading} />

     </main>
  );
};
