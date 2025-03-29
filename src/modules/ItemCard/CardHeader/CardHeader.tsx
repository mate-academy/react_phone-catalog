import { useContext, useState } from 'react';
import { CatalogHeaderPath } from '../../../shared/CatalogHeaderPath';
import { useProduct } from '../../../shared/hooks/useProduct';
import s from './CardHeader.module.scss';
import classNames from 'classnames';
import { ProductSlider } from '../../../shared/ProductSlider';
import { ProductContext } from '../../../shared/context/ProductsContext';

export const CardHeader = () => {
  const { product } = useProduct();
  const { products } = useContext(ProductContext);

  const [indexOfPhoto, setIndexOfPhoto] = useState(0);

  if (!product) {
    return <p>Loading...</p>;
  }

  const filteredProducts = [...products]
    .filter(item => item.price >= product?.priceDiscount)
    .sort((a, b) => a.price - b.price);
  const photoCatalog = product.images || [];
  const colorAvailable = product.colorsAvailable || [];
  const capacityAvailable = product.capacityAvailable || [];

  return (
    <div className={s.header}>
      <div className="container">
        <CatalogHeaderPath />
        <div className={s.header__title}>
          <div className={s.header__title_back}>
            <img src="./img/icons/prev.png" alt="back" />
            <p>Back</p>
          </div>
          <h2>{product.name}</h2>
        </div>
        <div className={s.previews__wrapper}>
          <div className={s.previews__photo}>
            <img src={photoCatalog[indexOfPhoto]} alt={product.id} />
          </div>
          <div className={s.previews__photo_catalog}>
            {photoCatalog.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`photo ${index}`}
                onClick={() => {
                  setIndexOfPhoto(index);
                }}
              />
            ))}
          </div>
          <div className={s.previews__controls}>
            <div className={s.previews__controls_colors}>
              <p>Available colors</p>
              <div className={s.previews__controls_colors_choose}>
                {colorAvailable.map((color, index) => (
                  <div
                    key={index}
                    className={s.previews__controls_colors_choose_color}
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
            <div className={s.previews__controls_capacity}>
              <p>Select capacity</p>
              <div className={s.previews__controls_capacity_choose}>
                {capacityAvailable.map((capacity, index) => (
                  <div
                    key={index}
                    className={s.previews__controls_capacity_choose_memory}
                  >
                    {capacity}
                  </div>
                ))}
              </div>
            </div>
            <div className={s.previews__controls_price}>
              <p>${product.priceDiscount}</p>
              <div className={s.previews__controls_price_regular}>
                ${product.priceRegular}
              </div>
            </div>
            <div className={s.previews__controls_buttons}>
              <button
                className={s.previews__controls_buttons_add}
                aria-label="Add to cart"
              >
                Add to cart
              </button>
              <button
                className={s.previews__controls_buttons_like}
                aria-label="Add to favourites"
              >
                <img src="./img/icons/like.png" alt="add to favourites" />
              </button>
            </div>
            <div className={s.previews__controls_characteristic}>
              <div className={s.previews__controls_characteristic_category}>
                Screen <p>{product.screen}</p>
              </div>
              <div className={s.previews__controls_characteristic_category}>
                Resolution <p>{product.resolution}</p>
              </div>
              <div className={s.previews__controls_characteristic_category}>
                Processor <p>{product.processor}</p>
              </div>
              <div className={s.previews__controls_characteristic_category}>
                RAM <p>{product.ram}</p>
              </div>
            </div>
          </div>
          <div className={classNames(s.about, 'block-margin')}>
            <div className={s.about__title}>
              <h3>About</h3>
            </div>
            {product.description.map((item, index) => (
              <div key={index}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className={classNames(s.specs, 'block-margin')}>
            <div className={s.specs__title}>
              <h3>Tech specs</h3>
            </div>
            <div className={s.specs__category}>
              Screen <p>{product.screen}</p>
            </div>
            <div className={s.specs__category}>
              Resolution <p>{product.resolution}</p>
            </div>
            <div className={s.specs__category}>
              Processor <p>{product.processor}</p>
            </div>
            <div className={s.specs__category}>
              RAM <p>{product.ram}</p>
            </div>
            <div className={s.specs__category}>
              Built in memory <p>{product.capacity}</p>
            </div>
            <div className={s.specs__category}>
              Camera <p>{product.camera}</p>
            </div>
            <div className={s.specs__category}>
              Zoom <p>{product.zoom}</p>
            </div>
            <div className={s.specs__category}>
              Cell <p>{product.cell}</p>
            </div>
          </div>
        </div>
      </div>
      <ProductSlider title={'You may also like'} products={filteredProducts} />
    </div>
  );
};
