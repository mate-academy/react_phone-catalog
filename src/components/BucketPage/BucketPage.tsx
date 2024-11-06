import { Link } from 'react-router-dom';
import styles from './BucketPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addQuantity, clearBucket, decrementQuantity, removeBucket } from '../../features/addProductSlice';
import { Product } from '../../types/products';

export const BucketPage = () => {
  const products = useAppSelector(state => state.addedBucket.items);
  const dispatch = useAppDispatch();

  const handleDeleteProduct = (item: Product) => {
    dispatch(removeBucket(item.id));
  };

  const handleDecrementQuantity = (id: number) => {
    dispatch(decrementQuantity(id));
  };

  const handleAddQuantity = (id: number) => {
    dispatch(addQuantity(id));
  };

  const handleClearBucket = () => {
    dispatch(clearBucket());
  };

  const finalSum = () => {
    const finalSuma = products.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);

    return finalSuma;
  };

  const bucketProducts = useAppSelector(state => state.addedBucket.items);

  const bucketAmount = bucketProducts.reduce((total, product) => {
    return total + product.quantity;
  }, 0);

  return (
    <>
    <div className={styles.bucket}>
        <Link to={'../'}>
          <div className={styles.bucket__buttonBack}>
            <img src="img/icons/Chevron-left.svg" alt="back" />
            <p>Back</p>
          </div>
        </Link>
        <h2 className={styles.bucket__title}>Cart</h2>
        
        {products.length === 0 ? (
          <p className={styles.empty}>Your cart is empty</p>
        ) : (
          <div className={styles.bucket__generalProducts}>
            <div className={styles.bucket__generalProducts_products}>
              {products.map(product => (
                <div
                  key={product.id}
                  className={styles.bucket__generalProducts_products_product}
                >
                  <div className={styles.bucket__generalProducts_products_product_section}>
                    <img 
                      onClick={() => handleDeleteProduct(product)}
                      className={styles.bucket__generalProducts_products_product_section_close}
                      src="/img/icons/icon-close.svg" 
                      alt="close" 
                    />
                    <img 
                      className={styles.bucket__generalProducts_products_product_section_image}
                      src={`/${product.image}`} 
                      alt="img" 
                    />
                    <p>{product.name}</p>
                  </div>
                  <div className={styles.bucket__generalProducts_products_product_secondSection}>
                    <div className={styles.bucket__generalProducts_products_product_secondSection_buttons}>
                      <div 
                        className={styles.bucket__generalProducts_products_product_secondSection_buttons_button}
                        onClick={() => handleDecrementQuantity(product.id)}
                        style={{
                          borderColor: product.quantity === 1 ? '#E2E6E9' : '',
                          cursor:
                            product.quantity === 1 ? 'not-allowed' : 'inherit',
                        }}
                      >
                        {product.quantity === 1 ? (
                          <img src="/img/icons/Minus-dis.svg" alt="minus" />
                        ) : (
                          <img src="/img/icons/Minus.svg" alt="minus" />
                        )}
                      </div>
                      <p
                        className={
                          styles.bucket__generalProducts_products_product_secondSection_buttons_quantity
                        }
                      >
                        {product.quantity}
                      </p>
                      <div
                        className={
                          styles.bucket__generalProducts_products_product_secondSection_buttons_button
                        }
                        onClick={() => {
                          handleAddQuantity(product.id);
                        }}
                      >
                        <img src="/img/icons/Plus.svg" alt="plus" />
                      </div>
                    </div>
                    <h3
                      className={
                        styles.bucket__generalProducts_products_product_secondSection_title
                      }
                    >
                      ${product.price * product.quantity}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.bucket__generalProducts_total}>
              <div className={styles.bucket__generalProducts_total_info}>
                <h3 className={styles.bucket__generalProducts_total_info_price}>
                  ${finalSum()}
                </h3>
                <p>Total for {bucketAmount} items</p>
              </div>
               <button
                onClick={handleClearBucket}
                className={styles.bucket__generalProducts_total_button}
              >
                Checkout
              </button>
            </div> 
          </div>
        )}
    </div>
    </>
  );
};

