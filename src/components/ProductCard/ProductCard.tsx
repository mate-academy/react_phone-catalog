import React from 'react';
import './ProductCard.module.scss';
import { ActionButtons } from '../ActionButtons';
import { LimitedProduct } from '../../types/Product';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { useAppContext } from '../../context/AppContext';


type ProductCardProps = {
  product: LimitedProduct;
  // handleSelectedProduct: (newState: string) => "";
};

export const ProductCard: React.FC<ProductCardProps> = ({ product}) => {

  if (!product) {
    return <div>No product available</div>;
  }

  const { image, name, price, fullPrice, screen, capacity, ram } = product;
  const { setClickedProduct/* , favoriteProducts, productsInCart, setIsClickedProdyctInFavs, setIsClickedProdyctInCart  */} = useAppContext();
  /* const [isProductInFavs, setIsProductInFavs] = useState<boolean | undefined>(undefined);
  const [isProductInCart, setIsProductInCart] = useState<boolean | undefined>(undefined); */
/*   const [updateOnRender, setUpdateOnRender] = useState<boolean>(false) */

/*   useEffect(() => {
    setUpdateOnRender(true)
  }, [])

  useEffect(() => {
    const favs = favoriteProducts.find((item: LimitedProduct) => item === product )
    favs === undefined ? setIsProductInFavs(false) : setIsProductInFavs(true);
  },[favoriteProducts, updateOnRender])

  useEffect(() => {
    const cart = productsInCart.find((item: LimitedProduct) => item === product )
    cart === undefined ? setIsProductInCart(false) : setIsProductInCart(true);
  },[productsInCart, updateOnRender]) */

  const handleClickedProduct = () => {

    if(product !== undefined) {
      localStorage.setItem('clickedProduct', JSON.stringify(product));
      setClickedProduct(product)
      console.log('CLICKED PRODUCTS is set to', product)
/*       if(isProductInCart !== undefined) {
        setIsClickedProdyctInCart(isProductInCart);
      }
      if(isProductInFavs !== undefined) {
        setIsClickedProdyctInFavs(isProductInFavs);
      } */
    }
  }

  return (
    <div className={styles.ProductCard}>
      <Link
        to={`/product/${encodeURIComponent(product.itemId)}`}
        className={styles.imageContainer}
        onClick = {handleClickedProduct}
      >
        <img
          className={styles.image}
          src={image}
          alt={name}
        />
      </Link>

      <div className={styles.wrapper}>
        <Link to={`/product/${encodeURIComponent(product.itemId)}`} className={styles.title}>
          {name}
        </Link>

        <div className={styles.price}>
          <div className={styles.existPrice}>${fullPrice}</div>
          <div className={styles.hotPrice}>${price}</div>
        </div>

        <div className={styles.divider} />

        <div className={styles.description}>
          <div className={styles.existDescription}>
            <p className={styles.descriptionTitle}>Screen</p>
            <p className={styles.descriptionText}>{screen}</p>
          </div>

          <div className={styles.existDescription}>
            <p className={styles.descriptionTitle}>Capacity</p>
            <p className={styles.descriptionText}>{capacity}</p>
          </div>

          <div className={styles.existDescription}>
            <p className={styles.descriptionTitle}>RAM</p>
            <p className={styles.descriptionText}>{ram}</p>
          </div>
        </div>

        <ActionButtons product={product} /* isProductInFavs={isProductInFavs} isProductInCart={isProductInCart} *//>
      </div>
    </div>
  );
};
