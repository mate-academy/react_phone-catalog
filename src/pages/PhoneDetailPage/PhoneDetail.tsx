import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './PhoneDetail.scss';

import { Phone } from '../../types/Phone';
import { PhoneDetail } from '../../types/PhoneDetail';
import { getPhone } from '../../utils/phone';
import { Loader } from '../../components/Loader/Loader';
import { ButtonBack } from '../../components/ButtonBack/ButtonBack';
import { ProductImages } from '../../components/ProductImages/ProductImages';
import { ProductParams } from '../../components/ProductParams/ProductParams';
import { LikeAlso } from '../../components/LikeAlso/LikeAlso';
import { Navigation } from '../../components/Navigation/Navigation';

type Props = {
  phones: Phone[];
};

export const ProductDetails: React.FC<Props> = ({ phones }) => {
  const [isLoading, setiSLoading] = useState(true);
  const [phone, setPhone] = useState<PhoneDetail | null>(null);
  const { phoneId } = useParams<{ phoneId: string }>();

  useEffect(() => {
    if (phoneId) {
      getPhone(phoneId)
        .then(setPhone)
        .finally(() => setiSLoading(false));
    }
  }, [phoneId]);

  const images = phone?.images;

  return (
    <>
      <Navigation />

      <main>
        {isLoading && <Loader />}

        {!isLoading && (
          <div className="details">
            <section className="breadcrumbs">
              <Link
                to="/"
                className="breadcrumbs__button breadcrumbs__icon"
              />
              <div className="breadcrumbs__arrow breadcrumbs__icon" />
              <Link
                to="/Phones"
                className="breadcrumbs__pages"
              >
                <p>Phones</p>
              </Link>
              <div className="breadcrumbs__arrow breadcrumbs__icon" />
              <p className="breadcrumbs__phoneId">{phoneId}</p>
            </section>

            <section className="details__title">
              <ButtonBack />

              <h1 className="details__title--name">{phone?.name}</h1>
            </section>

            <section className="details__main">
              <div className="details__main--wrapper">
                {images && <ProductImages images={images} />}

                {phone && phoneId && (
                  <ProductParams
                    colors={phone.colorsAvailable}
                    currentCapacity={phone.capacity}
                    nameId={phone.namespaceId}
                    currentColor={phone.color}
                    phone={phone}
                    capacities={phone.capacityAvailable}
                    phoneId={phoneId}
                    phones={phones}
                  />
                )}
              </div>
            </section>

            <section className="details__description">
              <div className="details__description--about">
                <h2 className="details__description--h2">About</h2>

                <h3 className="details__description--about--h3">
                  {phone?.description[0].title}
                </h3>

                <p className="details__description--about--title">
                  {phone?.description[0].text}
                </p>

                <h3 className="details__description--about--h3">
                  {phone?.description[1].title}
                </h3>

                <p className="details__description--about--title">
                  {phone?.description[1].text}
                </p>

                <h3 className="details__description--about--h3">
                  {phone?.description[2].title}
                </h3>

                <p className="details__description--about--title">
                  {phone?.description[2].text}
                </p>
              </div>

              <div className="details__description--tech">
                <h2 className="details__description--h2">Tech specs</h2>

                <div className="details__description--tech--specs">
                  <p className="details__description--tech--name">Screen</p>

                  <p className="details__description--tech--value">
                    {phone?.screen}
                  </p>
                </div>

                <div className="details__description--tech--specs">
                  <p className="details__description--tech--name">Resolution</p>

                  <p className="details__description--tech--value">
                    {phone?.resolution}
                  </p>
                </div>

                <div className="details__description--tech--specs">
                  <p className="details__description--tech--name">Processor</p>

                  <p className="details__description--tech--value">
                    {phone?.processor}
                  </p>
                </div>

                <div className="details__description--tech--specs">
                  <p className="details__description--tech--name">RAM</p>

                  <p className="details__description--tech--value">
                    {phone?.ram}
                  </p>
                </div>

                <div className="details__description--tech--specs">
                  <p className="details__description--tech--name">
                    Built in memory
                  </p>

                  <p className="details__description--tech--value">
                    {phone?.capacity}
                  </p>
                </div>

                <div className="details__description--tech--specs">
                  <p className="details__description--tech--name">Camera</p>

                  <p className="details__description--tech--value">
                    {phone?.camera}
                  </p>
                </div>

                <div className="details__description--tech--specs">
                  <p className="details__description--tech--name">Zoom</p>

                  <p className="details__description--tech--value">
                    {phone?.zoom}
                  </p>
                </div>

                <div className="details__description--tech--specs">
                  <p className="details__description--tech--name">Cell</p>

                  <p className="details__description--tech--value">
                    {phone?.cell.join(', ')}
                  </p>
                </div>
              </div>
            </section>

            <section className="details__like">
              <LikeAlso phones={phones} />
            </section>
          </div>
        )}
      </main>
    </>
  );
};
