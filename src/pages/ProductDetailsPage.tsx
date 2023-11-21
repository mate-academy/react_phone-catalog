import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Phone } from '../type/Phone';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { DetailsPhone } from '../type/DetailsPhone';
import { getPhone } from '../api/phone';
import { Loader } from '../components/Loader/Loader';
import { BackButton } from '../components/BackButton/BackButton';
import { ImageSwitcher } from '../components/ImageSwitcher/ImageSwitcher';
import { ProductOption } from '../components/ProductOption/ProductOption';
import { ProductDescription } from '../type/PhoneDescription';
import { ProductsSlider } from '../components/ProductsSlider/ProductsSlider';
import { ProductNotFoundPage } from './ProductNotFoundPage';

type Props = {
  phones: Phone[];
};

export const ProductDetailsPage: React.FC<Props> = ({ phones }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { phoneId } = useParams();
  const [phone, setPhone] = useState<DetailsPhone | null>(null);

  const phoneN = phones.find(ph => ph.itemId === phoneId) || null;

  useEffect(() => {
    setIsLoading(true);

    if (phoneId) {
      getPhone(phoneId)
        .then((respons) => {
          setPhone(respons);
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [phoneId]);

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="productDetail">
      <div className="container">
        <div className="productDetail__wrapper">
          {phoneN && (
            <div className="productDetail__breadcrumbs">
              <Breadcrumbs phone={phoneN} />
            </div>
          )}

          <div className="productDetail__back">
            <BackButton />
          </div>

          {phoneN && (
            <div className="productDetail__all">
              <h1 className="title productDetail__titleMain">{phone?.name}</h1>

              <section className="productDetail__infoTop">
                <ImageSwitcher phone={phone} />

                <ProductOption phone={phone} phoneN={phoneN} />
              </section>

              <section className="productDetail__infoBottom">
                <aside className="productDetail__infoBottomLeft">
                  <h2 className="productDetail__titleH2">About</h2>
                  {phone?.description.map((info: ProductDescription) => (
                    <div className="productDetail__description">
                      <h3 className="productDetail__titleH3">{info.title}</h3>

                      <p className="productDetail__p">{info.text}</p>
                    </div>
                  ))}
                </aside>

                <aside className="productDetail__infoBottomRight">
                  <h2 className="productDetail__titleH2">Tech specs</h2>
                  <div className="productDetail__specs">
                    <div className="productDetail__blokL">
                      <p>Screen</p>
                      <p>Resolution</p>
                      <p>Processor</p>
                      <p>RAM</p>
                      <p>Built in memory</p>
                      <p>Camera</p>
                      <p>Zoom</p>
                      <p>Cell</p>
                    </div>
                    <div className="productDetail__blokR">
                      <p>{phone?.screen}</p>
                      <p>{phone?.resolution}</p>
                      <p>{phone?.processor}</p>
                      <p>{phone?.ram}</p>
                      <p>{phoneN?.capacity}</p>
                      <p>{phone?.camera}</p>
                      <p>{phone?.zoom}</p>
                      <p>{phone?.cell.join(', ')}</p>
                    </div>
                  </div>
                </aside>
              </section>

              <div className="productDetail__slider">
                <ProductsSlider title="You may also like" phones={phones} />
              </div>
            </div>
          )}

          {!phoneN && (
            <ProductNotFoundPage title="Phone was not found" />
          )}

        </div>
      </div>
    </div>
  );
};
