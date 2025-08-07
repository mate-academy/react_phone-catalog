/* eslint-disable jsx-a11y/label-has-associated-control */
import { useParams } from 'react-router-dom';
import { Footer } from '../../modules/Footer';
import { HotPrices } from '../../modules/HomePage/HotPrices';
import { NavBar } from '../NavBar';
import styles from './ProductDetailsPage.module.scss';
import { useMyContext } from '../../Context/ProductContexts';
import { useEffect, useState } from 'react';
import { ProductFullInfo } from '../../types/ProductFullInfo';
import { ProductDemo } from '../../types/ProductDemo';
import { BurgerMenu } from '../BurgerMenu';
import { client } from '../../fetch/fetchGoods';
import { Loader } from '../Loader';
import { Direction } from '../Direction/Direction';

export const ProductDetailsPage: React.FC = () => {
  const {
    order,
    setOrder,
    products,
    isMenuOpen,
    setIPhones,
    setTablets,
    setAccessories,
    isLoading,
    setIsLoading,
    setIsError,
  } = useMyContext();
  const { productId } = useParams();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [activeHeart, setActiveHeart] = useState(false);
  const [activeAdd, setActiveAdd] = useState(false);
  const [suggestedList, setSuggestedList] = useState<ProductDemo[]>([]);
  const [fullInfoList, setFullInfoList] = useState<ProductFullInfo[]>([]);

  const chosedItem = fullInfoList.find(item => item.id === productId);

  const addToOrder = (item: ProductFullInfo) => {
    const existingItem = order.find(i => i.itemId === item.id);
    const productToAdd = products.find(product => product.itemId === item.id);

    if (existingItem) {
      return;
    }

    if (productToAdd) {
      setOrder([...order, { ...productToAdd, quantity: 1 }]);
    }
  };

  useEffect(() => {
    const makeFullList = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const iphoneList = await client.fetchIPhones();
        const tabletList = await client.fetchTablets();
        const accessoryList = await client.fetchAccessories();

        setIPhones(iphoneList);
        setTablets(tabletList);
        setAccessories(accessoryList);
        setFullInfoList([...iphoneList, ...tabletList, ...accessoryList]);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    makeFullList();
  }, []);

  useEffect(() => {
    const getSuggestedProducts = () => {
      const suggestedProducts = [...products]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

      setSuggestedList(suggestedProducts);
    };

    getSuggestedProducts();
  }, []);

  return (
    <div className={styles.container}>
      {isMenuOpen ? (
        <BurgerMenu />
      ) : (
        <>
          <NavBar />
          {isLoading ? (
            <Loader />
          ) : (
            <div className={styles.content}>
              <Direction page="productID" product={chosedItem} />

              <h2 className={styles.name}>{chosedItem?.name}</h2>
              {/* preview */}
              <div className={styles.preview}>
                <div className={styles.preview_main}>
                  <img
                    className={styles.preview_image}
                    src={selectedImage ? selectedImage : chosedItem?.images[0]}
                    alt="main"
                  />
                </div>
                <ul className={styles.preview_list}>
                  {chosedItem?.images.map((product, index) => (
                    <li key={index} className={styles.preview_li}>
                      <img
                        className={`${styles.preview_miniImage} ${selectedImage === product ? styles.preview_miniImage_active : ''}`}
                        src={product}
                        alt={`mini image - ${index}`}
                        onClick={() => setSelectedImage(product)}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order */}
              <div className={styles.selectors}>
                {/* Сolor selection */}

                <section className={styles.colorSelection}>
                  <div className={styles.colorSelection_colors}>
                    <span className={styles.caption}>Available colors</span>

                    <div className={styles.colorSelection_radio}>
                      {chosedItem?.colorsAvailable.map(color => (
                        <label
                          key={color}
                          className={styles.colorSelection_label}
                        >
                          <input
                            type="radio"
                            name="color"
                            className={styles.colorSelection_input}
                            value={color}
                            checked={selectedColor === color}
                            onChange={() => setSelectedColor(color)}
                            style={{ backgroundColor: color }}
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  <span
                    className={styles.colorSelection_id}
                  >{`id: ${chosedItem?.namespaceId}`}</span>
                </section>

                <line className={styles.underline}></line>

                {/* Сapacity selection */}

                <section className={styles.capacitySelection}>
                  <span className={styles.caption}>Select capacity</span>

                  <div className={styles.capacitySelection_selection}>
                    {chosedItem?.capacityAvailable.map(capacity => (
                      <div key={capacity}>
                        <input
                          type="radio"
                          className={styles.capacitySelection_input}
                          id={`capacity-${capacity}`}
                          name="capacity"
                          value={capacity}
                          checked={selectedCapacity === capacity}
                          onChange={() => setSelectedCapacity(capacity)}
                        />
                        <label
                          className={styles.capacitySelection_label}
                          htmlFor={`capacity-${capacity}`}
                        >
                          {capacity}
                        </label>
                      </div>
                    ))}
                  </div>
                </section>

                <line className={styles.underline}></line>
              </div>
              {/* Confirm order */}

              <section className={styles.confirm}>
                <div className={styles.confirm_price}>
                  <span>${chosedItem?.priceDiscount}</span>
                  <span className={styles.confirm_fullPrice}>
                    ${chosedItem?.priceRegular}
                  </span>
                </div>

                <div className={styles.confirm_actions}>
                  <button
                    className={`${styles.confirm_button} ${styles.confirm_add}`}
                    style={activeAdd ? { backgroundColor: '#323542' } : {}}
                    onClick={() => {
                      if (chosedItem) {
                        addToOrder(chosedItem);
                      }

                      setActiveAdd(!activeAdd);
                    }}
                  >
                    Add to cart
                  </button>
                  <button
                    className={`${styles.confirm_button} ${styles.confirm_heart}`}
                    onClick={() => setActiveHeart(!activeHeart)}
                  >
                    <img
                      src={
                        activeHeart
                          ? 'img/Additional images/icons/red heart.svg'
                          : 'img/Additional images/icons/white_heart.svg'
                      }
                      alt={activeHeart ? 'red_heart' : 'white_heart'}
                    />
                  </button>
                </div>
              </section>

              {/* Specs short */}

              <section className={styles.specsShort}>
                <div
                  className={`${styles.specsShort_parameter} ${styles.specsShort_screen}`}
                >
                  <span className={styles.specifications_option}>Screen</span>
                  <span className={styles.specifications_value}>
                    {chosedItem?.screen}
                  </span>
                </div>

                <div
                  className={`${styles.specsShort_parameter} ${styles.specsShort_resolution}`}
                >
                  <span className={styles.specifications_option}>
                    Resolution
                  </span>
                  <span className={styles.specifications_value}>
                    {chosedItem?.resolution}
                  </span>
                </div>

                <div
                  className={`${styles.specsShort_parameter} ${styles.specsShort_processor} `}
                >
                  <span className={styles.specifications_option}>
                    Processor
                  </span>
                  <span className={styles.specifications_value}>
                    {chosedItem?.processor}
                  </span>
                </div>

                <div
                  className={`${styles.specsShort_parameter} ${styles.specsShort_ram} `}
                >
                  <span className={styles.specifications_option}>RAM</span>
                  <span className={styles.specifications_value}>
                    {chosedItem?.ram}
                  </span>
                </div>
              </section>

              {/* Product description */}

              <section className={styles.description}>
                <h3 className={styles.description_title}>About</h3>

                <line className={styles.underline}></line>

                <div className={styles.description_sections}>
                  {chosedItem?.description.map(article => (
                    <section className={styles.feature} key={article.title}>
                      <h4 className={styles.feature_title}>{article.title}</h4>

                      <p className={styles.feature_text}>{article.text}</p>
                    </section>
                  ))}
                </div>
              </section>

              {/* Tech specs */}

              <section className={styles.specifications}>
                <h3 className={styles.specifications_title}>Tech specs</h3>

                <div className={styles.underline}></div>

                <div className={styles.specifications_list}>
                  <div className={styles.specifications_options}>
                    <span className={styles.specifications_option}>Screen</span>
                    <span className={styles.specifications_option}>
                      Resolution
                    </span>
                    <span className={styles.specifications_option}>
                      Processor
                    </span>
                    <span className={styles.specifications_option}>RAM</span>
                    <span className={styles.specifications_option}>Cell</span>
                  </div>

                  <div className={styles.specifications_values}>
                    <span className={styles.specifications_value}>
                      {chosedItem?.screen}
                    </span>
                    <span className={styles.specifications_value}>
                      {chosedItem?.resolution}
                    </span>
                    <span className={styles.specifications_value}>
                      {chosedItem?.processor}
                    </span>
                    <span className={styles.specifications_value}>
                      {chosedItem?.ram}
                    </span>
                    <span className={styles.specifications_cell}>
                      {chosedItem?.cell.join(', ')}
                    </span>
                  </div>
                </div>
              </section>

              <div className={styles.also}>
                <HotPrices
                  suggestedData={suggestedList}
                  productDetails={true}
                />
              </div>
            </div>
          )}
          <Footer />
        </>
      )}
    </div>
  );
};
