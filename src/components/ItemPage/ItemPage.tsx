/* eslint-disable @typescript-eslint/no-explicit-any */
import './ItemPage.scss';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productsJson from '../../../public/api/products.json'; // '../../_new/products.json';
// import classNames from 'classnames';
import { Phone, useProductState } from '../Phones/Phones';
import { Tablet } from '../Tablets/Tablets';
//import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import phonesJSON from '../../../public/api/phones.json';
import tabletsJSON from '../../../public/api/tablets.json';
import accessoriesJSON from '../../../public/api/accessories.json';
import { Accessory } from '../Accessories/Accessories';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/cartSlice';
import { addToFavorites, removeFromFavorites }
  from '../../redux/favoritesSlice';

export const ItemPage: React.FC = () => {
  const products = JSON.parse(JSON.stringify(productsJson));
  const { slug = '' } = useParams();
  const [item, setItem] = useState<Phone | Tablet | Accessory>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [additionalInfo, setAdditionalInfo] = useState<any>();
  const imgPath = `../../../public/${item?.image}`;
  const navigate = useNavigate();
  const phones = JSON.parse(JSON.stringify(phonesJSON));
  const tablets = JSON.parse(JSON.stringify(tabletsJSON));
  const accessories = JSON.parse(JSON.stringify(accessoriesJSON));
  const { isInCart, isInFavorites } = useProductState();
  const dispatch = useDispatch();

  useEffect(() => {
    const heroProduct = products
      .find((el: Phone | Tablet | Accessory) =>
        el?.itemId === slug);

    if (heroProduct === undefined) {
      navigate('/*', { replace: true });
    } else {
      setItem(heroProduct);
    }
    //

    if (heroProduct.category === 'phones') {
      const additional = phones
        .find((smartphone: { id: string; }) => smartphone.id === slug);

      if (additional !== undefined) {
        setAdditionalInfo(additional);
      }
    }

    if (heroProduct.category === 'tablets') {
      const additional = tablets
        .find((tablet: { id: string; }) => tablet.id === slug);

      if (additional !== undefined) {
        setAdditionalInfo(additional);
      }
    }

    if (heroProduct.category === 'accessories') {
      const additional = accessories
        .find((accessory: { id: string; }) => accessory.id === slug);

      if (additional !== undefined) {
        setAdditionalInfo(additional);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <div className="itemBody">
      {item?.name}
      <br />
      <img
        src={imgPath}
        alt="here should be an image"
      />
      <br/>
      {additionalInfo?.images.map((pic: string) => (
        <img key={pic}
          src={`../../../public/${pic}`}
          alt="here should be an image"
          height="300"
        />
      ))}
      <br />
      Available colors:
      <br />
      {additionalInfo?.colorsAvailable.map((color: string) => (
        <div key={color} >{color}</div>
      ))}
      <br/>
      Select capacity:
      {additionalInfo?.capacityAvailable.map((cap: string) => (
        <div key={cap} >{cap}</div>
      ))}
      <br/>
      ${additionalInfo?.priceDiscount}{'  '}{/* remove this string */}
      <s>${additionalInfo?.priceRegular}</s>{/* and all BRs and S tag */}
      <br/>
      <button className={`add-to-cart-button ${isInCart(item?.id) ? 'in-cart' : ''}`}
        onClick={() => isInCart(item?.id)
          ? dispatch(removeFromCart(item?.id))
          : dispatch(addToCart(item))
        }>add_to_cart</button>
      <button className={`favorite-button ${isInFavorites(item?.id) ? 'in-favorites' : ''}`}
        onClick={() => isInFavorites(item?.id)
          ? dispatch(removeFromFavorites(item?.id))
          : dispatch(addToFavorites(item))
        }>♥️</button>
      <br/>
      Screen..........{additionalInfo?.screen}<br/>
      Resolution..........{additionalInfo?.resolution}<br/>
      Processor..........{additionalInfo?.processor}<br/>
      RAM..........{additionalInfo?.ram}<br/><br/>
      Tech specs<br/>
      Screen..........{additionalInfo?.screen}<br/>
      Resolution..........{additionalInfo?.resolution}<br/>
      Processor..........{additionalInfo?.processor}<br/>
      Built in memory..........{additionalInfo?.capacity}<br/>
      Camera..........{additionalInfo?.camera || 'n / a'}<br/>
      Zoom..........{additionalInfo?.zoom || 'n / a'}<br/>
      Cell..........{additionalInfo?.cell.map((cel: string) => (
        `${cel}`
      )).join(', ')}<br/><br/><br/>
      {additionalInfo?.description.map((paragraph: any) => (
        <>
          <div key={paragraph?.title}>
            {paragraph?.title}
          </div>
          <div>
            {paragraph?.text}
          </div><br/>
        </>
      ))}
    </div>
  );
};
