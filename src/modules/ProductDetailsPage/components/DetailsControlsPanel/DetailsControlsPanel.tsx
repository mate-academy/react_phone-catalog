import React from "react";
import { useAppSelector } from "../../../../app/store/hooks";

import { ColorPicker } from "./ColorPicker";
import { CapacitySelector } from "./CapacitySelector";
import { Actions } from "./Actions";
import { SpecsSummary } from "./SpecsSummary";

import type { ProductDetails } from "../../../shared/types/ProductDetails";

import styles from "./DetailsControlsPanel.module.scss";

type Props = {
  productDetails: Pick<
    ProductDetails,
    | "id"
    | "colorsAvailable"
    | "color"
    | "capacityAvailable"
    | "capacity"
    | "priceRegular"
    | "priceDiscount"
    | "screen"
    | "resolution"
    | "processor"
    | "ram"
    | "namespaceId"
  >;
};

export const DetailsControlsPanel: React.FC<Props> = ({ productDetails }) => {
  const {
    id,
    colorsAvailable,
    color,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    screen,
    resolution,
    processor,
    ram,
    namespaceId,
  } = productDetails;

  // change this call useAppSelector
  const products = useAppSelector((state) => state.product.items).find(
    (item) => item.itemId === id
  );

  return (
    <div className={styles.panel}>
      <div className={styles.panelProductId}>ID: {products?.id}</div>

      <ColorPicker
        colorsAvailable={colorsAvailable}
        capacity={capacity}
        namespaceId={namespaceId}
        color={color}
      />

      <div className={styles.divider}></div>

      <CapacitySelector
        capacityAvailable={capacityAvailable}
        capacity={capacity}
        namespaceId={namespaceId}
        color={color}
      />

      <div className={styles.divider}></div>

      <Actions priceRegular={priceRegular} priceDiscount={priceDiscount} id={id} />

      <SpecsSummary
        screen={screen}
        resolution={resolution}
        processor={processor}
        ram={ram}
      />
    </div>
  );
};
