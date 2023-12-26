import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import homeImage from '../../images/home.svg';
import arrowRight from '../../images/arrow-right-secondary-color.svg';
import arrowLeft from '../../images/arrow-left-black.svg';
import { Loader } from '../../components/Loader/Loader';
import { getPhoneData } from '../../helpers/utils/fetchData';
import { PhoneDetail } from '../../Types/PhoneDetail';

export const ProductDetailsPage: React.FC = () => {
  const location = useLocation();
  const phoneId = location.pathname.replace('/phones/', '');
  const upperPhoneId = phoneId.replace(phoneId[0], phoneId[0].toUpperCase());
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [phone, setPhone] = useState<PhoneDetail | null>(null);

  const [selectedPhoto, setSelectedPhoto] = useState<string>('');

  const handleChangePhoto = (src: string) => {
    setSelectedPhoto(src);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPhoneData<PhoneDetail>(`/${phoneId}.json`);

        setPhone(data);
        setIsLoading(false);
        handleChangePhoto(data?.images[0] || '');
      } catch (error) {
        throw new Error();
      }
    };

    fetchData();
  }, [setPhone, phoneId]);

  return (
    <div className="phones">
      <div className="path">
        <img src={homeImage} alt="home_icon" />
        <img src={arrowRight} alt="arrow_right" />
        <h3 className="phones__prev-page">Phones</h3>
        <img src={arrowRight} alt="arrow_right" />
        <h3>{upperPhoneId}</h3>
      </div>
      <button
        type="button"
        className="left-back"
        onClick={() => navigate(-1)}
        data-cy="backButton"
      >
        <img src={arrowLeft} alt="arrow_right" />
        <p>Back</p>
      </button>
      <h1 className="phones__title phones__title--mb-40px">{upperPhoneId}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="details">
          <div className="details__small-photo-container">
            {phone?.images.map(image => (
              <div
                key={image}
                className={classNames('details__small-photo', {
                  selected: selectedPhoto === image,
                })}
                onClick={() => handleChangePhoto(image)}
                role="presentation"
              >
                <img
                  className="details__small-image"
                  src={image}
                  alt={image}
                />
              </div>
            ))}
          </div>
          <div className="details__big-photo-container">
            <div className="details__big-photo">
              <img
                className="details__big-image"
                src={selectedPhoto}
                alt={selectedPhoto}
              />
            </div>
          </div>
          <aside className="aside">
            {/* <ul className="aside__colors">
              <li className="aside__color aside__color"></li>
              <li className="aside__color"></li>
              <li className="aside__color"></li>
            </ul>
            <ul className="aside__capacity">
              <li></li>
            </ul> */}
            <div className="card__price aside__price">
              {phone?.priceDiscount ? (
                <>
                  <p className="card__hot-price">{`$${phone?.priceDiscount}`}</p>
                  <p className="card__full-price">{`$${phone?.priceRegular}`}</p>
                </>
              ) : (
                <p className="card__hot-price">{`$${phone?.priceRegular}`}</p>
              )}
            </div>
            <div className="card__info">
              <div className="card__button aside__button">
                <a className="card__link" href="/">Add to cart</a>
                <div className="card__icon" />
              </div>
              <div className="card__row">
                <p className="card__char-name">Screen</p>
                <p className="card__char-value">{phone?.screen}</p>
              </div>
              <div className="card__row">
                <p className="card__char-name">Capacity</p>
                <p className="card__char-value">{phone?.capacity}</p>
              </div>
              <div className="card__row">
                <p className="card__char-name">RAM</p>
                <p className="card__char-value">{phone?.ram}</p>
              </div>
            </div>
          </aside>
          <p className="details__phone-id">ID: 802390</p>
          {/* <section className="details__info">
            <ul className="details__about">
              <h2>About</h2>
              {phone?.description.map(paragrahp => (
                <div>
                  <h3>{paragrahp.title}</h3>
                  <div>{paragrahp.text}</div>
                </div>
              ))}
            </ul>
            <ul className="details__tech">
              <h2>T</h2>
            </ul>
          </section> */}
        </div>
      )}
    </div>
  );
};
