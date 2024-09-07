import { Accessories, Product, ProductChars } from '../../../types';
import styles from './card.module.scss';
import classNames from 'classnames';

interface CardComponentProps {
  devices: Product | ProductChars | Accessories;
  salePrice?: number;
}

export const CardComponent = ({ devices, salePrice }: CardComponentProps) => {
  return (
    <>
      <div className={classNames(styles.card)} key={devices.id}>
        <div className={styles.card_flex_column}>
          {'image' in devices && (
            <img
              src={`./${devices.image}`}
              alt="img"
              className={styles.card_images}
            />
          )}
          <div>{'name' in devices && <span>{devices.name}</span>}</div>
          <div className={styles.card_price_container}>
            {'price' in devices && (
              <h2 className={styles.card_price}>{`$${devices.price}`}</h2>
            )}
            {salePrice ? (
              <h2 className={styles.card_price_sale}>{`$${salePrice}`}</h2>
            ) : (
              <></>
            )}
          </div>
          <div className={styles.card_stats}>
            {'screen' in devices && (
              <div className={styles.card_stats_text}>
                <span className={styles.card_stats_left}>screen</span>
                <span className={styles.card_stats_right}>
                  {devices.screen}
                </span>
              </div>
            )}
            {'capacity' in devices && (
              <div className={styles.card_stats_text}>
                <span className={styles.card_stats_left}>capacity</span>
                <span className={styles.card_stats_right}>
                  {devices.capacity}
                </span>
              </div>
            )}
            {'ram' in devices && (
              <div className={styles.card_stats_text}>
                <span className={styles.card_stats_left}>ram</span>
                <span className={styles.card_stats_right}>{devices.ram}</span>
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
    </>
  );
};
