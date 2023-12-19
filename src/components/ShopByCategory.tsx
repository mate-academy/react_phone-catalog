import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product, ProductType } from '../helpers/Types';

export type ShopByCategoryProps = {
  products: Product[]
};

export const ShopByCategory = ({ products }: ShopByCategoryProps) => {
  const [phones, setPhones] = useState<number>(0);
  const [tablets, setTablets] = useState<number>(0);
  const [accessories, setAccessories] = useState<number>(0);

  useEffect(() => {
    setPhones(() => products.filter((item) => (
      item.type === ProductType.Phones)).length);
    setTablets(() => products.filter((item) => (
      item.type === ProductType.Tablets)).length);
    setAccessories(() => products.filter((item) => (
      item.type === ProductType.Accessories)).length);
  }, [products]);

  return (
    <div className="shopBy">
      <h1 className="shopBy__title h1">Shop by category</h1>
      <div className="shopBy__container">
        <Link
          to="/phones"
          className="shopBy__container--link shopBy__container--link-phones"
        >
          <img
            alt="Phones"
            src="img/category-phones.png"
            className="shopBy__container--link-image-phones"
          />
        </Link>
        <h3 className="shopBy__container--categoryTitle h3">Mobile Phones</h3>
        <p className="shopBy__container--description BodyText">
          {`${phones} models`}
        </p>
      </div>

      <div className="shopBy__container">
        <Link
          to="/tablets"
          className="shopBy__container--link shopBy__container--link-tablets"
        >
          <img
            alt="Tablets"
            src="img/category-tablets.png"
            className="shopBy__container--link-image-tablets "
          />
        </Link>
        <h3 className="shopBy__container--categoryTitle h3">Tablets</h3>
        <p className="shopBy__container--description BodyText">
          {`${tablets} models`}
        </p>
      </div>

      <div className="shopBy__container">
        <Link
          to="/accessories"
          className="shopBy__container--link
          shopBy__container--link-accessories"
        >
          <img
            alt="Accessories"
            src="img/category-accessories.png"
            className="shopBy__container--link-image-accessories"
          />
        </Link>
        <h3 className="shopBy__container--categoryTitle h3">Accessories</h3>
        <p className="shopBy__container--description BodyText">
          {`${accessories} models`}
        </p>
      </div>
    </div>
  );
};
