import { NavLink } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { ModelsSlider } from '../ModelsSlider';

const product = {
  id: 'apple-ipad-pro-11-2021-128gb-spacegray',
  category: 'tablets',
  namespaceId: 'apple-ipad-pro-11-2021',
  name: 'Apple iPad Pro 11 (2021) 128GB Space Gray',
  capacityAvailable: ['128GB', '256GB', '512GB', '1TB', '2TB'],
  capacity: '128GB',
  priceRegular: 799,
  priceDiscount: 749,
  colorsAvailable: ['white', 'silver'],
  // colorsAvailable: ['spacegray', 'silver'],
  color: 'spacegray',
  images: [
    'img/tablets/apple-ipad-pro-11-2021/spacegray/00.webp',
    'img/tablets/apple-ipad-pro-11-2021/spacegray/01.webp',
    'img/tablets/apple-ipad-pro-11-2021/spacegray/02.webp',
  ],
  description: [
    {
      title: 'Powerful Performance',
      text: [
        // eslint-disable-next-line max-len
        'Experience incredible power and performance with the Apple iPad Pro 11. With the M1 chip, it delivers a new level of performance, making it faster and more efficient than ever before.',
        // eslint-disable-next-line max-len
        "Whether you're editing photos, designing artwork, or multitasking with demanding apps, the iPad Pro 11 handles it all with ease.",
      ],
    },
    {
      title: 'Stunning Liquid Retina Display',
      text: [
        // eslint-disable-next-line max-len
        "Enjoy a vibrant and immersive visual experience on the iPad Pro 11's Liquid Retina display. With ProMotion technology and True Tone, the display adapts to your environment, providing smooth scrolling, precise color accuracy, and incredible detail.",
        // eslint-disable-next-line max-len
        "From watching movies to editing videos, the iPad Pro 11's display brings your content to life with stunning clarity.",
      ],
    },
    {
      title: 'Versatile Camera System',
      text: [
        // eslint-disable-next-line max-len
        "Capture stunning photos and videos with the iPad Pro 11's advanced camera system. Featuring a 12MP Ultra Wide front camera and a 12MP Wide rear camera with LiDAR scanner, you can take high-quality shots and enjoy augmented reality experiences.",
        // eslint-disable-next-line max-len
        "Whether you're video calling, scanning documents, or recording 4K videos, the iPad Pro 11's camera system delivers exceptional performance.",
      ],
    },
  ],
  screen: "11' Liquid Retina",
  resolution: '2388x1668',
  processor: 'Apple M1',
  ram: '8GB',
  camera: '12MP + 12MP',
  zoom: 'Digital zoom up to 5x',
  cell: ['Not applicable'],
};

const techSpecs = [
  'screen',
  'resolution',
  'processor',
  'ram',
  'camera',
  'zoom',
  'cell',
];

export const ProductDetailsPage = () => {
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
                <div key={image} className={styles.productMedia_allImg_wrap}>
                  <img src={image}></img>
                </div>
              ))}
            </div>
            <div className={styles.productMedia_mainImg}>
              <img src={product.images[0]}></img>
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
                        border: `1px solid ${col}`,
                      }}
                      className={styles.productMedia_card_options_col}
                      key={col}
                    >
                      <div
                        style={{
                          backgroundColor: col,
                          borderRadius: '50%',
                          width: '26px',
                          height: '26px',
                        }}
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
                    >
                      {cap}
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={styles.productMedia_card_price}
              >{`$${product.priceRegular}`}</div>
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
                      <span>{product[ts]}</span>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </div>
        <div className={styles.pageSlider}>
          <h2 className={styles.pageSlider_title}>You may also like</h2>
          <ModelsSlider
            rows={1}
            itemsPerRow={4}
            dots={false}
            arrowClassName="modelsSliderArrow_up"
          />
        </div>
      </div>
    </main>
  );
};
