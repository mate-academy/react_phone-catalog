import './productDetailsPage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ProductDetailsType } from '../../types/ProductDetailsType';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Products } from '../../types/Products';
// eslint-disable-next-line max-len
import { CategoryContext } from '../../components/ContextProviders/ContextProviders';
// eslint-disable-next-line max-len
import { AddToCartButton } from '../../components/AddToCartButton/AddToCartButton';
import { FavoriteButton } from '../../components/FavoriteButton';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
// eslint-disable-next-line max-len
import { fetchProductDetails } from '../../features/productDetails/productDetailsSlice';
import { SliderSwiper } from '../../components/SliderSwiper/SliderSwiper';
import { fetchProducts } from '../../features/products/productsSlice';
import { Loader } from '../../components/Loader/Loader';
import { Footer } from '../../components/Footer/Footer';
import { NotFound } from '../../components/NotFound/NotFound';
import { BackButton } from '../../components/BackButton';
import { unusualColor } from '../../utils/productDetailsMethods';

type Params = {
  itemId: string;
};

export const ProductDetailsPage: React.FC = () => {
  const [productDetails, setProductDetails] = useState<ProductDetailsType>();
  const [bigImageLink, setBigImageLink] = useState<string | undefined>(
    productDetails?.images[0],
  );
  const [similarProducts, setSimilarProducts] = useState<Products[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [productToCart, setProductToCart] = useState<Products>();
  const { itemId = '*' } = useParams<Params>();
  const { categoryType } = useContext(CategoryContext);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { productsDetails, status } = useAppSelector(
    state => state.productDetails,
  );
  const { products } = useAppSelector(state => state.products);

  const productTypeName = itemId.split('-').slice(0, 3).join('-');

  const getProduct = () => {
    if (!itemId || !categoryType) {
      return;
    }

    const currentProductDetails = productsDetails.find(
      item => item.id === itemId,
    );

    if (currentProductDetails) {
      setProductDetails(currentProductDetails);
      setBigImageLink(`${currentProductDetails.images[0]}`);
      setSelectedColor(currentProductDetails.color);
      setSelectedCapacity(currentProductDetails.capacity);
    }
  };

  const loadProductsDetailsData = (product: string) => {
    dispatch(fetchProductDetails(product));
  };

  const loadProductsData = (data: string) => {
    dispatch(fetchProducts(data));
  };

  const handleImageChange = (item: string) => {
    setBigImageLink(`${item}`);

    return `${item}`;
  };

  const handleColorChange = (color: string) => {
    const idArray = itemId.split('-');

    idArray.pop();
    idArray.push(color);

    const updatedProductId = idArray?.join('-');

    setSelectedColor(color);

    const updatedProductDetails = productsDetails.find(
      product => product.id === updatedProductId,
    );

    setProductDetails(updatedProductDetails);

    return navigate(`/${categoryType}/${updatedProductId}`);
  };

  const handleCapacityChange = (capacity: string) => {
    const splitId = itemId.split('-');

    splitId[splitId.length - 2] = capacity.toLowerCase();

    const updatedProductId = splitId.join('-');

    setSelectedCapacity(capacity);

    const updatedProductDetails = productsDetails.find(
      product => product.id === updatedProductId,
    );

    setProductDetails(updatedProductDetails);

    return navigate(`/${categoryType}/${updatedProductId}`);
  };

  const findSimilarProducts = () => {
    const dataSimilarModels = products.filter(product => {
      const productId = product.itemId.split('-');
      const firstThreeWords = productId.slice(0, 3);
      const newString = firstThreeWords.join('-');

      return newString === productTypeName;
    });

    setSimilarProducts(dataSimilarModels);
  };

  const getDataForCart = () => {
    const currentProductForCart = products.find(
      product => product.itemId === itemId,
    );

    if (currentProductForCart) {
      setProductToCart(currentProductForCart);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    if (status === 'idle') {
      loadProductsData('products');
      findSimilarProducts();
    }
  }, [dispatch, status]);

  useEffect(() => {
    scrollToTop();
    findSimilarProducts();
  }, []);

  useEffect(() => {
    getDataForCart();
  }, [itemId]);

  useEffect(() => {
    loadProductsDetailsData(categoryType);
  }, [itemId, categoryType]);

  useEffect(() => {
    getProduct();
    findSimilarProducts();
  }, [productsDetails, categoryType]);

  return (
    <>
      {status === 'failed' && <NotFound />}
      {status === 'loading' ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            <Breadcrumbs />
            <BackButton />
            <section className="productDetails">
              <h1 className="productDetails__title">{productDetails?.name}</h1>
              <div className="productDetails__mainDetails">
                <div className="grid">
                  <div
                    className="productDetails__mainDetales__imageSidebar
                    grid__item
                    grid__item--1-4
                    grid__item--tablet-1-2
                    grid__item--desktop-1-2"
                  >
                    {productDetails?.images.map(item => (
                      <button
                        type="button"
                        key={item}
                        className="
                      productDetails__mainDetales__smallImageContainer"
                        onClick={() => handleImageChange(item)}
                      >
                        <img
                          src={`${item}`}
                          alt="product small"
                          className="productDetails__mainDetales__smallImage"
                        />
                      </button>
                    ))}
                  </div>

                  <div
                    className="productDetails__mainDetales__mainImageContiner
                    grid__item
                    grid__item--1-4
                    grid__item--tablet-3-6
                    grid__item--desktop-4-11"
                  >
                    <img
                      className="productDetails__mainDetales__mainImage"
                      src={bigImageLink || `${productDetails?.images[0]}`}
                      alt="Main big"
                    />
                  </div>

                  <div
                    className="productDetails__mainDetales__options
                    grid__item
                    grid__item--1-4
                    grid__item--tablet-8-12
                    grid__item--desktop-14-20"
                  >
                    <div className="productDetails__mainDetales__colors">
                      <div
                        className="
                    productDetails__mainDetales__colors__titleID"
                      >
                        <p
                          className="
                        productDetails__mainDetales__colors__title"
                        >
                          Available colors
                        </p>
                        <p
                          className="
                      productDetails__mainDetales__productID
                      productDetails__mainDetales__productID--notPhone
                      "
                        >
                          {`ID: ${productDetails?.namespaceId}`}
                        </p>
                      </div>

                      <div
                        className="
                        productDetails__mainDetales__colors__container"
                      >
                        {productDetails?.colorsAvailable.map(color => (
                          <button
                            onClick={() => handleColorChange(color)}
                            type="button"
                            key={color}
                            className={classNames(
                              'productDetails__mainDetales__icon',
                              {
                                'productDetails__mainDetales__icon--active':
                                  selectedColor === color,
                              },
                            )}
                            aria-label="Change color"
                          >
                            <div
                              className="
                        productDetails__mainDetales__colors__circle
                        "
                              style={{
                                backgroundColor: unusualColor(color),
                              }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="productDetails__mainDetales__capacity">
                      <p
                        className="
                      productDetails__mainDetales__capacity__title
                      "
                      >
                        Select capacity
                      </p>

                      <div
                        className="
                      productDetails__mainDetales__itemContainer"
                      >
                        {productDetails?.capacityAvailable.map(capacity => (
                          <button
                            onClick={() => handleCapacityChange(capacity)}
                            type="button"
                            className={classNames(
                              'productDetails__capaciItem',
                              {
                                'productDetails__capaciItem--active':
                                  selectedCapacity === capacity,
                              },
                            )}
                            key={capacity}
                          >
                            {capacity}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="productDetails__mainDetales__buyBlock">
                      <div className="productDetails__mainDetales__price">
                        <h2
                          className="
                        productDetails__mainDetales__price__full
                        "
                        >
                          {`$${productDetails?.priceDiscount}`}
                        </h2>
                        <h2
                          className="
                          productDetails__mainDetales__price__discont"
                        >
                          {`$${productDetails?.priceRegular}`}
                        </h2>
                      </div>
                    </div>

                    <div className="productDetails__mainDetales__btnContainer">
                      {productToCart && (
                        <AddToCartButton cardData={productToCart} />
                      )}
                      {productToCart && (
                        <FavoriteButton
                          cardData={productToCart}
                          style={{ width: '48px', height: '48px' }}
                        />
                      )}
                    </div>
                    <div
                      className="
                    productDetails__mainDetales__characteristics"
                    >
                      <div className="productDetails__mainDetales__items">
                        <div className="productDetails__mainDetales__item">
                          Screen
                        </div>
                        <div className="productDetails__mainDetales__item">
                          Resolution
                        </div>
                        <div className="productDetails__mainDetales__item">
                          Processor
                        </div>
                        <div className="productDetails__mainDetales__item">
                          RAM
                        </div>
                      </div>

                      <div className="productDetails__mainDetales__values">
                        <div className="productDetails__mainDetales__value">
                          {productDetails?.screen}
                        </div>
                        <div className="productDetails__mainDetales__value">
                          {productDetails?.resolution}
                        </div>
                        <div className="productDetails__mainDetales__value">
                          {productDetails?.processor}
                        </div>
                        <div className="productDetails__mainDetales__value">
                          {productDetails?.ram}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="productDetails__mainDetales__productID
                  productDetails__mainDetales__productID--phone
                  grid__item
                  grid__item--3-4
                  grid__item--tablet-11-12
                  grid__item--desktop-23-24
                  "
                  >
                    {`ID: ${productDetails?.namespaceId}`}
                  </div>

                  <div
                    className="productDetails__additionalDetails__about
                  grid__item
                  grid__item--1-4
                  grid__item--tablet-1-12
                  grid__item--desktop-1-12"
                  >
                    <h1 className="productDetails__additionalDetails__title">
                      About
                    </h1>
                    {productDetails?.description.map(item => (
                      <div
                        className="productDetails__additionalDetails__block"
                        key={item.title}
                      >
                        <h2
                          className="
                      productDetails__additionalDetails__paragraphName
                      "
                        >
                          {item.title}
                        </h2>
                        <p
                          className="
                          productDetails__additionalDetails__paragraph"
                        >
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div
                    className="productDetails__additionalDetails__specs
                  grid__item
                  grid__item--1-4
                  grid__item--tablet-1-12
                  grid__item--desktop-14-24"
                  >
                    <h1
                      className="
                      productDetails__additionalDetails__specs__title"
                    >
                      Tech specs
                    </h1>
                    <div
                      className="
                    productDetails__additionalDetails__specs__tech"
                    >
                      <div
                        className="
                      productDetails__additionalDetails__specs__items
                      "
                      >
                        <div
                          className="
                        productDetails__additionalDetails__specs__item
                        "
                        >
                          Screen
                        </div>
                        <div
                          className="
                        productDetails__additionalDetails__specs__item
                        "
                        >
                          Resolution
                        </div>
                        <div
                          className="
                        productDetails__additionalDetails__specs__item
                        "
                        >
                          Processor
                        </div>
                        <div
                          className="
                        productDetails__additionalDetails__specs__item
                        "
                        >
                          RAM
                        </div>
                        <div
                          className="
                        productDetails__additionalDetails__specs__item
                        "
                        >
                          Built in memory
                        </div>
                        <div
                          className="
                        productDetails__additionalDetails__specs__item
                        "
                        >
                          Camera
                        </div>
                        <div
                          className="
                        productDetails__additionalDetails__specs__item
                        "
                        >
                          Zoom
                        </div>
                        <div
                          className="
                        productDetails__additionalDetails__specs__item
                        "
                        >
                          Cell
                        </div>
                      </div>

                      <div
                        className="
                      productDetails__additionalDetails__specs__values
                      "
                      >
                        <div
                          className="
                      productDetails__additionalDetails__specs__value
                      "
                        >
                          {productDetails?.screen}
                        </div>
                        <div
                          className="
                      productDetails__additionalDetails__specs__value
                      "
                        >
                          {productDetails?.resolution}
                        </div>
                        <div
                          className="
                      productDetails__additionalDetails__specs__value
                      "
                        >
                          {productDetails?.processor}
                        </div>
                        <div
                          className="
                      productDetails__additionalDetails__specs__value
                      "
                        >
                          {productDetails?.ram}
                        </div>
                        <div
                          className="
                      productDetails__additionalDetails__specs__value
                      "
                        >
                          {productDetails?.capacity}
                        </div>
                        <div
                          className="
                      productDetails__additionalDetails__specs__value
                      "
                        >
                          {productDetails?.camera}
                        </div>
                        <div
                          className="
                      productDetails__additionalDetails__specs__value
                      "
                        >
                          {productDetails?.zoom}
                        </div>
                        <div
                          className="
                      productDetails__additionalDetails__specs__value
                      "
                        >
                          {productDetails?.cell.join(', ')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <SliderSwiper
              title="You may also like"
              productsData={similarProducts}
            />
          </div>

          <Footer />
        </>
      )}
    </>
  );
};
