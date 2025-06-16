import styles from './techDetails.module.scss';
export const TechDetails = ({screen, resolution,procesor,ram}) => {
  return (
    <div className={styles.tech}>
      <div className={styles.tech___box}>
        <span className={styles.tech___name}>Screen</span>
        <span className={styles.tech__discription}>{screen}</span>

      </div>
      <div className={styles.tech___box}>
        <span className={styles.tech___name}>Resolution</span>
        <span className={styles.tech__discription}>{resolution }</span>
      </div>
      <div className={styles.tech___box}>
        <span className={styles.tech___name}>Processor</span>
        <span className={styles.tech__discription}>{procesor }</span>
      </div>
      <div className={styles.tech___box}>
        <span className={styles.tech___name}>RAM</span>
        <span className={styles.tech__description}>{ram }</span>
      </div>
    </div>
  )
}
