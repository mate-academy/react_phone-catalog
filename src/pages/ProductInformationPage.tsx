/* eslint-disable max-len */
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAllProducts, setCurrentItem } from '../features/productsAll';
import { RootState } from '../app/store';
import SliderRecommended from '../components/SliderRecommended/SliderRecommended';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { LuHouse } from 'react-icons/lu';
import './ProductInformationPage.scss';
import { ButtonAndHeart } from '../components/ButtonAndHeart/ButtonAndHeart';
import { useNavigate } from 'react-router-dom';
export const ProductInformationPage: React.FC = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unitedProducts = useSelector(
    (state: RootState) => state.productsAll.items,
  );
  const currentItem = useSelector(
    (state: RootState) => state.productsAll.currentItem,
  );

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');

  const colorHexMap: Record<string, string> = {
    black: '#000000',
    green: '#008000',
    yellow: '#FFEB3B',
    white: '#FFFFFF',
    purple: '#800080',
    red: '#FF0000',
    spacegray: '#4B4B4B',
    midnightgreen: '#004953',
    gold: '#FFD700',
    silver: '#C0C0C0',
    rosegold: '#B76E79',
    coral: '#FF7F50',
    midnight: '#191970',
    spaceblack: '#1C1C1E',
    blue: '#0074D9',
    pink: '#FFC0CB',
    graphite: '#4B4B4B',
    sierrablue: '#9BB1CC',
    'rose gold': '#B76E79',
    'sky blue': '#87CEEB',
    starlight: '#EDEDED',
    'space gray': '#595959',
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    const foundItem = unitedProducts.find(product => product.id === itemId);

    if (foundItem) {
      dispatch(setCurrentItem(foundItem));
    }
  }, [itemId, unitedProducts, dispatch]);

  useEffect(() => {
    if (currentItem) {
      setSelectedColor(currentItem.color);
      setSelectedCapacity(currentItem.capacity);
    }
  }, [currentItem]);

  const generateProductLink = (color: string, capacity: string) => {
    if (!currentItem) {
      return '#';
    }

    return `/${currentItem.category}/${currentItem.namespaceId}-${capacity.toLowerCase()}-${color.toLowerCase()}`;
  };

  if (!currentItem) {
    return (
      <div className="section">
        <div className="container">Loading or product not found...</div>
      </div>
    );
  }

  return (
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

      <div
        className="top__back__link"
        onClick={() => navigate(-1)}
        style={{ cursor: 'pointer' }}
      >
        <IoIosArrowBack color="#313237" />
        <p>Back</p>
      </div>

      <div className="pi__name">{currentItem.name}</div>
      <div className="pi__top">
        <div className="pi__images">
          <div className="pi__main__images">
            {currentItem.images.map((image, index) => (
              <img
                key={index}
                src={`./${image}`}
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
                src={`/.${image}`}
                alt={`Product image ${index + 1}`}
                className={`pi__option__image ${activeSlideIndex === index ? 'active__product__info__image' : ''}`}
                onClick={() => setActiveSlideIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="possible__options">
          <div>
            <p className="possible__options__title">Available colors</p>
            <div className="available__colors">
              {currentItem.colorsAvailable.map((color, index) => {
                const normalizedKey = color.toLowerCase().replace(/\s+/g, '');
                const backgroundColor = colorHexMap[normalizedKey] || color;

                return (
                  <Link
                    to={generateProductLink(color, selectedCapacity)}
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor }}
                    className={`color__option ${selectedColor === color ? 'color__option__active' : ''}`}
                  >
                    <span />
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <p className="possible__options__title">Select capacity</p>
            <div className="available__capacity">
              {currentItem.capacityAvailable.map((volume, index) => (
                <Link
                  to={generateProductLink(selectedColor, volume)}
                  key={index}
                  onClick={() => setSelectedCapacity(volume)}
                  className={`capacity__option ${selectedCapacity === volume ? 'capacity__option__active' : ''}`}
                >
                  {volume}
                </Link>
              ))}
            </div>
          </div>

          <p className="product__price">
            <span className="new__price">${currentItem.priceDiscount}</span>
            <span className="old__price">${currentItem.priceRegular}</span>
          </p>

          <ButtonAndHeart
            {...{
              image: currentItem.images[0],
              name: currentItem.name,
              price: currentItem.priceDiscount,
              fullPrice: currentItem.priceRegular,
              screen: currentItem.screen,
              capacity: currentItem.capacity,
              ram: currentItem.ram,
              itemId: currentItem.id,
              category: currentItem.category,
            }}
          />

          <div className="tech__spec">
            {['screen', 'resolution', 'processor', 'ram'].map(key => {
              const value = currentItem[key as keyof typeof currentItem];

              return value ? (
                <div className="tech__info" key={key}>
                  <span className="feature">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </span>
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
            {currentItem.description.map((desc, i) => (
              <div key={i}>
                <div className="about__title">{desc.title}</div>
                <div className="about__text">{desc.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="tech__spec__full">
          <p className="pi__text__heading">Tech spec</p>
          <div className="tech__spec">
            {[
              'screen',
              'resolution',
              'processor',
              'ram',
              'capacity',
              'camera',
              'zoom',
              'cell',
            ].map(key => {
              const value = currentItem[key as keyof typeof currentItem];

              return value ? (
                <div className="tech__info" key={key}>
                  <span className="feature">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </span>
                  <span className="feature__info">{value}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>

      <SliderRecommended />
    </div>
  );
};
