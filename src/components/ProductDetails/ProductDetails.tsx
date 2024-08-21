/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import { Link, useParams, useSearchParams } from 'react-router-dom';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

import productsFromServer from '../../api/products.json';
import phonesFromServer from '../../api/phones.json';
import tabletsFromServer from '../../api/tablets.json';
import accessoriesFromServer from '../../api/accessories.json';

import './ProductDetails.scss';
import { useContext, useState } from 'react';
import { Desktop } from '../../utils/DesktopContext';
import { Tablet } from '../../utils/TabletContext';
import classNames from 'classnames';
import { Colors } from '../../utils/Colors';

type Props = {
  category: 'phones' | 'tablets' | 'accessories';
};

export const ProductDetails: React.FC<Props> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { itemId } = useParams();

  const onDesktop = useContext(Desktop);
  const onTablet = useContext(Tablet);

  const checkedItemId = itemId ? itemId : ' ';

  const findProductById = () => {
    switch (category) {
      case 'phones':
        return (
          phonesFromServer.find(phone => phone.namespaceId === checkedItemId) ||
          phonesFromServer[0]
        );

      case 'tablets':
        return (
          tabletsFromServer.find(
            tablet => tablet.namespaceId === checkedItemId,
          ) || tabletsFromServer[0]
        );

      case 'accessories':
        return (
          accessoriesFromServer.find(
            access => access.namespaceId === checkedItemId,
          ) || accessoriesFromServer[0]
        );

      default:
        return phonesFromServer[0];
    }
  };

  const { color, namespaceId } = findProductById();

  const colorByParams = searchParams.get('color') || color;

  const [choosenColor, setChoosenColor] = useState(colorByParams);

  const findProductByColor = () => {
    switch (category) {
      case 'phones':
        return (
          phonesFromServer.find(
            phone =>
              phone.namespaceId === namespaceId &&
              phone.color === colorByParams,
          ) || phonesFromServer[0]
        );

      case 'tablets':
        return (
          tabletsFromServer.find(
            tablet =>
              tablet.namespaceId === namespaceId &&
              tablet.color === colorByParams,
          ) || tabletsFromServer[0]
        );

      case 'accessories':
        return (
          accessoriesFromServer.find(
            access =>
              access.namespaceId === namespaceId &&
              access.color === colorByParams,
          ) || accessoriesFromServer[0]
        );

      default:
        return phonesFromServer[0];
    }
  };

  const { colorsAvailable, images, name } = findProductByColor();

  const [choosenImage, setChoosenImage] = useState(0);

  let checkedName = name;

  if (name.length > 21) {
    checkedName = name.slice(0, 21);
    checkedName += '...';
  }

  const handleSetColor = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchParams({ color: event.currentTarget.value });
    setChoosenColor(event.currentTarget.value);
  };

  function isValidColorKey(key: string): key is keyof typeof Colors {
    return key in Colors;
  }

  return (
    <>
      <Header />
      {!findProductById() ? (
        <div className="not-found__box">
          <img src="./img/product-not-found.png" className="not-found__image" />
          <h2 className="not-found__title">Product not found</h2>
        </div>
      ) : (
        <main className="product-details-main">
          <div className="navigation">
            <Link to="/" className="navigation__home" />
            <img src=".\img\arrow-next-disabled.svg" alt="next page" />
            <Link to={`/${category}`} className="navigation__category-page">
              {category}
            </Link>
            <img src=".\img\arrow-next-disabled.svg" alt="next page" />
            <p className="navigation__current-page">
              {onDesktop || onTablet ? name : checkedName}
            </p>
          </div>
          <Link
            to={`/${category}`}
            className="product-details-main__return-button"
          >
            <img src="./img/arrow-prev.svg" alt="return" />
            <span>Back</span>
          </Link>
          <div className="product-details-main__details-content">
            <h2 className="product-details-main__title">{name}</h2>
            <img
              src={images[choosenImage] || images[0]}
              alt="product image"
              className="product-details-main__product-image"
            />
            <div className="image-select">
              <form className="image-select__form">
                {images.map((image, index) => (
                  <label
                    key={index}
                    htmlFor={`image${index + 1}`}
                    className={classNames('image-select__label', {
                      'image-select__label--active': choosenImage === index,
                    })}
                  >
                    <input
                      id={`image${index + 1}`}
                      type="radio"
                      name="selectedImage"
                      className="image-select__image-radio"
                      value={image}
                      onChange={() => setChoosenImage(index)}
                    />
                    <img
                      src={image}
                      alt="product image"
                      className="image-select__label-image"
                    />
                  </label>
                ))}
              </form>
            </div>
            <div className="color-select">
              <div className="color-select__title-and-id">
                <p className="color-select__aviable-color">Aviable colors</p>
                <p className="color-select__id">
                  ID:{' '}
                  {
                    productsFromServer.find(
                      product => product.itemId === findProductByColor().id,
                    )?.id
                  }
                </p>
              </div>
              <form className="color-select__form">
                {colorsAvailable.map((colorForChoose, index) => {
                  let validedColor = colorForChoose;

                  if (validedColor.includes(' ')) {
                    validedColor = colorForChoose.replace(' ', '');
                  }

                  return (
                    <label
                      key={index}
                      htmlFor={colorForChoose}
                      className={classNames('color-select__label', {
                        'color-select__label--active':
                          choosenColor === colorForChoose,
                      })}
                    >
                      <input
                        id={colorForChoose}
                        type="radio"
                        name="selectedColor"
                        className="color-select__color-radio"
                        value={colorForChoose}
                        onChange={handleSetColor}
                      />
                      <div
                        className="color-select__color"
                        style={{
                          background: isValidColorKey(validedColor)
                            ? Colors[validedColor]
                            : undefined,
                        }}
                      />
                    </label>
                  );
                })}
              </form>
            </div>
          </div>
        </main>
      )}
      <Footer />
    </>
  );
};
