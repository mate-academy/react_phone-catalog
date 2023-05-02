import { Link } from 'react-router-dom';
import { Product, ProductTypes } from '../../types/Product';
import './ShopByCategory.scss';

interface Props {
  products: Product[];
}

const imagesFolder = './_new/img';

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  let phonesAmount = 0;
  let tabletsAmount = 0;
  let accessoriesAmount = 0;

  products.forEach((product) => {
    if (product.type === ProductTypes.phone) {
      phonesAmount += 1;
    }

    switch (product.type) {
      case ProductTypes.phone:
        phonesAmount += 1;
        break;

      case ProductTypes.tablet:
        tabletsAmount += 1;
        break;

      case ProductTypes.accessory:
        accessoriesAmount += 1;
        break;

      default:
        break;
    }
  });

  return (
    <div className="shop-by-category" data-cy="categoryLinksContainer">
      <div className="shop-by-category__categories">
        <div className="shop-by-category__category">
          <Link to="phones">
            <div className="
              shop-by-category__image-container
              shop-by-category__image-container--phones"
            >
              <img
                className="
                  shop-by-category__image
                  shop-by-category__image--phone"
                src={`${imagesFolder}/category-phones.png`}
                alt="Phones"
              />
            </div>
          </Link>

          <Link to="phones" className="shop-by-category__category-title">
            Mobile phones
          </Link>

          <h4 className="shop-by-category__amount">
            {`${phonesAmount} models`}
          </h4>
        </div>

        <div className="shop-by-category__category">
          <Link to="tablets">
            <div
              className="
                shop-by-category__image-container
                shop-by-category__image-container--tablets"
            >
              <img
                className="
                  shop-by-category__image
                  shop-by-category__image--tablet"
                src={`${imagesFolder}/category-tablets.png`}
                alt="Tablets"
              />
            </div>
          </Link>

          <Link to="phones" className="shop-by-category__category-title">
            Tablets
          </Link>

          <h4 className="shop-by-category__amount">
            {`${tabletsAmount} models`}
          </h4>
        </div>

        <div className="shop-by-category__category">
          <Link to="accessories">
            <div
              className="
                shop-by-category__image-container
                shop-by-category__image-container--accessories"
            >
              <img
                className="
                  shop-by-category__image
                  shop-by-category__image--accessory"
                src={`${imagesFolder}/category-accessories.png`}
                alt="Accessories"
              />
            </div>
          </Link>

          <Link to="phones" className="shop-by-category__category-title">
            Accessories
          </Link>

          <h4 className="shop-by-category__amount">
            {`${accessoriesAmount} models`}
          </h4>
        </div>
      </div>
    </div>
  );
};
