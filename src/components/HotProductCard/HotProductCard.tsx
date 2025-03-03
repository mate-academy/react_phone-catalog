import { useEffect, useState } from 'react';
import { fetchProducts } from '../../utils/api';
// import { Phone } from '../../types/ProductDetails';
import { Product } from '../../types/typeRpoduct';

import './HotProductCard.scss';
import like from '../../../image/heart.svg';
import { NavLink } from 'react-router-dom';

export const HotProductCard = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    fetchProducts().then(data => {
      setPhones(data);
    });
  }, []);

  const updateItemsPerPage = () => {
    if (window.innerWidth <= 768) {
      setItemsPerPage(3);
    } else if (window.innerWidth <= 480) {
      setItemsPerPage(2);
    } else {
      setItemsPerPage(4);
    }
  };

  useEffect(() => {
    updateItemsPerPage();

    window.addEventListener('resize', updateItemsPerPage);

    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  const handleNext = () => {
    if (currentIndex + 1 < phones.length - (itemsPerPage - 1)) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 1 >= 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  return (
    <div className="productHot">
      <div className="productHot__titleButton">
        <h2 className="productHot__title">Hot prices</h2>
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
            disabled={currentIndex + itemsPerPage >= phones.length}
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="productHot__cards">
        {phones.slice(currentIndex, currentIndex + itemsPerPage).map(phone => (
          <div key={phone.id} className="productHot__elements">
            <div className="productHot__img-container">
              <img
                src={phone.image}
                alt={`${phone.category} image`}
                className="productHot__image"
              />
            </div>

            <h3 className="productHot__name">{phone.name}</h3>

            <div className="productHot__discount">
              <h3 className="productHot__price">{`$ ${phone.price}`}</h3>
              <h3 className="productHot__fullprice">{`$ ${phone.fullPrice}`}</h3>
            </div>

            <div className="productHot__line"></div>
            <div className="productHot__information">
              <div className="productHot__informationAll">
                <h3 className="productHot__screenTitle">Screen</h3>
                <h3 className="productHot__screenDescription">
                  {phone.screen}
                </h3>
              </div>

              <div className="productHot__informationAll">
                <h3 className="productHot__screenTitle">Capacity</h3>
                <h3 className="productHot__screenDescription">
                  {phone.capacity}
                </h3>
              </div>

              <div className="productHot__informationAll">
                <h3 className="productHot__screenTitle">RAM</h3>
                <h3 className="productHot__screenDescription">{phone.ram}</h3>
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
