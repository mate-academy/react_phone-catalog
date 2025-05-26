import styles from './cardItemPhone.module.scss';


export const ProductCart = ({products}) => {

 if (!products) {
    return null;
  }

  return (<>{products.map(phone => (<div className={styles.card} key={phone.id}>
    <img className={styles.card__image}
     src= {`/${phone.image}`}></img>
    <h4 className={styles.card__name}>{ phone.name}</h4>
        <h2 className={styles.card__price}>${phone.fullPrice}</h2>
        <div className={styles.card__border}></div>

        <div className={styles.card__info}>
          <div className={styles.card__screen}>
            <span className={styles.card__characteristics}>Screen</span>
            <span className={styles.card__goods}>{phone.screen}</span>
 </div>
            <div className={styles.card__screen}>
            <span className={styles.card__characteristics}>Capacity</span>
            <span className={styles.card__goods}>{phone.capacity}</span>

          </div>
  <div className={styles.card__screen}>
            <span className={styles.card__characteristics}>RAM</span><span
            className={styles.card__goods}>{phone.ram}</span>

          </div>

        </div>
        <div className={styles.card__buttons}>
          <div className={styles.card__addCart}>Add to cart</div>
          <div className={styles.card__favorite}></div>
        </div>
      </div>))}</>)
}
