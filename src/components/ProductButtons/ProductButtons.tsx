import React from "react"
import { FavouriteButton } from "../FavouriteButton/FavouriteButton"
// import { Product } from "../../types/Product"
import { Phone } from "../../types/Phone"
import { Tablet } from "../../types/Tablet"
import { Accessory } from "../../types/Accessory"

type Props = {
  currentProduct: Phone | Tablet | Accessory | undefined,
}

export const ProductButtons: React.FC<Props> = ({
  currentProduct,
}) => {
  if (!currentProduct) {
    return null;
  }
  return (
    <div className="product-buttons product-item__action-box">
      <button
        className="product-buttons__add-to-cart product-item__add-to-cart"
        onClick={() => {}}
      >
        Add to cart
      </button>
      <FavouriteButton
        product={currentProduct}
      />
    </div>
  )
}
