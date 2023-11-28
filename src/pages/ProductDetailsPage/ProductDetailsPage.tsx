import './productDetailsPage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FavoritesImg from '../../images/icons/Favourites (Heart Like).svg';
import { getData, getProductDetails } from '../../api/data';
import { ProductDetailsType } from '../../types/ProductDetailsType';
import { Phones } from '../../types/Phones';
import { ProductsSlider } from '../../components/ProductsSlider';

type Params = {
  phonesId: string;
};

export const ProductDetailsPage = () => {
  const [productDetails, setProductDetails] = useState<ProductDetailsType>();
  const [bigImageLink, setBigImageLink]
    = useState<string | undefined>(productDetails?.images[0]);
  const [similarProducts, setSimilarProducts] = useState<Phones[]>([]);
  // const [colorOfProduct, setColorOfProduct]
  //   = useState<string | undefined>(productDetails?.color);
  // const [productColorsLink, setProductColorsLink] = useState<string>();
  const { phonesId = '*' } = useParams<Params>();
  const navigate = useNavigate();

  const productTypeName = phonesId.split('-').slice(0, 3).join('-');

  // const defaultPhonesId = '*';
  // const actualPhonesId = phonesId !== undefined ? phonesId : defaultPhonesId;

  const getDetails = async () => {
    if (!phonesId) {
      return;
    }

    const details = await getProductDetails(phonesId);

    setProductDetails(details);
    setBigImageLink(`_new/${details.images[0]}`);
  };

  const handleImageChange = (item: string) => {
    setBigImageLink(`_new/${item}`);

    return `_new/${item}`;
  };

  const getNewColorProduct = (color: string) => {
    const idArray = phonesId.split('-');

    idArray.pop();
    idArray.push(color);

    const updatedPhonesId = idArray?.join('-');

    return navigate(`/phones/${updatedPhonesId}`);
  };

  const getSimilarProducts = async () => {
    try {
      // setIsPhonesDataLoading(true);
      const dataProducts = await getData();

      const dataSimilarModels
        = dataProducts.filter(product => {
          const productPhoneId = product.phoneId.split('-');
          const firstThreeWords = productPhoneId.slice(0, 3);
          const newString = firstThreeWords.join('-');

          return newString === productTypeName;
        });

      setSimilarProducts(dataSimilarModels);
    } catch (error) {
      Error('Error');
      // setIsPhonesDataLoading(false);
    } finally {
      // setIsPhonesDataLoading(false);
    }
  };

  // const handleColorChange = (color: string) => {
  //   if (!phonesId) {
  //     return;
  //   }

  //   // if (!colorOfProduct) {
  //   //   return;
  //   // }

  //   // setColorOfProduct(color);

  //   const idArray = phonesId.split('-');

  //   idArray.pop();
  //   idArray.push(color);

  //   const updatedPhonesId = idArray?.join('-');

  //   // setProductColorsLink(updatedPhonesId);
  // };

  useEffect(() => {
    getDetails();
  }, [phonesId]);

  useEffect(() => {
    getSimilarProducts();
  }, []);

  // useEffect(() => {
  //   handleColorChange();
  // }, [colorOfProduct]);

  return (
    <>
      <section className="productDetails">
        <h1 className="productDetails__title">
          {productDetails?.name}
        </h1>
        <div
          className="productDetails__mainDetails"
        >
          <div className="grid">
            <div
              className="productDetails__mainDetales__productID
              grid__item--desktop-23-24"
            >
              {`ID: ${productDetails?.namespaceId}`}
            </div>
            <div
              className="productDetails__mainDetales
              productDetails__mainDetales__imagesContainer
              grid__item--desktop-1-12"
            >
              <div
                className="productDetails__mainDetales__imageSidebar
                grid__item--desktop-1-2"
              >
                {productDetails?.images.map(item => (
                  <button
                    type="button"
                    key={item}
                    className="productDetails__mainDetales__smallImageContainer"
                    onClick={() => handleImageChange(item)}
                  >
                    <img
                      src={`_new/${item}`}
                      alt="product small"
                      className="productDetails__mainDetales__smallImage"
                    />
                  </button>

                ))}
              </div>

              <div
                className="productDetails__mainDetales__mainImageContiner
                grid__item--desktop-4-11"
              >
                <img
                  className="productDetails__mainDetales__mainImage"
                  src={bigImageLink || `_new/${productDetails?.images[0]}`}
                  alt="Main big"
                />
              </div>
            </div>

            <div
              className="productDetails__mainDetales__options
              grid__item--desktop-14-20"
            >
              <div
                className="productDetails__mainDetales__colors"
              >
                <p
                  className="productDetails__mainDetales__colors__title"
                >
                  Available colors
                </p>
                <div
                  className="productDetails__mainDetales__colors__container"
                >
                  {productDetails?.colorsAvailable.map(color => (
                    // colors Link

                    <button
                      onClick={() => getNewColorProduct(color)}
                      type="button"
                      key={color}
                      className="productDetails__mainDetales__colors__icon"
                    >
                      <div
                        className="
                        productDetails__mainDetales__colors__circle
                        "
                        style={{
                          backgroundColor: color,
                        }}
                      />
                    </button>

                  ))}
                </div>
              </div>

              <div className="productDetails__mainDetales__capacity">
                <p
                  className="productDetails__mainDetales__capacity__title"
                >
                  Select capacity
                </p>

                <div
                  className="productDetails__mainDetales__itemContainer"
                >
                  {productDetails?.capacityAvailable.map(item => (
                    <div
                      className="productDetails__mainDetales__capacity__item"
                      key={item}
                    >
                      {item}
                    </div>
                  ))}
                </div>

              </div>

              <div
                className="productDetails__mainDetales__buyBlock"
              >
                <div
                  className="productDetails__mainDetales__price"
                >
                  <h2
                    className="productDetails__mainDetales__price__full"
                  >
                    {`$${productDetails?.priceRegular}`}
                  </h2>
                  <h2
                    className="productDetails__mainDetales__price__discont"
                  >
                    {`$${productDetails?.priceDiscount}`}
                  </h2>
                </div>
              </div>

              <div
                className="productDetails__mainDetales__btnContainer"
              >
                <button
                  type="button"
                  className="productDetails__mainDetales__btn"
                >
                  Add to cart
                </button>

                <div
                  className="productDetails__mainDetales__favoritesBtn"
                >
                  <img
                    src={FavoritesImg}
                    alt="favorites hearth"
                    className="productDetails__mainDetales__favoritesImg"
                  />
                </div>
              </div>

              <div
                className="productDetails__mainDetales__characteristics"
              >
                <div
                  className="productDetails__mainDetales__items"
                >
                  <div
                    className="productDetails__mainDetales__item"
                  >
                    Screen
                  </div>
                  <div
                    className="productDetails__mainDetales__item"
                  >
                    Resolution
                  </div>
                  <div
                    className="productDetails__mainDetales__item"
                  >
                    Processor
                  </div>
                  <div
                    className="productDetails__mainDetales__item"
                  >
                    RAM
                  </div>
                </div>

                <div
                  className="productDetails__mainDetales__values"
                >
                  <div
                    className="productDetails__mainDetales__value"
                  >
                    {productDetails?.screen}
                  </div>
                  <div
                    className="productDetails__mainDetales__value"
                  >
                    {productDetails?.resolution}
                  </div>
                  <div
                    className="productDetails__mainDetales__value"
                  >
                    {productDetails?.processor}
                  </div>
                  <div
                    className="productDetails__mainDetales__value"
                  >
                    {productDetails?.ram}
                  </div>
                </div>
              </div>

            </div>

            {/* <div className='productDetails__additionalDetails grid__item--desktop-1-20'> */}
            <div
              className="productDetails__additionalDetails__about
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
                    className="productDetails__additionalDetails__paragraphName"
                  >
                    {item.title}
                  </h2>
                  <p
                    className="productDetails__additionalDetails__paragraph"
                  >
                    {item.text}
                  </p>
                </div>
              ))}

            </div>

            <div
              className="productDetails__additionalDetails__specs
            grid__item--desktop-14-24"
            >
              <h1 className="productDetails__additionalDetails__specs__title">
                Tech specs
              </h1>
              <div className="productDetails__additionalDetails__specs__tech">
                <div
                  className="productDetails__additionalDetails__specs__items"
                >
                  <div
                    className="productDetails__additionalDetails__specs__item"
                  >
                    Screen
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__item"
                  >
                    Resolution
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__item"
                  >
                    Processor
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__item"
                  >
                    RAM
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__item"
                  >
                    Built in memory
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__item"
                  >
                    Camera
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__item"
                  >
                    Zoom
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__item"
                  >
                    Cell
                  </div>
                </div>

                <div
                  className="productDetails__additionalDetails__specs__values"
                >
                  <div
                    className="productDetails__additionalDetails__specs__value"
                  >
                    {productDetails?.screen}
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__value"
                  >
                    {productDetails?.resolution}
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__value"
                  >
                    {productDetails?.processor}
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__value"
                  >
                    {productDetails?.ram}
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__value"
                  >
                    {productDetails?.capacity}
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__value"
                  >
                    {productDetails?.camera}
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__value"
                  >
                    {productDetails?.zoom}
                  </div>
                  <div
                    className="productDetails__additionalDetails__specs__value"
                  >
                    {productDetails?.cell.join(', ')}
                  </div>
                </div>
              </div>

            </div>
            {/*
            </div> */}

          </div>

        </div>
      </section>

      <ProductsSlider
        title="You may also like"
        productsData={similarProducts}
      />
    </>

  );
};
