import { Accessories, Product, ProductChars } from '../../../types';
import styles from './card.module.scss';
import classNames from 'classnames';

interface CardComponentProps {
  devices: (Product | ProductChars | Accessories)[];
}

export const CardComponent = ({ devices }: CardComponentProps) => {
  return (
    <>
      {devices.map(device => (
        <div className={classNames(styles.card)} key={device.id}>
          <div className={styles.card_flex_column}>
            {'image' in device && (
              <img
                src={`.${device.image}`}
                alt="img"
                className={styles.card_images}
              />
            )}
            <div>{'name' in device && <span>{device.name}</span>}</div>
            {'price' in device && (
              <h2 className={styles.card_price}>{`$${device.price}`}</h2>
            )}
            <div className={styles.card_stats}>
              {'screen' in device && (
                <div className={styles.card_stats_text}>
                  <span className={styles.card_stats_left}>screen</span>
                  <span className={styles.card_stats_right}>
                    {device.screen}
                  </span>
                </div>
              )}
              {'capacity' in device && (
                <div className={styles.card_stats_text}>
                  <span className={styles.card_stats_left}>capacity</span>
                  <span className={styles.card_stats_right}>
                    {device.capacity}
                  </span>
                </div>
              )}
              {'ram' in device && (
                <div className={styles.card_stats_text}>
                  <span className={styles.card_stats_left}>ram</span>
                  <span className={styles.card_stats_right}>{device.ram}</span>
                </div>
              )}
            </div>
            <div className={styles.card_buy_container}>
              <button className={styles.card_buy_button}>Add to card</button>
              <button className={styles.card_follow_button}>
                <img src="./img/Vector(Heart).svg" alt="heart" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
