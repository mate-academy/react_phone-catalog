import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './InfoCartPage.module.scss';
import { BackButton } from '../../components/BackButton';
import { getAccessorie, getPhone, getTablet } from '../../api';
import { useContext, useEffect, useState } from 'react';
import { Phone } from '../../types/Phone';
import { NotFoundPage } from '../NotFoundPage';
import classNames from 'classnames';
import { DispatchContext, StateContext } from '../../Store';
import { Carousel } from '../../components/Carousel';
import { Loading } from '../../components/Loading';

const getColorByName = (name: string): string => {
  const mapColors: Record<string, string> = {
    midnight: '#191970',
    'space-gray': '#707070',
    midnightgreen: '#004953',
    gold: '#FFD700',
    silver: '#C0C0C0',
    rosegold: '#B76E79',
    coral: '#FF7F50',
    spaceblack: '#505150',
    graphite: '#41424C',
    sierrablue: '#BFDAF7',
    spacegray: '#707070',
  };

  if (mapColors[name]) {
    return mapColors[name];
  }

  return name;
};

export const InfoCartPage = (params: { category: string }) => {
  const { category } = params;
  const { itemId } = useParams();
  const [product, setProduct] = useState<null | Phone>(null);
  const [currentIndexImg, setCurrentIndexImg] = useState(0);
  const state = useContext(StateContext);
  const { products, favorites, bascket } = state;
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  const [isLoading, setIsLoading] = useState(false);

  const added = bascket.find(item => item.itemId === product?.id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [itemId]);

  useEffect(() => {
    if (category === 'phones' && itemId) {
      setIsLoading(true);

      getPhone(itemId)
        .then(data => {
          if (data) {
            setProduct(data);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (category === 'tablets' && itemId) {
      setIsLoading(true);

      getTablet(itemId)
        .then(data => {
          if (data) {
            setProduct(data);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (category === 'accessories' && itemId) {
      setIsLoading(true);

      getAccessorie(itemId)
        .then(data => {
          if (data) {
            setProduct(data);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [category, itemId]);

  if (isLoading) {
    return <Loading />;
  }

  if (!product) {
    return <NotFoundPage />;
  }

  const findId = products.find(item => item.itemId === product.id);

  const handleChangeURL = (element: string, find: string) => {
    if (findId) {
      if (find === 'color') {
        const pathname = `${product.namespaceId}-${product.capacity.toLowerCase()}-${element}`;

        navigate(`/${category}/${pathname}`);
      }

      if (find === 'capacity') {
        const pathname = `${product.namespaceId}-${element.toLowerCase()}-${product.color}`;

        navigate(`/${category}/${pathname}`);
      }
    }
  };

  const isFavorite = !!favorites.find(item => item === product.id);

  const addToFavorites = () => {
    if (!isFavorite) {
      dispatch({
        type: 'addToFavorites',
        payload: { itemId: product.id },
      });
    }

    if (isFavorite) {
      dispatch({
        type: 'removeFromFavorites',
        payload: { itemId: product.id },
      });
    }
  };

  const addToBascket = () => {
    if (!added) {
      dispatch({
        type: 'addToBascket',
        payload: { itemId: product.id, price: product.priceDiscount },
      });
    }

    if (added) {
      dispatch({
        type: 'removeFromBascket',
        payload: { itemId: product.id },
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <section className={styles.topFirst}>
          <Link to="/">
            <img src="img/Home.Icon.svg" alt="iconHome" />
          </Link>
          <img
            src="img/arrowRightLight.svg"
            alt="arrowRight"
            className={styles.arrowRight}
          />
          <Link to={`/${category}`} className={styles.name}>
            {category}
          </Link>
          <img
            src="img/arrowRightLight.svg"
            alt="arrowRight"
            className={styles.arrowRight}
          />
          <h4 className={styles.name}>{product.name}</h4>
        </section>
        <BackButton />
      </div>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.content}>
        <div className={styles.firstSector}>
          <div className={styles.allImages}>
            {product.images.map((image, index) => (
              <img
                src={image}
                alt="smallImage"
                key={index}
                className={classNames([styles.smallImage], {
                  [styles.imgActive]: index === currentIndexImg,
                })}
                onClick={() => setCurrentIndexImg(index)}
              />
            ))}
          </div>
          <div className={styles.selectedImg}>
            <img
              src={product.images[currentIndexImg]}
              alt="selectedImg"
              className={styles.bigImg}
            />
          </div>
        </div>

        <div className={styles.secondSelector}>
          <div className={styles.colors}>
            <div className={styles.InfoTextBlock}>
              <p className={styles.infoText}>Available colors</p>
              <p className={styles.colorId}>{`ID: 000${findId?.id}`}</p>
            </div>
            <ul className={styles.list}>
              {product.colorsAvailable.map((element, index) => (
                <li
                  key={index}
                  className={classNames([styles.color], {
                    [styles.colorIsActive]: element === product.color,
                  })}
                  onClick={() => handleChangeURL(element, 'color')}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: getColorByName(element),
                    cursor: 'pointer',
                  }}
                ></li>
              ))}
            </ul>
          </div>

          <div className={styles.border}></div>

          <div className={styles.capacity}>
            <div className={styles.InfoTextBlock}>
              <p className={styles.infoText}>Select capacity</p>
            </div>
            <ul className={styles.list}>
              {product.capacityAvailable.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleChangeURL(item, 'capacity')}
                  className={classNames([styles.listItem], {
                    [styles.capacityIsActive]: item === product.capacity,
                  })}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.border}></div>

          <div className={styles.buttonAndPrice}>
            <div className={styles.prices}>
              <p
                className={styles.priceDiscount}
              >{`$${product.priceDiscount}`}</p>
              <p
                className={styles.priceRegular}
              >{`$${product.priceRegular}`}</p>
            </div>
            <div className={styles.buttons}>
              {product.id === added?.itemId ? (
                <button className={styles.added} onClick={addToBascket}>
                  Added
                </button>
              ) : (
                <button className={styles.buttonAdd} onClick={addToBascket}>
                  Add to cart
                </button>
              )}
              <button className={styles.buttonLike} onClick={addToFavorites}>
                {favorites.includes(product.id) ? (
                  <img src="img/redHeart.svg" alt="heart" />
                ) : (
                  <img src="img/homePage/heart.svg" alt="heart" />
                )}
              </button>
            </div>
          </div>

          <div className={styles.specs}>
            <div className={styles.spec}>
              <div className={styles.specName}>Screen</div>
              <div className={styles.specValue}>{product.screen}</div>
            </div>
            <div className={styles.spec}>
              <div className={styles.specName}>Resolution</div>
              <div className={styles.specValue}>{product.resolution}</div>
            </div>
            <div className={styles.spec}>
              <div className={styles.specName}>Processor</div>
              <div className={styles.specValue}>{product.processor}</div>
            </div>
            <div className={styles.spec}>
              <div className={styles.specName}>RAM</div>
              <div className={styles.specValue}>{product.ram}</div>
            </div>
          </div>
        </div>

        <div className={styles.about}>
          <div className={styles.aboutTitle}>
            <h3 className={styles.aboutTitle}>About</h3>
            <div className={styles.borderSecond}></div>
          </div>
          {product.description.map((element, index) => (
            <div className={styles.aboutBlock} key={index}>
              <h2 className={styles.aboutBlockTitleSector}>{element.title}</h2>
              {element.text.map((item, idx) => (
                <p key={idx} className={styles.aboutBlockDescriptionSector}>
                  {item}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.tech}>
          <div className={styles.techTitle}>
            <h3 className={styles.techTitle}>Tech specs</h3>
            <div className={styles.borderSecond}></div>
          </div>
          <div className={styles.properties}>
            <div className={styles.property}>
              <p className={styles.propertiesName}>Screen</p>
              <p className={styles.propertiesValue}>{product.screen}</p>
            </div>
            <div className={styles.property}>
              <p className={styles.propertiesName}>Resolution</p>
              <p className={styles.propertiesValue}>{product.resolution}</p>
            </div>
            <div className={styles.property}>
              <p className={styles.propertiesName}>Processor</p>
              <p className={styles.propertiesValue}>{product.processor}</p>
            </div>
            <div className={styles.property}>
              <p className={styles.propertiesName}>RAM</p>
              <p className={styles.propertiesValue}>{product.ram}</p>
            </div>
            <div className={styles.property}>
              <p className={styles.propertiesName}>Built in memory</p>
              <p className={styles.propertiesValue}>{product.capacity}</p>
            </div>
            <div className={styles.property}>
              <p className={styles.propertiesName}>Camera</p>
              <p className={styles.propertiesValue}>{product.camera}</p>
            </div>
            <div className={styles.property}>
              <p className={styles.propertiesName}>Zoom</p>
              <p className={styles.propertiesValue}>{product.zoom}</p>
            </div>
            <div className={styles.property}>
              <p className={styles.propertiesName}>Cell</p>
              <p className={styles.propertiesValue}>{product.cell}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.carousel}>
        <Carousel category={category} />
      </div>
    </div>
  );
};
