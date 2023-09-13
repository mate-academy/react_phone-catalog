import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetailsPage.scss';
import {
  BackButton,
  BreadCrumbs,
  ProductsSlider,
  Wrapper,
} from '../../components';
import { getProductById } from '../../api/products';
import { ButtonType, Phone } from '../../types';
import { ProductImage } from './components/ProductImage';
import { Colors } from './components/Colors';
import { AvailableCapacity } from './components/AvailableCapacity';
import { Button } from '../../bits';
import { useProducts } from '../../context';
import { Like } from '../../bits/Like';
import { Loader } from '../../components/Loader/Loader';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const {
    products,
    setFavourites,
    favourites,
    cart,
    setToCart,
  } = useProducts();
  const [phone, setPhone] = useState<Phone | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (productId) {
      setIsLoading(true);

      getProductById(productId)
        .then(setPhone)
        .finally(() => setIsLoading(false));
    }
  }, [productId]);

  const handleLike = () => {
    if (phone) {
      const isProductInFavourites = favourites
        .some((favProduct) => favProduct.itemId === phone.id);

      if (isProductInFavourites) {
        const newFavs = favourites
          .filter((favProduct) => favProduct.itemId !== phone.id);

        setFavourites(newFavs);
      } else {
        const product = products.filter(prod => prod.itemId === phone.id);

        setFavourites([...favourites, ...product]);
      }
    }
  };

  const isProductInCart = cart.some(item => item.itemId === phone?.id);

  const addToCart = () => {
    if (isProductInCart) {
      const deleteItems = cart.filter(item => item.itemId !== phone?.id);

      setToCart(deleteItems);
    } else {
      const item = products.filter(i => i.itemId === phone?.id);

      setToCart([...cart, ...item]);
    }
  };

  return (
    <>
      {isLoading && (<Loader />)}
      {phone && (
        <div className="product-details">
          <Wrapper>
            <div className="product-details__path-container">
              <BreadCrumbs />
            </div>

            <div className="product-details__back-container">
              <BackButton />
            </div>

            <h1
              className="product-details__title"
            >
              {phone?.name}
            </h1>

            <div className="product-details__upper-block">
              <ProductImage images={phone?.images} />

              <div className="product-details__upper-right">

                <Colors
                  colors={phone?.colorsAvailable}
                  nameSpaceId={phone?.namespaceId}
                  capacity={phone?.capacity}
                  currColor={phone?.color}
                />

                <AvailableCapacity
                  capacities={phone?.capacityAvailable}
                  currCapacity={phone?.capacity}
                  nameSpaceId={phone?.namespaceId}
                  color={phone?.color}
                />

                <div className="product-details__price-block">
                  <p className="product-details__price-discount">{`$${phone?.priceDiscount}`}</p>
                  <p className="product-details__price-regular">{`$${phone?.priceRegular}`}</p>
                </div>

                <div className="product-details__btns-block">
                  <Button
                    size={ButtonType.large}
                    id={phone.id}
                    handler={addToCart}
                    disabled={isProductInCart}
                  />

                  <Like
                    size="large"
                    handler={handleLike}
                    id={phone.id}
                  />
                </div>

                <div className="product-details__specs">
                  <p>Screen</p>
                  <p className="product-card__specs--right">{phone?.screen}</p>
                  <p>Resolution</p>
                  <p
                    className="product-card__specs--right"
                  >
                    {phone?.resolution}
                  </p>
                  <p>Proccessor</p>
                  <p
                    className="product-card__specs--right"
                  >
                    {phone?.processor}
                  </p>
                  <p>RAM</p>
                  <p className="product-card__specs--right">{phone?.ram}</p>
                </div>
              </div>
            </div>

            <div className="product-details__lower-block">
              <div className="product-details__about">

                <h2 className="product-details__about-heading">about</h2>

                <h3
                  className="product-details__about-title"
                >
                  {phone?.description[0].title}
                </h3>

                <p
                  className="product-details__about-text"
                >
                  {phone?.description[0].text}
                </p>

                <h3
                  className="product-details__about-title"
                >
                  {phone?.description[1].title}
                </h3>

                <p
                  className="product-details__about-text"
                >
                  {phone?.description[1].text}
                </p>

                <h3
                  className="product-details__about-title"
                >
                  {phone?.description[2].title}
                </h3>

                <p
                  className="product-details__about-text"
                >
                  {phone?.description[2].text}
                </p>
              </div>

              <div>
                <h2 className="product-details__about-heading">tech specs</h2>

                <div className="product-details__tech-specs">
                  <p>Screen</p>
                  <p className="product-card__specs--right">{phone?.screen}</p>
                  <p>Resolution</p>
                  <p
                    className="product-card__specs--right"
                  >
                    {phone?.resolution}
                  </p>
                  <p>Proccessor</p>
                  <p
                    className="product-card__specs--right"
                  >
                    {phone?.processor}
                  </p>
                  <p>RAM</p>
                  <p className="product-card__specs--right">{phone?.ram}</p>
                  <p>Built in memory</p>
                  <p
                    className="product-card__specs--right"
                  >
                    {phone?.capacity}
                  </p>
                  <p>Camera</p>
                  <p className="product-card__specs--right">{phone?.camera}</p>
                  <p>Zoom</p>
                  <p className="product-card__specs--right">{phone?.zoom}</p>
                  <p>Cell</p>
                  <p className="product-card__specs--right">
                    {phone?.cell.join(', ')}
                  </p>
                </div>
              </div>
            </div>

            <div className="product-details__also-like-container">
              <ProductsSlider
                title="you may also like"
                products={products}
              />
            </div>
          </Wrapper>
        </div>
      )}
    </>
  );
};
