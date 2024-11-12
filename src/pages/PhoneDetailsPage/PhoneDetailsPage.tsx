import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { PhoneDetails } from '../../components/PhoneDetails/PhoneDetails';
import { PhoneSpecs } from '../../components/PhoneSpecs/PhoneSpecs';
import { HotPrices } from '../../components/HotPrices/HotPrices';
import phonesFromServer from '../../api/phones.json';
import { PhoneFromServer } from '../../types/Phone';
import './PhoneDetailsPage.scss';
import './PhoneDetailsPage__Tablet.scss';
import './PhoneDetailsPage__Phone.scss';

export const PhoneDetailsPage = () => {
  const [imgUrl, setImgUrl] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const splittedUrl = path.split('/');
  const splittedPhoneId = splittedUrl[splittedUrl.length - 1];
  const [phone, setPhone] = useState<PhoneFromServer | null>(null);

  const handleImgButton = (imageUrlArg: string) => {
    setImgUrl(imageUrlArg);
  };

  useEffect(() => {
    const foundPhone = phonesFromServer.find(p => p.id === splittedPhoneId);

    if (foundPhone) {
      setPhone(foundPhone);
    }
  }, [splittedPhoneId]);

  useEffect(() => {
    setImgUrl('');
  }, [path]);

  const handleChangeCapacity = (newPhoneCapacity: string) => {
    if (!phone) {
      return;
    }

    const arrayWithCapacity = phone.id.split('-');
    const capacityString = arrayWithCapacity[3];

    const newId = phone.id.replace(
      capacityString,
      newPhoneCapacity.toLowerCase(),
    );

    navigate(`/products/${newId}`);
  };

  const handleChangeColor = (color: string) => {
    if (!phone) {
      return;
    }

    const arrayWithColor = phone.id.split('-');
    const colorString = arrayWithColor[4];
    const newColor = phone.id.replace(colorString, color);

    navigate(`/products/${newColor}`);
  };

  return (
    <main className="main">
      <div className="container">
        <BreadCrumbs pageName="Phones" />
        {phone ? (
          <>
            <h1 className="subtitle">{phone.name}</h1>
            <div className="details">
              <div className="details__top details-top top">
                <ul className="details-top__list">
                  {phone.images.map((img, index) => (
                    <li key={index} className="details-top__item">
                      <button
                        onClick={() => handleImgButton(img)}
                        className="details-top__button"
                      >
                        <img src={`${img}`} alt={`${index}`} />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="details-top__img">
                  <img
                    className="details-top-img"
                    src={!imgUrl ? `${phone.images[0]}` : `${imgUrl}`}
                    alt="Main image"
                  />
                </div>

                <div className="details-top__buying buying">
                  <div className="buying__colors colors">
                    <div className="buying__title">Available colors</div>
                    <ul className="colors__colors">
                      {phone.colorsAvailable.map(color => (
                        <li
                          style={{ backgroundColor: color }}
                          key={color}
                          className="colors__color"
                        >
                          <button
                            className="colors__button"
                            onClick={() => handleChangeColor(color)}
                          ></button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="buying__capacity capacity">
                    <div className="buying__title">Select capacity</div>
                    {phone.capacityAvailable.map(capacity => (
                      <button
                        onClick={() => handleChangeCapacity(capacity)}
                        key={capacity}
                        className="capacity__button"
                      >
                        {capacity}
                      </button>
                    ))}
                  </div>
                  <div className="buying__add">
                    <PhoneDetails phone={phone} />
                  </div>
                </div>
                <div className="details-top__id">
                  <h5>ID: {phone.id}</h5>
                </div>
              </div>
              <div className="details__bottom details-bottom bottom">
                <div className="details-bottom__about about">
                  <h2 className="bottom__title">About</h2>
                  <hr />
                  {phone.description.map(description => (
                    <section
                      key={description.title}
                      className="about__section about-section"
                    >
                      <h3 className="about-section__title">
                        {description.title}
                      </h3>
                      <p className="about-section__text">{description.text}</p>
                    </section>
                  ))}
                </div>
                <div className="details-bottom__specs">
                  <h2 className="bottom__title">Tech Specs</h2>
                  <PhoneSpecs phone={phone} />
                </div>
              </div>
            </div>
            <HotPrices title={'You may also like'} />
          </>
        ) : (
          <h1 className="subtitle">...loading</h1>
        )}
      </div>
    </main>
  );
};
