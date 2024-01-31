import { Link } from 'react-router-dom';
import { FC } from 'react';
import { IPhone } from '../../types/Phone.interface';
import './PhoneItem.scss';
import { formatter } from '../../helper/formater';
import { BASE_URL } from '../../helper/BASE_URL';
import { Buttons } from '../Buttons/Buttons';

type Props = {
  phone: IPhone,
  searchParams?: URLSearchParams;
};

export const PhoneItem: FC<Props> = ({ phone, searchParams = {} }) => {
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

  const formatPrice = formatter.format(price);
  const formatFullPrice = formatter.format(fullPrice);

  return (
    <>
      {phone
        && (
          <section className="phoneItem">
            <Link
              to={
                `/phones/${phone.phoneId}`
              }
              state={{ search: searchParams.toString() }}
            >
              <article className="phoneItem__image">
                <img src={`${BASE_URL}${image}`} alt="Modile Phone" />
              </article>
            </Link>
            <article className="phoneItem__description">
              <p className="phoneItem__title">{`${name} (iMT9G2FS/A)`}</p>
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

PhoneItem.defaultProps = {
  searchParams: new URLSearchParams(),
};
