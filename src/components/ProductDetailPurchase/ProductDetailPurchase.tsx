import { useNavigate, useParams } from 'react-router-dom';

import { FavouriteButton } from '../../ui/FavouriteButton';
import { PurchaseButton } from '../../ui/PurchaseButton';

import { favoriteIcon } from '../../assets';
import { ProductDetail } from '../../types/ProductDetail';
import { ProductCardPrices } from '../ProductCardPrices';
import { SelectCapacity } from '../SelectCapacity/SelectCapacity';
import { SelectColor } from '../SelectColor/SelectColor';

import { useFavorites } from '../../hooks/useFavorites';
import { useProductsCart } from '../../hooks/useProductsCart';
import { Product } from '../../types/Product';
import { extractNumberAndSuffix } from '../../utils/index';

import isFavoriteIcon from '../../assets/images/is-favorite.svg';

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

  const { cart, addProduct } = useProductsCart();
  const { favorites, addToFavorites, removeProduct } = useFavorites();

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
    addProduct(product as Product);
  };

  const handleToggleFavoriteStatus = () => {
    if (!isFavoriteProduct) {
      addToFavorites(product as Product);
    } else {
      removeProduct(product?.id as number);
    }
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
        <PurchaseButton handleClick={handleAddProduct} size="large">
          {isHaveProduct ? 'Added to cart' : 'Add to cart'}
        </PurchaseButton>
        <FavouriteButton
          className={isFavoriteProduct ? 'Active' : ''}
          isLarge={true}
          handleClick={handleToggleFavoriteStatus}
        >
          <img
            src={isFavoriteProduct ? isFavoriteIcon : favoriteIcon}
            alt="favorite"
          />
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
