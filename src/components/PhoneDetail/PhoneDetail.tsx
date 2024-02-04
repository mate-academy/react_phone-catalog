/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { FC, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { selectPhoneDetail } from '../../features/phoneDetail';
import { useAppSelector } from '../../app/hooks';
import './PhoneDetail.scss';
import {
  BASE_URL,
  convertToHexFormat,
  formatter,
  truncatePhoneGB,
  truncatePhoneId,
} from '../../helper';
import { selectPhones } from '../../features/phoneSlice';
import { Buttons } from '../Buttons';
import { PhonesSlider } from '../Home';

type Props = {
  phoneId: string | undefined,
};

export const PhoneDetail: FC<Props> = ({ phoneId }) => {
  const phone = useAppSelector(selectPhoneDetail);
  const [image, setImage] = useState(phone?.images[0] || null);
  const phones = useAppSelector(selectPhones) || [];
  const [searchParams] = useSearchParams();

  const selectedName = phone?.name.split(' ').slice(2, 3);

  const youMayAlsoLIke = phones.filter(
    (item) => item.name.includes(selectedName?.toString() || ''),
  );

  const techSpecs = [
    { label: 'Screen', value: phone?.screen },
    { label: 'Resolution', value: phone?.resolution },
    { label: 'Processor', value: phone?.processor },
    { label: 'RAM', value: phone?.ram },
    { label: 'Built-in Memory', value: phone?.capacity },
    { label: 'Camera', value: phone?.camera },
    { label: 'Zoom', value: phone?.zoom },
    { label: 'Cell', value: phone?.cell.join(', ') },
  ];

  const findPhone = phones.find((item) => item.phoneId === phoneId || '');
  const newId = truncatePhoneId(phone, phone?.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      {phone && (
        <>
          <h1>{`${phone.name} (iMT9G2FS/A)`}</h1>

          <div className="phoneDetail" data-cy="cardsContainer">
            <div className="phoneDetail__top top">
              <section className="top__photo">
                <div>
                  <ul className="photo__slider">
                    {phone.images.map((img) => (
                      <li
                        onClick={() => setImage(img)}
                        onKeyDown={() => {}}
                        key={img}
                        className={cn(
                          'photo__img',
                          { photo__active: img === image },
                        )}
                      >
                        <img src={`${BASE_URL}/${img}`} alt="Phone" />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="photo__current">
                  <img src={`${BASE_URL}/${image || phone.images[0]}`} alt="Current" />
                </div>
              </section>

              <section className="top__parameters parameters">
                <div className="parameters__block">
                  <p className="parameters__description">Available colors</p>
                  <ul className="parameters__avaible-colors">
                    {phone.colorsAvailable.map((color) => (
                      <li
                        key={color}
                        className={cn(
                          'parameters__avaible-color',
                          { active__color: phone.color === color },
                        )}
                        style={{ backgroundColor: convertToHexFormat(color) }}
                      >
                        <Link
                          className="parameters__link"
                          to={`/phones/${newId}-${color}`}
                          state={{ search: searchParams.toString() }}
                        >
                          {' '}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <p className="parameters__description">Select capacity</p>
                  <ul className="parameters__capacity">
                    {phone.capacityAvailable.map((cpct) => (
                      <li
                        key={cpct}
                      >
                        <Link
                          to={`/phones/${truncatePhoneGB(phone, phone?.id, cpct)}`}
                          className={cn(
                            'parameters__cpct-link',
                            { active__cpct: phone.capacity === cpct },
                          )}
                          state={{ search: searchParams.toString() }}
                        >
                          {cpct}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="parameters__prices">
                    <p className="parameters__price">
                      {formatter.format(phone.priceDiscount)}
                    </p>
                    <p className="parameters__full-price">
                      {formatter.format(phone.priceRegular)}
                    </p>
                  </div>

                  <div className="parameters__buttons">
                    <Buttons
                      widthAddButton={276}
                      heightAddButton={48}
                      widthSelectedButton={48}
                      heightSelectedButton={48}
                      phoneID={phone.id}
                      phone={findPhone}
                    />
                  </div>

                  <div className="parameters__technical-data">
                    <p className="parameters__technical-item">
                      Screen
                      <span>{phone.screen}</span>
                    </p>
                    <p className="parameters__technical-item">
                      Resolution
                      <span>{phone.resolution}</span>
                    </p>
                    <p className="parameters__technical-item">
                      Processor
                      <span>{phone.processor}</span>
                    </p>
                    <p className="parameters__technical-item">
                      RAM
                      <span>{phone.ram}</span>
                    </p>
                  </div>
                </div>
                <div className="parameters__id">ID: 802390</div>
              </section>
            </div>

            <div className="phoneDetail__bottom" data-cy="productDescription">
              <section className="about">
                <h2 className="about__title">About</h2>
                <div className="about__info">
                  {phone.description.map(({ text, title }) => (
                    <div className="about__info-item" key={title}>
                      <h3 className="about__info-title">{title}</h3>
                      <span
                        className="about__info-text"
                      >
                        {text[0]}
                      </span>
                      <span
                        className="about__info-text about__info-text--one"
                      >
                        {text[1]}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="tech-specs">
                <h2 className="tech-specs__title">Tech specs</h2>
                <div className="tech-specs__wrapper">
                  {techSpecs.map((spec) => (
                    <p className="tech-specs__item" key={spec.label}>
                      {spec.label}
                      <span>{spec.value}</span>
                    </p>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <PhonesSlider title="You may also like" phones={youMayAlsoLIke} />
        </>
      )}
    </>
  );
};
