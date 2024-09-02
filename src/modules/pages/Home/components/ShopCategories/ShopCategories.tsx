import { Link } from 'react-router-dom';
import './ShopCategories.scss';
import { useContext } from 'react';
import {
  AccessoriesContext,
  PhoneContext,
  TabletsContext,
} from '../../../../../PageContext';

export const ShopCategories = () => {
  const phones = useContext(PhoneContext);
  const tablets = useContext(TabletsContext);
  const access = useContext(AccessoriesContext);

  return (
    <div className="shopCateg-page">
      <h1 className="shopCateg-title">Shop by category</h1>
      <div className="shopCateg-cards">
        <div className="shopCateg-card">
          <Link to="/phones" className="shopCateg-picture">
            <img
              src="./uploadedImg/phones.png"
              alt="phone picture"
              className="shopCateg-image"
            ></img>
          </Link>
          <h2 className="shopCateg-name">Mobile Phones</h2>
          <p className="shopCateg-models">{`${phones.length} models`}</p>
        </div>

        <div className="shopCateg-card">
          <Link to="/tablets" className="shopCateg-picture">
            <img
              src="./uploadedImg/tablets.png"
              alt="phone picture"
              className="shopCateg-image"
            ></img>
          </Link>
          <h2 className="shopCateg-name">Tablets</h2>
          <p className="shopCateg-models">{`${tablets.length} models`}</p>
        </div>

        <div className="shopCateg-card">
          <Link to="/accessories" className="shopCateg-picture">
            <img
              src="./uploadedImg/acces.png"
              alt="phone picture"
              className="shopCateg-image"
            ></img>
          </Link>
          <h2 className="shopCateg-name">Accessories</h2>
          <p className="shopCateg-models">{`${access.length} models`}</p>
        </div>
      </div>
    </div>
  );
};
