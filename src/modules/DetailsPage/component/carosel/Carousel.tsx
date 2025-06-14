import styles from './Carousel.module.scss';
export const Carousel = () => {
  return (<>
    <div className={styles.container}>
      <img className={styles.image } />
    <div className={styles.carousel}>
        <ul className={styles.carousel__list}>
      <li>
        <img src="./img/1.png" alt="1" />
      </li>
      <li>
        <img src="./img/1.png" alt="2" />
      </li>
      <li>
        <img src="./img/1.png" alt="3" />
      </li>
      <li>
        <img src="./img/1.png" alt="4" />
      </li>
    </ul>
    </div></div>
  </>)
}
