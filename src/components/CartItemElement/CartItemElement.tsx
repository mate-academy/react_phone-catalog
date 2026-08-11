import React from "react";
import { CartItem ,useApp } from "../../context/AppContext";
import styles from './CartItemElement.module.scss'

interface Props{
    item : CartItem;
}


export const CartItemElement:React.FC<Props> = ({item}) => {
    const {removeFromCart ,changeQuantity} = useApp();

    const {id,product,quantity} = item ;


    return(
        <div className={styles.item}>
             {/* 1. Кнопка видалення  */}
            <button  
            type="button" 
            className={styles.item__remove}
            onClick ={()=> removeFromCart(id)}
            aria-label = 'Remove item'
            >
             <img src="/react_phone-catalog/img/icons/cart-item.svg" alt="Remove"  className={styles.item__icon}/>  
            </button>

            {/* 2. НОВИЙ БЛОК: Зображення самого телефону */}
            <div className={styles.item__imageWrapper}><img src={product.image} alt={product.name}  className={styles.item__image}/>
            </div>

            

                        {/* 3. Текстова назва гаджета (вже готова) */}
            <span className={styles.item__title}>
              {product.name}
            </span>

            {/* 4. НОВИЙ БЛОК: Керування кількістю (- 1 +) */}
            <div className={styles.item__quantityControl}>
              {/* Кнопка "Мінус" */}
              <button 
                type="button" 
                className={styles.item__btn}
                onClick={() => changeQuantity(id, 'decrement')}
                disabled={quantity <= 1} // Блокуємо кнопку, якщо товар всього один
              >
                -
              </button>

              {/* Поточна кількість штук товару з контексту */}
              <span className={styles.item__count}>
                {quantity}
              </span>

              {/* Кнопка "Плюс" */}
              <button 
                type="button" 
                className={styles.item__btn}
                onClick={() => changeQuantity(id, 'increment')}
              >
                +
              </button>
            </div>
<span className={styles.item__price}>
        ${Number(product.price) * quantity}
      </span>

            </div>
    )
}