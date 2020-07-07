import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllPhones } from '../../helpers/api'

const ShopByCategory = () => {
  const [data, setData] = useState([])

  const numberOfTablets = data.filter((id:any) => id.type === 'tablet').length;
  const numberOfPhones = data.filter((id:any) => id.type === 'phone').length;
  const numberOfAccessories = data.filter((id:any) => id.type === 'accessory').length;
  
  useEffect(()=> {
    getAllPhones()
    .then((data:any) => {
      setData(data)
    })
  }, [])

  return (
    <div className="ShopByCategory__box">

      <div className="ShopByCategory__h1">
        <h1 className="ShopByCategory__title">Shop by category</h1>
      </div>

      <div className="ShopByCategory__sections--box">

        <div className="ShopByCategory__mobile">
          <NavLink to="/PhonesPage">
            <div className="ShopByCategory__mobile--link">
              <div className="ShopByCategory__mobile--img" />
            </div>
          </NavLink>
          <div className="ShopByCategory__mobile--info">
            <p className="ShopByCategory__mobile--h2">
              Mobile phones
            </p>
            <p className="ShopByCategory__mobile--number">
              {numberOfPhones} models
            </p>
          </div>
        </div>

        <div className="ShopByCategory__tablet">
          <NavLink to="/TabletsPage">
            <div className="ShopByCategory__tablet--link">
              <div className="ShopByCategory__tablet--img" />
            </div>
          </NavLink>
          <div className="ShopByCategory__tablet--info">
            <p className="ShopByCategory__tablet--h2">
              Tablets
            </p>
            <p className="ShopByCategory__tablet--number">
              {numberOfTablets} models
            </p>
          </div>
        </div>

        <div className="ShopByCategory__accessory">
          <NavLink to="/AccessoriesPage">
            <div className="ShopByCategory__accessory--link">
              <div className="ShopByCategory__accessory--img" />
            </div>
          </NavLink>
          <div className="ShopByCategory__accessory--info">
            <p className="ShopByCategory__accessory--h2">
              Accessory
            </p>
            <p className="ShopByCategory__accessory--number">
              {numberOfAccessories} models
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShopByCategory;
