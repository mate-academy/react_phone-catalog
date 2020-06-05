import React, { useEffect, useState, useContext } from 'react';
import classNames from 'classnames';
import { getDetails, getProducts } from '../../api';
import Loader from '../loader/Loader';
import './ItemPage.scss';
import YouMayAlsoLike from './YouMayAlsoLike';
import { CartContext } from '../../helpers/CartContext';
import { FavoritesContext } from '../../helpers/FavoritesContext';
import ItemOptions from '../../helpers/ItemOptions';
import ItemPageLocation from './ItemPageLocation';

type Props = {
  currentItem: string;
};

const ItemPage: React.FC<Props> = ({ currentItem }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [itemDetail, setItemDetail] = useState<ItemDetail>();
  const [currentItemInformation, setCurrentItemInformation] = useState<Item>();
  const [preparedPhones, setPreparedPhones] = useState<Item[]>([]);
  const [currentImg, setcurrentImg] = useState<string>();

  const { isAddedToCart, addToCart, removeFromCart } = useContext(CartContext);
  const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(data => setCurrentItemInformation(data.find((item: Item) => item.id === currentItem)));
    getDetails(currentItem)
      .then(setItemDetail);
    getProducts()
      .then(setPreparedPhones);
    setTimeout(() => setIsLoading(false), 500);
  }, [currentItem]);

  useEffect(() => {
    setcurrentImg((currentItemInformation && currentItemInformation.imageUrl) || '');
  }, [currentItemInformation]);

  const onHandleClickImg = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLImageElement;

    setcurrentImg(target.src);
  };

  if (isLoading) {
    return <Loader />;
  }

  const priceWithDiscount = currentItemInformation
      && currentItemInformation.price
      - (currentItemInformation.price * (currentItemInformation.discount / 100));

  return (
    <div className="item-page">
      <ItemPageLocation
        currentItemTitle={currentItemInformation && currentItemInformation.name}
        type={currentItemInformation && currentItemInformation.type}
      />
      <section className="item-description">
        <h3 className="item-description__title">{currentItemInformation && currentItemInformation.name}</h3>
        <div className="item-description__main-block main-block">
          <div className="gallery">
            {itemDetail && itemDetail.images.map(item => (
              <button
                className="gallery__img-button"
                key={item}
                type="button"
                onClick={(event) => onHandleClickImg(event)}
              >
                <img
                  className="gallery__img"
                  src={item}
                  alt="galery"
                />
              </button>
            ))}
          </div>
          <div className="main-block__img">
            <img src={currentImg} alt={currentItemInformation && currentItemInformation.name} />
          </div>
          <div className="main-block__description">
            <span className="item__price main-block__price">
              <p className="item__price-discount">{`$${priceWithDiscount}`}</p>
              <p className="item__price-value">
                {(currentItemInformation && currentItemInformation.price === priceWithDiscount)
                  ? '' : (`$${currentItemInformation && currentItemInformation.price}`)}
              </p>
            </span>
            <div className="description item__description">
              <ItemOptions title="Screen" itemInfo={currentItemInformation && currentItemInformation.screen} />
              <ItemOptions title="Capacity" itemInfo={currentItemInformation && currentItemInformation.capacity} />
              <ItemOptions title="Ram" itemInfo={currentItemInformation && currentItemInformation.ram} />
            </div>
            <div className="item__button">
              <input
                className={classNames('item__button-add-to-cart', { 'item__button-add-to-cart-selected': currentItemInformation && isAddedToCart(currentItemInformation) })}
                type="button"
                value={currentItemInformation && isAddedToCart(currentItemInformation) ? 'Added to cart' : 'Add to cart'}
                onClick={() => {
                  if (currentItemInformation && isAddedToCart(currentItemInformation)) {
                    currentItemInformation
              && removeFromCart(currentItemInformation);
                  } else {
                    currentItemInformation
              && addToCart(currentItemInformation);
                  }
                }}
              />
              <label
                className="item__button-favorite"
                htmlFor={`button-favorite-${currentItemInformation && currentItemInformation.id}`}
              >
                <input
                  className="item__button-favorite-input"
                  type="checkbox"
                  checked={currentItemInformation && isFavorite(currentItemInformation)}
                  id={`button-favorite-${currentItemInformation && currentItemInformation.id}`}
                  onChange={(event) => {
                    if (event.target.checked) {
                      currentItemInformation
                && addFavorite(currentItemInformation);
                    } else {
                      currentItemInformation
                && removeFavorite(currentItemInformation);
                    }
                  }}
                />
                <span className="item__button-favorite-check" />
              </label>
            </div>
          </div>
        </div>
        <div className="other-block">
          <div className="other-block__description">
            <h4 className="other-block__article">About</h4>
            <h4 className="other-block__article-description">And then there was Pro</h4>
            <p>{itemDetail && itemDetail.description}</p>
            <h4 className="other-block__article-description">Camera</h4>
            <p>{itemDetail && itemDetail.additionalFeatures}</p>
            <h4 className="other-block__article-description">Shoot it. Flip it. Zoom it. Tweak it. Love it</h4>
            <p>
              Epic processing power means it can shoot
              4K video with extended dynamic range and cinematic
              video stabilization — all at 60 fps. You get more
              creative control, too, with four times more scene
              and powerful new editing tools to play with.
            </p>
          </div>
          <div className="other-block__specification">
            <h4 className="other-block__article">Tech specs</h4>
            <div className="description item__description">
              <ItemOptions title="OS" itemInfo={itemDetail && itemDetail.android?.os} />
              <ItemOptions title="Hardware" itemInfo={itemDetail && itemDetail.hardware.cpu} />
              <ItemOptions title="Ram" itemInfo={currentItemInformation && currentItemInformation.ram} />
              <ItemOptions title="Display" itemInfo={itemDetail && itemDetail.display.screenResolution} />
              <ItemOptions title="Camera Primary" itemInfo={itemDetail && itemDetail.camera.primary} />
              <ItemOptions title="Camera Zoom" itemInfo={itemDetail && (itemDetail.camera.zoom || 'Not avaible')} />
              <ItemOptions title="Battery" itemInfo={itemDetail && itemDetail.battery?.type} />
              <ItemOptions title="Storage" itemInfo={itemDetail && itemDetail.storage?.flash} />
            </div>
          </div>
        </div>
      </section>
      <section className="item-page-slider">
        <YouMayAlsoLike preparedPhones={preparedPhones} />
      </section>
    </div>
  );
};

export default ItemPage;
