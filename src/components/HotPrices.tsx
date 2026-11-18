import './NewModels.scss';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import Model from './Model';
import { Product } from '../interface/Product';
import AddEffect from './AddEffect';
import { LocalProduct } from '../interface/Product';

const HotPrices = ({
  favorites,
  setFavorites,
  products,
  setProducts,
}: {
  favorites: string[];
  products: LocalProduct[];
  setFavorites: (list: string[]) => void;
  setProducts: (list: LocalProduct[]) => void;
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Product[]>([]);

  const [effect, setEffect] = useState(false);
  const [nameProduct, setNameProduct] = useState('');

  useEffect(() => {
    fetch(
      `https://johnnyvasconcelos.github.io/react_phone-catalog/api/products.json`,
    )
      .then(response => response.json())
      .then(result => {
        const sortItems = [...result];

        sortItems.sort((a, b) => {
          return a.price - b.price;
        });
        setData(result);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function changeEffect(nam: string) {
    setEffect(true);
    setNameProduct(nam);
    setTimeout(() => {
      setEffect(false);
    }, 3000);
  }

  return (
    <section className="models">
      <div className="container column">
        <h2 className="models__title">Hot prices</h2>
        {loading && <Loading />}
        <div className="models__items">
          {data
            .slice(0, 4)
            .reverse()
            .map(item => {
              return (
                <Model
                  item={item}
                  key={item.id}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  changeEffect={changeEffect}
                  products={products}
                  setProducts={setProducts}
                />
              );
            })}
        </div>
      </div>
      <AddEffect effect={effect} name={nameProduct} />
    </section>
  );
};

export default HotPrices;
