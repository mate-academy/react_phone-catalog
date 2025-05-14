import styles from './cardItemPhone.module.scss';


export const CardPhone = ({phones}) => {

 if (!phones) {
    return null;
  }

  return (
    <div className={styles.cardList}>
      {phones.map(phone => (<div className={styles.card} key={phone.id}>
    <img className={styles.card__image}
     src= {`/${phone.image}`}></img>
    <h4 className={styles.card__name}>{ phone.name}</h4>
    <h2 className={styles.card__price}>${ phone.fullPrice}</h2>
    <div className={styles.card__info}>
      <div></div>
      <div></div>
      <div></div>
        </div>
      </div>))}</div>)
}
