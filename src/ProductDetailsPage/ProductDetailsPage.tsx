/* eslint-disable import/extensions */
import styles from './ProductDetailsPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FullProduct } from '../types/Alltypes';
import { useEffect, useState } from 'react';
import { getData } from '../fetch/httpClient';
import { UseSwiper } from '../Functional/Swiper/Swiper';

export const ProductDetailsPage = () => {
  const { slug: productId, category } = useParams<{
    slug: string;
    category: string;
  }>();

  const [products, setProducts] = useState<FullProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [selectedImages, setSelectedImages] = useState('');
  // const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getData<FullProduct[]>(`./api/${category}.json`)
      .then(data => {
        const product = data.find(item => item.id === productId);

        setProducts(product || null);
        setSelectedImages(product?.images[0] || '');
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, [category, productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        {error} <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!products) {
    return <div>Product not found</div>;
  }

  const {
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
    camera,
    cell,
    zoom,
    name,
    images,
    colorsAvailable,
    capacityAvailable,
  } = products;

  return (
    <div className={styles.containerPhones}>
      <Link to={`/${category}`} className={styles.home}>
        <button className={styles.homeButton}>
          <img src="./img/home.svg" alt="home" className={styles.homeImg} />
          <img
            src="./img/vectorRight.svg"
            alt="right"
            className={styles.homeGo}
          />
          <span className={styles.homeGoTo}>{category}</span>
          <img
            src="./img/vectorRight.svg"
            alt="right"
            className={styles.homeGo}
          />
        </button>
      </Link>
      <Link to={`/${category}`} className={styles.backButton}>
        <button className={styles.backButton}>
          <img src="./img/left.svg" alt="back" className={styles.backImg} />
          <span className={styles.back}>Back</span>
        </button>
      </Link>

      <h2 className={styles.linkId}>
        <strong>
          <Link to={`/${category}/${productId}`} className={styles.linkId}>
            {products.name}
          </Link>
        </strong>
      </h2>

      <section className={styles.container}>
        <div className={styles.titleContainer}>
          <div className={styles.imagesAll}>
            {images.map(img => (
              <button
                key={img}
                type="button"
                onClick={() => setSelectedImages(img)}
                className={`${styles.imagesByOne} ${selectedImages === img ? styles.activeImg : ''}`}
              >
                <img src={`/${img}`} alt="thumbnail" />
              </button>
            ))}
          </div>

          <div className={styles.mainImageBlock}>
            <img
              src={`/${selectedImages}`}
              alt={name}
              className={styles.mainImage}
            />
          </div>
        </div>

        <aside className={styles.blockDetailsRight}>
          <div className={styles.colorsAvailableBlock}>
            {colorsAvailable.map(color => (
              <Link
                to={`/${category} /${colorsAvailable}`}
                key={color}
                className={styles.linkAvailable}
              >
                <input
                  type="radio"
                  name="color"
                  value={color}
                  // checked={selectedColor === color}
                  onChange={() => setSelectedColor(color)}
                  className={`${styles.imagesByColor} ${selectedColor === color ? styles.activeColor : ''}`}
                />
                {color}
              </Link>
            ))}
          </div>
          <span className={styles.uderLine}></span>

          <div className={styles.capacityAvailableBlock}>
            <div className={styles.capacityAvailableInBlock}>
              {capacityAvailable.map(cap => (
                <label key={cap}>
                  <input
                    type="radio"
                    name="capacity"
                    value={cap}
                    checked={selectedCapacity === cap}
                    onChange={() => setSelectedCapacity(cap)}
                  />
                  <span>{cap}</span>
                </label>
              ))}
            </div>
          </div>
          <span className={styles.uderLine}></span>

          <div className={styles.cardPriceGoup}>
            <span className={styles.cardPriceHot}>${priceDiscount}</span>
            <span className={styles.cardfullPriceHot}>${priceRegular}</span>
          </div>

          <div className={styles.actions}>
            <button className={styles.cardToAdd}>Add to cart</button>
            <button className={styles.buttonToFavorites}>
              <img
                src="/img/favorites.svg"
                className={styles.iconImgFavorites}
                alt="Favourites"
              />
            </button>
          </div>

          <div className={styles.cardSpes}>
            <div className={styles.specRow}>
              <span>Screen</span>
              <strong className={styles.strong}>{screen}</strong>
            </div>
            <div className={styles.specRow}>
              <span>Resolution</span>
              <strong className={styles.strong}>{resolution}</strong>
            </div>
            <div className={styles.specRow}>
              <span>Processor</span>
              <strong className={styles.strong}>{processor}</strong>
            </div>
            <div className={styles.specRow}>
              <span>Ram</span>
              <strong className={styles.strong}>{ram}</strong>
            </div>
          </div>
        </aside>

        <section className={styles.about}>
          <div className={styles.aboutDiv}>
            <h3 className={styles.aboutTitle}>About</h3>
            <div className={styles.uderLine}></div>
            <div className={styles.aboutDescription}>
              {products.description.map((des, index) => (
                <div key={index} className={styles.aboutSection}>
                  <strong className={styles.aboutTitle}>{des.title}</strong>
                  <p className={styles.aboutText}>{des.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.techSpecs}>
          <div className={styles.techSpecsDiv}>
            <h3 className={styles.techSpecsTitle}>Tech specs</h3>
            <div className={styles.uderLine}></div>
          </div>
          <div className={styles.specRow}>
            <span>Screen</span>
            <strong className={styles.strongTech}>{screen}</strong>
          </div>
          <div className={styles.specRow}>
            <span>Resolution</span>
            <strong className={styles.strongTech}>{resolution}</strong>
          </div>
          <div className={styles.specRow}>
            <span>Processor</span>
            <strong className={styles.strongTech}>{processor}</strong>
          </div>
          <div className={styles.specRow}>
            <span>Ram</span>
            <strong className={styles.strongTech}>{ram}</strong>
          </div>
          <div className={styles.specRow}>
            <span>Camera</span>
            <strong className={styles.strongTech}>{camera}</strong>
          </div>
          <div className={styles.specRow}>
            <span>Zoom</span>
            <strong className={styles.strongTech}>{zoom}</strong>
          </div>
          <div className={styles.specRow}>
            <span>Cell</span>
            <strong className={styles.strongTech}>{cell}</strong>
          </div>
        </section>
      </section>

      <div className={styles.containerYouMayAlso}>
        <h2 className={styles.blockYouMayAlso}>You may also like</h2>
        <UseSwiper />
      </div>
    </div>
  );
};
