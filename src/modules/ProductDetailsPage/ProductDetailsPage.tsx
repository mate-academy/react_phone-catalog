import { useLocation } from 'react-router-dom';
import { Breadcrumb } from '../../components/Breadcrumb';
import styles from './ProductDetailsPage.module.scss';
import {
  findAccessory,
  findPhone,
  findTablet,
  getProducts
} from '../shared/services/productService';
import { AccessoryDetails } from '../../types/AccessoryDetails';
import { useEffect, useState } from 'react';
import { AddToCart } from '../../components/AddToCart';
import { LikeButton } from '../../components/LikeButton/LikeButton';
import { getFormattedCapacity } from '../shared/utils/getFormattedCapacity';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductsSlider } from '../../components/ProductsSlider';
import { getColor } from '../shared/utils/getColor';
import { useAppState, useAppDispatch } from '../../contexts/AppContext';
import { Loader } from '../../components/Loader';
import { Back } from '../../components/Back';

export const ProductDetailsPage: React.FC = () => {
  const { pathname } = useLocation();
  const { cartProductsIds, favouriteProductsIds, products } = useAppState();
  const { toggleFavouriteCard, toggleAddToCart } = useAppDispatch();

  const [product, setProduct] = useState<ProductDetails | AccessoryDetails | undefined>(undefined);
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [currentPicture, setCurrentPicture] = useState('');
  const [currentCapacity, setCurrentCapacity] = useState('');
  const [currentColor, setCurrentColor] = useState('');

  useEffect(() => {
    let isMounted = true;
    setIsProductLoading(true);

    const fetchProduct = async () => {
      try {
        const itemId = pathname.split('/')[2];
        const item = (await getProducts()).find(item => item.itemId === itemId);

        if (!item) {
          if (isMounted) {
            setProduct(undefined);
            setIsProductLoading(false);
          }
          return;
        }

        let response;
        switch (item.category) {
          case 'phones':
            response = await findPhone('id', item.itemId);
            break;
          case 'tablets':
            response = await findTablet('id', item.itemId);
            break;
          case 'accessories':
            response = await findAccessory('id', item.itemId);
            break;
          default:
            response = undefined;
        }

        if (isMounted) {
          setProduct(response);
          setIsProductLoading(false);
        }
      } catch {
        if (isMounted) {
          setProduct(undefined);
          setIsProductLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [pathname, products]);

  useEffect(() => {
    if (product) {
      setCurrentCapacity(product.capacity);
      setCurrentColor(product.color);
      setCurrentPicture(product.images[0]);
    }
  }, [product]);

  if (isProductLoading || !products || products.length === 0) {
    return (
      <main className={`${styles.main} ${styles.isLoading}`}>
        <Loader />
      </main>
    );
  }

  return (
    <main className={`${styles.main} ${isProductLoading ? styles.isLoading : ''}`}>
      {product ? (
        <>
          <div className={styles.head}>
            <Breadcrumb />
            <Back />

            <div className={styles.product}>
              <h2 className={styles.title}>{product?.name}</h2>

              <div className={styles.pictures}>
                {product.images?.map((url: string) => (
                  <div
                    onClick={() => setCurrentPicture(url)}
                    key={url}
                    className={`
                        ${styles.picture} 
                        ${currentPicture === url ? styles.pictureActive : ''}
                      `}
                  >
                    <img className={styles.img} src={`/${url}`} alt="Phone" />
                  </div>
                ))}
              </div>

              <div className={styles.currentPicture}>
                <img
                  className={styles.img}
                  src={`/${currentPicture}`}
                  alt="Phone"
                />
              </div>

              <div className={styles.mainInfo}>
                <div className={styles.colors}>
                  <span className='smallText'>Available colors</span>

                  <ul className={styles.colorsList}>
                    {product.colorsAvailable.map(item => (
                      <li
                        onClick={() => setCurrentColor(item)}
                        className={`
                            ${styles.colorsItem} 
                            ${currentColor === item ? styles.colorsItemActive : ''}
                          `}
                        key={item}
                      >
                        <div
                          style={{ backgroundColor: getColor(item) }}
                          className={styles.colorsItemColor}></div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.line}></div>

                <div className={styles.capacity}>
                  <span className='smallText'>Select capacity</span>

                  <ul className={`${styles.capacityList} bodyText`}>
                    {product.capacityAvailable.map(item => (
                      <li
                        onClick={() => setCurrentCapacity(item)}
                        className={`
                            ${styles.capacityItem} 
                            ${currentCapacity === item ? styles.capacityItemActive : ''}
                          `}
                        key={item}
                      >{getFormattedCapacity(item)}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.line}></div>

                <div className={styles.order}>
                  <h3 className={styles.price}>
                    ${product.priceDiscount}{' '}
                    <span className={styles.fullPrice}>
                      ${product.priceRegular}
                    </span>
                  </h3>

                  <div className={styles.buttons}>
                    <AddToCart
                      isActive={cartProductsIds.includes(product.id)}
                      onClick={() => toggleAddToCart(product.id)}
                    />
                    <LikeButton
                      isSelected={favouriteProductsIds.includes(product.id)}
                      onClick={() => toggleFavouriteCard(product.id)}
                    />
                  </div>
                </div>

                <div className={styles.info}>
                  <ul className={`${styles.keys} smallText`}>
                    <li>Screen</li>
                    <li>Resolution</li>
                    <li>Processor</li>
                    <li>RAM</li>
                  </ul>

                  <ul className={`${styles.values} cardValuesText`}>
                    <li>{product.screen}</li>
                    <li>{product.resolution}</li>
                    <li>{product.processor}</li>
                    <li>{getFormattedCapacity(product.ram)}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.about}>
            <div>
              <h3 className={styles.aboutTitle}>About</h3>
              <div className={styles.line}></div>
            </div>

            {product.description.map(item => (
              <div className={styles.aboutItem} key={item.title}>
                <h4 className={styles.aboutSubtitle}>{item.title}</h4>

                {item.text.map(text => (
                  <p className={`${styles.aboutText} bodyText`} key={text}>{text}</p>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.techSpecs}>
            <div>
              <h3 className={styles.techSpecsTitle}>Tech specs</h3>
              <div className={styles.line}></div>
            </div>

            <ul className={`${styles.techSpecsList} bodyText`}>
              <li className={styles.case}>
                Screen <span className={styles.value}>{product.screen}</span>
              </li>
              <li className={styles.case}>
                Resolution <span className={styles.value}>{product.resolution}</span>
              </li>
              <li className={styles.case}>
                Processor <span className={styles.value}>{product.processor}</span>
              </li>
              <li className={styles.case}>
                RAM <span className={styles.value}>{getFormattedCapacity(product.ram)}</span>
              </li>
              <li className={styles.case}>
                Built in memory <span className={styles.value}>{getFormattedCapacity(product.capacity)}</span>
              </li>
              {'camera' in product && (
                <>
                  <li className={styles.case}>
                    Camera <span className={styles.value}>{product.camera}</span>
                  </li>
                  <li className={styles.case}>
                    Zoom <span className={styles.value}>{product.zoom}</span>
                  </li>
                </>
              )}
              <li className={styles.case}>
                Cell <span className={styles.value}>{product.cell.join(', ')}</span>
              </li>
            </ul>
          </div>

          <ProductsSlider title={'You may also like'} filter='random' />
        </>
      ) : (
        <div className={styles.head}>
          <Breadcrumb />
          <Back />

          <h1 className={styles.title}>Product not found</h1>
        </div>
      )}
    </main>
  )
}