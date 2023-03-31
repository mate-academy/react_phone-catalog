import { Link } from 'react-router-dom';

export const Category = () => {
  return (
    <div className="category">
      <h1 className="category__title">Shop by category</h1>
      <div className="category__links" data-cy="categoryLinksContainer">
        <Link
          className="category__link"
          to="/phones"
          replace
        >
          <img
            className="category__image"
            src=".\img\bunners\phones.png"
            alt="category phones"
          />
          <p className="category__subTitle">Mobile phones</p>
          <p className="category__amountDevices">{`${6} models`}</p>
        </Link>
        <Link className="category__link" to="/tablets" replace>
          <img
            className="category__image"
            src=".\img\bunners\tablets.png"
            alt="category tablets"
          />
          <p className="category__subTitle">Tablets</p>
          <p className="category__amountDevices">{`${6} models`}</p>
        </Link>
        <Link className="category__link" to="/accessories" replace>
          <img
            className="category__image"
            src=".\img\bunners\accessories.png"
            alt="category accessories"
          />
          <p className="category__subTitle">Accessories</p>
          <p className="category__amountDevices">{`${6} models`}</p>
        </Link>
      </div>
    </div>
  );
};
