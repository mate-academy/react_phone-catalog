import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import mobile from '../images/categories/mobile.png';
import teblets from '../images/categories/tablets.png';
import accessories from '../images/categories/accessories.png';

import { Products } from '../type/Products';
import { getProducts } from '../api/getData';
import { Loader } from './Loader/Loader';

export const Categories: React.FC = () => {
  const [list, setList] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getLengthByCategory = (arr: Products[], category: string) => {
    return arr.filter(product => product.category === category).length;
  };

  const getAmount = async () => {
    try {
      setIsLoading(true);
      const res = await getProducts();

      setList(res);
      setIsLoading(false);
    } catch {
      swal({
        icon: 'Error',
        title: 'Empty list, Data Error!',
        text: 'Try again in 5 minutes',
      });
    }
  };

  useEffect(() => {
    getAmount();
  }, []);

  return (
    <div className="categories">
      <h3 className="categories__title">Shop by category</h3>

      <div className="categories__content">
        <Link to="/phones" className="categories__link">
          <div className="categories__img-box categories__img-box-mobile">
            <img src={mobile} alt="" className="categories__img" />
          </div>

          <p className="categories__type">Phones</p>

          <span className="categories__quantity">
            {isLoading
              ? <Loader />
              : getLengthByCategory(list, 'phones')}
            {' '}
            models
          </span>
        </Link>

        <Link to="/tablets" className="categories__link">
          <div className="categories__img-box categories__img-box-tablets">
            <img src={teblets} alt="" className="categories__img" />
          </div>

          <p className="categories__type">Tablets</p>

          <span className="categories__quantity">
            {isLoading
              ? <Loader />
              : getLengthByCategory(list, 'tablets')}
            {' '}
            models
          </span>
        </Link>

        <Link to="/accessories" className="categories__link">
          <div className="categories__img-box categories__img-box-accessories">
            <img src={accessories} alt="" className="categories__img" />
          </div>

          <p className="categories__type">Accessories</p>

          <span className="categories__quantity">
            {isLoading
              ? <Loader />
              : getLengthByCategory(list, 'accessories')
              || '0'}
            {' '}
            models
          </span>
        </Link>
      </div>
    </div>
  );
};
