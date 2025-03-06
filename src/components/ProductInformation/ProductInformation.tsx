import React, { useEffect, useState } from 'react';
import { ProductDetails } from '../../types/ProductDetails';
import './ProductInformation.scss';
import { getPhones } from '../../utils/api';
import home from '../../../image/home.svg';
import arrow from '../../../image/arrow.svg';
import back from '../../../image/back.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../Loader/Loader';

export const ProductInformation: React.FC = () => {
  const { productId } = useParams<{ productId: string }>(); // Отримуємо productId з URL
  const [phonesInfo, setPhonesInfo] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const backNavigate = useNavigate(); // повернення на попередню сторінку

  useEffect(() => {
    setLoading(true);
    getPhones()
      .then(data => {
        setPhonesInfo(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const selectedDetailPhone = phonesInfo.find(
    phone => phone.name === productId,
  );

  return (
    <main className="productInfo">
      <div className="productInfolink">
        <img src={home} alt="productInfolink__home" />
        <span>
          <img src={arrow} alt="productInfolink__arrow" />
        </span>
        <p className="productInfolink__title">
          Phones
          {productId && (
            <>
              <span>
                <img src={arrow} alt="productInfolink__arrow" />
              </span>
              {productId}
            </>
          )}
        </p>
      </div>
      <div className="productInfolink__back">
        <img src={back} alt="back__link" onClick={() => backNavigate(-1)} />
        <p
          className="productInfolink__backTitle"
          onClick={() => backNavigate(-1)}
        >
          Back
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : selectedDetailPhone ? (
        <div key={selectedDetailPhone.id}>
          <h2 className="productInfo__title">{selectedDetailPhone.name}</h2>
          <div className="productInfo__image">
            {selectedDetailPhone.images.map((image, index) => (
              <img key={index} src={image} alt={`image_phone_${index}`} />
            ))}
          </div>
          <div className="productInfo__line"></div>
          <div className="productInfo__paragraph">
            {selectedDetailPhone.description.map((item, index) => (
              <div className="productInfo__content" key={index}>
                <h2 className="productInfo__itemTitle">{item.title}</h2>
                {item.text.map((paragraph, i) => (
                  <p className="productInfo__desctiption" key={i}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h2>No phone selected</h2>
      )}
    </main>
  );
};
