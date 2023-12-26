import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../styles/ProductDetailsPage.scss';
import { ProductDetails } from '../types/ProductDetails';
import { getProductDetails } from '../services/getProducts';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { ButtonBack } from '../components/ButtonBack/ButtonBack';
import { ProductsSlider } from '../components/ProductsSlider/ProductsSlider';
import { ProductGalery } from '../components/ProductGalery/ProductGalery';
import { ColorSelector } from '../components/ColorSelector/ColorSelector';
import { Capacity } from '../components/Capasity/Capasity';
import { Buttons } from '../components/ButtonsAddLike/Buttons';
import { StorContext } from '../context/StorContext';
import { Product } from '../types/Product';

const findProductById = (itemId = '', products: Product[]) => {
  return products.find((product) => product.itemId === itemId);
};

export const ProductDetailsPage = () => {
  const [productDet, setProductDet] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {
    product, favorites, inCart, isSelectedProduct,
  } = useContext(StorContext);
  const { productId = '' } = useParams();
  const { pathname } = useLocation();
  const itemProduct = findProductById(productDet?.id, product);
  const isProduct = !!productDet && !!itemProduct;

  let isSelectedFav = false;
  let isSelectedInCart = false;

  if (isProduct) {
    isSelectedFav = isSelectedProduct(itemProduct?.itemId || '', favorites);
    isSelectedInCart = isSelectedProduct(itemProduct?.itemId || '', inCart);
  }

  const random = product.sort(() => Math.random() - 0.5);

  useEffect(() => {
    setLoading(true);

    getProductDetails(productId)
      .then((prod) => setProductDet(prod))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [productId]);

  let techSpecs = { keys: [''], values: [''] };
  let charProd = { keys: [''], values: [''] };

  if (productDet) {
    charProd = {
      keys: ['screen', 'resolution', 'processor', 'RAM'],
      values: [
        `${productDet.screen}`,
        `${productDet.resolution}`,
        `${productDet.processor}`,
        `${productDet.ram}`,
      ],
    };

    techSpecs = {
      keys: [
        'screen',
        'resolution',
        'processor',
        'RAM',
        'camera',
        'zoom',
        'cell',
      ],
      values: [
        `${productDet.screen}`,
        `${productDet.resolution}`,
        `${productDet.processor}`,
        `${productDet.ram}`,
        `${productDet.camera}`,
        `${productDet.zoom}`,
        `${productDet.cell}`,
      ],
    };
  }

  return (
    <>
      <div className="product-details">
        <div className="product-details__top">
          <Breadcrumbs />
          <ButtonBack />
        </div>

        {!error && !loading && isProduct && (
          <>
            <div className="product-details__title ">{productDet.name}</div>

            <div className="product-details__look-container">
              <div className="product-details__galery">
                <ProductGalery image={productDet.images} />
              </div>

              <div className="product-details__menu-container">
                <div className="product-details__choice">
                  <p className="product-details__text">
                    Available colors
                  </p>
                  <div className="product-details__choice-list">
                    <ColorSelector product={productDet} pathname={pathname} />
                  </div>
                </div>

                <div className="product-details__choice">
                  <p className="product-details__text">
                    Select capacity
                  </p>
                  <div className="product-details__choice-list">
                    <Capacity product={productDet} pathname={pathname} />
                  </div>
                </div>

                <div className="product-details__prices">
                  <span className="product-details__price">
                    {`$${productDet.priceDiscount}`}
                  </span>
                  <span className="
                    product-details__price
                    product-details__price--old
                  "
                  >
                    {`$${productDet.priceRegular}`}
                  </span>
                </div>

                <div className="product-details__buttons">
                  <Buttons
                    isSelectedFav={isSelectedFav}
                    isSelectedInCart={isSelectedInCart}
                    product={itemProduct}
                  />
                </div>

                <div className="product-details__character">
                  <ul className="product-details__list">
                    {charProd.keys.map((key) => (
                      <li key={key} className="product-details__character-name">
                        {key}
                      </li>
                    ))}
                  </ul>

                  <ul className="product-details__list">
                    {charProd.values.map((value) => (
                      <li
                        key={value}
                        className="product-details__character-value"
                      >
                        {value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="product-details__descript-container">
              <div
                className="product-details__description"
                data-cy="productDescription"
              >
                <h2 className="product-details__name">About</h2>

                <div className="product-details__info">
                  {productDet.description.map((el) => (
                    <div className="product-details__info-box" key={el.title}>
                      <h3 className="product-details__info-title">
                        {el.title}
                      </h3>
                      <p className="product-details__info-text">{el.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="product-details__character-specs">
                <h2 className="product-details__name">Tech specs</h2>
                <div className="product-details__character">
                  <ul className="product-details__list">
                    {techSpecs.keys.map((key) => (
                      <li
                        key={key}
                        className="product-details__character-name"
                      >
                        {key}
                      </li>
                    ))}
                  </ul>

                  <ul className="product-details__list">
                    {techSpecs.values.map((value) => (
                      <li
                        key={value}
                        className="product-details__character-value"
                      >
                        {value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="product-details__slider">
              <ProductsSlider product={random} title="You may also like" />
            </div>
          </>
        )}
      </div>
    </>
  );
};
