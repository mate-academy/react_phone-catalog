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
    themeSwitcher,
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
      const updateAddedItem = addedItems.filter(
        item => item.id !== addedItem.id,
      );
      const updateProduct = products.map(currentProduct => {
        if (currentProduct.id === addedItem.id) {
          return {
            ...currentProduct,
            amountOfModels: 1,
          };
        }

        return currentProduct;
      });

      const updateFavourites = favouriteItems.map(currentProduct => {
        if (currentProduct.id === addedItem.id) {
          return {
            ...currentProduct,
            amountOfModels: 1,
          };
        }

        return currentProduct;
      });

      setFavouriteItems(updateFavourites);
      setAddedItems(updateAddedItem);
      setProducts(updateProduct);
    }

    if (addedItems.find(item => item.id === addedItem.id)) {
      const updateAddedItem = addedItems.filter(
        item => item.id !== addedItem.id,
      );
      const updateProduct = products.map(currentProduct => {
        if (currentProduct.id === addedItem.id) {
          return {
            ...currentProduct,
            amountOfModels: 1,
          };
        }

        return currentProduct;
      });

      setAddedItems(updateAddedItem);
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
      const updateProduct = {
        ...favouriteProduct,
        amountOfModels: 1,
      };

      setFavouriteItems([...favouriteItems, updateProduct]);
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
            className={card.imagelink}
          >
            <img
              className={card.image}
              src={product.image}
              alt={product.name}
            />
          </Link>
          <h2 className={card.name}>{product.name}</h2>
          <div className={card.prices}>
            <div className={card.price}>{`$${product.price}`}</div>
            <del className={card.fullprice}>{`$${product.fullPrice}`}</del>
          </div>
          <div className={card.line}></div>
          <div className={card.description}>
            <div className={card.data}>
              <div className={card.title}>Screen</div>
              <div className={card.value}>{product.screen}</div>
            </div>
            <div className={card.data}>
              <div className={card.title}>Capacity</div>
              <div className={card.value}>{product.capacity}</div>
            </div>
            <div className={card.data}>
              <div className={card.title}>RAM</div>
              <div className={card.value}>{product.ram}</div>
            </div>
          </div>
          <div className={card.buttons}>
            <button
              className={card.addingbutton}
              onClick={() => addItems(product)}
            >
              {addedItems.find(item => item.id === product.id)
                ? 'ADDED'
                : 'Add to cart'}
            </button>
            <button
              className={classNames([card.heart], {
                [card.heartisactive]: favouriteItems.find(
                  item => item.id === product.id,
                ),
                [card.heartONDARK]: themeSwitcher,
                [card.heartONDARKISACTIVE]:
                  themeSwitcher &&
                  favouriteItems.find(item => item.id === product.id),
              })}
              onClick={() => addFavouriteProduct(product)}
            ></button>
          </div>
        </div>
      )}
    </>
  );
};
