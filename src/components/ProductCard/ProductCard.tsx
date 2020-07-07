import React from 'react';

const ProductCard = ({
  title, item: {
    price, imageUrl, name, discount, screen, capacity, ram,
  },
}: any) => {
  return (
    <div className="product__card--container product__card">
      <article className="product__card">
        <div className="product__card--box">

          <div className="product__card__img--box">
            <img
              src={imageUrl}
              alt="phone"
              className="product__card__img border--hover"
            />
          </div>

          <p className="product__card--phone--model">
            {name}
          </p>

          <div className="product__card__price">
            {title
              ? (
                <p className="product__card__price--new">
                  $
                  {price}
                </p>
              )
              : (
                <>
                  <p className="product__card__price--new">
                    $
                    {price - ((price * discount) / 100)}
                  </p>
                  <p className="product__card__price--old">
                    $
                    {price}
                  </p>
                </>
              )}

          </div>

          <div className="product__card__technical__specifications technical__specifications">
            <div className="technical__specifications--box">
              <p className="technical__specifications--name">Screen</p>
              <p className="technical__specifications--spec">{screen}</p>
            </div>

            <div className="technical__specifications--box">
              <p className="technical__specifications--name">Capacity</p>
              <p className="technical__specifications--spec">{capacity}</p>
            </div>

            <div className="technical__specifications--box">
              <p className="technical__specifications--name">Ram</p>
              <p className="technical__specifications--spec">{ram}</p>
            </div>
          </div>

          <div className="product__card__button">
            <button className="product__card__button--add" type="button">Add to cart</button>
            <button className="product__card__button--favorite" type="button"/>
          </div>

        </div>
      </article>
    </div>
  );
};

export default ProductCard;
