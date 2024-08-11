import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import tablets from '../../api/tablets.json';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import { themeClass } from '../../utils/themeClass';
import homeLight from '../../images/homeLight.svg';
import homeDark from '../../images/Home.svg';
import arrowLight from '../../images/arrow-rigth-light.svg';
import arrowDark from '../../images/arrow-right-dark.svg';
import classNames from 'classnames';
import products from '../../api/products.json';
import { CartContext } from '../CartProvider/CartProvider';
import { LikedContext } from '../LikedProvider/LikedProvider';
import LikedLight from '../../images/LikedLight.svg';
import LikedDark from '../../images/LikedDark.svg';
import LikedRed from '../../images/LikedRed.svg';
import { getRandomElements } from '../../utils/randomElements';
import { Product } from '../../types/Product';
import { ProductsList } from '../ProductsList/ProductsList';
import page404 from '../../images/page-not-found.png';
import { getColor } from '../../utils/getColor';

export const TabletsInfoPage = () => {
  const { light } = useContext(ThemeContext);
  const getClassName = themeClass(light);

  const { tabletId } = useParams();
  const tablet = tablets.find(a => a.id === tabletId);
  const navigate = useNavigate();

  const handleBackButtonClick = () => navigate(-1);

  const [currentPic, setCurrentPic] = useState(tablet?.images[0]);

  const getStyleSmallPic = (pic: string) => {
    if (pic === currentPic) {
      return { border: '2px solid lightgray' };
    }

    return;
  };

  const product = products.find(a => a.name === tablet?.name);
  const { liked, setLiked } = useContext(LikedContext);
  const [isLiked, setIsLiked] = useState(
    product ? liked.includes(product) : false,
  );
  const { cart, setCart } = useContext(CartContext);
  const [isInCart, setIsInCart] = useState(
    product ? cart.includes(product) : false,
  );

  const handleAddToCart = () => {
    if (product) {
      if (cart.includes(product)) {
        setCart(cart.filter(item => item !== product));
      } else {
        setCart([...cart, product]);
      }
    }
  };

  const handleLikedButtonClick = () => {
    if (product) {
      if (liked.includes(product)) {
        setLiked(liked.filter(item => item !== product));
      } else {
        setLiked([...liked, product]);
      }
    }
  };

  const MayAlsoLikeArray = getRandomElements<Product>(products, 20);

  useEffect(() => {
    setCurrentPic(tablet?.images[0]);
  }, [tabletId]);

  useEffect(() => {
    if (product) {
      setIsLiked(liked.includes(product));
    }
  }, [liked, product]);

  useEffect(() => {
    if (product) {
      setIsInCart(cart.includes(product));
    }
  }, [cart, product]);

  return (
    <main className={getClassName('product-info-page')}>
      {tablet ? (
        <>
          <div className={getClassName('nav-block')}>
            <Link to="/" className={getClassName('nav-block__home')}>
              <img src={light ? homeLight : homeDark} alt="Home page" />
            </Link>

            <img src={light ? arrowLight : arrowDark} alt="" />

            <Link to="/tablets" className={getClassName('nav-block__text')}>
              Tablets
            </Link>

            <img src={light ? arrowLight : arrowDark} alt="" />

            <p className={getClassName('nav-block__text')}>{tablet.name}</p>
          </div>

          <div
            onClick={handleBackButtonClick}
            className={getClassName('back-link')}
          >
            <img src={light ? arrowLight : arrowDark} alt="Back" />
            Back
          </div>

          <h1 className={getClassName('info-header')}>{tablet.name}</h1>

          <div className={getClassName('product-info-block')}>
            <div className={getClassName('product-info-block-pictures')}>
              {tablet.images.map(pic => (
                <div
                  className={getClassName('product-info-block-pictures-block')}
                  key={pic}
                  onClick={() => setCurrentPic(pic)}
                  style={getStyleSmallPic(pic)}
                >
                  <img src={pic} alt={tablet.name} />
                </div>
              ))}
            </div>

            <div className={getClassName('product-info-block-current-pic')}>
              <img src={currentPic} alt={tablet.name} />
            </div>

            <div className={getClassName('product-info-block-info')}>
              <div>
                <p
                  className={getClassName(
                    'product-info-block-info-storage-text',
                  )}
                >
                  Aviable colors
                </p>
                <div className={getClassName('product-info-block-info-colors')}>
                  {tablets
                    .filter(
                      a =>
                        a.namespaceId === tablet.namespaceId &&
                        a.capacity === tablet.capacity,
                    )
                    .map(tabletColor => (
                      <div
                        key={tabletColor.color}
                        style={{
                          backgroundColor: getColor(
                            tabletColor.color.toLowerCase(),
                          ),

                          borderColor:
                            tabletColor.color === tablet.color
                              ? light
                                ? 'black'
                                : 'white'
                              : '#89939a',
                        }}
                        onClick={() => navigate(`/tablets/${tabletColor.id}`)}
                      >
                        {''}
                      </div>
                    ))}
                </div>
              </div>

              <div className={getClassName('product-info-block-info-storage')}>
                <p
                  className={getClassName(
                    'product-info-block-info-storage-text',
                  )}
                >
                  Select capacity
                </p>

                {tablets
                  .filter(
                    a =>
                      a.namespaceId === tablet.namespaceId &&
                      a.color === tablet.color,
                  )
                  .map(a => (
                    <button
                      key={a.capacity}
                      className={getClassName(
                        classNames('product-info-block-info-storage-button', {
                          'current-storage': tablet.capacity === a.capacity,
                        }),
                      )}
                      onClick={() => navigate(`/tablets/${a.id}`)}
                    >
                      {a.capacity}
                    </button>
                  ))}
              </div>

              <div className={getClassName('product-info-block-info-pricebox')}>
                <p
                  className={getClassName(
                    'product-info-block-info-pricebox-price',
                  )}
                >
                  ${tablet.priceDiscount} <span>${tablet.priceRegular}</span>
                </p>
              </div>

              <div className="button">
                <button
                  className={getClassName(
                    classNames('button-add-cart', { added: isInCart }),
                  )}
                  onClick={handleAddToCart}
                >
                  {isInCart ? 'Added to cart' : 'Add to cart'}
                </button>

                <button
                  className={getClassName('button-add-liked')}
                  onClick={handleLikedButtonClick}
                >
                  {isLiked ? (
                    <img src={LikedRed} alt="Liked" />
                  ) : light ? (
                    <img src={LikedLight} alt="Liked" />
                  ) : (
                    <img src={LikedDark} alt="Liked" />
                  )}
                </button>
              </div>

              <div className={getClassName('product-info-block-info-specs')}>
                <div
                  className={getClassName('product-info-block-info-specs-box')}
                >
                  <p
                    className={getClassName(
                      'product-info-block-info-specs-box-name',
                    )}
                  >
                    Screen
                  </p>
                  <p
                    className={getClassName(
                      'product-info-block-info-specs-box-value',
                    )}
                  >
                    {tablet.screen}
                  </p>
                </div>
                <div
                  className={getClassName('product-info-block-info-specs-box')}
                >
                  <p
                    className={getClassName(
                      'product-info-block-info-specs-box-name',
                    )}
                  >
                    Resolution
                  </p>
                  <p
                    className={getClassName(
                      'product-info-block-info-specs-box-value',
                    )}
                  >
                    {tablet.resolution}
                  </p>
                </div>
                <div
                  className={getClassName('product-info-block-info-specs-box')}
                >
                  <p
                    className={getClassName(
                      'product-info-block-info-specs-box-name',
                    )}
                  >
                    Processor
                  </p>
                  <p
                    className={getClassName(
                      'product-info-block-info-specs-box-value',
                    )}
                  >
                    {tablet.processor}
                  </p>
                </div>
                <div
                  className={getClassName('product-info-block-info-specs-box')}
                >
                  <p
                    className={getClassName(
                      'product-info-block-info-specs-box-name',
                    )}
                  >
                    RAM
                  </p>
                  <p
                    className={getClassName(
                      'product-info-block-info-specs-box-value',
                    )}
                  >
                    {tablet.ram}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={getClassName('product-about-block')}>
            <div className={getClassName('product-about-block-description')}>
              <h1 className={getClassName('product-about-block-header')}>
                About
              </h1>
              {tablet.description.map(descriprion => (
                <div key={descriprion.title}>
                  <h2
                    className={getClassName(
                      'product-about-block-description-title',
                    )}
                  >
                    {descriprion.title}
                  </h2>

                  {descriprion.text.map(text => (
                    <p
                      key={text.length}
                      className={getClassName(
                        'product-about-block-description-text',
                      )}
                    >
                      {text}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <div className={getClassName('product-about-block-specs')}>
              <h1 className={getClassName('product-about-block-header')}>
                Tech specs
              </h1>
              <div className={getClassName('product-about-block-specs-box')}>
                <p
                  className={getClassName('product-about-block-specs-box-name')}
                >
                  Screen
                </p>
                <p
                  className={getClassName(
                    'product-about-block-specs-box-value',
                  )}
                >
                  {tablet.screen}
                </p>
              </div>
              <div className={getClassName('product-about-block-specs-box')}>
                <p
                  className={getClassName('product-about-block-specs-box-name')}
                >
                  Resolution
                </p>
                <p
                  className={getClassName(
                    'product-about-block-specs-box-value',
                  )}
                >
                  {tablet.resolution}
                </p>
              </div>
              <div className={getClassName('product-about-block-specs-box')}>
                <p
                  className={getClassName('product-about-block-specs-box-name')}
                >
                  Processor
                </p>
                <p
                  className={getClassName(
                    'product-about-block-specs-box-value',
                  )}
                >
                  {tablet.processor}
                </p>
              </div>
              <div className={getClassName('product-about-block-specs-box')}>
                <p
                  className={getClassName('product-about-block-specs-box-name')}
                >
                  RAM
                </p>
                <p
                  className={getClassName(
                    'product-about-block-specs-box-value',
                  )}
                >
                  {tablet.ram}
                </p>
              </div>
              <div className={getClassName('product-about-block-specs-box')}>
                <p
                  className={getClassName('product-about-block-specs-box-name')}
                >
                  Built in memory
                </p>
                <p
                  className={getClassName(
                    'product-about-block-specs-box-value',
                  )}
                >
                  {tablet.capacity}
                </p>
              </div>
              <div className={getClassName('product-about-block-specs-box')}>
                <p
                  className={getClassName('product-about-block-specs-box-name')}
                >
                  Camera
                </p>
                <p
                  className={getClassName(
                    'product-about-block-specs-box-value',
                  )}
                >
                  {tablet.camera}
                </p>
              </div>
              <div className={getClassName('product-about-block-specs-box')}>
                <p
                  className={getClassName('product-about-block-specs-box-name')}
                >
                  Zoom
                </p>
                <p
                  className={getClassName(
                    'product-about-block-specs-box-value',
                  )}
                >
                  {tablet.zoom}
                </p>
              </div>
              <div className={getClassName('product-about-block-specs-box')}>
                <p
                  className={getClassName('product-about-block-specs-box-name')}
                >
                  Cell
                </p>
                <p
                  className={getClassName(
                    'product-about-block-specs-box-value',
                  )}
                >
                  {tablet.cell.join(', ')}
                </p>
              </div>
            </div>
          </div>

          <ProductsList
            header="You may also like"
            productsToRender={MayAlsoLikeArray}
            isDiscount={true}
          />
        </>
      ) : (
        <>
          <h1 className={getClassName('NotFound-header')}>Not found!</h1>

          <img src={page404} alt="pageNotFound" className="NotFound-pic" />
        </>
      )}
    </main>
  );
};
