/* eslint-disable no-underscore-dangle */
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { Phone } from '../../types/Phone';
import { useAppDispatch } from '../../app/hooks';
import styled from './PhoneItem.module.scss';
import { formatter } from '../../helper/formater';
import { Buttons } from '../../UI/Buttons';
import { addPhoneToCart } from '../../features/cartSlices/cartSlice';
import {
  addToFavourites,
} from '../../features/favouritesSlices/favouritesSlice';

type Props = {
  phone: Phone
};

// interface CartPhone {
//   id: string,
//   price: number,
//   image: string,
//   name: string,
// }

export const PhoneItem: FC<Props> = ({ phone }) => {
  const dispatch = useAppDispatch();
  // const cartPhones = useAppSelector(selectPhones);
  // const favouritesPhones = useAppSelector(selectFavourites);
  // console.log(cartPhones);
  // console.log(favouritesPhones);

  const {
    image,
    price,
    fullPrice,
    name,
    screen,
    capacity,
    ram,
    selected = false,
  } = phone;

  // console.log(selected);

  const handleAddPhoneToCart = () => {
    const newPhone: Phone = {
      ...phone,
      quantity: 1,
    };

    dispatch(addPhoneToCart(newPhone));
  };

  const handleAddToMyFavourites = () => {
    const newPhone: Phone = {
      ...phone,
      selected: !selected,
    };

    // console.log(selected);
    // console.log(newPhone);

    dispatch(addToFavourites(newPhone));
  };

  const formatPrice = formatter.format(price);
  const formatFullPrice = formatter.format(fullPrice);

  return (
    <>
      <section className={styled.content}>
        <Link to={phone.itemId}>
          <article className={styled.image}>
            <img src={`https://mate-academy.github.io/react_phone-catalog/_new/${image}`} alt="Modile Phone" />
          </article>
        </Link>
        <article className={styled.main__block}>
          <span>{`${name} (iMT9G2FS/A)`}</span>
          <div className={styled.main__block__prices}>
            <h2 className={styled.main__block__price}>{formatPrice}</h2>
            <h2
              className={styled.main__block__full_price}
            >
              {formatFullPrice}
            </h2>
          </div>

          <div className={styled.paramenters}>
            <p>{`Screen - ${screen}`}</p>
            <p>{`Capacity - ${capacity}`}</p>
            <p>{`RAM - ${ram}`}</p>
          </div>
          <div>
            <Buttons
              handleAddPhoneToCart={handleAddPhoneToCart}
              handleAddToMyFavourites={handleAddToMyFavourites}
              selected={selected}
            />
          </div>
        </article>
      </section>
    </>
  );
};
