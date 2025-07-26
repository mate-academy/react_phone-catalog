import { NavLink, useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { useContext, useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getData, getProducts } from '../../utils/fetchClient';
import {
  CategoryProduct,
  CategoryProductTechSpecKeys,
} from '../../types/CategoryProduct';
import { EmptyPage } from '../EmptyPage';
import { CartandFavContext } from '../CartandFavProvider';
import classNames from 'classnames';
import { SomethingWentWrongPage } from '../SomethingWentWrongPage';
import { Loader } from '../Loader';
import { MySlider } from '../MySlider';
import Home from '../../../public/img/icons/home.svg';
import Fav from '../../../public/img/icons/favourite-default.svg';
import FavSelected from '../../../public/img/icons/favourite-selected.svg';

const techSpecs: CategoryProductTechSpecKeys[] = [
  'screen',
  'resolution',
  'processor',
  'ram',
  'camera',
  'zoom',
  'cell',
];

const colorMap: Record<string, string> = {
  midnight: '#1e1e2f',
  gold: '#d4af37',
  graphite: '#4b4b4f',
  'space gray': '#3c3c3c',
  'space-gray': '#3c3c3c',
  spacegray: '#3c3c3c',
  silver: '#c0c0c0',
  'rose gold': '#e3b6a0',
  rosegold: '#e3b6a0',
  'sky-blue': '#87ceeb',
  starlight: '#f0eada',
  sierrablue: '#4e85c5',
  spaceblack: '#1a1a1a',
  black: '#000000',
  yellow: '#ffcc00',
  green: '#34c759',
  red: '#ff3b30',
  white: '#ffffff',
  purple: '#af52de',
  coral: '#ff7f50',
  midnightgreen: '#004953',
  blue: '#007aff',
  pink: '#ff69b4',
} as const;

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { cart, fav, setCart, setFav } = useContext(CartandFavContext);

  const isInCart = cart.some(item => item.id === productId);
  const isInFav = fav.some(item => item.itemId === productId);
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  /* eslint-disable */
  const [categoryProduct, setCategoryProduct] = useState<
    CategoryProduct | undefined
  >(undefined);
  /* eslint-enable */
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [color, setColor] = useState<string | undefined>(undefined);
  const [capacity, setCapacity] = useState<string | undefined>(undefined);
  const [mainImgSrc, setMainImgSrc] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setErrorMessage('');

      const delay = new Promise(resolve => setTimeout(resolve, 300));

      try {
        const productsFromServer = await getProducts();

        const random = [...productsFromServer]
          .sort(() => Math.random() - 0.5)
          .slice(0, 8);

        setRandomProducts(random);

        const productFromServer = productsFromServer.find(
          p => p.itemId === productId,
        );

        if (!productFromServer) {
          throw new Error('not found');
        }

        setProduct(productFromServer);

        const category = productFromServer.category;

        const [categoryProductsFromServer] = await Promise.all([
          getData<CategoryProduct[]>(`/${category}`),
          delay,
        ]);

        const selectedProduct = categoryProductsFromServer.find(
          p => p.id === productId,
        );

        if (!selectedProduct) {
          throw new Error('not found');
        }

        setCategoryProduct(selectedProduct);
        setMainImgSrc(selectedProduct.images[0]);
        setColor(selectedProduct.color);
        setCapacity(selectedProduct.capacity);
      } catch (e) {
        if (e instanceof Error) {
          if (e.message === 'not found') {
            setErrorMessage('not found');
          } else {
            setErrorMessage('went wrong');
          }
        }
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (loading) {
    return <Loader />;
  }

  if (errorMessage === 'went wrong') {
    return <SomethingWentWrongPage />;
  }

  if (errorMessage === 'not found') {
    return (
      <EmptyPage title="Wrong id!" text="There is no product with this id" />
    );
  }

  if (!categoryProduct) {
    return (
      <EmptyPage title="Wrong id!" text="There is no product with this id" />
    );
  }

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    const newId =
      categoryProduct.namespaceId +
      '-' +
      categoryProduct.capacity.toLowerCase() +
      '-' +
      newColor.replace(' ', '-');

    navigate(`/${categoryProduct.category}/product/${newId}`);
  };

  const handleCapacityChange = (newCapacity: string) => {
    setCapacity(newCapacity);
    const newId =
      categoryProduct.namespaceId +
      '-' +
      newCapacity.toLowerCase() +
      '-' +
      categoryProduct.color.replace(' ', '-');

    navigate(`/${categoryProduct.category}/product/${newId}`);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    const newCartItem = {
      id: product.itemId,
      quantity: 1,
      product: product,
    };

    setCart(prevCart => [...prevCart, newCartItem]);
  };

  const handleAddToFav = () => {
    if (!product) {
      return;
    }

    if (!isInFav) {
      setFav(prevFav => [...prevFav, product]);
    } else {
      setFav(prevFav => prevFav.filter(item => item.itemId !== product.itemId));
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.pageContent}>
        <div className={styles.pathHome}>
          <NavLink to="/">
            <img src={Home} alt="home" />
          </NavLink>
          <span className={styles.pathHome_title}>&gt;</span>
          <NavLink
            className={styles.pageInfo_link}
            to={`/${categoryProduct.category}`}
          >
            {categoryProduct.category[0].toUpperCase() +
              categoryProduct.category.slice(1, 20)}
          </NavLink>
          <span className={styles.pathHome_title}>&gt;</span>
          <span className={styles.pathHome_title}>{categoryProduct.name}</span>
        </div>
        <div className={styles.pageInfo}>
          <div className={styles.pageInfo_link} onClick={() => handleBack()}>
            <span>&lt;</span>
            <span>Back</span>
          </div>
          <h1 className={styles.pageInfo_title}> {categoryProduct.name}</h1>
        </div>
        <div className={styles.pageItems}>
          <div className={styles.productMedia}>
            <div className={styles.productMedia_allImg}>
              {categoryProduct.images.map(image => (
                <div
                  key={image}
                  className={styles.productMedia_allImg_wrap}
                  onClick={() => setMainImgSrc(image)}
                  style={{
                    border:
                      image === mainImgSrc
                        ? '1px solid #F1F2F9'
                        : '1px solid #3B3E4A',
                  }}
                >
                  <img src={`${import.meta.env.BASE_URL}/${image}`}></img>
                </div>
              ))}
            </div>
            <div className={styles.productMedia_mainImg}>
              <img src={`${import.meta.env.BASE_URL}/${mainImgSrc}`}></img>
            </div>
            <div className={styles.productMedia_card}>
              <div className={styles.productMedia_card_section}>
                <span className={styles.productMedia_card_text}>
                  Available colors
                </span>
                <div className={styles.productMedia_card_options}>
                  {categoryProduct.colorsAvailable.map(col => (
                    <div
                      style={{
                        backgroundColor:
                          col === color ? 'white' : colorMap[col],
                      }}
                      className={styles.productMedia_card_options_col}
                      key={col}
                    >
                      <div
                        style={{
                          backgroundColor: colorMap[col],
                          borderRadius: '50%',
                          width: '31px',
                          height: '31px',
                          cursor: 'pointer',
                          border: '2px solid #0F1121',
                          boxSizing: 'border-box',
                        }}
                        onClick={() => handleColorChange(col)}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.productMedia_card_section}>
                <span className={styles.productMedia_card_text}>
                  Select capacity
                </span>
                <div className={styles.productMedia_card_options}>
                  {categoryProduct.capacityAvailable.map(cap => (
                    <div
                      className={styles.productMedia_card_options_cap}
                      key={cap}
                      onClick={() => handleCapacityChange(cap)}
                      style={{
                        backgroundColor:
                          cap === capacity ? '#F1F2F9' : '#0F1121',
                        color: cap === capacity ? '#0F1121' : '#F1F2F9',
                      }}
                    >
                      {cap}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.productMedia_card_price}>
                <span>{`$${categoryProduct.priceDiscount}`}</span>
                <span
                  className={styles.productMedia_card_price_full}
                >{`$${categoryProduct.priceRegular}`}</span>
              </div>
              <div className={styles.cardButtons}>
                <button
                  type="button"
                  className={styles.cardAddButton}
                  disabled={isInCart}
                  onClick={() => handleAddToCart()}
                >
                  {isInCart ? 'Added to cart' : 'Add to cart'}
                </button>
                <button
                  type="button"
                  className={classNames(styles.cardFavButton, {
                    [styles.addedToFav]: isInFav,
                  })}
                  onClick={() => handleAddToFav()}
                >
                  <img src={isInFav ? FavSelected : Fav} alt="favourites" />
                </button>
              </div>
              <div className={styles.cardProperties}>
                <div className={styles.cardProperty}>
                  <span className={styles.productMedia_card_text}>Screen</span>
                  <span className={styles.cardPropertyValue}>
                    {categoryProduct.screen}
                  </span>
                </div>
                <div className={styles.cardProperty}>
                  <span className={styles.productMedia_card_text}>
                    Capacity
                  </span>
                  <span className={styles.cardPropertyValue}>
                    {categoryProduct.capacity}
                  </span>
                </div>
                <div className={styles.cardProperty}>
                  <span className={styles.productMedia_card_text}>RAM</span>
                  <span className={styles.cardPropertyValue}>
                    {categoryProduct.ram}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.productDescription}>
            <section className={styles.productDescription_section}>
              <h3 className={styles.productDescription_title}>About</h3>
              {categoryProduct.description.map(p => (
                <div
                  className={styles.productDescription_paragraph}
                  key={p.title}
                >
                  <h4 className={styles.productDescription_paragraph_title}>
                    {p.title}
                  </h4>
                  <p className={styles.productDescription_paragraph_text}>
                    {p.text}
                  </p>
                </div>
              ))}
            </section>
            <section className={styles.productDescription_section}>
              <h3 className={styles.productDescription_title}>Tech specs</h3>
              <div className={styles.productDescription_techSpecs}>
                {techSpecs
                  .filter(techSpec => techSpec in categoryProduct)
                  .map(ts => (
                    <div
                      key={ts}
                      className={styles.productDescription_techSpec}
                    >
                      <span className={styles.productDescription_techSpec_name}>
                        {ts}
                      </span>
                      <span>
                        {ts !== 'cell'
                          ? categoryProduct[ts]
                          : categoryProduct[ts]?.join(', ')}
                      </span>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </div>
        <MySlider products={randomProducts} title="You may also like" />
      </div>
    </main>
  );
};
