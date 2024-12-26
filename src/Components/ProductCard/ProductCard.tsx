import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import card from './ProductCard.module.scss';
import { useContext } from 'react';
import { CatalogContext } from '../CatalogProvider';
import classNames from 'classnames';
import { SkeletonProductCard } from './SkeletonProductCard';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const {
    favouriteItems,
    setFavouriteItems,
    addedItems,
    setAddedItems,
    setTotalPrice,
    totalPrice,
    setTotalModels,
    totalModels,
    products,
    setProducts,
    loading,
  } = useContext(CatalogContext);

  const addItems = (addedItem: Product) => {
    const readyToAdd = addedItems.some(item => item.id === addedItem.id);

    if (
      addedItem.id === product.id &&
      addedItems.find(item => item.id === addedItem.id)
    ) {
      const updateItem = addedItems.filter(item => item.id !== addedItem.id);

      setTotalModels(totalModels - product.amountOfModels);
      setAddedItems(updateItem);
      setTotalPrice(totalPrice - product.amountOfModels * addedItem.price);
    }

    if (
      addedItem.id === product.id &&
      !addedItems.find(item => item.id === addedItem.id)
    ) {
      setTotalModels(totalModels + 1);
      setTotalPrice(totalPrice + addedItem.price);
      setAddedItems([...addedItems, addedItem]);
    }

    if (readyToAdd) {
      const updateItem = addedItems.filter(item => item.id !== addedItem.id);
      const updateProduct = products.map(currentProduct => {
        if (currentProduct.id === addedItem.id) {
          return {
            ...currentProduct,
            amountOfModels: 1,
          };
        }

        return currentProduct;
      });

      setAddedItems(updateItem);
      setProducts(updateProduct);
    }
  };

  const addFavouriteProduct = (favouriteProduct: Product) => {
    const readyToAddItem = favouriteItems.some(
      item => item.id === favouriteProduct.id,
    );

    if (favouriteProduct.id !== product.id) {
      const updateItem = favouriteItems.filter(
        item => item.id !== favouriteProduct.id,
      );

      setFavouriteItems(updateItem);
    } else {
      setFavouriteItems([...favouriteItems, favouriteProduct]);
    }

    if (readyToAddItem) {
      const updateItem = favouriteItems.filter(
        item => item.id !== favouriteProduct.id,
      );

      setFavouriteItems(updateItem);
    }
  };

  return (
    <>
      {loading ? (
        <SkeletonProductCard />
      ) : (
        <div className={card.productcard}>
          <Link
            to={`/${product.category}/${product.itemId}`}
            className={card.productcard__imagelink}
          >
            <img
              className={card.productcard__image}
              src={product.image}
              alt={product.name}
            />
          </Link>
          <h2 className={card.productcard__name}>{product.name}</h2>
          <div className={card.productcard__prices}>
            <div className={card.productcard__price}>{`$${product.price}`}</div>
          </div>
          <div className={card.productcard__line}></div>
          <div className={card.productcard__description}>
            <div className={card.productcard__data}>
              <div className={card.productcard__title}>Screen</div>
              <div className={card.productcard__value}>{product.screen}</div>
            </div>
            <div className={card.productcard__data}>
              <div className={card.productcard__title}>Capacity</div>
              <div className={card.productcard__value}>{product.capacity}</div>
            </div>
            <div className={card.productcard__data}>
              <div className={card.productcard__title}>RAM</div>
              <div className={card.productcard__value}>{product.ram}</div>
            </div>
          </div>
          <div className={card.productcard__buttons}>
            <button
              className={card.productcard__addingbutton}
              onClick={() => addItems(product)}
            >
              {addedItems.find(item => item.id === product.id)
                ? 'ADDED'
                : 'Add to cart'}
            </button>
            <button
              className={classNames([card.productcard__heart], {
                [card.productcard__heartisactive]: favouriteItems.find(
                  item => item.id === product.id,
                ),
              })}
              onClick={() => addFavouriteProduct(product)}
            ></button>
          </div>
        </div>
      )}
    </>
  );
};
