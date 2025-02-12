import { Route, Routes } from 'react-router-dom';
import './App.scss';

import { Layout } from './shared/Layout';
import { HomePage } from './modules/HomePage';
import { Product } from './shared/Product';
import { useEffect, useState } from 'react';
import { getDataPublic } from './shared/functions/functions';
import { Article } from './shared/types/Article';
import { Carousel } from './shared/Carousel/Carousel';

const testProduct = {
  id: 1,
  category: 'phones',
  itemId: 'apple-iphone-7-32gb-black',
  name: 'Apple iPhone 7 32GB Black',
  fullPrice: 400,
  price: 375,
  screen: "4.7' IPS",
  capacity: '32GB',
  color: 'black',
  ram: '2GB',
  year: 2016,
  image: 'img/phones/apple-iphone-7/black/00.webp',
};

export const App: React.FC = () => {
  const [newPhones, setNewPhones] = useState<Article[] | null>(null);

  useEffect(() => {
    getDataPublic('products')
      .then((response: Article[]) => {
        const result = response.filter(
          (el: Article) =>
            el.year === 2022 && el.price < 1200 && el.price >= 1000,
        );

        setNewPhones(result);
      })
      .catch(error => console.log('error with app catch', error)); // Фікс помилки
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/phones"
          element={
            <Carousel items={newPhones || null} title={'test carousel'} />
          }
        />
        <Route path="*" element={<h1>404 Page not found</h1>} />
      </Routes>
    </Layout>
  );
};
