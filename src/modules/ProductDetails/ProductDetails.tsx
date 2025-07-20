import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import styles from './ProductDetails.module.scss';
import { Accessory, Phone, Tablet } from '../../types/ProductDetails';
import { DataContext } from '../../context/DataContext';

type Category = 'phones' | 'tablets' | 'accessories';

type DetailedProduct = Phone | Tablet | Accessory;

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, phones, tablets, accessories } = useContext(DataContext);
  const product = products.find(p => p.itemId === id);
  let selectedProduct: DetailedProduct | null = null;

  if (product) {
    switch (product.category as Category) {
      case 'phones':
        selectedProduct = phones.find(phone => phone.id === id) || null;
        break;
      case 'tablets':
        selectedProduct = tablets.find(tablet => tablet.id === id) || null;
        break;
      case 'accessories':
        selectedProduct =
          accessories.find(accessory => accessory.id === id) || null;
        break;
      default:
        return null;
    }
  }

  if (!product || !selectedProduct) {
    return <h1 className={styles.notFound}>Product was not found</h1>;
  }

  const {
    name,
    capacity,
    priceRegular,
    priceDiscount,
    screen,
    ram,
    processor,
    resolution,
    images,
    capacityAvailable,
    camera,
    zoom,
    cell,
    description,
  } = selectedProduct;

  return (
    <div className={styles.productDetailsPage}>
      <div className="container">
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          ← Back
        </button>

        <section className={styles.productDetails}>
          {/* Назва продукту */}
          <h2 className={`section-title ${styles.productDetails__title}`}>
            {name}
          </h2>

          {/* Головний контент */}
          <div className={styles.productDetails__content}>
            {/* Зображення */}
            <div className={styles.productDetails__gallery}>
              <div className={styles.productDetails__galleryList}>
                {/* Превʼю */}
                {images.map((image: string) => (
                  <img
                    key={image}
                    src={`/${image}`}
                    alt="thumb"
                    className={`${styles.productDetails__thumbnail} ${styles.productDetails__thumbnail_selected}`}
                  />
                ))}
              </div>
              <div className={styles.productDetails__mainImage}>
                <img src={`/${images[0]}`} alt="main" />
              </div>
            </div>

            {/* Інфо панель */}
            <div className={styles.productDetails__info}>
              <div className={styles.options}>
                {/* Колір */}
                <div className={styles.colors}>
                  <span>Available colors</span>
                  <div className={styles.colorDots}>
                    {/* кола з кольорами */}
                  </div>
                  <span className={styles.id}>ID: 802390</span>
                </div>

                {/* Памʼять */}
                <div className={styles.capacity}>
                  <span>Select capacity</span>
                  <div className={styles.capacityOptions}>
                    {capacityAvailable.map((item: string) => (
                      <button key={item}>{item}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ціна + кнопки */}
              <div className={styles.purchase}>
                <div className={styles.priceBlock}>
                  <span className={styles.price}>${priceDiscount}</span>
                  <span className={styles.oldPrice}>${priceRegular}</span>
                </div>
                <div className={styles.buttons}>
                  <button className={styles.addToCart}>Add to cart</button>
                  <button className={styles.favourite}>♡</button>
                </div>
              </div>

              {/* Короткі характеристики */}
              <ul className={styles.shortSpecs}>
                <li>
                  <span>Screen</span>
                  <span>{screen}</span>
                </li>
                <li>
                  <span>Resolution</span>
                  <span>{resolution}</span>
                </li>
                <li>
                  <span>Processor</span>
                  <span>{processor}</span>
                </li>
                <li>
                  <span>RAM</span>
                  <span>{ram}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Опис */}
          <div className={styles.description}>
            <div className={styles.about}>
              <h2>About</h2>
              {description.map((item: { title: string; text: string[] }) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  {item.text.map((text: string) => (
                    <p key={text}>{text}</p>
                  ))}
                </div>
              ))}
            </div>

            <div className={styles.techSpecs}>
              <h2>Tech specs</h2>
              <ul>
                <li>
                  <span>Screen</span>
                  <span>{screen}</span>
                </li>
                <li>
                  <span>Resolution</span>
                  <span>{resolution}</span>
                </li>
                <li>
                  <span>Processor</span>
                  <span>{processor}</span>
                </li>
                <li>
                  <span>RAM</span>
                  <span>{ram}</span>
                </li>
                <li>
                  <span>Built in memory</span>
                  <span>{capacity}</span>
                </li>
                <li>
                  <span>Camera</span>
                  <span>{camera}</span>
                </li>
                <li>
                  <span>Zoom</span>
                  <span>{zoom}</span>
                </li>
                <li>
                  <span>Cell</span>
                  {cell.map((item: string) => (
                    <span key={item}>{item},</span>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
