import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PhoneType } from '../../types/PhoneType';
import './Details.scss';
import { HotPrices } from '../Home page/components/HotPrices/HotPrices';
import { Grid } from 'react-loader-spinner';
import { Data } from './components/Data/Data';
import { Info } from './components/Info/Info';
import { BASE_URL } from '../../utils/vars';

export const ProductDetailsPage: React.FC = () => {
  const { productType } = useParams<{ productType: string }>();
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<PhoneType | undefined>(undefined);
  const [activeImage, setActiveImage] = useState(0);
  const [choosedColor, setChoosedColor] = useState<string | undefined>('');
  const [choosedCapacity, setChoosedCapacity] = useState<string | undefined>(
    '',
  );
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BASE_URL}/api/${productType}.json`);
      const data: PhoneType[] = await response.json();

      const localData = data
        .map((item: PhoneType) => ({
          ...item,
          itemId: item.id.toString(),
        }))
        .find((item: PhoneType) => item.id === productId);

      setProduct(localData);
      setChoosedColor(localData?.colorsAvailable[0]);
      setChoosedCapacity(localData?.capacityAvailable[0]);
    };

    setIsLoading(true);
    setTimeout(() => {
      fetchData();
      setIsLoading(false);
    }, 1000);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [productId]);

  return (
    <section className="details container">
      {isLoading ? (
        <div className="loader">
          <Grid
            visible={true}
            height="50"
            width="50"
            color="#000"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass="grid-wrapper"
          />
        </div>
      ) : (
        <>
          <div className="details__history">
            <Link to="/" className="product__link">
              <img src="img/links/home.svg" alt="home" />
            </Link>
            <img
              src="img/links/chevron (arrow right).svg"
              alt="chevron_right"
            />
            <Link
              to={`/product/${product?.category}`}
              className="product__link"
            >
              {product &&
                product?.category.charAt(0).toUpperCase() +
                  product?.category.slice(1)}
            </Link>
            <img
              src="img/links/chevron (arrow right).svg"
              alt="chevron_right"
            />
            <Link to={`/product/${product?.id}`} className="product__link">
              {product?.name}
            </Link>
          </div>

          <div className="details__back">
            <img
              src="img/slider/svg/chevron (arrow left).svg"
              alt="chevron_left"
            />
            <span onClick={handleGoBack} className="details__link">
              Back
            </span>
          </div>

          <h1 className="details__title">{product?.name}</h1>

          <Data
            product={product}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
            choosedColor={choosedColor}
            setChoosedColor={setChoosedColor}
            choosedCapacity={choosedCapacity}
            setChoosedCapacity={setChoosedCapacity}
          />

          <Info product={product} />
          <HotPrices title={'You may also like'} />
        </>
      )}
    </section>
  );
};
