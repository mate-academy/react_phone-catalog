import { Link } from 'react-router-dom';
import './ShopByCategory.scss';

type Props = {
  phonesLength: number;
  tabletsLength: number;
  accessoriesLength: number;
};

export const ShopByCategory: React.FC<Props> = ({
  phonesLength,
  tabletsLength,
  accessoriesLength,
}) => {
  return (
    <div className="shopByCategory">
      <h1 className="shopByCategory__title shopByCategory__title--main">
        Shop by category
      </h1>

      <div className="shopByCategory__blocks">
        <div className="shopByCategory__block" data-cy="categoryLinksContainer">
          <Link
            to="phones"
            className="shopByCategory__image shopByCategory__image--phones"
          />

          <div className="shopByCategory__info">
            <h3 className="shopByCategory__title shopByCategory__title--second">
              Mobile phones
            </h3>
            <p className="shopByCategory__text">{`${phonesLength} models`}</p>
          </div>
        </div>

        <div className="shopByCategory__block" data-cy="categoryLinksContainer">
          <Link
            to="tablets"
            className="shopByCategory__image shopByCategory__image--tablets"
          />

          <div className="shopByCategory__info">
            <h3 className="shopByCategory__title shopByCategory__title--second">
              Tablets
            </h3>
            <p className="shopByCategory__text">{`${tabletsLength} models`}</p>
          </div>
        </div>

        <div className="shopByCategory__block" data-cy="categoryLinksContainer">
          <Link
            to="accessories"
            className="shopByCategory__image shopByCategory__image--accessories"
          />

          <div className="shopByCategory__info">
            <h3 className="shopByCategory__title shopByCategory__title--second">
              Accessories
            </h3>
            <p className="shopByCategory__text">{`${accessoriesLength} models`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
