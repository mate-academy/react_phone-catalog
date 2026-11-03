import Footer from '../components/Footer';
import './Favorites.scss';
import '../components/NewModels.scss';
import NavPage from '../components/NavPage';
import { useState, useEffect } from 'react';
import Model from '../components/Model';
import { Product } from '../interface/Product';

const Favorites = () => {
  const [quantity, setQuantity] = useState(0);
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    setData(favorites);
    setQuantity(favorites.length);
  }, []);

  useEffect(() => {
    fetch('http://localhost:5173/api/products.json')
      .then(response => response.json())
      .then(result => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

        const favoriteProducts = result.filter((item: Product) =>
          favorites.includes(item.name),
        );

        setData(favoriteProducts);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, [data]);

  return (
    <div className="favorites">
      <div className="container column">
        <NavPage page="Favorites" />
        <h1 className="favorites__title">Favorites</h1>
        <span className="favorites__quantity">{quantity} items</span>
        <div className="favorites__items models__items">
          {data.length === 0 ? (
            <p className="favorites__empty">No favorites yet</p>
          ) : (
            data.map((item: Product) => {
              return <Model key={item.id} item={item} />;
            })
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;
