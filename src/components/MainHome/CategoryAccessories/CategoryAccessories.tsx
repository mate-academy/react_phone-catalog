import '../CategoryPhones/CategoryPhones.scss';
// eslint-disable-next-line max-len
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAccessories } from '../../../api';

const CategoryAccessories = () => {
  const [countsAccessories, setCountsAccessories] = useState<number | null>(
    null,
  );

  const getCountsAccessories = async () => {
    const phones = await getAccessories();

    return phones.length;
  };

  useEffect(() => {
    getCountsAccessories().then(data => setCountsAccessories(data));
  }, []);

  return (
    <>
      <div className="category">
        <Link to="/accessories" className="category__image-wrapper">
          <img
            src="./img/main-category--accessory.png"
            alt=""
            className="category__banner"
          />
        </Link>
        <h3 className="category__text">Accessories</h3>
        {countsAccessories && (
          <p className="category__count">{countsAccessories} models</p>
        )}
      </div>
    </>
  );
};

export default CategoryAccessories;
