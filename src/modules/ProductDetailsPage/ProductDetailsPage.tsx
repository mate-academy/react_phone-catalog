import { useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { NavigateButton } from '../shared/components/NavigateButton';
import { useTabs } from '../../ProductsContext/TabsContext';
import { BackButton } from '../shared/components/BackButton';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const { productsList, loading, error } = useTabs();

  if (loading) {
    return <div className={styles.status}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.status}>error...</div>;
  }

  const product = productsList.find(e => e.id === Number(id));

  if (!product) {
    return <div className={styles.status}>Product not found...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.navigateButtons}>
        <NavigateButton product={product} />
        <BackButton />
      </div>

      <div className={styles.productContainer}>
        <div className={styles.title}>{product.name}</div>

        <div className={styles.productInform}>
          <div className={styles.grigContainer}>
            <div className={styles.switchPhotos}>
              <img
                className={styles.img}
                src={product.image}
                alt={product.itemId}
              />
            </div>

            <div className={styles.imgSliders}>
              {product.details?.images.map((el, i) => (
                <div className={styles.imgBox} key={i}>
                  <img className={styles.img} src={el} alt="hd" />
                </div>
              ))}
            </div>

            <div className={styles.informContainer}>
              <div className={styles.availableColors}>
                <div className={styles.title}>
                  Available colors
                  <span></span>
                </div>

                <div className={styles.colorsContainer}>
                  {product.details?.colorsAvailable?.map((p, i) => (
                    <span
                      className={styles.color}
                      key={i}
                      style={{ backgroundColor: `${p}` }}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
