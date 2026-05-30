import classNames from "classnames";
import { HeaderDetails } from "../HeaderDetails";
import { DetailsGallery } from "../DetailsGallery";
import { DetailsControlsPanel } from "../DetailsControlsPanel";
import { DetailsAbout } from "../DetailsAbout";
import { DetailsTechSpecs } from "../DetailsTechSpecs";
import { Breadcrumbs } from "../../../shared/components/Breadcrumbs";
import { AlsoLike } from "../AlsoLike";

import styles from "./DetailsContent.module.scss";
import type { ProductDetails } from "../../../shared/types/ProductDetails";
import { useOutletContext } from "react-router-dom";

type OutletContext = {
  product: ProductDetails;
}

export const DetailsContent = () => {
  const {product} = useOutletContext<OutletContext>();

  return (
    <>
      <Breadcrumbs productName={product.name} />
      <HeaderDetails title={product.name} />
      <div className={classNames(styles.productDetails, "grid")}>
        <DetailsGallery images={product.images} />
        <DetailsControlsPanel productDetails={product} />
        <DetailsAbout description={product.description} />
        <DetailsTechSpecs
          screen={product.screen}
          resolution={product.resolution}
          processor={product.processor}
          ram={product.ram}
          capacity={product.capacity}
          camera={product.camera}
          zoom={product.zoom}
          cell={product.cell}
        />
        <AlsoLike />
      </div>
    </>
  );
};
