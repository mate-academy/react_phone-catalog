import { useAppSelector } from "../../../../../app/store/hooks";
import { CustomButton } from "../../../../shared/components/Button";

import type { DetailsProps } from "../../../../shared/types/ProductDetails";

import styles from "./Actions.module.scss";

type ActionsProps = DetailsProps<"priceDiscount" | "priceRegular" | "id">;

export const Actions = ({ priceRegular, priceDiscount, id }: ActionsProps) => {
  const product = useAppSelector((state) => state.product.items);
  const cartProducts = useAppSelector((state) => state.cart.items);
  const favouritesProduct = useAppSelector((state) => state.favourites.items);

  const detailsProduct = product.find((item) => item.itemId === id);

  //fix this
  if (!detailsProduct) {
    return null;
  }

  return (
    <div className={styles.actions}>
      <div className={styles.actionsPrice}>
        <span
          className={styles.actionsPriceDiscount}
        >{`$${priceDiscount}`}</span>
        <span className={styles.actionsPriceRegular}>{`$${priceRegular}`}</span>
      </div>

      <div className={styles.actionsButtons}>
        <CustomButton
          className={"addCart"}
          isActive={Boolean(
            cartProducts.find((item) => item.id === detailsProduct.id)
          )}
          id={detailsProduct.id}
        />
        <CustomButton
          className={"addFavourites"}
          isActive={Boolean(
            favouritesProduct.find((item) => item.id === detailsProduct.id)
          )}
          isBig={true}
          id={detailsProduct.id}
        />
      </div>
    </div>
  );
};
