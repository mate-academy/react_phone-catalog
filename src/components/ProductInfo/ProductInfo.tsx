import classNames from 'classnames';
import { useContext, useState } from 'react';
import { CartContext } from '../../CartContext';
import { FavContext } from '../../FavContext';
import { ItemInfo } from '../../types/ItemInfo';
import { Product } from '../../types/Product';
import './ProductInfo.scss';

type Props = {
  activeProduct: Product,
  activeProductInfo: ItemInfo | null,
};

export const ProductInfo: React.FC<Props> = ({
  activeProduct,
  activeProductInfo,
}) => {
  const [activeImage, setActiveImage] = useState<string | null>('');
  const { cartItems, setCartItems } = useContext(CartContext);
  const { favourites, setFavourites } = useContext(FavContext);

  const addItem = (productId: string) => {
    if (cartItems.some((item: { id: string; }) => item.id
      === activeProduct.id)) {
      return setCartItems(cartItems.filter(item => item.id !== productId));
    }

    return setCartItems([
      ...cartItems,
      {
        id: activeProduct.id,
        quantity: 1,
        name: activeProduct.name,
        image: activeProduct.imageUrl,
        price: activeProduct.price,
        discount: activeProduct.discount,
      },
    ]);
  };

  if (!activeProductInfo) {
    return null;
  }

  return (
    <div className="productInfo">
      <h3 className="productInfo__title">{activeProductInfo.name}</h3>

      <div className="productInfo__main">
        <div className="productInfo__images">
          {activeProductInfo.images.map(image => (
            <button
              type="button"
              key={image}
              className={classNames(
                'productInfo__smallImage', {
                  'productInfo__smallImage--selected':
                        activeImage === image,
                },
              )}
              name={image}
              onClick={(e) => setActiveImage(e.currentTarget.name)}
              style={{ backgroundImage: `url(${image})` }}
              aria-label={image}
            />
          ))}
        </div>

        <img
          src={activeImage || activeProductInfo.images[0]}
          alt="activeImage"
          className="productInfo__bigImage"
        />

        <div className="productInfo__priceAndSpecs">
          <div className="productInfo__colors" />
          <div className="productInfo__capacity" />
          <div className="productInfo__prices">
            {activeProduct.discount > 0
              ? (
                <>
                  <p className="productInfo__price">
                    {`$${activeProduct.price - activeProduct.price * (activeProduct.discount / 100)}`}
                  </p>

                  <p className="productInfo__oldPrice">{`$${activeProduct.price}`}</p>
                </>
              )
              : <p className="productInfo__price">{`$${activeProduct.price}`}</p>}
          </div>

          <div className="productInfo__cartAndFav">
            <button
              className={classNames(
                'productInfo__cart', {
                  'productInfo__cart--added':
                    cartItems.find(item => item.name === activeProduct.name),
                },
              )}
              type="button"
              onClick={() => addItem(activeProduct.id)}
            >
              Add to cart
            </button>

            <button
              type="button"
              data-cy="addToFavorite"
              className={classNames(
                'productInfo__favourites', {
                  'productInfo__favourites--added':
                    favourites.includes(activeProduct.id),
                },
              )}
              onClick={() => (
                !favourites.includes(activeProduct.id)
                  ? setFavourites([
                    ...favourites,
                    activeProduct.id])
                  : setFavourites(favourites.filter((item: string) => item
                      !== activeProduct.id))
              )}
            >
              {favourites.includes(activeProduct.id)
                ? (
                  <img
                    src="./img/addedToFavourites.svg"
                    alt="addedToFavourites"
                  />
                )
                : (
                  <img
                    src="./img/favourites.svg"
                    alt="addToFavourites"
                  />
                )}
            </button>
          </div>

          <div>
            <div className="productInfo__info">
              <div className="productInfo__characteristic">
                Screen
                <p
                  className="productInfo__value"
                >
                  {activeProduct.screen || 'Not specified'}
                </p>
              </div>

              <div className="productInfo__characteristic">
                Resolution
                <p
                  className="productInfo__value"
                >
                  {activeProductInfo.display.screenResolution
                    || 'Not specified'}
                </p>
              </div>

              <div className="productInfo__characteristic">
                Processor
                <p
                  className="productInfo__value"
                >
                  {activeProductInfo.hardware.cpu || 'Not specified'}
                </p>
              </div>

              <div className="productInfo__characteristic">
                RAM
                <p
                  className="productInfo__value"
                >
                  {activeProduct.ram || 'Not specified'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="productInfo__aboutAndTechSpecs">
        <div className="productInfo__about" data-cy="productDescription">
          <h4 className="productInfo__subTitle">About</h4>

          <p className="productInfo__text">
            {activeProductInfo.description}
          </p>
        </div>

        <div className="productInfo__techSpecs">
          <h4
            className="productInfo__subTitle
                  productInfo__subTitle--techSpecs"
          >
            Tech specs
          </h4>

          <div className="productInfo__info">
            <div className="productInfo__characteristic
              productInfo__characteristic--techSpecs"
            >
              Screen
              <p
                className="productInfo__value productInfo__value--techSpecs"
              >
                {activeProduct.screen || 'Not specified'}
              </p>
            </div>

            <div className="productInfo__characteristic
              productInfo__characteristic--techSpecs"
            >
              Resolution
              <p
                className="productInfo__value productInfo__value--techSpecs"
              >
                {activeProductInfo.display.screenResolution
                      || 'Not specified'}
              </p>
            </div>

            <div className="productInfo__characteristic
              productInfo__characteristic--techSpecs"
            >
              Processor
              <p
                className="productInfo__value productInfo__value--techSpecs"
              >
                {activeProductInfo.hardware.cpu || 'Not specified'}
              </p>
            </div>

            <div className="productInfo__characteristic
              productInfo__characteristic--techSpecs"
            >
              RAM
              <p
                className="productInfo__value productInfo__value--techSpecs"
              >
                {activeProduct.ram || 'Not specified'}
              </p>
            </div>

            <div className="productInfo__characteristic
              productInfo__characteristic--techSpecs"
            >
              Built in memory
              <p
                className="productInfo__value productInfo__value--techSpecs"
              >
                {activeProduct.capacity || 'Not specified'}
              </p>
            </div>

            <div className="productInfo__characteristic
              productInfo__characteristic--techSpecs"
            >
              Camera
              <p
                className="productInfo__value productInfo__value--techSpecs"
              >
                {activeProductInfo.camera.primary || 'Not specified'}
              </p>
            </div>

            <div className="productInfo__characteristic
              productInfo__characteristic--techSpecs"
            >
              Battery
              <p
                className="productInfo__value productInfo__value--techSpecs"
              >
                {activeProductInfo.battery.type || 'Not specified'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
