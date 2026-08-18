import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../styles/ProductPage.scss';

export interface NewModel {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
  selectedCapacity?: string;
  selectedColor?: string;
}

export interface ProductDetails {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: {
    title: string;
    text: string[];
  }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

interface ProductPageProps {
  cart: NewModel[];
  addingObjCart: (product: NewModel) => void;
  FavouritesA: NewModel[];
  addingObj: (product: NewModel) => void;
  setsmth?: (product: NewModel) => void;
}

const CATEGORY_FILES: Record<string, string> = {
  phones: 'api/phones.json',
  tablets: 'api/tablets.json',
  accessories: 'api/accessories.json',
};

const COLOR_MAP: Record<string, string> = {
  black: '#1c1c1e',
  green: '#aee1cd',
  yellow: '#ffe681',
  white: '#f9f6ef',
  purple: '#d1cdda',
  red: '#ba0c2f',
  gold: '#f9e5c9',
  spacegray: '#535154',
  silver: '#e2e4e1',
  midnight: '#192531',
  starlight: '#f0eec9',
};

export const ProductPage: React.FC<ProductPageProps> = ({
  cart,
  addingObjCart,
  FavouritesA,
  addingObj,
  setsmth,
}) => {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState<ProductDetails[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [array, setArray] = useState<NewModel[]>([]);
  const [Chuslo, setChuslo] = useState(0);

  const formatCategoryName = (str?: string) => {
    if (!str) {
      return '';
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    if (!category || !CATEGORY_FILES[category]) {
      return;
    }

    fetch(CATEGORY_FILES[category])
      .then(response => response.json())
      .then((data: ProductDetails[]) => {
        setCategoryData(data);
      })
      /* eslint-disable-next-line */
      .catch(error => console.error('Error fetching details:', error));
  }, [category]);

  useEffect(() => {
    fetch('api/products.json')
      .then(response => response.json())
      .then((data: NewModel[]) => {
        setArray(data);
      })
      /* eslint-disable-next-line */
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const chosenobj = useMemo(
    () => categoryData.find(item => item.id === productId) || null,
    [categoryData, productId],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (chosenobj?.images?.length) {
      setSelectedImage(chosenobj.images[0]);
    }
  }, [chosenobj]);

  const sortedToNewArray = [...array].sort((a, b) => b.year - a.year);

  const handlePrev = () => {
    setChuslo(prev => Math.max(0, prev - 4));
  };

  const handleNext = () => {
    if (Chuslo + 4 < sortedToNewArray.length) {
      setChuslo(prev => prev + 4);
    }
  };

  if (!chosenobj) {
    return <div className="Product__Cart">Loading details...</div>;
  }

  const handleProductClick = (product: NewModel) => {
    if (setsmth) {
      setsmth(product);
    }

    navigate(`/${product.category}/${product.itemId}`);
  };

  const activeImg = selectedImage || chosenobj.images[0];

  const handleColorChange = (newColor: string) => {
    const match = categoryData.find(
      item =>
        item.namespaceId === chosenobj.namespaceId &&
        item.capacity === chosenobj.capacity &&
        item.color === newColor,
    );

    if (match) {
      navigate(`/${category}/${match.id}`);
    }
  };

  const handleCapacityChange = (newCapacity: string) => {
    const match = categoryData.find(
      item =>
        item.namespaceId === chosenobj.namespaceId &&
        item.color === chosenobj.color &&
        item.capacity === newCapacity,
    );

    if (match) {
      navigate(`/${category}/${match.id}`);
    }
  };

  const buildNewModel = (): NewModel => ({
    id: Number(chosenobj.id.replace(/\D/g, '')) || 0,
    category: chosenobj.category,
    itemId: chosenobj.id,
    name: chosenobj.name,
    fullPrice: chosenobj.priceRegular,
    price: chosenobj.priceDiscount,
    screen: chosenobj.screen,
    capacity: chosenobj.capacity,
    color: chosenobj.color,
    ram: chosenobj.ram,
    year: 0,
    image: activeImg,
    selectedCapacity: chosenobj.capacity,
    selectedColor: chosenobj.color,
  });

  const isMainCart = cart.some(item => item.itemId === chosenobj.id);
  const isMainFavorite = FavouritesA.some(item => item.itemId === chosenobj.id);

  return (
    <div className="Product__Cart">
      <div className="rootline">
        <Link to="/">
          <img src="img/Home.svg" alt="Home" />
        </Link>
        <p className="root__arrow"></p>
        <Link to={`/${category}`} className="root__thing">
          {formatCategoryName(category)}
        </Link>
        <p className="root__arrow"></p>
        <p>{chosenobj.name}</p>
      </div>

      {/* Кнопка  */}
      <Link to={`/${category}`} className="Back__Name">
        <span className="root__arrow__back"></span>
        <p>Back</p>
      </Link>

      <div className="visuals">
        <p className="visuals__title">{chosenobj.name}</p>

        <div className="visuals__info">
          <div className="All__photos">
            <div className="visuals__info__photos">
              {chosenobj.images.map((imgUrl, index) => (
                <img
                  key={index}
                  className={`small__img ${activeImg === imgUrl ? 'is-active' : ''}`}
                  src={imgUrl}
                  alt={`${chosenobj.name} preview ${index + 1}`}
                  onClick={() => setSelectedImage(imgUrl)}
                />
              ))}
            </div>
            <div className="Chosen__photo">
              <img className="big__img" src={activeImg} alt={chosenobj.name} />
            </div>
          </div>

          <div className="visuals__info__title">
            <div className="capacity__title">Available colors</div>
            <div className="colors">
              {chosenobj.colorsAvailable.map(colorItem => (
                <button
                  key={colorItem}
                  className={`colors__button--${colorItem} ${
                    colorItem === chosenobj.color ? 'is-active' : ''
                  }`}
                  style={{
                    backgroundColor: COLOR_MAP[colorItem] || colorItem,
                  }}
                  aria-label={colorItem}
                  onClick={() => handleColorChange(colorItem)}
                ></button>
              ))}
            </div>

            <div className="visuals__line"></div>
            <div className="capacity__title">Select capacity</div>
            <div className="capacity__button">
              {chosenobj.capacityAvailable.map(cap => (
                <button
                  key={cap}
                  className={`capacity__buttons ${
                    cap === chosenobj.capacity ? 'is-active' : ''
                  }`}
                  onClick={() => handleCapacityChange(cap)}
                >
                  {cap}
                </button>
              ))}
            </div>

            <div className="visuals__line"></div>
            <div className="visuals__price-block">
              <div>
                <span className="this__Price">${chosenobj.priceDiscount}</span>
                <span className="Price__without__Discount">
                  ${chosenobj.priceRegular}
                </span>
              </div>

              <div className="this__Price__Buttons">
                <button
                  className={isMainCart ? 'Added__to__Cart' : 'cart__button'}
                  onClick={() => addingObjCart(buildNewModel())}
                >
                  {isMainCart ? 'Added to cart' : 'Add to cart'}
                </button>

                <button
                  className="love__button"
                  onClick={() => addingObj(buildNewModel())}
                  aria-label="Add to favorites"
                >
                  {isMainFavorite ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="#EB5757"
                    >
                      <path
                        /* eslint-disable-next-line */
                        d="M8 13.5L2.5 8C1 6.5 1 4 2.5 2.5C4 1 6.5 1 8 3C9.5 1 12 1 13.5 2.5C15 4 15 6.5 13.5 8L8 13.5Z"
                        stroke="#EB5757"
                        strokeWidth="1.5"
                      />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        /* eslint-disable-next-line */
                        d="M8 13.5L2.5 8C1 6.5 1 4 2.5 2.5C4 1 6.5 1 8 3C9.5 1 12 1 13.5 2.5C15 4 15 6.5 13.5 8L8 13.5Z"
                        stroke="#313237"
                        strokeWidth="1.5"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <ul className="visuals__additional__List">
                <li className="part__List">
                  <div className="visuals__firstpart">Screen</div>
                  <div className="visuals__secondpart">{chosenobj.screen}</div>
                </li>
                <li className="part__List">
                  <div className="visuals__firstpart">Resolution</div>
                  <div className="visuals__secondpart">
                    {chosenobj.resolution}
                  </div>
                </li>
                <li className="part__List">
                  <div className="visuals__firstpart">Processor</div>
                  <div className="visuals__secondpart">
                    {chosenobj.processor}
                  </div>
                </li>
                <li className="part__List">
                  <div className="visuals__firstpart">RAM</div>
                  <div className="visuals__secondpart">{chosenobj.ram}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="visuals__additional">
          <div className="visuals__additional__first">
            <h2 className="visuals__additional__header">About</h2>
            <div className="additional__line__long"></div>

            {chosenobj.description.map((item, index) => (
              <React.Fragment key={index}>
                <h3 className="visuals__additional__under">{item.title}</h3>
                {item.text.map((paragraph, pIndex) => (
                  <p key={pIndex} className="visuals_paragraph">
                    {paragraph}
                  </p>
                ))}
              </React.Fragment>
            ))}
          </div>

          <div className="visuals__additional__first">
            <h2 className="visuals__additional__header">Tech Specs</h2>
            <div className="additional__line__long"></div>

            <ul className="visuals__additional__List">
              <li className="part__List">
                <div className="visuals__firstpart">Screen</div>
                <div className="visuals__secondpart">{chosenobj.screen}</div>
              </li>
              <li className="part__List">
                <div className="visuals__firstpart">Resolution</div>
                <div className="visuals__secondpart">
                  {chosenobj.resolution}
                </div>
              </li>
              <li className="part__List">
                <div className="visuals__firstpart">Processor</div>
                <div className="visuals__secondpart">{chosenobj.processor}</div>
              </li>
              <li className="part__List">
                <div className="visuals__firstpart">RAM</div>
                <div className="visuals__secondpart">{chosenobj.ram}</div>
              </li>
              <li className="part__List">
                <div className="visuals__firstpart">Built in memory</div>
                <div className="visuals__secondpart">{chosenobj.capacity}</div>
              </li>
              <li className="part__List">
                <div className="visuals__firstpart">Camera</div>
                <div className="visuals__secondpart">{chosenobj.camera}</div>
              </li>
              <li className="part__List">
                <div className="visuals__firstpart">Zoom</div>
                <div className="visuals__secondpart">{chosenobj.zoom}</div>
              </li>
              <li className="part__List">
                <div className="visuals__firstpart">Cell</div>
                <div className="visuals__secondpart">
                  {chosenobj.cell.join(', ')}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="Head__List">
        <h2 className="Brand__new__title">You may also like</h2>
        <div className="Button__List">
          <button
            className={
              Chuslo === 0 ? 'Button__another__design' : 'Button__List__this'
            }
            onClick={() => handlePrev()}
          ></button>
          <button
            className={
              Chuslo + 4 >= sortedToNewArray.length
                ? 'Button__another__design'
                : 'Button__List__this'
            }
            onClick={() => handleNext()}
          ></button>
        </div>
      </div>
      <div className="Brand__new__List">
        {sortedToNewArray.slice(Chuslo, Chuslo + 4).map(obj => {
          const isFavorite = FavouritesA.some(
            cobj => cobj.itemId === obj.itemId,
          );
          const isChosen = cart?.some(cobj => cobj.itemId === obj.itemId);

          return (
            <div className="Brand__new__phone" key={obj.id}>
              <Link
                to={`/${obj.category}/${obj.itemId}`}
                onClick={() => handleProductClick(obj)}
                style={{ textDecoration: 'none' }}
              >
                <img
                  className="Brand__new__phone__image"
                  src={obj.image}
                  alt={obj.itemId}
                />

                <p className="Brand__new__phone__title">{obj.name}</p>
              </Link>

              <div className="Price">
                <span className="this__Price">${obj.price}</span>
              </div>

              <div className="phone__Line"></div>
              <ul className="charasteristics">
                <li className="each">
                  <span className="part__of__List">Screen</span>
                  <span className="part__of__char">{obj.screen}</span>
                </li>
                <li className="each">
                  <span className="part__of__List">Capacity</span>
                  <span className="part__of__char">{obj.capacity}</span>
                </li>
                <li className="each">
                  <span className="part__of__List">RAM</span>
                  <span className="part__of__char">{obj.ram}</span>
                </li>
              </ul>
              <div className="contract__buttons">
                <button
                  type="button"
                  className={isChosen ? 'Added2__to__Cart' : 'Add__to__cart'}
                  onClick={e => {
                    e.stopPropagation();
                    addingObjCart(obj);
                  }}
                >
                  {isChosen ? 'Added to cart' : 'Add to cart'}
                </button>
                <button
                  type="button"
                  className="heart"
                  aria-label="Add to favorites"
                  onClick={e => {
                    e.stopPropagation();
                    addingObj?.(obj);
                  }}
                >
                  {isFavorite ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="#EB5757"
                    >
                      <path
                        /* eslint-disable-next-line */
                        d="M8 13.5L2.5 8C1 6.5 1 4 2.5 2.5C4 1 6.5 1 8 3C9.5 1 12 1 13.5 2.5C15 4 15 6.5 13.5 8L8 13.5Z"
                        stroke="#EB5757"
                        strokeWidth="1.5"
                      />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        /* eslint-disable-next-line */
                        d="M8 13.5L2.5 8C1 6.5 1 4 2.5 2.5C4 1 6.5 1 8 3C9.5 1 12 1 13.5 2.5C15 4 15 6.5 13.5 8L8 13.5Z"
                        stroke="#313237"
                        strokeWidth="1.5"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
