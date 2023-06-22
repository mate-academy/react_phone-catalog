import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MainNavigation } from '../../components/MainNavigation/MainNavigation';
import './PhoneDetails.scss';

import { Phone } from '../../types/Phone';
import { PhoneSlider } from '../../components/PhoneSlider/PhoneSlider';
import { getPhonesDetails } from '../../helpers/fetchPhones';
import { ProductDetails } from '../../types/PhoneDetails';
import { Colors } from '../../components/Colors/Colors';
import { Capacity } from '../../components/Capacity/Capacity';
import { Loader } from '../../components/Loader/Loader';
import { CartItem } from '../../types/CartItem';
import { BackButton } from '../../components/BackButton/BackButton';
import { FavouritesButton } from
  '../../components/FavouritesButton/FavouritesButton';
import { CartButton } from '../../components/CartButton/CartButton';

const findProductById = (itemId = '', products: Phone[]) => {
  return products.find((product) => product.itemId === itemId);
};

type Props = {
  phones: Phone[],
  likedProducts: Phone[],
  setLikedProducts: React.Dispatch<React.SetStateAction<Phone[]>>,
  cartProducts: CartItem[],
  setCartProducts: React.Dispatch<React.SetStateAction<CartItem[]>>,
};

export const PhoneDetails: React.FC<Props> = ({
  phones,
  likedProducts,
  setLikedProducts,
  cartProducts,
  setCartProducts,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [mainImg, setMainImg] = useState<string | null>(null);
  const { productId = '' } = useParams();

  const loadProduct = async () => {
    try {
      setIsLoading(true);

      const data = await getPhonesDetails(productId);

      setProduct(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const itemProduct = findProductById(product?.id, phones);
  const isProduct = !!product && !!itemProduct;

  useEffect(() => {
    if (product?.images) {
      setMainImg(product.images[0]);
    }
  }, [product?.images]);

  const onClickHandle = (img: string) => {
    setMainImg(img);
  };

  if (!mainImg) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  const shuffleArray = (array: Phone[]) => {
    const shuffledArray = [...array];

    // eslint-disable-next-line no-plusplus
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      [shuffledArray[i], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex], shuffledArray[i],
      ];
    }

    return shuffledArray;
  };

  const mixedPhones = shuffleArray([...phones]);
  const foundPhone = phones.find((phone) => phone.phoneId === product?.id);

  return (
    <div className="phones-details">
      <MainNavigation />

      {!isLoading && isProduct && (
        <>
          <div className="phones-details__content">
            <BackButton />

            <h1 className="phones-details__title">
              {product.name}
            </h1>

            <div className="phones-details__top">
              <div className="phones-details__photos photos">
                <div className="photos__sidebar">
                  {product.images.map(image => (
                    <button
                      type="button"
                      className="photos__sidebar--wrapper"
                      onClick={() => onClickHandle(image)}
                    >
                      <img src={`new/${image}`} alt="phone" className="photos__sidebar--item" />
                    </button>
                  ))}
                </div>

                <div className="photos__main">
                  <img src={`new/${mainImg}`} alt="mainPhoto" className="photos__main-photo" />
                </div>
              </div>

              <div className="phones-details__rightbar">
                <div className="phones-details__colours colours">
                  <p className="colours__text">Available colors</p>

                  <Colors
                    product={product.namespaceId}
                    capacity={product.capacity}
                    colours={product.colorsAvailable}
                    currColor={product.color}
                  />
                </div>

                <div className="phones-details__capacity capacity">
                  <p className="colours__text">Select capacity</p>

                  <Capacity
                    product={product.namespaceId}
                    colour={product.color}
                    capacities={product.capacityAvailable}
                    currCapacity={product.capacity}
                  />
                </div>

                <div className="phones-details__price">
                  <h2 className="phones-details__price--cur">
                    {`$${product.priceDiscount}`}
                  </h2>

                  <p className="phones-details__price--prev">
                    {`$${product.priceRegular}`}
                  </p>
                </div>

                <div className="phones-details__buttons">
                  <CartButton
                    cartProducts={cartProducts}
                    setCartProducts={setCartProducts}
                    phone={foundPhone}
                  />

                  <FavouritesButton
                    likedProducts={likedProducts}
                    setLikedProducts={setLikedProducts}
                    phone={foundPhone}
                  />
                </div>

                <div className="phones-details__description description">
                  <div className="description--names">
                    Screen
                    <br />
                    Resolution
                    <br />
                    Processor
                    <br />
                    RAM
                  </div>
                  <div className="description--data">
                    {`${product.screen} `}
                    <br />
                    {`${product.resolution} `}
                    <br />
                    {`${product.processor} `}
                    <br />
                    {`${product.ram} `}
                  </div>
                </div>
              </div>
            </div>

            <div className="phones-details__info info">
              <div className="info__content">
                <div className="info__about" data-cy="productDescription">
                  <h1 className="info__title">
                    About
                  </h1>

                  {product.description.map(desc => (
                    <>
                      <h3 className="info__about--subtitle" key={desc.title}>
                        {desc.title}
                      </h3>

                      <p className="info__about--information" key={desc.text}>
                        {desc.text}
                      </p>
                    </>
                  ))}
                </div>

                <div className="info__specs">
                  <h1 className="info__title">
                    Tech specs
                  </h1>

                  <div className="info__specs--right">
                    <div className="info__specs--names">
                      <p className="info__text">
                        Screen
                      </p>
                      <p className="info__text">
                        Resolution
                      </p>
                      <p className="info__text">
                        Processor
                      </p>
                      <p className="info__text">
                        RAM
                      </p>
                      <p className="info__text">
                        Camera
                      </p>
                      <p className="info__text">
                        Zoom
                      </p>
                      <p className="info__text">
                        Cell
                      </p>
                    </div>

                    <div className="info__specs--data">
                      <p className="info__text">
                        {product.screen}
                      </p>
                      <p className="info__text">
                        {product.resolution}
                      </p>
                      <p className="info__text">
                        {product.processor}
                      </p>
                      <p className="info__text">
                        {product.ram}
                      </p>
                      <p className="info__text">
                        {product.camera}
                      </p>
                      <p className="info__text">
                        {product.zoom}
                      </p>
                      <p className="info__text">
                        {product.cell.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PhoneSlider
            phones={phones}
            title="You may also like"
            products={mixedPhones}
            likedProducts={likedProducts}
            setLikedProducts={setLikedProducts}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
          />
        </>
      )}
    </div>
  );
};
