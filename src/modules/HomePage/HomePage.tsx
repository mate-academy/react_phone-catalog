import React from 'react';
import { PicturesSlider } from './PicturesSlider/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import categoryFirst from '../../../public/img/Category/categoryFirst.svg';
import categorySecond from '../../../public/img/Category/categorySecond.svg';
import categoryThird from '../../../public/img/Category/categoryThird.svg';

export const HomePage: React.FC = () => {

  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [hotGoods, setHotGoods] = useState<Product[]>([]);
  const [newestGoods, setNewestGoods] = useState<Product[]>([]);
  const [allGoods, setAllGoods] = useState<Product[]>([]);

  const categories = ["phones", "tablets", "accessories"]

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const baseUrl =
        window.location.hostname === 'localhost'
          ? 'http://localhost:5173/api'
          : 'https://anastasiiakorolko.github.io/react_phone-catalog/api';
        const responses = await Promise.all(
          categories.map(category => fetch(`${baseUrl}/${category}.json`))
        );

        responses.forEach(response => {
          if (!response.ok) {
            throw new Error(`Error fetching category: ${response.url}`);
          }
        });

        const data = await Promise.all(responses.map(response => response.json()));
        const allProducts = data.flat();
        setAllGoods(allProducts);

        const discountProducts = allProducts
          .filter(product => product.priceDiscount > 0)
          .sort((a, b) => Math.abs(b.priceRegular - b.priceDiscount) - Math.abs(a.priceRegular - a.priceDiscount));
        setHotGoods(discountProducts);

        const newestProducts = [...allProducts].sort((a, b) => b.year - a.year);
        setNewestGoods(newestProducts);

      } catch (error) {
        console.error(error);
        setError('Error: Unable to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="main">
      <h1 className="main__title">Welcome to Nice Gadgets store!</h1>

      <PicturesSlider />

      <ProductsSlider goods={newestGoods} title="Brand new models"/>

      <h2 className='section__title'>Shop by category</h2>
      <div className='categories'>
        <div className='category category--mobiles'>
          <Link to={'/phones'}>
            <img src={categoryFirst} alt="Phones" className='category__image' />
          </Link>
          <Link to={'/phones'} >
            <h3 className='category__title'>Mobile phones</h3>
          </Link>
            <p className='category__count'>95 models</p>
        </div>
        <div className='category category--tablets'>
          <Link to={'/tablets'}>
            <img src={categorySecond} alt="Tablets" className='category__image' />
          </Link>
          <Link to={'/tablets'}>
            <h3 className='category__title'>Tablets</h3>
          </Link>
          <p className='category__count'>95 models</p>
        </div>
        <div className='category category--accessories'>
        <Link to={'/accessories'}>
          <img src={categoryThird} alt="Accessories" className='category__image' />
        </Link>
        <Link to={'/accessories'}>
          <h3 className='category__title'>Accessories</h3>
        </Link>
        <p className='category__count'>95 models</p>
        </div>
      </div>

      <ProductsSlider goods={hotGoods} title="Hot Prices"/>
    </main>
  );
};
