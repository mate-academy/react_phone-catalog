import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAllProducts, setCurrentItem } from '../features/productsAll';
import { RootState } from '../app/store';
import SliderRecommended from '../components/SliderRecommended/SliderRecommended';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import { LuHouse } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import './ProductInformationPage.scss';
import { ButtonAndHeart } from '../components/ButtonAndHeart/ButtonAndHeart';
//import phones from '../features/phones';

export const ProductInformationPage: React.FC = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [])
  const unitedProducts = useSelector((state: RootState) => state.productsAll.items);
  const currentItem = useSelector(
    (state: RootState) => state.productsAll.currentItem,
  );
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
const [selectedColor, setSelectedColor] = useState(null);
  useEffect(() => {
    const foundItem = unitedProducts.find(unitedProduct => unitedProduct.id === itemId);
    if (foundItem) {
      dispatch(setCurrentItem(foundItem));
    }
  }, [itemId, unitedProducts, dispatch]);

  if (!currentItem) {
    return (
      <>
        <div className="section">
          <div className="container">
            Loading or product not found...
          </div>
        </div>
      </>);
  }

  return (
    <>
      <div className="section">
        <div className="top__back__links">
          <Link to="/home" className="icon__house">
            <LuHouse color="#313237" />
          </Link>
          <IoIosArrowForward />
          <Link to={`/${currentItem.category}`}>
            <p className="top__back__links__category">
              {currentItem.category.charAt(0).toUpperCase() +
                currentItem.category.slice(1)}
            </p>
          </Link>
          <IoIosArrowForward />

          <p>{currentItem.name}</p>
        </div>

        <Link to={`/${currentItem.category}`} className="top__back__link">
          <IoIosArrowBack color="#313237" />
          <p>Back</p>
        </Link>

        <div className="pi__name">{currentItem.name}</div>
        <div className="pi__top">
          <div className="pi__images">
            <div className="pi__main__images">
              {currentItem.images.map((image, index) => (
                <img
                  key={index}
                  src={`/${image}`} // Assuming image paths are relative to the public folder
                  alt={`Product image ${index + 1}`}
                  className={`pi__main__image ${activeSlideIndex === index ? 'active__pi__main__image' : ''}`}
                  onClick={() => setActiveSlideIndex(index)}
                />
              ))}
            </div>
            <div className="pi__option__images">
              {currentItem.images.map((image, index) => (
                <img
                  key={index}
                  src={`/${image}`} // Assuming image paths are relative to the public folder
                  alt={`Product image ${index + 1}`}
                  className={`pi__option__image ${activeSlideIndex === index ? 'active__product__info__image' : ''}`}
                  onClick={() => setActiveSlideIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="possible__options">
            <p>Available colors</p>
            <div className="available__colors">
              {currentItem.colorsAvailable.map((color, index) => (
                <label
                  key={index}
                  style={{ display: 'inline-block', marginRight: '10px' }}
                >
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    checked={selectedColor === color}
                    onChange={() => setSelectedColor(color)}
                    style={{ display: 'none' }}
                  />
                  <span
                    style={{
                      display: 'inline-block',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: color,
                      border:
                        selectedColor === color
                          ? '2px solid black'
                          : '1px solid #ccc',
                      cursor: 'pointer',
                    }}
                  />
                </label>
              ))}
            </div>
            <p>ID </p>

            <p>Select capacity</p>
            <div className="available__capacity">
              {currentItem.capacityAvailable.map((measure, index) => (
                <button
                  key={index}
                  //className={`pi__option__image ${activeSlideIndex === index ? 'active__product__info__image' : ''}`}
                  //onClick={() => setActiveSlideIndex(index)}
                >
                  {' '}
                  {measure}
                </button>
              ))}
            </div>

            <p className="product__price">
              <span className="new__price">${currentItem.priceDiscount}</span>
              <span className="old__price">${currentItem.priceRegular}</span>
            </p>
            <ButtonAndHeart />
            <div className="tech__spec">
              {[
                { label: 'Screen', key: 'screen' },
                { label: 'Resolution', key: 'resolution' },
                { label: 'Processor', key: 'processor' },
                { label: 'RAM', key: 'ram' },
              ].map(({ label, key }) => {
                const value = currentItem[key as keyof typeof currentItem];
                return value ? (
                  <div className="tech__info" key={key}>
                    <span className="feature">{label}:</span>
                    <span className="feature__info">{value}</span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>

        <div className="pi__text">
          <div className="about__full">
            <p className="pi__text__heading">About</p>
            <div className="about">
              {currentItem.description.map(description => (
                <>
                  <div className="about__title">{description.title}</div>
                  <div className="about__text">{description.text}</div>
                </>
              ))}
            </div>
          </div>

          <div className="tech__spec__full">
            <p className="pi__text__heading">Tech spec</p>
            <div className="tech__spec">
              {[
                { label: 'Screen', key: 'screen' },
                { label: 'Resolution', key: 'resolution' },
                { label: 'Processor', key: 'processor' },
                { label: 'RAM', key: 'ram' },
                { label: 'Built in memory', key: 'capacity' },
                { label: 'Camera', key: 'camera' },
                { label: 'Zoom', key: 'zoom' },
                { label: 'Cell', key: 'cell' },
              ].map(({ label, key }) => {
                const value = currentItem[key as keyof typeof currentItem];
                return value ? (
                  <div className="tech__info" key={key}>
                    <span className="feature">{label}:</span>
                    <span className="feature__info">{value}</span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>
        <SliderRecommended />
      </div>
    </>
  );
};
