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
  const [selectedPhone, setSelectedPhone] = useState<ProductDetails | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const backNavigate = useNavigate(); // повернення на попередню сторінку
  const [mainImage, setMainImage] = useState<string>('');
  const [selecredColor, setSelectedColor] = useState<string | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getPhones()
      .then(data => {
        setPhonesInfo(data);
        const foundPhone = data.find(phone => phone.name === productId);

        if (foundPhone) {
          setSelectedPhone(foundPhone);
          setMainImage(foundPhone.image[0]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  const handleChangeColor = (color: string) => {
    setSelectedColor(color);

    const newPhone = phonesInfo.find(
      phone => phone.name.includes(productId!) && phone.color === color,
    );

    if (newPhone) {
      setSelectedPhone(newPhone);
      setMainImage(newPhone.images[0]);
    }
  };

  const handleChangeMemory = (mamory: string) => {
    setSelectedMemory(mamory);
  };

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
      ) : selectedPhone ? (
        <div key={selectedPhone.id}>
          <h2 className="productInfo__title">{selectedPhone.name}</h2>
          <div className="productInfo__wrapperPhone">
            <div className="Image">
              {selectedPhone.images.map((image, index) => (
                <img
                  className="productInfo__Image"
                  key={index}
                  src={image}
                  alt={`image_phone_${index}`}
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>

            <div className="Main__Image">
              <img
                src={mainImage}
                className="productInfo__mainImage"
                alt="image__main"
              />
            </div>
          </div>

          <div className="productInfo__wraperdeteils">
            <div className="productInfo__colors">
              <h3 className="productInfo__contentTitle">Available colors</h3>

              {selectedPhone.colorsAvailable.map((color, i) => (
                <button
                  key={i}
                  className={`productInfo__color ${selecredColor === color ? 'selected' : ''}`}
                  onClick={() => handleChangeColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
            <div className="productInfo__line"></div>

            <div className="productInfo__memory">
              <h3 className="productInfo__contentTitle">Select capacity</h3>
              {selectedPhone.capacityAvailable.map((memorys, i) => (
                <button
                  key={i}
                  className={`productInfo__memorys ${selectedMemory === memorys ? 'selected' : ''}`}
                  onClick={() => handleChangeMemory(memorys)}
                >
                  {memorys}
                </button>
              ))}
            </div>
            <div className="productInfo__line"></div>
          </div>

          <div className="productInfo__paragraph">
            <h3 className="productInfo__about">About</h3>
            <div className="productInfo__line"></div>
            {selectedPhone.description.map((item, index) => (
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
