import { Link } from 'react-router-dom';
import './Categories.scss';
import { getProductsByCategory } from '../../../../services/products';
import { useEffect, useState } from 'react';

export const Categories = () => {
  const [phonesCount, setPhonesCount] = useState<number>(0);
  const [tabletsCount, setTabletsCount] = useState<number>(0);
  const [accessoriesCount, setAccessoriesCount] = useState<number>(0);

  useEffect(() => {
    const fetchProductCounts = async () => {
      const categories = ['phones', 'tablets', 'accessories'];

      const productCounts = await Promise.all(
        categories.map(category => getProductsByCategory(category)),
      );

      setPhonesCount(productCounts[0].length);
      setTabletsCount(productCounts[1].length);
      setAccessoriesCount(productCounts[2].length);
    };

    fetchProductCounts();
  }, []);

  return (
    <div className="categories container">
      <h2 className="h2 categories__title">Shop by category</h2>
      <div className="categories__content">
        <div className="categories__block">
          <Link
            to="/phones"
            className="categories__image categories__image--phones"
          ></Link>
          <Link to="/phones" className="categories__info">
            <h4 className="categories__info-title h4">Mobile phones</h4>
            <p className="categories__info-text">{phonesCount} models</p>
          </Link>
        </div>

        <div className="categories__block">
          <Link
            to="/tablets"
            className="categories__image categories__image--tablets"
          ></Link>
          <Link to="/tablets" className="categories__info">
            <h4 className="categories__info-title h4">Tablets</h4>
            <p className="categories__info-text">{tabletsCount} models</p>
          </Link>
        </div>

        <div className="categories__block">
          <Link
            to="/accessories"
            className="categories__image categories__image--accessories"
          ></Link>
          <Link to="/accessories" className="categories__info">
            <h4 className="categories__info-title h4">Accessories</h4>
            <p className="categories__info-text">{accessoriesCount} models</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
