import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { ProductFullPage } from '../../helpers/ProductFullPage';
import { Product } from '../../helpers/Product';

import jsonProduct2 from '../../db-contacts.phones.json';

import './PhoneCriteria.scss';
import { ProductSlider } from '../ProductSlider';
import { BackButton } from '../BackButton/BackButton';
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs';

type Props = {
  products: Product[],
  onLikeClick: (product: Product) => void;
  likeProduct: Product[];
  addProduct: Product[];
  onAddtoChart: (product: Product) => void;
};

export interface ColorsType {
  [key: string]: string;
}

export const colors: ColorsType = {
  black: '#1F2020',
  coral: '#EE7762',
  gold: '#F9E5C9',
  green: '#AEE1CD',
  midnightgreen: '#004953',
  purple: '#e5ddea',
  red: '#BA0C2E',
  rosegold: '#E6C7C2',
  silver: '#e2e4e1',
  spacegray: '#535150',
  white: '#F8F7F2',
  yellow: '#F3D060',
};

export const PhoneCriteria: React.FC<Props> = ({
  products,
  onLikeClick,
  likeProduct,
  addProduct,
  onAddtoChart,
}) => {
  const [productsDetails] = useState<ProductFullPage[]>(() => {
    const storedProduct = localStorage.getItem('product2');

    return storedProduct ? JSON.parse(storedProduct) : jsonProduct2;
  });

  const { productId } = useParams();
  const navigate = useNavigate();

  const idProduct = products.find(pr => pr.phoneId === productId);

  const whatProductToShow = productsDetails.find(pr => pr.name === idProduct?.name);

  const selectPr = likeProduct.find(phone => phone.phoneId === whatProductToShow?.id);
  const addPr = addProduct.find(phone => phone.phoneId === whatProductToShow?.id);

  const handleLikeClick = () => {
    if (idProduct) {
      onLikeClick(idProduct);
    }
  };

  const handleAddClick = () => {
    if (idProduct) {
      onAddtoChart(idProduct);
    }
  };

  const [imgButton, setImgButton] = useState(whatProductToShow?.images[0]);
  const [colorButton, setColorButton] = useState(whatProductToShow?.color);
  const [capacityButton, setCapacityButton] = useState(whatProductToShow?.capacity);

  useEffect(() => {
    setImgButton(whatProductToShow?.images[0]);
  }, [whatProductToShow]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  const handleImgChange = (newImg: string) => {
    setImgButton(newImg);
  };

  const linkColor = (color: string) => {
    const URL = `/phones/${whatProductToShow?.namespaceId}-${whatProductToShow?.capacity}-${color}`.toLocaleLowerCase();

    navigate(URL);

    setColorButton(color);
  };

  const linkCapacity = (capacity: string) => {
    const URL = `/phones/${whatProductToShow?.namespaceId}-${capacity}-${whatProductToShow?.color}`.toLocaleLowerCase();

    navigate(URL);

    setCapacityButton(capacity);
  };

  return (
    <div className="phoneCriteria">
      <BreadCrumbs productName={whatProductToShow?.name} />
      <BackButton />

      <div className="phoneCriteria__name">{whatProductToShow?.name}</div>

      <div className="phoneCriteria__grid">
        <div className="phoneCriteria__containerImg">
          <div className="phoneCriteria__miniContainer">
            {whatProductToShow?.images.map(img => (
              <button
                className={
                  `phoneCriteria__mini ${img === imgButton ? 'phoneCriteria__mini--active' : ''}`
                }
                key={img}
                onClick={() => handleImgChange(img)}
              >
                <img
                  src={`https://mate-academy.github.io/react_phone-catalog/_new/${img}`}
                  alt="phone"
                  className="phoneCriteria__mini--img"
                />
              </button>
            ))}
          </div>

          <img
            src={`https://mate-academy.github.io/react_phone-catalog/_new/${imgButton}`}
            alt="mainImg"
            className="phoneCriteria__img"
          />
        </div>

        <div className="phoneCriteria__chooseOption">
          <div className="phoneCriteria__color phoneCriteria__chooseOption--container">
            <h2 className="phoneCriteria__chooseOption--header">Available colors</h2>

            <div className="phoneCriteria__color--colorsContainer">
              {whatProductToShow?.colorsAvailable.map((color, index) => (
                <button
                  className={`phoneCriteria__color--colors ${color === colorButton ? 'phoneCriteria__color--active' : ''}`}
                  style={{ backgroundColor: colors[color] }}
                  key={index}
                  onClick={() => linkColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="phoneCriteria__capacity phoneCriteria__chooseOption--container">
            <h2 className="phoneCriteria__chooseOption--header">Select capacity</h2>

            <div className="phoneCriteria__capacity--capacityContainer">
              {whatProductToShow?.capacityAvailable.map(cap => (
                <button
                  className={`phoneCriteria__capacity--gb ${cap === capacityButton ? 'phoneCriteria__capacity--active' : ''}`}
                  key={cap}
                  onClick={() => linkCapacity(cap)}
                >
                  {cap}
                </button>
              ))}
            </div>
          </div>

          <div className="phoneCriteria__cost">
            <div className="phoneCriteria__cost--discount">
              {`$${whatProductToShow?.priceDiscount}`}
            </div>

            <div className="phoneCriteria__cost--real">
              {`$${whatProductToShow?.priceRegular}`}
            </div>
          </div>

          <div className="phone__button">
            <button
              className={`phone__button--add ${addPr ? 'phone__button--add--active' : ''}`}
              onClick={() => handleAddClick()}
            >
              Add to cart
            </button>
            <button
              className={`phone__button--like ${selectPr ? 'phone__button--like--active' : ''}`}
              onClick={() => handleLikeClick()}
            />
          </div>

          <div className="phone__criteria">
            <div className="phone__criteria--container">
              <div
                className="
                  phone__criteria--big
                "
              >
                Screen
              </div>
              <div
                className="
                  phone__criteria--small
                "
              >
                {whatProductToShow?.screen}
              </div>
            </div>

            <div className="phone__criteria--container">
              <div
                className="
                phone__criteria--big
                "
              >
                Resolution
              </div>
              <div
                className="
                phone__criteria--small
                "
              >
                {whatProductToShow?.resolution}
              </div>
            </div>

            <div className="phone__criteria--container">
              <div
                className="
                phone__criteria--big
                "
              >
                Processor
              </div>
              <div
                className="
                phone__criteria--small
                "
              >
                {whatProductToShow?.processor}
              </div>
            </div>

            <div className="phone__criteria--container">
              <div
                className="
                  phone__criteria--big
                  "
              >
                Ram
              </div>
              <div
                className="
                  phone__criteria--small
                  "
              >
                {whatProductToShow?.ram}
              </div>
            </div>
          </div>
        </div>

        <div className="phoneCriteria__details">
          <div className="phoneCriteria__about">
            <h1 className="phoneCriteria__about--header">About</h1>
            <div className="phoneCriteria__about--container">
              {whatProductToShow?.description.map(article => (
                <article
                  key={article.title}
                  className="phoneCriteria__about--container--mini"
                >
                  <h3 className="phoneCriteria__about--title">
                    {article.title}
                  </h3>

                  {article.text.map(text => (
                    <p
                      className="phoneCriteria__about--text"
                      key={text}
                    >
                      {text}
                    </p>
                  ))}
                </article>
              ))}
            </div>
          </div>

          <div className="phoneCriteria__tech">
            <h1 className="phoneCriteria__about--header">Tech specs</h1>

            <div className="phone__criteria phoneCriteria__tech--criteria">
              <div className="phone__criteria--container">
                <div
                  className="
                  phone__criteria--big
                  "
                >
                  Screen
                </div>
                <div
                  className="
                  phone__criteria--small
                  "
                >
                  {whatProductToShow?.screen}
                </div>
              </div>

              <div className="phone__criteria--container">
                <div
                  className="
                  phone__criteria--big
                  "
                >
                  Resolution
                </div>
                <div
                  className="
                  phone__criteria--small
                  "
                >
                  {whatProductToShow?.resolution}
                </div>
              </div>

              <div className="phone__criteria--container">
                <div
                  className="
                  phone__criteria--big
                  "
                >
                  Processor
                </div>
                <div
                  className="
                  phone__criteria--small
                  "
                >
                  {whatProductToShow?.processor}
                </div>
              </div>

              <div className="phone__criteria--container">
                <div
                  className="
                  phone__criteria--big
                  "
                >
                  RAM
                </div>
                <div
                  className="
                  phone__criteria--small
                  "
                >
                  {whatProductToShow?.ram}
                </div>
              </div>

              <div className="phone__criteria--container">
                <div
                  className="
                  phone__criteria--big
                  "
                >
                  Built in memory
                </div>
                <div
                  className="
                  phone__criteria--small
                  "
                >
                  {whatProductToShow?.capacity}
                </div>
              </div>

              <div className="phone__criteria--container">
                <div
                  className="
                  phone__criteria--big
                  "
                >
                  Camera
                </div>
                <div
                  className="
                  phone__criteria--small
                  "
                >
                  {whatProductToShow?.camera}
                </div>
              </div>

              <div className="phone__criteria--container">
                <div
                  className="
                  phone__criteria--big
                  "
                >
                  Zoom
                </div>
                <div
                  className="
                  phone__criteria--small
                  "
                >
                  {whatProductToShow?.zoom}
                </div>
              </div>

              <div className="phone__criteria--container">
                <div
                  className="
                  phone__criteria--big
                  "
                >
                  Cell
                </div>
                <div
                  className="
                  phone__criteria--small
                  "
                >
                  {whatProductToShow?.cell}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductSlider
        products={products}
        filterBy="random"
        title="You may also like"
        onLikeClick={onLikeClick}
        likeProduct={likeProduct}
        addProduct={addProduct}
        onAddtoChart={onAddtoChart}
      />
    </div>
  );
};
