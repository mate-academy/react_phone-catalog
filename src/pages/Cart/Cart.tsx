import { useState } from 'react';
import { Empty } from '../../components/Empty';
import { ItemCard } from '../../components/ItemCard/ItemCard';
import { BackButton } from '../../components/ui/Buttons/BackButton';
import { useShopContext } from '../../context/ShopContext/ShopContext';
import s from './Cart.module.scss';

export const Cart = () => {
  const {inCart,clearStorage } = useShopContext();
  const [openModal, setOpenModal] = useState(false);

  const totalSum = inCart.reduce(function(accum, current){
    return  accum + (current.quantity * current.price);
  }, 0);

  const totalAmount = inCart.reduce(function(accum, current){
    return  accum + current.quantity;
  }, 0);

  const checkout = ()=>{
    clearStorage();
    setOpenModal(false);
  };


  return (
    <section className={s.cart}>
      <BackButton/>
      <h1 className={s.cart__title}>Cart</h1>

      {inCart.length
        ?  <div className={s.cart__container}>
          <div className={s.cart__list}>
            {inCart.map((item, index) => {
              return <ItemCard item={item} key={index}/>;
            })}
          </div>

          <div className={s.cart__checkout}>
            <div className={s['cart__total-wrapper']}>
              <div className={s.cart__total}>{totalSum}$</div>
              <div className={s.cart__desc}>Total for {totalAmount} items</div>
            </div>

            <div className={s.cart__line}></div>

            <button className={s['cart__checkout-button']} onClick={()=> setOpenModal(true)}>Checkout</button>
          </div>
        </div> 
        : <Empty message='Your cart is empty' img ='cart'/>
      }  

     
      <div className={`${s.cart__modal} ${openModal ? s['cart__modal--open'] : ''}`}>
        <div className={s['cart__modal-content']}>
          <h2 className={s['cart__modal-title']}>Checkout is not implemented yet. 
            <br/> Do you want to clear the Cart?
          </h2>

          <div className={s.cart__btns}>
            <button className={s['cart__modal-btn']} onClick={checkout}>Yes</button>
            <button className={s['cart__modal-btn']} onClick={()=> setOpenModal(false)}>No</button>
          </div>
        </div>
      </div>
    </section>
  );
};
