import { Link } from 'react-router-dom';
import './Card.scss';
import { useContext } from 'react';
import { ProductsContext } from '../../../../../../PageContext';
import { Access, Phone } from '../../../../types/types';

type Props = {
  phone: Phone | Access;
};

export const Card: React.FC<Props> = ({ phone }) => {
  const { addToBucket, handleFavItems, favItems, bucketItems } =
    useContext(ProductsContext);

  function addPhone() {
    addToBucket({
      item: phone,
      count: 1,
    });
  }

  function addFav() {
    handleFavItems(phone);
  }

  return (
    <div className="card">
      <div className="card-container">
        <Link to={`/${phone.category}/${phone.id}`} className="picture-block">
          <img
            className="picture"
            src={phone.images[0]}
            alt="Phone picture"
          ></img>
        </Link>
        <h1 className="card-name">{phone.name}</h1>
        <h2 className="price-block">
          <p className="current-price">${phone.priceDiscount}</p>
          <p className="full-price">${phone.priceRegular}</p>
        </h2>
        <div className="desc-block">
          <div className="desc-line">
            <p className="left-text">Screen</p>
            <p className="right-text">{phone.screen}</p>
          </div>
          <div className="desc-line">
            <p className="left-text">Capacity</p>
            <p className="right-text">{phone.capacity}</p>
          </div>
          <div className="desc-line">
            <p className="left-text">RAM</p>
            <p className="right-text">{phone.ram}</p>
          </div>
        </div>
        <div className="buttons">
          {bucketItems.find(item => item.item.id === phone.id) ? (
            <button className="Added-btn">Added</button>
          ) : (
            <button className="Add-btn" onClick={addPhone}>
              Add to card
            </button>
          )}

          <button className="fav-btn" onClick={addFav}>
            {favItems.includes(phone) ? (
              <img src="./uploadedImg/red.svg" className="cursor"></img>
            ) : (
              <img src="./uploadedImg/like.svg" className="cursor"></img>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
