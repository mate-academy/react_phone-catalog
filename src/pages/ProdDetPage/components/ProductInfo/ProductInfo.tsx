import { ProductFull } from '../../../../types/Product_full';
import { Images } from '../Images/Images';
import { MainInfo } from '../MainInfo/MainInfo';
import { SpecList } from '../../../shared/SpecList/SpecList';
import styles from './ProductInfo.module.scss';

type Props = {
  product: ProductFull;
};

export const ProductInfo: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.productInfo}>
      <h2 className={styles.productInfo__title}>{product?.name}</h2>
      <div className={styles.productInfo__topSection}>
        <Images images={product.images} />
        <MainInfo product={product} />
      </div>
      <div className={styles.productInfo__bottomSection}>
        <div className={styles.about}>
          <h3 className={styles.about__title}>About</h3>

          {product?.description.map(item => (
            <div key={item.title} className={styles.about__description}>
              <h4 className={styles.about__subtitle}>{item.title}</h4>
              <p className={styles.about__text}>{item.text}</p>
            </div>
          ))}
        </div>
        <div className={styles.fullSpecs}>
          <h3 className={styles.fullSpecs__title}>Tech specs</h3>
          <SpecList specsToShow={Infinity} product={product} />
        </div>
      </div>
    </div>
  );
};
