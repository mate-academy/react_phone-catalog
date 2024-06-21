import styles from './PhoneCard.module.scss';

type Props = {
  img: string;
  name: string;
  price: number;
  screen: string;
  capacity: string;
  ram: string;
  secondPrice: number;
};

export const PhoneCard = ({
  img,
  name,
  price,
  screen,
  capacity,
  ram,
  secondPrice,
}: Props) => {
  return (
    <div className={styles.container}>
      <img src={`${img}`} alt="img" className={styles.img} />
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.allPrice}>
        <h3 className={styles.price}>{`$${price}`}</h3>
        <h3 className={styles.secondPrice}>{`$${secondPrice}`}</h3>
      </div>
      <div className={styles.border}></div>
      <section className={styles.info}>
        <h3 className={styles.screen}>
          <h4 className={styles.titleScreen}>{`Screen`}</h4>
          <h4 className={styles.screenScreen}>{screen}</h4>
        </h3>
        <h3 className={styles.capacity}>
          <h4 className={styles.titleCapacity}>{`Capacity`}</h4>
          <h4 className={styles.capacityCapacity}>{capacity}</h4>
        </h3>
        <h3 className={styles.ram}>
          <h4 className={styles.titleRam}>{`RAM`}</h4>
          <h4 className={styles.ramRam}>{ram}</h4>
        </h3>
      </section>

      <div className={styles.buttonConteiner}>
        <button className={styles.add}>Add to cart</button>
        <button className={styles.heart}>
          <img src="img/homePage/heart.svg" alt="heart" />
        </button>
      </div>
    </div>
  );
};
