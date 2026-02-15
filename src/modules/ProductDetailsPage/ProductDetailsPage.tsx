import styles from './ProductDetailsPage.module.scss';
import { BackButton } from '../../components/BackButton/BackButton';
import { useLocation, useParams } from 'react-router-dom';
import { COLORS_MAP } from '../../config';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ProductsSlider } from '../HomePage/components/ProductsSlider';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadSuggestedProducts } from '../../features/suggestedProducts';
import { ProductCategory } from '../../types/ProductCategory';
import { Loader } from '../../components/Loader/Loader';
import { ProductLink } from '../../components/ProductLink';
import { NotFound } from '../../components/NotFound';
import { AddToCartButton } from '../../components/AddToCartButton';
import { AddToFavouritesButton } from '../../components/AddToFavouritesButton';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { pathname } = useLocation();
  const [selectedPictureId, setSelectedPictureId] = useState(0);

  const dispatch = useAppDispatch();

  const pathnameParts = pathname.split('/').filter(Boolean);
  const rawType = pathnameParts.at(-2);

  const type = rawType as ProductCategory;

  const { items, loaded } = useAppSelector(state => state[type]);
  const suggestedProducts = useAppSelector(state => state.suggestedProducts);
  const products = useAppSelector(state => state.products);

  const productDetails = items.find(product => product.id === productId);
  const product = products.items.find(item => item.itemId === productId);

  useEffect(() => {
    dispatch(
      loadSuggestedProducts({
        category: type,
        currentProductId: productId as string,
      }),
    );
  }, [dispatch, productId, type]);

  const productIdText =
    productDetails &&
    'ID: ' +
    items.indexOf(productDetails) +
    productDetails.priceDiscount +
    productDetails.capacity.replace(/\p{L}+/gu, '');

  return (
    <div className={styles.product_details_page}>
      <BackButton mode="Back" />

      {productDetails ? (
        <div className={styles.product_box}>
          <h1 className={styles.name}>{productDetails.name}</h1>

          <div className={styles.small_images}>
            {productDetails.images.map(
              (image, index) =>
                image && (
                  <img
                    src={image}
                    className={classNames(styles.small_image, {
                      [styles.small_image_selected]:
                        index === selectedPictureId,
                    })}
                    onClick={() => setSelectedPictureId(index)}
                    alt={`Product photo №${index + 1}`}
                    key={index}
                  />
                ),
            )}
          </div>

          <img
            src={productDetails.images[selectedPictureId]}
            className={styles.big_image}
            alt={`Selected photo of ${productDetails.name}`}
          />

          <div className={styles.details_box}>
            <div className={styles.details}>
              <div className={styles.colors_box}>
                <p className={styles.details_title}>Available colors</p>
                <div className={styles.colors_list}>
                  {productDetails.colorsAvailable.toSorted().map(color => (
                    <ProductLink color={color} category={type} key={color}>
                      <div
                        className={classNames(styles.color, {
                          [styles.color_selected]:
                            color === productDetails.color,
                        })}
                        style={{
                          backgroundColor:
                            COLORS_MAP[color.replace(' ', '-')] ||
                            color ||
                            'grey',
                        }}
                      />
                    </ProductLink>
                  ))}
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.capacity_box}>
                <p className={styles.details_title}>Select capacity</p>
                <div className={styles.capacity_list}>
                  {productDetails.capacityAvailable.map(capacity => (
                    <ProductLink
                      category={type}
                      capacity={capacity}
                      key={capacity}
                    >
                      <div
                        className={classNames(styles.capacity, {
                          [styles.capacity_selected]:
                            capacity === productDetails.capacity,
                        })}
                      >
                        {capacity}
                      </div>
                    </ProductLink>
                  ))}
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.price_buttons_box}>
                <div className={styles.price_box}>
                  <p className={styles.price}>
                    {'$' + productDetails.priceDiscount}
                  </p>
                  <p className={styles.price_regular}>
                    {'$' + productDetails.priceRegular}
                  </p>
                </div>
                <div className={styles.buttons}>
                  <AddToCartButton product={productDetails} />

                  {product && <AddToFavouritesButton product={product} />}
                </div>
              </div>
              <div className={styles.details_box}>
                <div className={styles.spec}>
                  <p className={styles.spec_key}>Screen</p>
                  <p className={styles.spec_value}>{productDetails.screen}</p>
                </div>
                <div className={styles.spec}>
                  <p className={styles.spec_key}>Resolution</p>
                  <p className={styles.spec_value}>
                    {productDetails.resolution}
                  </p>
                </div>
                <div className={styles.spec}>
                  <p className={styles.spec_key}>Processor</p>
                  <p className={styles.spec_value}>
                    {productDetails.processor}
                  </p>
                </div>
                <div className={styles.spec}>
                  <p className={styles.spec_key}>RAM</p>
                  <p className={styles.spec_value}>{productDetails.ram}</p>
                </div>
              </div>
            </div>
            <p className={styles.product_id}>{productIdText}</p>
          </div>

          <div className={styles.about}>
            <p className={styles.about_title}>About</p>

            <div className={styles.divider} />

            {productDetails.description.map((section, index) => (
              <div className={styles.about_section} key={index}>
                <p className={styles.about_subtitle}>{section.title}</p>
                {section.text.map((text, i) => (
                  <p className={styles.about_text} key={i}>
                    {text}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.tech_specs}>
            <p className={styles.tech_specs_title}>Tech specs</p>

            <div className={styles.divider} />

            <div className={styles.tech_specs_box}>
              <div className={styles.spec}>
                <p className={styles.spec_key}>Screen</p>
                <p className={styles.spec_value}>{productDetails.screen}</p>
              </div>
              <div className={styles.spec}>
                <p className={styles.spec_key}>Resolution</p>
                <p className={styles.spec_value}>{productDetails.resolution}</p>
              </div>
              <div className={styles.spec}>
                <p className={styles.spec_key}>Processor</p>
                <p className={styles.spec_value}>{productDetails.processor}</p>
              </div>
              <div className={styles.spec}>
                <p className={styles.spec_key}>RAM</p>
                <p className={styles.spec_value}>{productDetails.ram}</p>
              </div>
              <div className={styles.spec}>
                <p className={styles.spec_key}>Built in memory</p>
                <p className={styles.spec_value}>{productDetails.capacity}</p>
              </div>
              <div className={styles.spec}>
                <p className={styles.spec_key}>Camera</p>
                <p className={styles.spec_value}>{productDetails.camera}</p>
              </div>
              <div className={styles.spec}>
                <p className={styles.spec_key}>Zoom</p>
                <p className={styles.spec_value}>{productDetails.zoom}</p>
              </div>
              <div className={styles.spec}>
                <p className={styles.spec_key}>Cell</p>
                <p className={styles.spec_value}>
                  {productDetails.cell.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : !loaded ? (
        <Loader />
      ) : (
        <NotFound title="Product was not found" mode="noResults" />
      )}

      <ProductsSlider
        title="You may also like"
        products={suggestedProducts.items}
        isDiscountVisible
        loading={!suggestedProducts.loaded}
      />
    </div>
  );
};
