import { FC } from "react";
import { Product } from "../types/Product";
import { HeartIcon } from "./Icons/HeartIcon";

type Props = {
  hotProduct: Product;
};

export const HotPriceCard: FC<Props> = ({ hotProduct }) => {
  const { name, imageUrl, price, discount, screen, capacity, ram } = hotProduct;

  const priceAfterDiscount = price - (price / 100) * discount;

  return (
    <div className="hot-prices__card card">
      <img
        className="card__img"
        src={require("../assets/" + imageUrl).default}
        alt="phone"
      />
      <div className="hot-prices__top-block">
        <div className="card__desc">{name}</div>

        <div className="card__price">
          <div className="card__price-actual">{"$" + priceAfterDiscount}</div>

          <span className="card__price-previous">{"$" + price}</span>
        </div>
      </div>

      <div className="card__features">
        <div className="card__feature">
          <div className="card__feature-key">Screen</div>
          <div className="card__feature-vaue">{screen}</div>
        </div>
        <div className="card__feature">
          <div className="card__feature-key">Capacity</div>
          <div className="card__feature-vaue">{capacity}</div>
        </div>
        <div className="card__feature">
          <div className="card__feature-key">RAM</div>
          <div className="card__feature-value">{ram}</div>
        </div>
      </div>

      <div className="card__buttons">
        <a
          className="
                button-add-to-card
              "
        >
          Add to cart
        </a>
        <a
          className="
                button-add-to-fav
                button-add-to-fav--selected
              "
        >
          <HeartIcon />
        </a>
      </div>
    </div>
  );
};
