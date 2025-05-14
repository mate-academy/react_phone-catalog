import { CardPhone } from '../cardItem/cardItemPhone'
import styles from './brandNewMode.module.scss'

export const BrandNewModel = ({phones}) => {
  return (
    <div className={styles.brand__content}>
      <div className={styles.brand__top}>
        <h2>Brand new <br></br>
          models</h2>

        <div className={styles.navigate}>
          <div className={styles.navigate__buttonR}>
          </div>
        <div className={styles.navigate__buttonL}>
          </div>
        </div>
      </div>

      <CardPhone phones={ phones} />

    </div>)
 }
