/* eslint-disable max-len */
import { useNavigate, useParams } from 'react-router-dom';
import './style.scss';
import { useEffect, useState } from 'react';
import { getData, getPhoneDetails, randomizeData } from '../../api/dataOfProducts';
import { PhoneDetails } from '../../types/phoneDetails';
import { Loader } from '../../components/Loader';
import { CurrentPhone } from '../../components/CurrentPhone';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Phone } from '../../types/phone';
import { goToTop } from '../../helpers/goToTop';

export const ProductDetailsPage = () => {
  const { phoneId = '' } = useParams();
  const [phoneDetails, setPhoneDetails] = useState<PhoneDetails>();
  const [phoneData, setPhoneData] = useState<Phone[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const loadPhonDetails = async () => {
    try {
      setIsLoader(true);
      const dataFromServer = await getPhoneDetails(phoneId);
      const phoneFromServer = await getData();
      const randomSortedPhones = randomizeData(phoneFromServer);

      setPhoneDetails(dataFromServer);
      setPhoneData(randomSortedPhones);
    } catch {
      setErrorMessage('Phone was not found');

      setTimeout(() => {
        navigate('..');
      }, 3500);
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    if (!phoneId) {
      return;
    }

    const timer = setTimeout(() => {
      goToTop();
    }, 300);

    loadPhonDetails();

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timer);
  }, [phoneId]);

  return (
    <>
      {isLoader && <Loader />}
      {phoneDetails && !errorMessage && (
        <>
          <CurrentPhone
            phoneDetails={phoneDetails}
            phoneData={phoneData}
            phoneId={phoneId}
          />
          <ProductsSlider
            title="You may also like"
            items={phoneData}
          />
        </>
      )}

      {(errorMessage) && (
        <h1>{`${errorMessage}`}</h1>
      )}
    </>
  );
};
