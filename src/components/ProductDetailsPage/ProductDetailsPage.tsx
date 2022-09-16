import React, { useState, useEffect, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { CardButtons } from '../CardButtons';
import { ProductsSlider } from '../ProductsSlider';
import { BackButton } from '../BackButton';

import { getProduct, getAllProducts } from '../../api/api';

import '../../styles/PageNav.scss';
import './ProductDetailsPage.scss';

export const ProductDetailsPage: React.FC = () => {
  const [bigImg, setBigImg] = useState<string | undefined>();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [foundProduct, setFoundProduct] = useState<Product | undefined>();
  const [product, setProduct] = useState<ProductDetails | undefined>();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[] | []>(
    [],
  );

  const setActive = (
    { isActive }: { isActive: boolean },
  ) => (isActive ? 'PageNav__link PageNav__link--isActive' : 'PageNav__link');

  const location = useLocation();

  const searchIdProduct = location.pathname.split('/');
  const idProduct = searchIdProduct[searchIdProduct.length - 1];
  const typeProduct = searchIdProduct[searchIdProduct.length - 2];

  const getSuggestedProducts = () => {
    const numberArr: number[] = [];

    do {
      const randomNumber = Math.floor(
        Math.random() * (allProducts.length - 1),
      ) + 1;

      numberArr.push(randomNumber);
    } while (numberArr.length < allProducts.length / 2);

    const uniqueRandomNumber = Array.from(new Set(numberArr));
    const randomProduct: Product[] = [];

    allProducts.forEach((elem: Product, index) => {
      if (uniqueRandomNumber.includes(index + 1)) {
        randomProduct.push(elem);
      }
    });

    setSuggestedProducts(randomProduct);
  };

  useEffect(() => {
    ((async () => {
      const productFromServer = await getProduct(idProduct);

      setProduct(productFromServer);

      const allProductsFromServer = await getAllProducts();

      setAllProducts(allProductsFromServer);
    }))();
  }, [idProduct]);

  useEffect(() => {
    const img = product?.images[0];

    setBigImg(img);
  }, [product]);

  useMemo(() => {
    const findProduct = allProducts
      .find((device: Product) => device.id === idProduct);

    setFoundProduct(findProduct);
    getSuggestedProducts();
  }, [allProducts]);

  const handlerChangeImg = (event: { target: { id: string } }) => {
    setBigImg(event.target.id);
  };

  const newPriceProduct = foundProduct?.discount !== 0 && (
    foundProduct?.discount !== undefined
  )
    ? foundProduct?.price - (
      (foundProduct?.price / 100) * foundProduct?.discount
    )
    : foundProduct?.price;

  return (
    <div className="ProductDetailsPage container">
      <div className="PageNav__nav">
        <NavLink className="PageNav__link" to="/">
          <i className="icon-Home PageNav__icon" />
        </NavLink>
        <i className="icon-Chevron-Arrow-Right PageNav__arrow" />
        <NavLink to={`/${typeProduct}`} className={setActive} end>{typeProduct}</NavLink>
        <i className="icon-Chevron-Arrow-Right PageNav__arrow" />
        <NavLink to={`/${typeProduct}/${idProduct}`} className={setActive}>{product?.name}</NavLink>
      </div>
      <BackButton />
      <h2 className="ProductDetailsPage__title">{product && product.name}</h2>
      <div className="ProductDetailsPage__preview">
        <div className="ProductDetailsPage__imgs">
          <div className="ProductDetailsPage__img-icons">
            {product?.images.map(foto => (
              <label
                htmlFor={foto}
                className={classNames(
                  'ProductDetailsPage__img-label',
                  {
                    'ProductDetailsPage__img-label--isActive': (
                      foto === bigImg
                    ),
                  },
                )}
                key={foto}
              >
                <img
                  className="ProductDetailsPage__img-icon"
                  src={foto}
                  alt={foto}
                />
                <input
                  className="ProductDetailsPage__img-radio"
                  type="radio"
                  id={foto}
                  name="img-preview"
                  onChange={handlerChangeImg}
                />
              </label>
            ))}
          </div>
          <div className="ProductDetailsPage__img-view">
            <img src={bigImg} alt={bigImg} />
          </div>
        </div>
        <div className="ProductDetailsPage__addToCart">
          <div className="ProductDetailsPage__availableColors">
            <span>Available colors</span>
            <div className="ProductDetailsPage__productColors">
              <label
                htmlFor="gold-color"
                className={classNames(
                  'ProductDetailsPage__colorLabel',
                  'ProductDetailsPage__colorLabel--isGold',
                  { 'ProductDetailsPage__colorLabel--isActive': true },
                )}
              >
                <input
                  className="ProductDetailsPage__colorRadio"
                  type="radio"
                  id="gold-color"
                  name="color"
                />
              </label>
              <label
                htmlFor="black-color"
                className="ProductDetailsPage__colorLabel
              ProductDetailsPage__colorLabel--isBlack"
              >
                <input
                  className="ProductDetailsPage__colorRadio"
                  type="radio"
                  id="black-color"
                  name="color"
                />
              </label>
              <label
                htmlFor="white-color"
                className="ProductDetailsPage__colorLabel
                  ProductDetailsPage__colorLabel--isWhite"
              >
                <input
                  className="ProductDetailsPage__colorRadio"
                  type="radio"
                  id="white-color"
                  name="color"
                />
              </label>
            </div>
          </div>
          <div className="ProductDetailsPage__selectCapacity">
            <span>Select capacity</span>
            <div className="ProductDetailsPage__memorySize">
              <label
                htmlFor="64"
                className="
                  ProductDetailsPage__memoryLabel
                  ProductDetailsPage__memoryLabel--isActive
                "
              >
                64 GB
                <input type="radio" id="64" name="memory" />
              </label>
              <label htmlFor="256" className="ProductDetailsPage__memoryLabel">
                256 GB
                <input type="radio" id="256" name="memory" />
              </label>
              <label htmlFor="512" className="ProductDetailsPage__memoryLabel">
                512 GB
                <input type="radio" id="512" name="memory" />
              </label>
            </div>
          </div>
          <div className="ProductDetailsPage__price">
            <div className="ProductDetailsPage__newPrice">
              $
              {newPriceProduct}
            </div>
            {foundProduct?.discount !== 0 && (
              <div className="ProductDetailsPage__oldPrice">
                $
                {foundProduct?.price}
              </div>
            )}
          </div>
          <div className="ProductDetailsPage__buttons">
            <CardButtons product={foundProduct} size="big" />
          </div>
          <div className="ProductDetailsPage__techSpecs">
            <div className="ProductDetailsPage__previewSpecsItem">
              <span
                className="ProductDetailsPage__item--isSecondary"
              >
                Screen
              </span>
              <span>{product?.display.screenSize}</span>
            </div>
            <div className="ProductDetailsPage__previewSpecsItem">
              <span
                className="ProductDetailsPage__item--isSecondary"
              >
                Resolution
              </span>
              <span>{product?.display.screenResolution}</span>
            </div>
            <div className="ProductDetailsPage__previewSpecsItem">
              <span
                className="ProductDetailsPage__item--isSecondary"
              >
                Processor
              </span>
              <span>{product?.hardware.cpu}</span>
            </div>
            <div className="ProductDetailsPage__previewSpecsItem">
              <span className="ProductDetailsPage__item--isSecondary">RAM</span>
              <span>{product?.storage.ram}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="ProductDetailsPage__content">
        <div className="ProductDetailsPage__about">
          <h3 className="ProductDetailsPage__subTitle">About</h3>
          <p
            className="ProductDetailsPage__aboutDescription"
          >
            {product?.description}
          </p>
        </div>
        <div className="ProductDetailsPage__techSpecsBlock">
          <h3 className="ProductDetailsPage__subTitle">Tech specs</h3>
          <div className="ProductDetailsPage__techSpecsItems">
            <div className="ProductDetailsPage__techSpecsItem">
              <span
                className="ProductDetailsPage__item--isSecondary"
              >
                Screen
              </span>
              <span>{product?.display.screenSize}</span>
            </div>
            <div className="ProductDetailsPage__techSpecsItem">
              <span
                className="ProductDetailsPage__item--isSecondary"
              >
                Resolution
              </span>
              <span>{product?.display.screenResolution}</span>
            </div>
            <div className="ProductDetailsPage__techSpecsItem">
              <span
                className="ProductDetailsPage__item--isSecondary"
              >
                Processor
              </span>
              <span>{product?.hardware.cpu}</span>
            </div>
            <div className="ProductDetailsPage__techSpecsItem">
              <span className="ProductDetailsPage__item--isSecondary">RAM</span>
              <span>{product?.storage.ram}</span>
            </div>
            <div className="ProductDetailsPage__techSpecsItem">
              <span
                className="ProductDetailsPage__item--isSecondary"
              >
                Built in memory
              </span>
              <span>{product?.storage.flash}</span>
            </div>
            <div className="ProductDetailsPage__techSpecsItem">
              <span
                className="ProductDetailsPage__item--isSecondary"
              >
                Camera
              </span>
              <span>{product?.camera.primary}</span>
            </div>
            <div className="ProductDetailsPage__techSpecsItem">
              <span
                className="ProductDetailsPage__item--isSecondary"
              >
                Weight
              </span>
              <span>{product?.sizeAndWeight.weight}</span>
            </div>
          </div>
        </div>
      </div>
      <ProductsSlider products={suggestedProducts} title="You may also like" />
    </div>
  );
};
