import classNames from 'classnames';
import {
  FC,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import { Notification } from '../../Components/Notification/Notification';
import { HistoryBack } from '../../Components/History/HistoryBack';
import { History } from '../../Components/History/HistoryNav';
import { Loader } from '../../Components/Loader/Loader';
import { NoResult } from '../../Components/NoResult/NoResult';
import { Product, ProductDetails } from '../../helpers/types/Product';
import {
  getProductById,
  getProductDetails,
  getSuggestedProducts,
} from '../../helpers/utils/API';
import './DetailsPage.scss';
import { ProductsSlider } from '../../Components/ProductsSlider/ProductsSlider';
/* eslint-disable-next-line */
import { getLinkForProductCard } from '../../helpers/utils/getLinkForProductCard';
/* eslint-disable-next-line */
import { ProductCardInfo } from '../../Components/ProductCardInfo/ProductCardInfo';

type Props = {
  type: string,
  favoriteProducts: Product[],
  setFavorite: (item: Product | null) => void,
  selectedProducts: Product[],
  setSelectedProducts: (item: Product | null) => void,
};

export const DetailsPage: FC<Props> = ({
  type,
  setSelectedProducts,
  selectedProducts,
  favoriteProducts,
  setFavorite,
}) => {
  const { idProduct } = useParams();
  const [
    productDetails,
    setProductDetails,
  ] = useState<ProductDetails | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);
  const [activeURLImg, setActiveURLImg] = useState('');
  const [selectedColor, setSelectedColor] = useState('blond');
  const [selectedCapacity, setSelectedCapacity] = useState(64);
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  const discountPrice = useMemo(() => {
    if (!product) {
      return 0;
    }

    return product.price - (product.price * product.discount) / 100;
  }, [product]);

  const fetchDetails = async () => {
    try {
      setIsLoad(true);
      setIsError(false);
      const detailsFromAPI = await getProductDetails(idProduct);
      const productByIdFromAPI = await getProductById(idProduct);
      const randomFromApi = await getSuggestedProducts();

      setProductDetails(detailsFromAPI);
      setProduct(productByIdFromAPI);
      setActiveURLImg(detailsFromAPI.images[0]);
      setRandomProducts(randomFromApi);
    } catch {
      setIsError(true);
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (isLoad) {
    return <Loader />;
  }

  if (isError) {
    return <Notification message="Can not load details" />;
  }

  if (!productDetails) {
    return <NoResult message="Details" />;
  }

  return (
    <div className="details">
      <History pages={[type, productDetails.id]} />
      <HistoryBack />
      <h1 className="details__title">{productDetails.name}</h1>
      <div className="details__content">
        <div className="images details__images">
          <div className="images__blockButtons">
            {productDetails.images.map(image => (
              <button
                key={image}
                type="button"
                className={classNames(
                  'images__button',
                  { 'images__button--active': image === activeURLImg },
                )}
                onClick={() => setActiveURLImg(image)}
              >
                <img
                  className="images__imgSmall"
                  src={`/${image}`}
                  alt="product"
                />
              </button>
            ))}
          </div>
          <div className="images__blockImg">
            <img
              src={`/${activeURLImg}`}
              className="details__imgBig"
              alt="product"
            />
          </div>
        </div>
        <div className="details__actions">
          <div>
            <div className="colors">
              <p className="colors__title">Available colors</p>

              <div className="colors__buttons">
                {['blond', 'camel', 'grey', 'light'].map(color => (
                  <button
                    key={color}
                    type="button"
                    className={classNames(
                      'colors__button',
                      { 'colors__button--active': selectedColor === color },
                    )}
                    onClick={() => setSelectedColor(color)}
                  >
                    <div className={`colors__background colors__background--${color}`} />
                  </button>
                ))}
              </div>
            </div>
            <div className="capacity">
              <p className="capacity__title">Select capacity</p>
              <div className="capacity__buttons">
                {[64, 256, 512].map(ram => (
                  <button
                    key={ram}
                    type="button"
                    className={classNames(
                      'capacity__button',
                      { 'capacity__button--active': selectedCapacity === ram },
                    )}
                    onClick={() => setSelectedCapacity(ram)}
                  >
                    {`${ram} GB`}
                  </button>
                ))}
              </div>
            </div>
            <div className="prise">
              {product?.discount ? (
                <>
                  <p className="prise__new">{`$${discountPrice}`}</p>
                  <p className="prise__old">{`$${product?.price}`}</p>
                </>
              ) : (
                <p className="prise__new">{`$${product?.price}`}</p>
              )}
            </div>
            <div className="buttons">
              <button
                type="button"
                className={classNames(
                  'buttonAdd buttons__addCart',
                  {
                    'buttonAdd--active': selectedProducts.some(item => (
                      item.id === productDetails.id
                    )),
                  },
                )}
                onClick={() => setSelectedProducts(product || null)}
              >
                Add to cart
              </button>
              {/* eslint-disable-next-line */}
              <button
                type="button"
                className={classNames(
                  'icon icon--heart buttons__like',
                  {
                    'icon--redHeart': favoriteProducts.some(item => (
                      item.id === productDetails.id
                    )),
                  },
                )}
                onClick={() => setFavorite(product || null)}
              />
            </div>
            <div className="info">
              <div className="info__block info__block--small">
                <p className="info__title">ram</p>
                <p className="info__description">
                  {productDetails.storage.ram}
                </p>
              </div>
              <div className="info__block">
                <p className="info__title">Display</p>
                <p className="info__description">
                  {productDetails.display.screenResolution}
                </p>
              </div>
              <div className="info__block">
                <p className="info__title">USB</p>
                <p className="info__description">
                  {productDetails.hardware.usb}
                </p>
              </div>
            </div>
          </div>
          <p className="details__idText">{`ID ${productDetails.id}`}</p>
        </div>
        <div className="details__description" data-cy="productDescription">
          <h2 className="details__descriptionTitle">About</h2>
          <hr className="details__line" />
          <p className="details__info">{productDetails.description}</p>
        </div>
        <div className="details__descriptionInfo">
          <h2 className="details__descriptionTitle">Tech specs</h2>
          <hr className="details__line" />
          <div className="info">
            <div className="info__block">
              <p className="info__title">RAM</p>
              <p className="info__description">{productDetails.storage.ram}</p>
            </div>
            <div className="info__block">
              <p className="info__title">Display</p>
              <p className="info__description">
                {productDetails.display.screenResolution}
              </p>
            </div>
            <div className="info__block">
              <p className="info__title">USB</p>
              <p className="info__description">{productDetails.hardware.usb}</p>
            </div>
            <div className="info__block">
              <p className="info__title">Battery</p>
              <p className="info__description">{productDetails.battery.type}</p>
            </div>
          </div>
        </div>
      </div>

      <ProductsSlider title="You may also like">
        {randomProducts.map(item => (
          <Link
            to={`/${getLinkForProductCard(item.type)}/${item.id}`}
            className="productCard"
            key={item.id}
          >
            <ProductCardInfo
              setSelectedProducts={setSelectedProducts}
              selectedProducts={selectedProducts}
              favoriteProducts={favoriteProducts}
              product={item}
              setFavorite={setFavorite}
            />
          </Link>
        ))}
      </ProductsSlider>
    </div>
  );
};
