import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from '../../components/Breadcrumb';
import styles from './ProductDetailsPage.module.scss';
import {
  findAccessory,
  findPhone,
  findProduct,
  findTablet
} from '../shared/services/productService';
import { getFormattedPathname } from '../shared/utils/formatPathname';
import { AccessoryDetails } from '../../types/AccessoryDetails';
import { useEffect, useState } from 'react';
import { AddToCart } from '../../components/AddToCart';
import { LikeButton } from '../../components/LikeButton/LikeButton';
import { getFormattedCapacity } from '../shared/utils/getFormattedCapacity';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductsSlider } from '../../components/ProductsSlider';
import { getColor } from '../shared/utils/getColor';

export const ProductDetailsPage: React.FC = () => {
  const { pathname } = useLocation();

  async function finder() {
    const item = await findProduct('itemId', pathname.split('/')[2]);

    switch (item?.category) {
      case 'phones':
        return findPhone('id', item.itemId);
      case 'tablets':
        return findTablet('id', item.itemId);
      case 'accessories':
        return findAccessory('id', item.itemId);
      default:
        return undefined;
    }
  }

  const [product, setProduct] = useState<ProductDetails | AccessoryDetails | undefined>(undefined);
  const [currentPicture, setCurrentPicture] = useState('');
  const [currentCapacity, setCurrentCapacity] = useState(product?.capacityAvailable[0]);
  const [currentColor, setCurrentColor] = useState(product?.colorsAvailable[0]);

  useEffect(() => {
    if (product) {
      setCurrentCapacity(product.capacityAvailable[0]);
      setCurrentColor(product.colorsAvailable[0]);
      setCurrentPicture(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
  }, [currentCapacity, currentColor]);

  useEffect(() => {
    let isMounted = true;
    finder().then(res => {
      if (isMounted) setProduct(res);
    });
    return () => { isMounted = false; }
  }, [pathname]);

  return (
    <main className={styles.main}>
      {product === undefined ? (
        <h2>Loading...</h2>
      ) : product ? (
        <>
          <div className={styles.head}>
            <Breadcrumb />
            <Link to={`/${getFormattedPathname(pathname)[0]}`} className={styles.back}>
              <img
                className={styles.left}
                src="/img/icons/arrow.svg"
                alt="Back"
              />
              <span className='smallText'>Back</span>
            </Link>

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
                    <AddToCart isActive={false} onClick={() => { }} />
                    <LikeButton isSelected={false} onClick={() => { }} />
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
                Cell <span className={styles.value}>{product.cell}</span>
              </li>
            </ul>
          </div>

          <ProductsSlider title={'You may also like'} filter={() => true} />
        </>
      ) : (
        <h2>Product not found</h2>
      )}
    </main>
  )
}