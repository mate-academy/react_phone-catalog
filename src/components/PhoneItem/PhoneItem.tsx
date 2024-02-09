import { Link, useSearchParams } from 'react-router-dom';
import { FC, useEffect } from 'react';

import { IPhone } from '../../types/Phone.interface';
import { BASE_URL, formatter } from '../../helper';
import { Buttons } from '../Buttons';

import './PhoneItem.scss';

type Props = {
  phone: IPhone,
};

export const PhoneItem: FC<Props> = ({ phone }) => {
  const {
    phoneId,
    image,
    price,
    fullPrice,
    name,
    screen,
    capacity,
    ram,
  } = phone;

  const [searchParams] = useSearchParams();
  const formatPrice = formatter.format(price);
  const formatFullPrice = formatter.format(fullPrice);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {phone
        && (
          <section className="phoneItem">
            <Link
              to={
                `/phones/${phone.phoneId}`
              }
              style={{ textDecorationLine: 'none' }}
              state={{ search: searchParams.toString() }}
            >
              <article className="phoneItem__image">
                <img src={`${BASE_URL}${image}`} alt="Modile Phone" />
              </article>
              <p className="phoneItem__title">{`${name} (iMT9G2FS/A)`}</p>
            </Link>
            <article className="phoneItem__description">
              <div className="phoneItem__prices">
                <h2 className="phoneItem__price">{formatPrice}</h2>
                <h2
                  className="phoneItem__fullPrice"
                >
                  {formatFullPrice}
                </h2>
              </div>

              <div className="phoneItem__parameters">
                <p className="phoneItem__parametersItem">
                  Screen
                  <span>{screen}</span>
                </p>

                <p className="phoneItem__parametersItem">
                  Capacity
                  <span>{capacity}</span>
                </p>
                <p className="phoneItem__parametersItem">
                  RAM
                  <span>{ram}</span>
                </p>
              </div>

              <div>
                <Buttons
                  widthSelectedButton={40}
                  heightSelectedButton={40}
                  widthAddButton={176}
                  heightAddButton={40}
                  phone={phone}
                  phoneID={phoneId}
                />
              </div>
            </article>
          </section>
        )}
    </>
  );
};
