import React from 'react';
import './Card.scss';
import { Link, useRouteMatch } from 'react-router-dom';
// import { match } from 'assert';

type Props = {
  imageUrl: string;
  name: string;
  price: number;
  discount: number;
  screen: string;
  capacity: string;
  ram: string;
  id: string;
};

export const Card: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  discount,
  screen,
  capacity,
  ram,
  id,
}) => {
  const { path } = useRouteMatch();

  return (
    <div className="Wrap">
      <article className="Card">
        <Link to={`${path}/${id}`}>
          <img alt="card" src={imageUrl} className="Card__Img" />
        </Link>
        <div className="Card__ContainerInner">
          <h3 className="Card__Title">{name}</h3>
          <span className="Card__Prise">
            $
            {(price - price * (discount / 100))}
          </span>
          {' '}
          {discount !== 0
            && (
              <span className="Card__OldPrise">
                $
                {price}
              </span>
            )}
          <div className="Card__Info">
            <div className="Card__InfoScreen Card__Item">
              <p className="Card__InfoScreen_Name">Screen</p>
              <p className="Card__InfoScreen_Value">{screen}</p>
            </div>
            <div className="Card__InfoScreen Card__Item">
              <p className="Card__InfoScreen_Name">Capacity</p>
              <p className="Card__InfoScreen_Value">{capacity}</p>
            </div>
            <div className="Card__InfoRam Card__Item">
              <p className="Card__InfoScreen_Name">RAM</p>
              <p className="Card__IInfoScreen_Value">{ram}</p>
            </div>
          </div>
          <div className="Card__ButtonWrap">
            <button
              type="button"
              className="Card__ButtonCart"
            >
              Add to cart
            </button>
            <button
              type="button"
              className="Card__ButtonFavor"
            >
              favor
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};
