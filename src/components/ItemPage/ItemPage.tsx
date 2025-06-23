/* eslint-disable @typescript-eslint/no-explicit-any */
import './ItemPage.scss';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
import { useTranslation } from 'react-i18next';
import { Recommended } from '../Recommended/Recommended';
import { arrowRight, emptyHeart, filledHeart, homeIcon } from '../../../public/img/icons/svg_icons';
import productsJSON from '../../../public/api/products.json';

export const ItemPage: React.FC = () => {
  const products = JSON.parse(JSON.stringify(productsJson));
  const { slug = '' } = useParams();
  const [item, setItem] = useState<Phone | Tablet | Accessory>();
  const [topLink, setTopLink] = useState<string>('home');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [additionalInfo, setAdditionalInfo] = useState<any>();
  const [mainImg, setMainImg] = useState('');
  const navigate = useNavigate();
  const phones = JSON.parse(JSON.stringify(phonesJSON));
  const tablets = JSON.parse(JSON.stringify(tabletsJSON));
  const accessories = JSON.parse(JSON.stringify(accessoriesJSON));
  const { isInCart, isInFavorites } = useProductState();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [itemColor, setItemColor] = useState<string>('');
  const [itemMemory, setItemMemory] = useState<string>('');

  const allColors = () => {
    let res = [];

    for (let prod of productsJSON) {
      res.push(prod.color);
    }

    return new Set(res);
  };

  const colorMap = {
    'nude': '#F5DEB3',
    'sage': '#9CAF88',
    'charcoal': '#36454F',
    'pearl': '#F8F6F0',
    'black': '#000',
    'gold': '#D4AF37',
    'yellow': 'yellow',
    'green': 'green',
    'midnightgreen': '#004953',
    'silver': '#CCCCCC',
    'spacegray': '#52565A',
    'red': 'red',
    'white': '#FFF',
    'purple': '#800080',
    'coral': '#F08080',
    'rosegold': '#B76E79',
    'midnight': '#05141F',
    'spaceblack': '#111115',
    'blue': '#0000FF',
    'pink': '#FF8DA1',
    'sierrablue': '#BFDAF7',
    'graphite': '#444647',
    'space gray': '#52565A',
    'space-gray': '#52565A',
    'rose gold': '#B76E79',
    'sky-blue': '#87CEEB',
    'starlight': '#B6CED3',
  };

  const convertColor = (tradeColor) => {
    if (colorMap[tradeColor]) {
      return { backgroundColor: colorMap[tradeColor] };
    }

    return { background: 'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 50% / 20px 20px' };
  };

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

    setTopLink(heroProduct.category);
    setItemColor(heroProduct.color);
    setItemMemory(heroProduct.capacity);
    setMainImg(additionalInfo?.images[0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (additionalInfo?.images?.[0]) {
      setMainImg(additionalInfo.images[0]);
    }
  }, [additionalInfo]);

  return (
    <div className="itemBody" key={item?.id}>

      <div className="ipage__mnav">
        <Link
          to={'/'}
        >
          {homeIcon}
        </Link>
        {arrowRight}
        <Link
          to={`/${topLink}`}
        >{t(`navigation.${topLink}`)}
        </Link>
        {arrowRight}
        <div className="ipage__nin">
          {item?.name}
        </div>
      </div>

      <br/>
      <a
        href="#"
        className="ipage__back-link"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        {arrowRight}Back
      </a>
      <br/>
      <div className="ipage__mtitle">
        {item?.name}
      </div>

      <br />

      <div className="ipage__rearrange-container">
        <div className="ipage__block1">
          <div className="ipage__imcon">
            <img
              src={`${mainImg}`} //{imgPath}
              alt="here should be an image"
            />
          </div>
        </div>

        <div className="ipage__block2">
          <div className="ipage__miniGal">
            {additionalInfo?.images.map((pic: string) => (
              <div
                key={`${item.id}-miniimg-${pic}`}
                className={`ipage__mnGC ${pic === mainImg ? 'currentImg' : ''}`}
                onClick={() => setMainImg(pic)}
              >
                <img
                  key={`${pic}${item.id}`}
                  src={`${pic}`}
                  alt="here should be an image"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="ipage__block3">
          <div className="ipage__avcolttl avColors">Available colors:</div>
          <br />
          <div className="ipage__avcolglry">
            {additionalInfo?.colorsAvailable.map((color: string) => {
              if (color.replace(' ', '-').toLowerCase()
                === itemColor.replace(' ', '-').toLowerCase()) {
                return (
                  <div key={`${color}${item?.id}`}>
                    <div
                      className="ipage__color1 non-linkable"
                      title={color}
                      style={convertColor(color)}
                    ></div>
                  </div>
                );
              }

              return (
                <Link
                  key={`${color} ${item?.id}`}
                  to={`/${topLink}/${`${item?.itemId}`.replace(item.color.replace(' ', '-'), color).replace(' ', '-')}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div key={`${color}${item?.id}`}>
                    <div
                      className="ipage__color1"
                      title={color}
                      style={convertColor(color)}
                    ></div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="ipage__dvdr"></div>

          <div className="ipage__avcolttl">Select capacity:</div>
          <div className="ipage__avcolglry avcapglry">
            {additionalInfo?.capacityAvailable.map((cap: string) => {
              if (cap.toLowerCase() === additionalInfo?.capacity
                .toLowerCase()) {
                return (
                  <div key={`${cap}++${item?.id}`}>
                    <div key={`${cap}${item?.id}`} className='non-linkable-color ipage__icap'>{cap}</div>
                  </div>
                );
              }

              return (
                <Link
                  key={`${cap} ${item?.id}`}
                  to={`/${topLink}/${`${item?.itemId}`.replace(item.capacity.toLowerCase(), cap.toLowerCase())}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className='ipage__icap'
                >
                  {cap}
                </Link>
              );
            })}
          </div>



          <div className="ipage__dvdr dvdr2"></div>

          <div className="ipage__pr-cont">
            <div className="ipage__cur-pr">
              ${additionalInfo?.priceDiscount}{'  '}
            </div>
            <div className="ipage__old-pr">
              ${additionalInfo?.priceRegular}
            </div>
          </div>

          <div className="rec__item-buttons">
            <button className={`rec__item-to-cart ${isInCart(item?.id) ? 'in-cart' : ''}`}
              onClick={() => isInCart(item?.id)
                ? dispatch(removeFromCart(item?.id))
                : dispatch(addToCart(item))
              }>{`${isInCart(item?.id) ? 'In cart' : 'Add to cart'}`}</button>
            <button className={`rec__item-to-fav ${isInFavorites(item?.id) ? 'in-favorites' : ''}`}
              onClick={() => isInFavorites(item?.id)
                ? dispatch(removeFromFavorites(item?.id))
                : dispatch(addToFavorites(item))
              }>{isInFavorites(item?.id)
                ? filledHeart
                : emptyHeart
              }
            </button>
          </div>

          <div className="rec__specs ipage__specs">
            <div className="rec__specs-spec">
              Screen
              <div className="rec__specs-value">
                {additionalInfo?.screen}
              </div>
            </div>
            <div className="rec__specs-spec">
              Resolution
              <div className="rec__specs-value">
                {additionalInfo?.resolution}
              </div>
            </div>
            <div className="rec__specs-spec">
              Processor
              <div className="rec__specs-value">
                {additionalInfo?.processor}
              </div>
            </div>
            <div className="rec__specs-spec">
              RAM
              <div className="rec__specs-value">
                {additionalInfo?.ram.replace('GB', ' GB')}
              </div>
            </div>
          </div>

        </div>

      </div>




      {/*       <br/> OLD BUTTONS VERSION
          <button className={`add-to-cart-button ${isInCart(item?.id) ? 'in-cart' : ''}`}
            onClick={() => isInCart(item?.id)
              ? dispatch(removeFromCart(item?.id))
              : dispatch(addToCart(item))
            }>add_to_cart</button>
          <button className={`favorite-button ${isInFavorites(item?.id) ? 'in-favorites' : ''}`}
            onClick={() => isInFavorites(item?.id)
              ? dispatch(removeFromFavorites(item?.id))
              : dispatch(addToFavorites(item))
            }>♥️</button> */}



      {/*       <div
        className="ipage__color1"
        title={`gold`}
        style={{ background: 'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 50% / 20px 20px' }}
      ></div> */}


      {/*       {additionalInfo?.colorsAvailable.map((color: string) => {
        if (color.replace(' ', '-').toLowerCase()
          === itemColor.replace(' ', '-').toLowerCase()) {
          return (
            <div key={`${color}${item?.id}`}>
              <div key={`${color}-${item?.id}`} className='non-linkable-color'>{color}</div>
            </div>
          );
        }

        return (
          <div key={`${color}+${item?.id}`}>
            <Link
              key={`${color} ${item?.id}`}
              to={`/${topLink}/${`${item?.itemId}`.replace(item.color.replace(' ', '-'), color).replace(' ', '-')}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              {color}
            </Link>
            <br/>
          </div>
        );
      })} */}



      {/*       {Array.from(allColors()).map((color: string) => {
        return (
          <div key={`${color}${item?.id}`}>
            <div key={`${color}-${item?.id}`} className=''>{color}</div>
          </div>
        );
      })} */}

      {/*       ALL COLORS COLLECTION FOR VISUAL REPRESENTATION AND TESTING
       {Array.from(allColors()).map((color: string) => {
        return (
          <div key={`${color}${item?.id}`}>
            <div
              className="ipage__color1"
              title={color}
              style={convertColor(color)}
            ></div>
          </div>
        );
      })} */}


      <div className="ipage__btmcnt">

        <div className="ipage__abt-wrpr">
          <div className="ipage__mntitle ipage__abt">About</div>

          {additionalInfo?.description.map((paragraph: any, ind: number) => (
            <div key={`${additionalInfo?.description}${ind}`}>
              <div key={paragraph?.title} className='ipage__mcrttl'>
                {paragraph?.title}
              </div>
              <div className='ipage__mcrtxt'>
                {paragraph?.text}
              </div><br/>
            </div>
          ))}
        </div>

        <div className="ipage__techspecwrpr">
          <div className="ipage__mntitle ipage_tecspecttl">Tech specs</div>
          <div className="rec__specs ipage__techspec">
            <div className="rec__specs-spec ipage__spcs-spc">
              Screen
              <div className="rec__specs-value">
                {additionalInfo?.screen}
              </div>
            </div>
            <div className="rec__specs-spec ipage__spcs-spc">
              Resolution
              <div className="rec__specs-value">
                {additionalInfo?.resolution}
              </div>
            </div>
            <div className="rec__specs-spec ipage__spcs-spc">
              Processor
              <div className="rec__specs-value">
                {additionalInfo?.processor}
              </div>
            </div>
            <div className="rec__specs-spec ipage__spcs-spc">
              RAM
              <div className="rec__specs-value">
                {additionalInfo?.ram.replace('GB', ' GB')}
              </div>
            </div>
            <div className="rec__specs-spec ipage__spcs-spc">
              Built in memory
              <div className="rec__specs-value">
                {additionalInfo?.capacity.replace('GB', ' GB')}
              </div>
            </div>
            <div className="rec__specs-spec ipage__spcs-spc">
              Camera
              <div className="rec__specs-value">
                {additionalInfo?.camera || 'n / a'}
              </div>
            </div>
            <div className="rec__specs-spec ipage__spcs-spc">
              Zoom
              <div className="rec__specs-value">
                {additionalInfo?.zoom || 'n / a'}
              </div>
            </div>
            <div className="rec__specs-spec ipage__spcs-spc">
              Cell
              <div className="rec__specs-value ipage__cells">
                {additionalInfo?.cell.map((cel: string) => (
                  `${cel}`
                )).join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>




      <Recommended title={`may_like ${item?.name}`} />

    </div>
  );
};
