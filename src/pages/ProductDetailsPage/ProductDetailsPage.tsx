import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import Home from '../../images/Home.svg';
import Vec_light_right from '../../images/homePage/Vec_light_right.svg';
import Arrow_Left from '../../images/homePage/Arrow_Left.svg';
// import { CatalogContext } from '../CatalogContext';
import Favorites from '../../images/homePage/Favorites.svg';
// import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { PRODUCTS_COLORS } from '../../utils/colors';
import './ProductDetailsPage.scss';
import { TabAccess } from '../../types/tabAccessPhones';
import { YouMayAlsoLike } from '../../components/Blocks/YouMayAlsoLike';

export const ProductDetails = () => {
  const { productId } = useParams();

  const location = useLocation();
  const paths = location.pathname.split('/').filter((path) => path);

  const [detailedProduct, setDetailedProduct]= useState()
  const [choosenCapasity, setChoosenCapasity] = useState('');
  const [choosenColor, setChoosenColor] = useState('');
  const [currentImage, setCurrentImage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('';)
  const BASE_URL = 'https://github.com/mate-academy/react_phone-catalog/tree/master/public/api';

  const url = BASE_URL + `/${paths[0]}/` + `${productId}.json`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();

        setDetailedProduct(data);
      } catch (error) {
        setErrorMessage(`Error during fetch: ${errorMessage}`);
      }
    };

    fetchData();
  }, [url]);

  // const [isLoading, setIsLoading] = useState(false);
  const handleCapacity = (capacity: string) => {
    setChoosenCapasity(capacity);
  }

  const handleColor = (color: string) => {
    setChoosenColor(color);
  }

  const handleCurrentImg = (image: string) => {
    setCurrentImage(image);
  }

  const itemToUpperCase = (item: string) => {
    return item.charAt(0).toUpperCase() + item.slice(1);
  }

  function goBack() {
    window.history.back();
  }

  const {
    // id,
    category,
    // namespaceId,
    name,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    colorsAvailable,
    // color,
    images,
    description,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell}: TabAccess = detailedProduct;

    const handleNextImg = () => {
      const index = images.indexOf(currentImage);

      if (!currentImage) {
        setCurrentImage(Object.values(images)[1])
      } else if (index === (images.length - 1)) {
        setCurrentImage(Object.values(images)[0])
      } else {
        setCurrentImage(Object.values(images)[index + 1])
      }
    }
  
  return (
    <>
    {errorMessage ?
    errorMessage
  : (<><div className='details'>
      <div className='details__center'>
      <div className='details__container'>
        <div className="details__breadcrumbs">
          <NavLink to="/" className="details__homeLink">
            <img 
              src={Home} 
              alt="home" 
              className="details__homeImg" 
            />
          </NavLink>
          <img
            src={Vec_light_right}
            alt="Vector_light_right"
            className="details__arrow-right"
          />
          <div className="details__paths"
            onClick={goBack}
          >
            {itemToUpperCase(paths[0])}
          </div>
          <img
            src={Vec_light_right}
            alt="Vector_light_right"
            className="details__arrow-right"
          />
          <div className="details__nameCurrent">{name}</div>
        </div>
        <div className="details__buttonBack">
          <button onClick={goBack} className="details__buttonBack__click">
            <img 
              src={Arrow_Left} 
              alt="back" 
              className="details__buttonBack__img"
            />
            <div className="details__buttonBack__name">Back</div>
          </button>
        </div>
      </div>
      <div className="details__product grid grid--tablet"
      >
        <h1 className="details__product__name
          grid__item--tablet-1-9
          grid__item--desktop-1-19"
        >
          {name}
        </h1>
          <div className="details__product__mainImg
            grid__item--tablet-2-5
            grid__item--desktop-3-12"
          >
            <img
              src={currentImage ? currentImage : Object.values(images)[0]}
              alt={productFound.category}
              className="details__product__img"
              onClick={handleNextImg}
            />
          </div>
          <div className="details__product__selectImg
            grid__item--tablet-1-1
            grid__item--desktop-1-2"
          >
            {images.map((image: string, index: number) => {
              return (
                <div key={index}>
                  <img
                    src={image}
                    alt={category}
                    className="details__product__image"
                    onClick={() => handleCurrentImg(image)}
                  />
                </div>
              )
            })}
          </div>
            <div className="details__product__options 
              grid__item--tablet-7-12
              grid__item--desktop-14-20"
            >
              <div className="details__product__colorsContainer">
                <div className="details__product__itemHead">Avaliable colors</div>
                <ul className="details__product__colorsVariants">
                  {colorsAvailable.map((color: string, index) => {
                    return (
                      <li
                        key={index}
                        style={{backgroundColor: PRODUCTS_COLORS[color]}}
                        className="details__product__colorOption"
                        onClick={() => handleColor(color)}
                      />
                    )
                  })}
                </ul>
                <div className='details__product__line'></div>
              </div>
              <div className="details__product__capacityContainer">
                <div className="details__product__itemHead">Select capacity</div>
                <ul className="details__product__capacityVariants">
                  {capacityAvailable.map((capacity: string, index) => {
                    return (
                      <li 
                        key={index} 
                        className="details__product__capacityOption"
                        onClick={() => handleCapacity(capacity)}
                      >
                        {capacity}
                      </li>
                    )
                  })}
                </ul>
                <div className='details__product__line'></div>
              </div>
              <div className="details__product__priceContainer">
                <div className='details__product__priceBlock'>
                <div className="details__product__price">${priceRegular}</div>
                <div className="details__product__priceDiscount">${priceDiscount}</div>
                </div>
              <div className="details__product__buttonContainer">
                <button className="details__product__buttonAdd">Add to cart</button>
                <button className="details__product__buttonFavorite">
                  <img
                    src={Favorites}
                    alt="favorites"
                    className="details__product__buttonImg"
                  />
                </button>
              </div>
              <div className="details__description">
                <div className="details__description__name">
                  <div className="details__description__item">Screen</div>
                  <div className="details__description__model">{screen}</div>
                </div>
                <div className="details__description__name">
                  <div className="details__description__item">Resolution</div>
                  <div className="details__description__model">{resolution}</div>
                </div>
                <div className="details__description__name">
                  <div className="details__description__item">Processor</div>
                  <div className="details__description__model">{processor}</div>
                </div>
                <div className="details__description__name">
                  <div className="details__description__item">RAM</div>
                  <div className="details__description__model">{ram}</div>
                </div>
              </div>
            </div>
            </div>
            
      </div>
      <div className='details__section'>
          <div className='details__section__descript
            details__section__descript--about'>
            <h2 className='details__section__head'>About</h2>
            <div className='details__section__line'></div>
            {description.map((p, index) => (
              <div className='details__section__aboutItem' key={index}>
                <h3 className='details__section__aboutMain'>
                  {p.title}
                </h3>

                <p className='details__section__paragraph'>
                  {p.text}
                </p>
              </div>
            ))}
          </div>
          <div className='details__section__descript'>
            <div className='details__section__head'>Tech specs</div>
              <div className='details__section__line'></div>
              <div className='details__section__item'>
                <div className='details__section__name'>Screen</div>
                <div className='details__section__model'>{screen}</div>
              </div>
              <div className='details__section__item'>
                <div className='details__section__name'>Resolution</div>
                <div className='details__section__model'>{resolution}</div>
              </div>
              <div className='details__section__item'>
                <div className='details__section__name'>Processor</div>
                <div className='details__section__model'>{processor}</div>
              </div>
              <div className='details__section__item'>
                <div className='details__section__name'>RAM</div>
                <div className='details__section__model'>{ram}</div>
              </div>
              <div className='details__section__item'>
                <div className='details__section__name'>Built in memory</div>
                <div className='details__section__model'>{capacity}</div>
              </div>
              <div className='details__section__item'>
                <div className='details__section__name'>Camera</div>
                <div className='details__section__model'>{camera}</div>
              </div>
              <div className='details__section__item'>
                <div className='details__section__name'>Zoom</div>
                <div className='details__section__model'>{zoom}</div>
              </div>
              <div className='details__section__item'>
                <div className='details__section__name'>Cell</div>
                <div className='details__section__model'>{cell}</div>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div className='details__like'>
      <div className='details__like__container'>
        <YouMayAlsoLike />
      </div>
    </div></>)}
    </>
  );
};
