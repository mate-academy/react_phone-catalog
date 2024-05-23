/* eslint-disable no-underscore-dangle */
import { FC } from 'react';
import { Phone } from '../../types/Phone';
import styled from './PhoneItem.module.scss';
import { formatter } from '../../helper/formater';

type Props = {
  phone: Phone
};

export const PhoneItem: FC<Props> = ({ phone }) => {
  const {
    image,
    price,
    fullPrice,
    name,
    screen,
    capacity,
    ram,
  } = phone;

  const formatPrice = formatter.format(price);
  const formatFullPrice = formatter.format(fullPrice);

  return (
    <>
      <section className={styled.content}>
        <article className={styled.image}>
          <img src={`https://mate-academy.github.io/react_phone-catalog/_new/${image}`} alt="Modile Phone" />
        </article>
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
          <button type="button">add</button>
          <button type="button">favorites</button>
        </article>
      </section>
    </>
  );
};
