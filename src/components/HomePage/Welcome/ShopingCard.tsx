import classNames from 'classnames';
import style from './shoping.module.scss';
import { NavLink } from 'react-router-dom';
import { useDevices } from '../../../context/DeviceProvider';

export const ShopingCard = () => {
  const { phones, tablets, accessories } = useDevices();

  return (
    <div className={style.shop_card}>
      <NavLink to={'/phones'} className={style.shop_card_text}>
        <img
          src="img/shop_phone.png"
          alt=""
          className={classNames(style.shop_card_img, style.shop_card_phone)}
        />
        <div>Mobile phones</div>
        <div
          className={style.shop_card_second_font}
        >{`${phones.length} models`}</div>
      </NavLink>
      <NavLink to={'/tablets'} className={style.shop_card_text}>
        <img
          src="img/shop_tablet.png"
          alt=""
          className={classNames(style.shop_card_img, style.shop_card_tablet)}
        />
        <div>Tablets</div>
        <div
          className={style.shop_card_second_font}
        >{`${tablets.length} models`}</div>
      </NavLink>
      <NavLink to={'/accessories'} className={style.shop_card_text}>
        <img
          src="img/shop_accessories.png"
          alt=""
          className={classNames(
            style.shop_card_img,
            style.shop_card_accessories,
          )}
        />
        <div>Accessories</div>
        <div
          className={style.shop_card_second_font}
        >{`${accessories.length} models`}</div>
      </NavLink>
    </div>
  );
};
