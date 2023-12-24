import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPhoneData<PhoneDetail>(`/${phoneId}.json`);

        setPhone(data);
        setIsLoading(false);
      } catch (error) {
        throw new Error();
      }
    };

    fetchData();
  }, [setPhone, phoneId]);

  // console.log(phone);

  return (
    <div className="phones">
      <div className="path">
        <img src={homeImage} alt="home_icon" />
        <img src={arrowRight} alt="arrow_right" />
        <h3 className="phones__prev-name">Phones</h3>
        <img src={arrowRight} alt="arrow_right" />
        <h3>{upperPhoneId}</h3>
      </div>
      <button type="button" className="left-back" onClick={() => navigate(-1)}>
        <img src={arrowLeft} alt="arrow_right" />
        <p>Back</p>
      </button>
      <h1 className="phones__title">{upperPhoneId}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="details">
          <div className="details__small-photo-container">
            {phone?.images.map(image => (
              <div key={phone.id} className="details__small-photo">
                <img className="details__small-image" src={image} alt={image} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
