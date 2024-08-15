import { useNavigate, useParams } from 'react-router-dom';

import { favoriteIcon } from '../../assets';
import { ProductDetail } from '../../types/ProductDetail';
import { SelectCapacity } from '../SelectCapacity/SelectCapacity';
import { SelectColor } from '../SelectColor/SelectColor';

import { Product } from '../../types/Product';
import { extractNumberAndSuffix } from '../../utils/index';

import isFavoriteIcon from '../../assets/images/is-favorite.svg';

import { Button } from '../../ui/Button/Button';

import cn from 'classnames';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { addProduct, deleteProduct } from '../../store/slices/cartSlice';
import {
  addToFavorites,
  removeProduct,
} from '../../store/slices/favoritesSlice';
import { PriceInfo } from '../ProductCards/ProductCard/PriceInfo';
import styles from './ProductDetailPurchase.module.scss';

type Props = {
  productDetail: ProductDetail | null;
  products: Product[];
};

export const ProductDetailPurchase: React.FC<Props> = ({
  productDetail,
  products,
}) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(state => state.cart);
  const { favorites } = useAppSelector(state => state.favorites);

  const normalizeRam = extractNumberAndSuffix(productDetail?.ram || '');
  const product = products.find(item => item.itemId === productId);
  const isFavoriteProduct = favorites.some(item => item.id === product?.id);

  const isHaveProduct = cart.some(item => item.id === product?.id);

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

  const handleAddProduct = () => {
    if (!isHaveProduct) {
      dispatch(addProduct(product as Product));
    } else {
      dispatch(deleteProduct(Number(product?.id)));
    }
  };

  const handleToggleFavoriteStatus = () => {
    if (!isFavoriteProduct) {
      dispatch(addToFavorites(product as Product));
    } else {
      dispatch(removeProduct(Number(product?.id)));
    }
  };

  return (
    <div className={styles.productDescription}>
      <p className={styles.title}>Available colors</p>
      <SelectColor
        onUpdateColor={handleUpdateColor}
        updatedColor={productDetail?.color || ''}
        colors={productDetail?.colorsAvailable}
      />

      <p className={styles.title}>Select capacity</p>

      <SelectCapacity
        onUpdateCapacity={handleUpdateCapacity}
        updatedCapacity={productDetail?.capacity || ''}
        capacities={productDetail?.capacityAvailable}
      />

      <PriceInfo
        fontSize="32px"
        isHotPrice={true}
        price={productDetail?.priceDiscount || 0}
        fullPrice={productDetail?.priceRegular || 0}
      />

      <div className={styles.buttons}>
        <Button
          appearance="primary"
          size="large"
          className={isHaveProduct ? 'active' : ''}
          onClick={handleAddProduct}
        >
          {isHaveProduct ? 'Added to cart' : 'Add to cart'}
        </Button>

        <Button
          className={isFavoriteProduct ? 'active' : ''}
          onClick={handleToggleFavoriteStatus}
          appearance="dark"
          size="large"
        >
          <img
            src={isFavoriteProduct ? isFavoriteIcon : favoriteIcon}
            alt="favorite"
          />
        </Button>
      </div>

      <div className={styles.inner}>
        <div className={styles.descriptions}>
          <p className={styles.description}>Screen</p>
          <p className={styles.description}>Resolution</p>
          <p className={styles.description}>Processor</p>
          <p className={styles.description}>Ram</p>
        </div>
        <div className={styles.descriptions}>
          <p className={cn(styles.description, styles['description--active'])}>
            {productDetail?.screen}
          </p>
          <p className={cn(styles.description, styles['description--active'])}>
            {productDetail?.resolution}
          </p>
          <p className={cn(styles.description, styles['description--active'])}>
            {productDetail?.processor}
          </p>
          <p className={cn(styles.description, styles['description--active'])}>
            {normalizeRam}
          </p>
        </div>
      </div>
    </div>
  );
};
