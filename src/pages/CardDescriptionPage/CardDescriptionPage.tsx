import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Phone } from '../../types/PhoneType';
import { Tablet } from '../../types/TabletType';
import { Accessories } from '../../types/AccessoriesType';
import { Category } from '../../types/CategoryEnum';
import { getAccessories, getPhones, getProducts, getTablets } from '../../api';
import { Product } from '../../types/ProductsType';
import { UserHints } from '../../components/UserHints';
import { Loader } from '../../components/Loader';
import { CardSlider } from '../../components/CardSlider';
// eslint-disable-next-line max-len
import { ProductCard } from '../../components/CardDescriptionComponents/ProductCard';
// eslint-disable-next-line max-len
import { AboutProduct } from '../../components/CardDescriptionComponents/AboutProduct';
// eslint-disable-next-line max-len
import { TechSpecs } from '../../components/CardDescriptionComponents/TechSpecs';

export const CardDescription = () => {
  const [device, setDevice] = useState<Phone | Tablet | Accessories | null>();
  const [activedPhoto, setActivedPhoto] = useState<string>('');
  const [asd, setAsd] = useState<Product[]>([]);

  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const params = useParams();
  const { itemId, category } = params;

  useEffect(() => {
    setLoader(true);
    setErrorMessage('');

    const fetchDevice = async () => {
      if (!category) {
        return;
      }

      try {
        const fetchFunctions = {
          [Category.phones.toLowerCase()]: getPhones,
          [Category.tablets.toLowerCase()]: getTablets,
          [Category.accessories.toLowerCase()]: getAccessories,
        };

        const fetchFunction = fetchFunctions[category];

        if (fetchFunction) {
          const devices = await fetchFunction();
          const foundDevice = devices.find(
            (loadedDevice: Phone | Tablet | Accessories) =>
              loadedDevice.id === itemId,
          );

          if (foundDevice) {
            setDevice(foundDevice);
            setActivedPhoto(foundDevice.images?.[0] || '');
          }
        }
      } catch (err) {
        setErrorMessage('Ошибка загрузки данных!');
        throw new Error((err as Error).message || 'An unknown error occurred');
      } finally {
        setLoader(false);
      }
    };

    fetchDevice();
  }, [itemId, category]);

  useEffect(() => {
    getProducts().then(pr => setAsd(pr));
  }, []);

  return (
    <>
      <div className="card-description">
        <UserHints deviceName={device?.name} />
        {loader ? (
          <Loader />
        ) : errorMessage ? (
          errorMessage
        ) : (
          <div className="card-description__content">
            <ProductCard
              device={device}
              activedPhoto={activedPhoto}
              category={category}
              setDevice={setDevice}
              setActivedPhoto={setActivedPhoto}
            />

            <AboutProduct device={device} />

            <TechSpecs device={device} />

            <div className="card-description__slider-container">
              <CardSlider cardTitle={'You may also like'} productCards={asd} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
