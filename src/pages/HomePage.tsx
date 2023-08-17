import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../api/getData';
import { Product } from '../types/Product';
import { ItemsSlider } from '../components/ItemsSlider';
import { Banner } from '../components/Banner';
import { Category } from '../components/Category';

export const favoriteList: string[] = [];
export const HomePage: React.FC = () => {
  const [fullList, setFullList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setIsLoading(true);
      const result = await getProducts();

      setFullList(result);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (fullList.length === 0) {
      getData();
    }
  }, []);

  localStorage.setItem('fullList', JSON.stringify(fullList));

  const hotPriceList = useMemo(() => [...fullList]
    .sort((item1, item2) => {
      return (item2.fullPrice - item2.price) - (item1.fullPrice - item1.price);
    })
    .slice(0, 16),
  [fullList]);

  const newModelsList = useMemo(() => [...fullList]
    .sort((item1, item2) => item2.year - item1.year)
    .slice(0, 16),
  [fullList]);

  return (
    <main className="page">
      <Banner />

      <ItemsSlider
        title="Hot price"
        itemsList={hotPriceList}
        isLoading={isLoading}
      />

      <Category />

      <ItemsSlider
        title="Brand new models"
        itemsList={newModelsList}
        isLoading={isLoading}
      />

      <section />
    </main>
  );
};
