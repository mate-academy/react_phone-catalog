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
import { AccessoryDetals } from '../../types/AccessoryDetails';
import { useEffect, useState } from 'react';

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
        return null;
    }
  }

  const [product, setProduct] = useState<AccessoryDetals | null | undefined>(undefined);
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

              {/* picture */}

              <div className={styles.pictures}>
                {product.images?.map((url: string) => (
                  <div
                    key={url}
                    className={styles.picture}
                  >
                    <img className={styles.img} src={url} alt="Phone" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.details}>
            <div className={styles.about}></div>
            <div className={styles.techSpecs}></div>
          </div>
        </>
      ) : (
        <h2>Product not found</h2>
      )}

    </main>
  )
}