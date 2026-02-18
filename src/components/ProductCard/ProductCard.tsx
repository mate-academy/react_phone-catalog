/* eslint-disable no-console */
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ProductItemType } from 'types/ProductItemType';
import styles from './ProductCard.module.scss';
import { useEffect, useState } from 'react';
import { CartItem } from 'types/CartItem';
import { ProductsSlider } from '../ProductsSlider';
import { ProductType } from 'types/ProductType';
import { Loader } from '../Loader';

type Props = {
  handleAddToLiked: (item: number) => void;
  handleAddToCart: (item: number) => void;
  liked?: number[];
  cart: CartItem[];
  handleRemoveFromCart: (item: number) => void;
};

export const ProductCard: React.FC<Props> = ({
  handleAddToCart,
  handleAddToLiked,
  liked,
  cart,
  handleRemoveFromCart,
}) => {
  const location = useLocation();
  const [category, itemId] = location.pathname.split('/').slice(1);
  let products: ProductItemType[] = [];

  const [chosenImage, setChosenImage] = useState('');

  const [productItems, setProductItems] = useState<ProductType[]>([]);

  const [phones, setPhones] = useState<ProductItemType[]>([]);
  const [tablets, setTablets] = useState<ProductItemType[]>([]);
  const [accessories, setAccessories] = useState<ProductItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedProducts, setSuggestedProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        const [phonesRes, tabletsRes, accessoriesRes, productsRes] =
          await Promise.all([
            fetch('api/phones.json'),
            fetch('api/tablets.json'),
            fetch('api/accessories.json'),
            fetch('api/products.json'),
          ]);

        const [phonesData, tabletsData, accessoriesData, productsData] =
          await Promise.all([
            phonesRes.json(),
            tabletsRes.json(),
            accessoriesRes.json(),
            productsRes.json(),
          ]);

        setPhones(phonesData);
        setTablets(tabletsData);
        setAccessories(accessoriesData);
        setProductItems(productsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (category === 'phones') {
    products = phones as ProductItemType[];
  } else if (category === 'tablets') {
    products = tablets as ProductItemType[];
  } else if (category === 'accessories') {
    products = accessories as ProductItemType[];
  }

  const product = products.find(pr => pr.id === itemId);
  const productId = productItems.find(item => item.itemId === itemId)?.id ?? 0;
  const getSuggestedProducts = (array: ProductType[]) => {
    return [...array].sort(() => Math.random() - 0.5).slice(0, 10);
  };

  useEffect(() => {
    if (product?.images?.length) {
      setChosenImage(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    if (productItems.length > 0) {
      const newSuggestions = getSuggestedProducts(productItems);

      setSuggestedProducts(newSuggestions);
    }
  }, [product, location.pathname, productItems]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.home}>
        <NavLink to="/">
          <img src="img/home_icon.svg" alt="button" />
        </NavLink>
        <NavLink to="/">
          <img src="img/arrow_right.svg" alt="button" />
        </NavLink>
        <h1 className={styles.home_text}>{category}</h1>
        <NavLink to={`/${category}`}>
          <img src="img/arrow_right.svg" alt="button" />
        </NavLink>
        <h1 className={styles.home_name}>{product?.name}</h1>
      </div>
      <div className={styles.back}>
        <NavLink to={`/${category}`} className={styles.back_button}>
          <img src="img/slider/arrow_left.svg" alt="button" />
        </NavLink>
        <p className={styles.back_text}>Back</p>
      </div>
      {product ? (
        <>
          <h1 className={styles.back_title}>{product?.name}</h1>

          <div className={styles.block}>
            <div className={styles.block_1}>
              <div className={styles.block_images}>
                <div className={styles.block_images_main}>
                  {chosenImage && (
                    <img src={`${chosenImage}`} alt={product?.name} />
                  )}
                </div>
                <div className={styles.block_images_buttons}>
                  {product?.images.map(a => (
                    <button
                      key={a}
                      onClick={() => setChosenImage(a)}
                      className={`${styles.block_images_buttons_one} ${chosenImage === a && styles.block_images_buttons_one_active}`}
                    >
                      <img src={`${a}`} alt="" />
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.block_1_end}>
                <div>
                  <p className={styles.block_colors_text}>Available colors</p>
                  <div className={styles.block_colors}>
                    {product?.colorsAvailable.map(color => (
                      <Link
                        key={color}
                        to={`/${category}/${product.namespaceId}-${product.capacity.toLowerCase()}-${color}`}
                      >
                        <div
                          className={styles.block_colors_circle}
                          style={{
                            borderColor:
                              product.color === color ? 'black' : '#E2E6E9',
                          }}
                        >
                          <div
                            className={styles.block_colors_circle_in}
                            style={{ backgroundColor: color }}
                          ></div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className={styles.block_capacity}>
                  <p className={styles.block_capacity_text}>Select capacity</p>
                  <div className={styles.block_capacity_one}>
                    {product?.capacityAvailable.map(capacity => (
                      <NavLink
                        key={capacity}
                        to={`/${category}/${product.namespaceId}-${capacity.toLowerCase()}-${product.color}`}
                        className={`${styles.block_capacity_one_cap} ${capacity === product.capacity && styles.block_capacity_one_cap_active}`}
                      >
                        <p>{capacity}</p>
                      </NavLink>
                    ))}
                  </div>
                </div>

                <div className={styles.block_price}>
                  <p className={styles.block_price_discount}>
                    ${product?.priceDiscount}
                  </p>
                  <p className={styles.block_price_regular}>
                    ${product?.priceRegular}
                  </p>
                </div>
                <div className={styles.block_buttons}>
                  {cart.find(pr => pr.id === productId) ? (
                    <button
                      onClick={() => handleRemoveFromCart(productId)}
                      className={styles.block_buttons_cart_active}
                    >
                      Selected
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(productId)}
                      className={styles.block_buttons_cart}
                    >
                      Add to cart
                    </button>
                  )}

                  <button
                    onClick={() => handleAddToLiked(productId)}
                    className={styles.block_buttons_like}
                  >
                    {liked?.includes(productId) ? (
                      <div>
                        <img
                          src="img/buttons/PhoneCatalogHeartActive.svg"
                          alt=""
                        />
                      </div>
                    ) : (
                      <div>
                        <img src="img/buttons/PhoneCatalogHeart.svg" alt="" />
                      </div>
                    )}
                  </button>
                </div>

                <div>
                  <table className={styles.block_table}>
                    <tr>
                      <td className={styles.block_table_title}>Screen</td>
                      <td className={styles.block_table_mean}>
                        {product?.screen}
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.block_table_title}>Resolution</td>
                      <td className={styles.block_table_mean}>
                        {product?.resolution}
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.block_table_title}>Processor</td>
                      <td className={styles.block_table_mean}>
                        {product?.processor}
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.block_table_title}>RAM</td>
                      <td className={styles.block_table_mean}>
                        {product?.ram}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>

            <div className={styles.block_2}>
              <div className={styles.block_about}>
                <h1 className={styles.block_about_title}>About</h1>

                {product?.description.map(desk => (
                  <div key={desk.title} className={styles.block_about_main}>
                    <h1>{desk.title}</h1>
                    <p>{desk.text}</p>
                  </div>
                ))}
              </div>

              <div className={styles.block_specs}>
                <h1 className={styles.block_about_title}>Tech specs</h1>

                <table className={styles.block_specs_table}>
                  <tr>
                    <td className={styles.block_specs_table_title}>Screen</td>
                    <td className={styles.block_specs_table_mean}>
                      {product?.screen}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.block_specs_table_title}>
                      Resolution
                    </td>
                    <td className={styles.block_specs_table_mean}>
                      {product?.resolution}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.block_specs_table_title}>
                      Processor
                    </td>
                    <td className={styles.block_specs_table_mean}>
                      {product?.processor}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.block_specs_table_title}>RAM</td>
                    <td className={styles.block_specs_table_mean}>
                      {product?.ram}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.block_specs_table_title}>
                      Built in memory
                    </td>
                    <td className={styles.block_specs_table_mean}>
                      {product?.capacity}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.block_specs_table_title}>Camera</td>
                    <td className={styles.block_specs_table_mean}>
                      {product?.camera}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.block_specs_table_title}>Zoom</td>
                    <td className={styles.block_specs_table_mean}>
                      {product?.zoom}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.block_specs_table_title}>Cell</td>
                    <td className={styles.block_specs_table_mean}>
                      {product?.cell.join(', ')}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h2 className={styles.notFound}>Product was not found</h2>
      )}

      <div>
        <ProductsSlider
          liked={liked}
          cart={cart}
          handleAddToCart={handleAddToCart}
          handleAddToLiked={handleAddToLiked}
          handleRemoveFromCart={handleRemoveFromCart}
          title="You may also like"
          filteredProducts={suggestedProducts}
        />
      </div>
    </div>
  );
};
