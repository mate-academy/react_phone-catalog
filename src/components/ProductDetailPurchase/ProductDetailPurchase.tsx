import { useNavigate, useParams } from 'react-router-dom';

import { FavouriteButton } from '../../ui/FavouriteButton';
import { PurchaseButton } from '../../ui/PurchaseButton';

import { favoriteIcon } from '../../assets';
import { ProductDetail } from '../../types/ProductDetail';
import { normalizeString } from '../../utils/utils';
import { ProductCardPrices } from '../ProductCardPrices';
import { SelectCapacity } from '../SelectCapacity/SelectCapacity';
import { SelectColor } from '../SelectColor/SelectColor';

import styles from './ProductDetailPurchase.module.scss';

type Props = {
  productDetail: ProductDetail | null;
};

export const ProductDetailPurchase: React.FC<Props> = ({ productDetail }) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const normalizeRam = normalizeString(productDetail?.ram || '');

  const handleUpdateColor = (color: string) => {
    const newProductId = productId?.replace(
      productDetail?.color.replace(' ', '-') || '',
      color.replace(' ', '-'),
    );

    navigate(`/product/${newProductId}`);
  };

  const handleUpdateCapacity = (capacity: string) => {
    const newProductId = productId?.replace(
      productDetail?.capacity.toLowerCase() || '',
      capacity.toLowerCase(),
    );

    navigate(`/product/${newProductId}`);
  };

  return (
    <div className={styles.ProductDescription}>
      <p className={styles.Title}>Available colors</p>
      <SelectColor
        onUpdateColor={handleUpdateColor}
        updatedColor={productDetail?.color || ''}
        colors={productDetail?.colorsAvailable}
      />

      <p className={styles.Title}>Select capacity</p>

      <SelectCapacity
        onUpdateCapacity={handleUpdateCapacity}
        updatedCapacity={productDetail?.capacity || ''}
        capacities={productDetail?.capacityAvailable}
      />

      <ProductCardPrices
        fontSize="32px"
        isHotPrice={true}
        price={productDetail?.priceDiscount || 0}
        fullPrice={productDetail?.priceRegular || 0}
      />

      <div className={styles.Buttons}>
        <PurchaseButton size="large">Add to cart</PurchaseButton>
        <FavouriteButton size="large">
          <img src={favoriteIcon} alt="favorite" />
        </FavouriteButton>
      </div>

      <div className={styles.Inner}>
        <div className={styles.Descriptions}>
          <p className={styles.Text}>Screen</p>
          <p className={styles.Text}>Resolution</p>
          <p className={styles.Text}>Processor</p>
          <p className={styles.Text}>Ram</p>
        </div>
        <div className={styles.Descriptions}>
          <p className={`${styles.Text} ${styles.TextActive}`}>
            {productDetail?.screen}
          </p>
          <p className={`${styles.Text} ${styles.TextActive}`}>
            {productDetail?.resolution}
          </p>
          <p className={`${styles.Text} ${styles.TextActive}`}>
            {productDetail?.processor}
          </p>
          <p className={`${styles.Text} ${styles.TextActive}`}>
            {normalizeRam}
          </p>
        </div>
      </div>
    </div>
  );
};
