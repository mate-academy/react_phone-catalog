import './CategoryPhones.scss';
import { Link } from 'react-router-dom';
import { getPhones } from '../../../api';
import { useEffect, useState } from 'react';

const CategoryPhones = () => {
  const [countsPhones, setCountsPhones] = useState<number | null>(null);

  const getCountsPhones = async () => {
    const phones = await getPhones();

    return phones.length;
  };

  useEffect(() => {
    getCountsPhones().then(data => setCountsPhones(data));
  }, []);

  return (
    <>
      <div className="category">
        <Link to="/phones" className="category__image-wrapper">
          <img
            src="./img/main-category--phone.png"
            alt=""
            className="category__banner"
          />
        </Link>
        <h3 className="category__text">Mobile phones</h3>
        {countsPhones && (
          <p className="category__count">{countsPhones} models</p>
        )}
      </div>
    </>
  );
};

export default CategoryPhones;
