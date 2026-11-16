import Footer from '../components/Footer';
import './Favorites.scss';
import '../components/NewModels.scss';
import NavPage from '../components/NavPage';
import { useState, useEffect } from 'react';
import Model from '../components/Model';
import { Product } from '../interface/Product';
import Loading from '../components/Loading';
import AddEffect from '../components/AddEffect';

const Favorites = ({
  favorites,
  setFavorites,
}: {
  favorites: string[];
  setFavorites: (list: string[]) => void;
}) => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [effect, setEffect] = useState(false);
  const [nameProduct, setNameProduct] = useState('');

  useEffect(() => {
    fetch(
      `https://johnnyvasconcelos.github.io/react_phone-catalog/api/products.json`,
    )
      .then(response => response.json())
      .then(result => {
        const favoriteProducts = result.filter((item: Product) =>
          favorites.includes(item.name),
        );

        setData(favoriteProducts);
        setLoading(false);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, [favorites]);

  function changeEffect(nam: string) {
    setEffect(true);
    setNameProduct(nam);
    setTimeout(() => {
      setEffect(false);
    }, 3000);
  }

  return (
    <div className="favorites">
      <div className="container column">
        <NavPage page="Favorites" />
        <h1 className="favorites__title">Favorites</h1>
        <span className="favorites__quantity">{data.length} items</span>
        <div className="favorites__items models__items">
          {loading && <Loading />}
          {data.length === 0 ? (
            <p className="favorites__empty">No favorites yet</p>
          ) : (
            data.map((item: Product) => {
              return (
                <Model
                  changeEffect={changeEffect}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  key={item.id}
                  item={item}
                />
              );
            })
          )}
        </div>
        <AddEffect effect={effect} name={nameProduct} />
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;
