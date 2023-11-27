/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import {
  useState,
  useEffect,
  useContext,
} from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ThreeCircles } from 'react-loader-spinner';
import cn from 'classnames';
import { ICONS } from '../icons';
import { getProducts } from '../utils/fetchClient';
import { ProductDetailsType } from '../types/ProductDetailsType';
import { GlobalContext } from '../Context/GlobalContext';
import { Product } from '../types/Product';
import { YouMayLike } from '../components/YouMayLike/YouMayLike';
import { ColorsHex } from '../types/ColorsHex';
import { inlineStyles } from '../utils/inlineStyles';
import { BASE_URL } from '../utils/constants';
import '../style/ProductDetailsPage.scss';

const colorsHex: ColorsHex = {
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

export const ProductDetailsPage = () => {
  const {
    products,
    setProducts,
    localStore,
    setLocalStore,
  } = useContext(GlobalContext);
  const [currentProduct, setCurrentProduct] = useState<ProductDetailsType | null>(null);
  const [currentImage, setCurrentImage] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const youMayLike = products.slice(0, 10);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const prodId = pathname.split('/').pop() || '';
  const generalProduct = products.find(item => item.phoneId === prodId) || null;

  type Obj = {
    memory?: string,
    color?: string,
  };

  const getNewPath = (obj: Obj) => {
    const newProdId = prodId.split('-');

    if (obj.memory) {
      newProdId[newProdId.length - 2] = obj.memory.toLowerCase();
    }

    if (obj.color) {
      newProdId[newProdId.length - 1] = obj.color.toLowerCase();
    }

    return `/phones/${newProdId.join('-')}`;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    setCurrentImage('');

    if (errorMessage) {
      setErrorMessage(false);
    }

    (async () => {
      try {
        const productsFromApi: ProductDetailsType = await getProducts(`/products/${prodId}.json`);

        setCurrentProduct(productsFromApi);
      } catch {
        setErrorMessage(true);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    })();
  }, [pathname]);

  const handleBtnClick = (action: string) => {
    const currentProducts = [...products];
    let currentStoreState = [...localStore];

    if (!generalProduct) {
      return;
    }

    let updatedCard: Product = { ...generalProduct };

    if (action === 'cart') {
      updatedCard = { ...updatedCard, inCart: !updatedCard.inCart };
    } else {
      updatedCard = { ...updatedCard, inFavourite: !updatedCard.inFavourite };
    }

    const index = currentProducts.findIndex(product => product.id === updatedCard.id);

    const indexStore = currentStoreState.findIndex(storeItem => storeItem.id === updatedCard.id);

    if (indexStore !== -1) {
      currentStoreState.splice(indexStore, 1, updatedCard);
    } else {
      currentStoreState = [...currentStoreState, updatedCard];
    }

    currentProducts.splice(index, 1, updatedCard);

    setProducts(currentProducts);
    setLocalStore(currentStoreState);
  };

  return (
    <div className="product-details">
      <div className="page-navigation">
        <div className="page-navigation_address">
          <a href="#/" className="page-navigation_link">
            <img src={ICONS.iconHome} alt="Icon home" />
          </a>
          <img src={ICONS.arrowRignt} alt="Arrow right" />
          <a
            href="/phones"
            className="small-text-style"
            style={{ color: inlineStyles.colors.primaryColor }}
          >
            Phones
          </a>
          {!errorMessage && (
            <>
              <img src={ICONS.arrowRignt} alt="Arrow right" />
              <p
                className="small-text-style"
                style={{ color: inlineStyles.colors.secondaryColor }}
              >
                {currentProduct?.name}
              </p>
            </>
          )}

        </div>
        <button type="button" className="return-back" onClick={() => navigate(-1)}>
          <img src={ICONS.arrowLeft} alt="Return back" />
          <p className="return-back_text small-text-style">Back</p>
        </button>
      </div>
      {isLoading ? (
        <div className="loader">
          <ThreeCircles
            height="70"
            width="70"
            color="#89939a"
            ariaLabel="three-circles-rotating"
          />
        </div>
      ) : errorMessage ? (
        <div className="empty-pages" style={{ marginTop: '64px' }}>
          <h1 className="empty-pages_title page-title-style">
            We&apos;re sorry, but the phone
            <br />
            was not found.
          </h1>
        </div>
      ) : currentProduct && (
        <>
          <div className="product-details_body">
            <h2 className="product-details_title page-title-style">{currentProduct.name}</h2>
            <div className="product-details_images">
              <div className="side-images">
                {currentProduct.images.map(img => (
                  <button
                    type="button"
                    className="side-image"
                    key={img}
                    onClick={() => setCurrentImage(img)}
                  >
                    <img
                      src={`${BASE_URL}${img}`}
                      alt="Small phone banner"
                      className="small-image"
                    />
                  </button>
                ))}
              </div>
              <div className="main-image-box">
                <img
                  className="main-image"
                  src={currentImage
                    ? `${BASE_URL}${currentImage}`
                    : `${BASE_URL}${currentProduct.images[0]}`}
                  alt="Main phone banner"
                />
              </div>
            </div>
            <div className="right-box">
              <div className="available-colors">
                <p className="small-text-style" style={{ color: inlineStyles.colors.secondaryColor }}>
                  Available colors
                </p>
                <ul className="available-colors_list">
                  {currentProduct.colorsAvailable.map(color => (
                    <Link
                      to={getNewPath({ color })}
                      className={cn('available-colors_item', {
                        'available-colors_item--select': currentProduct.color === color,
                      })}
                      key={color}
                    >
                      <div
                        className="available-colors_color"
                        style={{ backgroundColor: colorsHex[color] }}
                      />
                    </Link>
                  ))}
                </ul>
              </div>
              <div className="product-details_break-line" />
              <div className="available-memory">
                <p
                  className="small-text-style"
                  style={{ color: inlineStyles.colors.secondaryColor }}
                >
                  Select capacity
                </p>
                <ul className="available-memory_list">
                  {currentProduct.capacityAvailable.map(memory => (
                    <Link
                      to={getNewPath({ memory })}
                      className={cn('available-memory_item body-text-style', {
                        'available-memory_item--active': currentProduct.capacity === memory,
                      })}
                      key={memory}
                    >
                      {memory}
                    </Link>
                  ))}
                </ul>
              </div>
              <div className="product-details_break-line" />
              <div className="product-details_price">
                <p className="page-title-style">{`$${currentProduct.priceDiscount}`}</p>
                <p className="product-details_price-discount">
                  <s>{`$${currentProduct.priceRegular}`}</s>
                </p>
              </div>
              <div className="product-details_btn">
                <button
                  type="button"
                  className={cn({
                    'product-details_btn-cart': true,
                    'body-text-style': true,
                    'btn-cart': true,
                    'btn-cart--animation': generalProduct?.inCart,
                  })}
                  onClick={() => handleBtnClick('cart')}
                >
                  {generalProduct?.inCart ? (
                    'Added to cart') : (
                    'Add to cart'
                  )}
                </button>
                <button
                  style={{ height: '48px', width: '48px' }}
                  aria-label="Favourites"
                  type="button"
                  className={cn({
                    'btn-fav': true,
                    'btn-fav--added': generalProduct?.inFavourite,
                  })}
                  onClick={() => handleBtnClick('favourites')}
                />
              </div>
              <table className="short-specs">
                <tbody>
                  <tr>
                    <td className="short-specs_name small-text-style">Screen</td>
                    <td className="short-specs_details small-text-style">{currentProduct.screen}</td>
                  </tr>
                  <tr>
                    <td className="short-specs_name small-text-style">Resolution</td>
                    <td className="short-specs_details small-text-style">{currentProduct.resolution}</td>
                  </tr>
                  <tr>
                    <td className="short-specs_name small-text-style">Processor</td>
                    <td className="short-specs_details small-text-style">{currentProduct.processor}</td>
                  </tr>
                  <tr>
                    <td className="short-specs_name small-text-style">RAM</td>
                    <td className="short-specs_details small-text-style">{currentProduct.ram}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p
              className="product-details_id small-text-style"
              style={{ color: inlineStyles.colors.secondaryColor }}
            >
              ID:802390
            </p>
            <div className="product-details_container">
              <div className="about">
                <h3 className="about_title h2-text-style">About</h3>
                <div className="product-details_break-line" />
                {currentProduct.description.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div className="about_section" key={index}>
                    <h3 className="about_section-title h3-text-style">{item.title}</h3>
                    <p className="about_section-text body-text-style">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="tech-specs">
                <h2 className="tech-specs_title h2-text-style">Tech specs</h2>
                <div className="product-details_break-line" />
                <ul className="tech-specs_list">
                  <li className="tech-specs_item">
                    <p className="body-text-style" style={{ color: inlineStyles.colors.secondaryColor }}>
                      Screen
                    </p>
                    <p className="tech-specs_item-details body-text-style">{currentProduct.screen}</p>
                  </li>
                  <li className="tech-specs_item">
                    <p className="body-text-style" style={{ color: inlineStyles.colors.secondaryColor }}>
                      Resolution
                    </p>
                    <p className="tech-specs_item-details body-text-style">{currentProduct.resolution}</p>
                  </li>
                  <li className="tech-specs_item">
                    <p className="body-text-style" style={{ color: inlineStyles.colors.secondaryColor }}>
                      Processor
                    </p>
                    <p className="tech-specs_item-details body-text-style">{currentProduct.processor}</p>
                  </li>
                  <li className="tech-specs_item">
                    <p className="body-text-style" style={{ color: inlineStyles.colors.secondaryColor }}>
                      RAM
                    </p>
                    <p className="tech-specs_item-details body-text-style">{currentProduct.ram}</p>
                  </li>
                  <li className="tech-specs_item">
                    <p className="body-text-style" style={{ color: inlineStyles.colors.secondaryColor }}>
                      Built in memory
                    </p>
                    <p className="tech-specs_item-details body-text-style">64 GB</p>
                  </li>
                  <li className="tech-specs_item">
                    <p className="body-text-style" style={{ color: inlineStyles.colors.secondaryColor }}>
                      Camera
                    </p>
                    <p className="tech-specs_item-details body-text-style">{currentProduct.camera}</p>
                  </li>
                  <li className="tech-specs_item">
                    <p className="body-text-style" style={{ color: inlineStyles.colors.secondaryColor }}>
                      Zoom
                    </p>
                    <p className="tech-specs_item-details body-text-style">{currentProduct.zoom}</p>
                  </li>
                  <li className="tech-specs_item">
                    <p className="body-text-style" style={{ color: inlineStyles.colors.secondaryColor }}>
                      Cell
                    </p>
                    <p
                      className="tech-specs_item-details body-text-style"
                    >
                      {currentProduct.cell.join(', ')}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <YouMayLike youMayLike={youMayLike} />
        </>
      )}
    </div>
  );
};
