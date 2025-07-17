import { NavLink, useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { ModelsSlider } from '../ModelsSlider';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getData, getProducts } from '../../utils/fetchClient';
import { CategoryProduct } from '../../types/CategoryProduct';

const techSpecs = [
  'screen',
  'resolution',
  'processor',
  'ram',
  'camera',
  'zoom',
  'cell',
];

const colorMap = {
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
};

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<CategoryProduct | undefined>(
    undefined,
  );
  const [color, setColor] = useState<string | undefined>(undefined);
  const [capacity, setCapacity] = useState<string | undefined>(undefined);
  const [mainImgSrc, setMainImgSrc] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then(productsFromServer => {
      const random = [...productsFromServer]
        .sort(() => Math.random() - 0.5)
        .slice(0, 8);

      setRandomProducts(random);

      const category = productsFromServer.find(
        p => p.itemId === productId,
      )?.category;

      getData<CategoryProduct[]>(`/${category}`).then(
        categoryProductsFromServer => {
          const selectedProduct = categoryProductsFromServer.find(
            p => p.id === productId,
          );

          setProduct(selectedProduct);
          setMainImgSrc(selectedProduct?.images[0]);
          setColor(selectedProduct?.color);
          setCapacity(selectedProduct?.capacity);
        },
      );
    });
  }, [productId]);

  if (!product) {
    return (
      <main className={styles.page} style={{ height: '100vh' }}>
        <h1 className={styles.pageInfo_title}> Product was not found</h1>
      </main>
    );
  }

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    const newId =
      product.namespaceId +
      '-' +
      product.capacity.toLowerCase() +
      '-' +
      newColor.replace(' ', '-');

    navigate(`/product/${newId}`);
  };

  const handleCapacityChange = (newCapacity: string) => {
    setCapacity(newCapacity);
    const newId =
      product.namespaceId +
      '-' +
      newCapacity.toLowerCase() +
      '-' +
      product.color.replace(' ', '-');

    navigate(`/product/${newId}`);
  };

  return (
    <main className={styles.page}>
      <div className={styles.pageContent}>
        <div className={styles.pathHome}>
          <NavLink to="/">
            <img src="/img/icons/home.svg" alt="home" />
          </NavLink>
          <span className={styles.pathHome_title}>&gt;</span>
          <NavLink className={styles.pageInfo_link} to={product.category}>
            {product.category}
          </NavLink>
          <span className={styles.pathHome_title}>&gt;</span>
          <span className={styles.pathHome_title}>{product.name}</span>
        </div>
        <div className={styles.pageInfo}>
          <NavLink className={styles.pageInfo_link} to="/">
            <span>&lt;</span>
            <span>Back</span>
          </NavLink>
          <h1 className={styles.pageInfo_title}> {product.name}</h1>
        </div>
        <div className={styles.pageItems}>
          <div className={styles.productMedia}>
            <div className={styles.productMedia_allImg}>
              {product.images.map(image => (
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
                  <img src={`..\\..\\..\\public\\${image}`}></img>
                </div>
              ))}
            </div>
            <div className={styles.productMedia_mainImg}>
              <img src={`..\\..\\..\\public\\${mainImgSrc}`}></img>
            </div>
            <div className={styles.productMedia_card}>
              <div className={styles.productMedia_card_section}>
                <span className={styles.productMedia_card_text}>
                  Available colors
                </span>
                <div className={styles.productMedia_card_options}>
                  {product.colorsAvailable.map(col => (
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
                  {product.capacityAvailable.map(cap => (
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
                <span>{`$${product.priceDiscount}`}</span>
                <span
                  className={styles.productMedia_card_price_full}
                >{`$${product.priceRegular}`}</span>
              </div>
              <div className={styles.cardButtons}>
                <button className={styles.cardAddButton}>Add to a cart</button>
                <button className={styles.cardFavButton}>
                  <img
                    src="/img/icons/favourite-default.svg"
                    alt="favourites"
                  />
                </button>
              </div>
              <div className={styles.cardProperties}>
                <div className={styles.cardProperty}>
                  <span className={styles.productMedia_card_text}>Screen</span>
                  <span className={styles.cardPropertyValue}>
                    {product.screen}
                  </span>
                </div>
                <div className={styles.cardProperty}>
                  <span className={styles.productMedia_card_text}>
                    Capacity
                  </span>
                  <span className={styles.cardPropertyValue}>
                    {product.capacity}
                  </span>
                </div>
                <div className={styles.cardProperty}>
                  <span className={styles.productMedia_card_text}>RAM</span>
                  <span className={styles.cardPropertyValue}>
                    {product.ram}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.productDescription}>
            <section className={styles.productDescription_section}>
              <h3 className={styles.productDescription_title}>About</h3>
              {product.description.map(p => (
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
                  .filter(techSpec => techSpec in product)
                  .map(ts => (
                    <div
                      key={ts}
                      className={styles.productDescription_techSpec}
                    >
                      <span className={styles.productDescription_techSpec_name}>
                        {ts}
                      </span>
                      <span>
                        {ts !== 'cell' ? product[ts] : product[ts]?.join(', ')}
                      </span>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </div>
        <div className={styles.pageSlider}>
          <h2 className={styles.pageSlider_title}>You may also like</h2>
          <ModelsSlider
            products={randomProducts}
            arrowClassName="modelsSliderArrow"
          />
        </div>
      </div>
    </main>
  );
};
