import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './OneDevicesPage.scss';
import { Product, ProductMore } from '../../type/Product';
import { Tech } from './Tech/Tech';
import { SliderDevices } from '../Home/SliderDevices/SliderDevices';
import listOfProduct from '../../../api/products.json';
import { ChangeCard } from './ChangeCard/ChangeCard';
import { PathToPage } from '../../PartToPage/PathToPage';
import { PreviousPage } from '../../PartToPage/PreviousPage/PreviousPage';
import classNames from 'classnames';
import { NotPage } from '../NotPage/NotPage';
import { useTranslation } from 'react-i18next';

export const OneDevicesPage: React.FC = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const [product, setProduct] = useState<ProductMore | null>(null);
  const [headImg, setHeadImg] = useState<string | null>(null);

  const { t } = useTranslation();
  const images = product?.images || [];
  const imagesPath = images.map(image => `/react_phone-catalog/${image}`);

  const getRandomProducts = (products: Product[]) => {
    const randomProducts = [];

    while (randomProducts.length < 10 && products.length > 0) {
      const randomIndex = Math.floor(Math.random() * products.length);
      const randomProduct = products.splice(randomIndex, 1)[0];

      randomProducts.push(randomProduct);
    }

    return randomProducts;
  };

  useEffect(() => {
    const loadProduct = async () => {
      try {
        let data;

        switch (category) {
          case 'phones':
            data = (await import('../../../api/phones.json')).default;
            break;
          case 'tablets':
            data = (await import('../../../api/tablets.json')).default;
            break;
          case 'accessories':
            data = (await import('../../../api/accessories.json')).default;
            break;
          default:
            return;
        }

        const foundProduct = data.find((item: ProductMore) => item.id === id);

        setProduct(foundProduct || null);
        if (foundProduct?.images.length) {
          setHeadImg(`/react_phone-catalog/${foundProduct.images[0]}`);
        }
      } catch (error) {
        return;
      }
    };

    loadProduct();
  }, [category, id, product]);

  if (!product) {
    return <NotPage />;
  }

  return (
    <div className="one-devices">
      <section className="one-devices__section one-devices__section--first">
        <PathToPage
          arrayPath={[category?.toString() || '', id?.toString() || ''].filter(
            Boolean,
          )}
        />
        <PreviousPage />
        <h1 className="text--h2 one-devices__title">{product.name}</h1>
      </section>

      {headImg && (
        <div className="images__main__container">
          <img className="images__main" src={headImg} alt={product.images[0]} />
        </div>
      )}

      <div className="images__conteiner">
        {images &&
          imagesPath.map(img => (
            <div
              key={img}
              className={classNames('images__small__container', {
                'images__small__container--active': img === headImg,
              })}
              onClick={() => setHeadImg(img)}
            >
              <img className="image images__small" src={img} alt={img} />
            </div>
          ))}
      </div>

      <section className="one-devices__card">
        <ChangeCard product={product} />
      </section>

      <section className="one-devices__section one-devices__section--left">
        <h3 className="text--h3 section__title">{t('oneDevicePage.0')}</h3>
        <div className="section__content">
          {product.description.map((obj, index) => (
            <div className="section__content--one" key={index}>
              <h4 className="text--h4">{obj.title}</h4>
              <div className="one-devices__text text--body">
                {obj.text.map((text, idx) => (
                  <p key={idx}>{text}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="one-devices__section one-devices__section--right">
        <h3 className="text--h3 section__title">{t('oneDevicePage.1')}</h3>
        <Tech product={product} isBigBlock={true} />
      </section>

      <section className="one-devices__section one-devices__section--may-like">
        <SliderDevices
          title={t('oneDevicePage.2')}
          listProduct={getRandomProducts([...listOfProduct])}
        />
      </section>
    </div>
  );
};
