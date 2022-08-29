import { useState, useContext } from 'react';
import { usersChoiceContext } from '../../context/UsersChoiceContext';
import { useLikes } from '../../hooks/useLikes';
import { useCart } from '../../hooks/useCart';
import { ProductInfo } from '../../types/ProductInfo';
import { Heart } from '../../SVG/Heart/Heart';
import { Phone } from '../../types/Phone';
import './AddtoCardDetails.scss';

type Props = {
  product: Phone;
  productDescription: ProductInfo;
};

export const AddtoCardDetails: React.FC<Props> = (
  {
    productDescription,
    product,
  },
) => {
  const [selectedCapacity, setSelectedCapacity]
    = useState('64 GB');

  const { addToLiked, removeFromLiked } = useLikes();
  const { addToCart, removeFromCart } = useCart();
  const { likedGadgetsID, inCartID } = useContext(usersChoiceContext);
  const liked = likedGadgetsID.includes(product.id);
  const inCheckout = inCartID.includes(product.id);

  const colors = ['#FCDBC1', '#5F7170', '#4C4C4C', '#F0F0F0'];

  const capacity = ['64 GB', '256 GB', '512 GB'];

  return (
    <div className="AddtoCardDetails">
      <div className="AddtoCardDetails__chooseColor">
        <h3 className="AddtoCardDetails__lightText">Available colors</h3>
        <div className="AddtoCardDetails__colorBtns">
          {
            colors.map(el => {
              return (
                <button
                  key={el}
                  type="button"
                  className="AddtoCardDetails__colorBtn"
                >
                  <div
                    style={{ backgroundColor: `${el}` }}
                    className="AddtoCardDetails__color"
                  />
                </button>
              );
            })
          }
        </div>
      </div>
      <div className="AddtoCardDetails__chooseColor">
        <h3 className="AddtoCardDetails__lightText">Select capacity</h3>
        <div className="AddtoCardDetails__colorBtns">
          {
            capacity.map(el => {
              return (
                <button
                  key={el}
                  type="button"
                  className={`AddtoCardDetails__capacityBtn ${selectedCapacity === el && 'Selected'}`}
                  onClick={() => {
                    setSelectedCapacity(el);
                  }}
                >
                  {el}
                </button>
              );
            })
          }
        </div>
      </div>
      <div className="AddtoCardDetails__price">
        {
          product.discount
            ? (
              <>
                <h2 className="AddtoCardDetails__discount">
                  {product.price - product.discount}
                </h2>
                <h2 className="AddtoCardDetails__original">{product.price}</h2>
              </>
            ) : (
              <h2 className="AddtoCardDetails__discount">{product.price}</h2>
            )
        }
      </div>
      <div className="AddtoCardDetails__actions">
        <button
          type="button"
          className={`AddtoCardDetails__addBtn ${inCheckout && 'Selected'}`}
          onClick={() => {
            if (!inCheckout) {
              addToCart(product);
            } else {
              removeFromCart(product.id);
            }
          }}
        >
          {!inCheckout ? 'Add to cart' : 'Selected'}
        </button>
        <button
          type="button"
          className="AddtoCardDetails__heartBtn"
          onClick={() => {
            if (!liked) {
              addToLiked(product);
            } else {
              removeFromLiked(product.id);
            }
          }}
        >
          <Heart liked={liked} />
        </button>
      </div>
      <div className="AddtoCardDetails__specs">
        <div className="AddtoCardDetails__specsUnit">
          <h2 className="AddtoCardDetails__specsKey">Screen</h2>
          <h2 className="AddtoCardDetails__specsValue">{product.screen}</h2>
        </div>
        <div className="AddtoCardDetails__specsUnit">
          <h2 className="AddtoCardDetails__specsKey">Resolution</h2>
          <h2 className="AddtoCardDetails__specsValue">
            {productDescription.display.screenResolution}
          </h2>
        </div>
        <div className="AddtoCardDetails__specsUnit">
          <h2 className="AddtoCardDetails__specsKey">Processor</h2>
          <h2 className="AddtoCardDetails__specsValue">
            {productDescription.hardware.cpu}
          </h2>
        </div>
        {
          productDescription.storage.ram && (
            <div className="AddtoCardDetails__specsUnit">
              <h2 className="AddtoCardDetails__specsKey">RAM</h2>
              <h2 className="AddtoCardDetails__specsValue">
                {productDescription.storage.ram}
              </h2>
            </div>
          )
        }
      </div>
    </div>
  );
};
