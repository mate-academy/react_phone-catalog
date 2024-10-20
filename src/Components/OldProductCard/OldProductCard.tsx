import { Link } from 'react-router-dom';
import { OldProduct } from '../types/OldProducts';
import './OldProductCard.scss';
import { useContext } from 'react';
import { CatalogContext } from '../CatalogProvider';
import classNames from 'classnames';

type Props = {
  discountProduct: OldProduct;
};

export const DiscountProduct = ({ discountProduct }: Props) => {
  const {
    favouriteOldItems,
    setFavouriteOldItems,
    oldAddedItems,
    setOldAddedItems,
    setTotalOldModels,
    totalOldModels,
    totalOldProductsPrice,
    setTotalOldProductsPrice,
    amountOfOldModels,
  } = useContext(CatalogContext);
  const addOldItems = (addedItem: OldProduct) => {
    const readyToAdd = oldAddedItems.some(item => item.id === addedItem.id);

    if (
      addedItem.id === discountProduct.id &&
      oldAddedItems.find(item => item.id === addedItem.id)
    ) {
      const updateItem = oldAddedItems.filter(item => item.id !== addedItem.id);

      setTotalOldModels(totalOldModels - amountOfOldModels);
      setOldAddedItems(updateItem);
      setTotalOldProductsPrice(
        totalOldProductsPrice - amountOfOldModels * addedItem.price,
      );
    }

    if (
      addedItem.id === discountProduct.id &&
      !oldAddedItems.find(item => item.id === addedItem.id)
    ) {
      setTotalOldModels(totalOldModels + 1);
      setTotalOldProductsPrice(totalOldProductsPrice + addedItem.price);
      setOldAddedItems([...oldAddedItems, addedItem]);
    }

    if (readyToAdd) {
      const updateItem = oldAddedItems.filter(item => item.id !== addedItem.id);

      setOldAddedItems(updateItem);
    }
  };

  const addOldProductToFavourite = (oldItem: OldProduct) => {
    const readyToAdd = favouriteOldItems.some(item => item.id === oldItem.id);

    if (
      oldItem.id === discountProduct.id &&
      oldAddedItems.find(item => item.id === oldItem.id)
    ) {
      const updateItem = oldAddedItems.filter(item => item.id !== oldItem.id);

      setTotalOldModels(totalOldModels - amountOfOldModels);
      setOldAddedItems(updateItem);
      setTotalOldProductsPrice(
        totalOldProductsPrice - amountOfOldModels * oldItem.price,
      );
    }

    if (
      oldItem.id === discountProduct.id &&
      !oldAddedItems.find(item => item.id === oldItem.id)
    ) {
      setTotalOldModels(totalOldModels + 1);
      setTotalOldProductsPrice(totalOldProductsPrice + oldItem.price);
      setOldAddedItems([...oldAddedItems, oldItem]);
    }

    if (readyToAdd) {
      const updateItem = favouriteOldItems.filter(
        item => item.id !== oldItem.id,
      );

      setFavouriteOldItems(updateItem);
    }
  };

  return (
    <div className="oldproductcard">
      <Link to={`/oldPhones/${discountProduct.id}`}>
        <img
          className="oldproductcard__image"
          src={discountProduct.imageUrl}
          alt={discountProduct.name}
        />
      </Link>

      <h2 className="oldproductcard__name">{discountProduct.name}</h2>
      <div className="oldproductcard__prices">
        <div className="oldproductcard__price">
          {`$${discountProduct.price - discountProduct.discount}`}
        </div>
        {discountProduct.discount === 0 ? (
          ''
        ) : (
          <div className="oldproductcard__before-discount">
            <del>{`$${discountProduct.price}`}</del>
          </div>
        )}
      </div>
      <div className="oldproductcard__line" />
      <div className="oldproductcard__description">
        <div className="oldproductcard__screen">
          <div className="oldproductcard__screen--title">Screen</div>
          <div className="oldproductcard__screen--value">
            {discountProduct.screen}
          </div>
        </div>
        <div className="oldproductcard__capacity">
          <div className="oldproductcard__capacity--title">Capacity</div>
          <div className="oldproductcard__capacity--value">
            {discountProduct.capacity}
          </div>
        </div>
        <div className="oldproductcard__ram">
          <div className="oldproductcard__ram--title">RAM</div>
          <div className="oldproductcard__ram--value">
            {discountProduct.ram}
          </div>
        </div>
      </div>
      <div className="oldproductcard__buttons">
        <button
          className={classNames('oldproductcard__adding-button', {
            'oldproductcard__adding-button--is-active': oldAddedItems.find(
              item => item.id === discountProduct.id,
            ),
          })}
          onClick={() => addOldItems(discountProduct)}
        >
          {oldAddedItems.find(item => item.id === discountProduct.id)
            ? 'ADDED'
            : 'Add to cart'}
        </button>
        <button
          className={classNames('oldproductcard__button-with-heart', {
            'oldproductcard__button-with-heart--is-active':
              favouriteOldItems.find(item => item.id === discountProduct.id),
          })}
          onClick={() => addOldProductToFavourite(discountProduct)}
        ></button>
      </div>
    </div>
  );
};
