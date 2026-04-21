import '../CategoryPhones/CategoryPhones.scss';
import { Link } from 'react-router-dom';
import { getTablets } from '../../../api';
import { useState } from 'react';
import { useEffect } from 'react';

const CategoryTablets = () => {
  const [countsTablets, setCountsTablets] = useState<number | null>(null);

  const getCountsTablets = async () => {
    const phones = await getTablets();

    return phones.length;
  };

  useEffect(() => {
    getCountsTablets().then(data => setCountsTablets(data));
  }, []);

  return (
    <>
      <div className="category">
        <Link to="/tablets" className="category__image-wrapper">
          <img
            src="./img/main-category--tablet.png"
            alt=""
            className="category__banner"
          />
        </Link>
        <h3 className="category__text">Tablets</h3>
        {countsTablets && (
          <p className="category__count">{countsTablets} models</p>
        )}
      </div>
    </>
  );
};

export default CategoryTablets;
