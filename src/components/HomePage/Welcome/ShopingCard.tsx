import classNames from 'classnames';
import style from './shoping.module.scss';

export const ShopingCard = () => {
  return (
    <div className={style.shop_card}>
      <div>
        <img
          src="/img/shop_phone.png"
          alt=""
          className={classNames(style.shop_card_img, style.shop_card_phone)}
        />
        <div>Mobile phones</div>
        <div className={style.shop_card_second_font}>92 models</div>
      </div>
      <div>
        <img
          src="/img/shop_tablet.png"
          alt=""
          className={classNames(style.shop_card_img, style.shop_card_tablet)}
        />
        <div>Tablets</div>
        <div className={style.shop_card_second_font}>92 models</div>
      </div>
      <div>
        <img
          src="/img/shop_accessories.png"
          alt=""
          className={classNames(
            style.shop_card_img,
            style.shop_card_accessories,
          )}
        />
        <div>Accessories</div>
        <div className={style.shop_card_second_font}>92 models</div>
      </div>
    </div>
  );
};
