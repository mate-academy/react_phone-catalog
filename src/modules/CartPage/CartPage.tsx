import React from 'react';
import { Header } from '../../components/Header';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useLocation } from 'react-router-dom';
import { PreviousPage } from '../../components/PreviousPage';
import styles from './CartPage.module.scss';
import chevronIcon from '../../img/icons/ChevronIcon.svg';
import { useAppContext } from '../../context/AppContext';
import { CartItem } from './CartItem/CartItem';
import { Link } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const category = useLocation().pathname.slice(1)
  console.log('PAGE CLICKED',category)
  const {handleNotReady, previousCurrentPage, productsInCart} = useAppContext();
  return (
    <div>
<Header />
    <PreviousPage category={category}/>

    <div className={styles.cartPage}>
    <Breadcrumbs category={category}/>
      <div className={styles.topContainer}>
        <div className={styles.topLeft}>
          <button className={styles.goBackButton}>
            <img
              src={chevronIcon}
              alt="home"
              className={styles.chevronIcon}
            />
            <div className={styles.goBackText}>
            <Link to={`/${previousCurrentPage[0]}`}>
              <div className={styles.label}>Back</div>
              </Link>
            </div>
          </button>
        </div>
        <h1 className={styles.title}>Cart</h1>
      </div>

        <div className={styles.emptyContainer}>
          <img src="img/cart-is-empty.png" className={`${styles.image} ${productsInCart.length > 0 ?styles.hidden : ""}`}/>
        </div>

        <div className={styles.container}>
          <div className={styles.cartItems}>

              {productsInCart.map((product,index) => (
                <CartItem product={product} key={index}/>
              ))}


          </div>
          <div className={`${styles.bottomContainer} ${productsInCart.length === 0 ? styles.hidden : ""}`}>
            <div className={styles.checkout}>
              <h2 className={styles.totalPrice}>$XXX</h2>
              <p
                className={styles.totalItems}
              >Total for xxx item xxx</p>
              <div className={styles.divider}></div>
                <button
                  className={styles.checkoutButton}
                  onClick={handleNotReady}
                >
                  Checkout
                </button>
              </div>
          </div>
        </div>

    </div>
    </div>


    );
};
