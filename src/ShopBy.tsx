import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from './api/products';
import { Product } from './types/Product';

export const ShopBy: React.FC = () => {
  const [phonesAmount, setPhonesAmount] = useState(0);
  const [tabletsAmount, setTabletsAmount] = useState(0);
  const [accessoriesAmount, setAccessoriesAmount] = useState(0);
  const get = async (set:(num: number) => void, type: string) => {
    try {
      const response = await getProducts();

      set([...response as Product[]].filter(
        phone => phone.type === type,
      ).length);
    } catch {
      set(0);
    }
  };

  useEffect(() => {
    get(setPhonesAmount, 'phone');
    get(setTabletsAmount, 'tablet');
    get(setAccessoriesAmount, 'accessories');
  }, []);

  return (
    <div className="shopBy">
      <h2 className="shopBy__title">Shop by category</h2>
      <div className="shopBy__content">
        <div>
          <div className="shopBy__photo_container">
            <div className="shopBy__photo shopBy__photo--phones" />
          </div>
          <Link className="shopBy__link" to="/phones">Mobile phones</Link>
          <div className="shopBy__text">
            {phonesAmount}
            {phonesAmount === 1 ? 'model' : 'models'}
          </div>
        </div>
        <div>
          <div className="shopBy__photo_container">
            <div className="shopBy__photo shopBy__photo--tablets" />
          </div>
          <Link className="shopBy__link" to="/tablets">Tablets</Link>
          <div className="shopBy__text">
            {tabletsAmount}
            {tabletsAmount === 1 ? 'model' : 'models'}
          </div>
        </div>
        <div>
          <div className="shopBy__photo_container">
            <div className="shopBy__photo shopBy__photo--accessories" />
          </div>
          <Link className="shopBy__link" to="/accessories">Accessories</Link>
          <div className="shopBy__text">
            {accessoriesAmount}
            {accessoriesAmount === 1 ? 'model' : 'models'}
          </div>
        </div>
      </div>
    </div>
  );
};
