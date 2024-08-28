import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackBtn } from '../../components/BackBtn';
import { AppContext } from '../../AppContext';
import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ProductPrices } from '../../components/ProductPrices';
import { ProductSpecs } from '../../components/ProductSpecs';
import { ProductButtons } from '../../components/ProductButtons';

export const ProductDetailsPage = () => {
  const { phones, isLoading } = useContext(AppContext);
  const { id } = useParams<{ id: string }>();

  const product = useMemo(
    () => phones.find(phone => phone.id === id),
    [phones, id],
  );

  return (
    <div className="product-details page">
      <div className="container">
        {isLoading && <Loader />}

        {!isLoading && (
          <>
            <Breadcrumbs className="product-details__breadcrumbs" />
            <BackBtn className="product-details__back-btn" />

            {!product ? (
              <span className="notification"></span>
            ) : (
              <section className="details">
                <h2 className="details__title section-title">{product.name}</h2>

                <div className="details__images-slider images-slider">
                  <ul className="images-slider__images">
                    <li className="images-slider__image"></li>
                  </ul>

                  <ul className="images-slider__thumbs">
                    <li className="images-slider__thumb"></li>
                  </ul>
                </div>

                <div className="details__info">
                  <div className="details__colors">
                    <div className="details__colors-top">
                      <span className="details__info-title">
                        Available colors
                      </span>
                      <span className="details__info-id">ID: 802390</span>
                    </div>

                    <ul className="details__colors-list">
                      <li className="details__colors-item">
                        <button className="details__colors-btn"></button>
                      </li>
                    </ul>
                  </div>

                  <div className="details__capacity">
                    <span className="details__info-title">
                      Available colors
                    </span>

                    <ul className="details__capacity-list">
                      <li className="details__capacity-item">
                        <button className="details__capacity-btn"></button>
                      </li>
                    </ul>
                  </div>

                  <ProductPrices product={product} />

                  <ProductButtons product={product} />

                  <ProductSpecs
                    product={product}
                    specs={[
                      { key: 'screen', label: 'Screen' },
                      { key: 'resolution', label: 'Resolution' },
                      { key: 'processor', label: 'Processor' },
                      { key: 'ram', label: 'RAM' },
                    ]}
                  />
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};
