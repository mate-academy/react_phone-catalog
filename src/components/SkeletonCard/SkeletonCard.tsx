import classNames from 'classnames';
import styles from './SkeletonCard.module.scss';

interface Props {
  sliderCard?: boolean;
}

export const SkeletonCard: React.FC<Props> = ({ sliderCard = false }) => (
  <div
    className={classNames(styles.skeletonCard, {
      [styles.sliderCard]: sliderCard,
    })}
  >
    <div className={classNames(styles.img, styles.skeleton)} />

    <div className={styles.nameWrapper}>
      <div className={classNames(styles.nameFirstLine, styles.skeleton)} />
      <div className={classNames(styles.nameSecondLine, styles.skeleton)} />
    </div>

    <p className={classNames(styles.price, styles.skeleton)}>$2000</p>

    <div className={styles.hr} />

    <table>
      <tbody className={styles.tbody}>
        <tr className={styles.row}>
          <td className={classNames(styles.cell, styles.skeleton)}>Screen</td>
          <td className={classNames(styles.cell, styles.skeleton)}>6.1 OLED</td>
        </tr>
        <tr className={styles.row}>
          <td className={classNames(styles.cell, styles.skeleton)}>Capacity</td>
          <td className={classNames(styles.cell, styles.skeleton)}>128 GB</td>
        </tr>
        <tr className={styles.row}>
          <td className={classNames(styles.cell, styles.skeleton)}>RAM</td>
          <td className={classNames(styles.cell, styles.skeleton)}>6 GB</td>
        </tr>
      </tbody>
    </table>

    <div className={styles.buttons}>
      <div className={classNames(styles.btnAdd, styles.skeleton)} />
      <div className={classNames(styles.btnLike, styles.skeleton)} />
    </div>
  </div>
);
