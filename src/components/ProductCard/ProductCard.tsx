import { useEffect, useState } from 'react';
import { getPhones } from '../../utils/api';
import { ProductDeteils } from '../../types/ProductDetails';
import './ProductCard.scss';
import like from '../../../image/heart.svg';
import { NavLink } from 'react-router-dom';

export const ProductCard = () => {
  const [phones, setPhones] = useState<ProductDeteils[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPrePage = 4;
  // const [error, setError] = useState<string | null>(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPhones().then(data => {
      setPhones(data);
    });
    // .catch(() => {
    //   setError('Error');
    //   setLoading(false);
    // });
  }, []);

  const handleNext = () => {
    if (currentIndex + itemsPrePage < phones.length) {
      setCurrentIndex(prevIndex => prevIndex + itemsPrePage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPrePage >= 0) {
      setCurrentIndex(prevIndex => prevIndex - itemsPrePage);
    }
  };

  return (
    <div className="product">
      <div className="product__titleButton">
        <h2 className="product__title">Brand new models</h2>
        <div className="button">
          <button
            className="buttonPrev"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            &lt;
          </button>
          <button
            className="buttonNext"
            onClick={handleNext}
            disabled={currentIndex + itemsPrePage >= phones.length}
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="product__cards">
        {phones.slice(currentIndex, currentIndex + itemsPrePage).map(phone => (
          <div key={phone.id} className="product__elements">
            <div className="product__img-container">
              <img
                src={phone.images[0]}
                alt={`${phone.category} image`}
                className="product__image"
              />
            </div>

            <h3 className="product__name">{phone.name}</h3>
            <h3 className="product__price">{`$ ${phone.priceRegular}`}</h3>
            <div className="product__line"></div>
            <div className="product__information">
              <div className="product__informationAll">
                <h3 className="product__screenTitle">Screen</h3>
                <h3 className="droduct__screenDescription">{phone.screen}</h3>
              </div>

              <div className="product__informationAll">
                <h3 className="product__screenTitle">Capacity</h3>
                <h3 className="droduct__screenDescription">{phone.capacity}</h3>
              </div>

              <div className="product__informationAll">
                <h3 className="product__screenTitle">RAM</h3>
                <h3 className="droduct__screenDescription">{phone.ram}</h3>
              </div>
            </div>

            <div className="buttons">
              <NavLink className="button__add" to="/?">
                Add to cart
              </NavLink>
              {/* <button className="button__add">Add to cart</button> */}
              {/* <button className="buttons__like"></button> */}
              <NavLink className="buttons__like" to="/?">
                <img src={like} alt="like" />
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
