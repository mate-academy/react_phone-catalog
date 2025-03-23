import { useNavigate } from 'react-router-dom';
import styles from './ProductDetails.module.scss';
import { ProductImageGalery } from '../ProductImageGalery';
import { Icon } from '../../../shared/components/Icon/Icon';
import { IconType } from '../../../shared/types/IconType';
import { useFavorites } from '../../../../store/FavoriteContext';
import { useCart } from '../../../../store/CartContext';
import { ProductType } from '../../../shared/types/ProductType';
import { Breadcrumbs } from '../../../shared/components/Breadcrumbs';
import { CategoryType } from '../../../shared/types/CategoryType';
import { useCategories } from '../../../../store/CategoryContext';
import { DetailedType } from '../../../shared/types/DetailedType';
import { SliderSection } from '../../../shared/components/SliderSection';

interface Props {
  detailedProduct: DetailedType;
  product: ProductType | undefined;
  products: ProductType[];
}

export const ProductDetails: React.FC<Props> = ({
  detailedProduct,
  product,
  products,
}) => {
  const { handleFavoriteClick, isInFavorite } = useFavorites();
  const { isInCart, addToCart } = useCart();

  const { categories } = useCategories();
  const category: CategoryType | undefined = categories.find(
    item => item.page === product?.category,
  );

  const navigate = useNavigate();

  return (
    <section className="App__section" id="productDetails">
      <div className="App__section-content App__section-content">
        <Breadcrumbs category={category} itemId={detailedProduct.id} />
        <div className={styles.pd__back}>
          <Icon iconType={IconType.Left} address="" />
          <span onClick={() => navigate(-1)}>Back</span>
        </div>
        <h2 className={styles.pd__name}>{detailedProduct.name}</h2>
        <ProductImageGalery product={detailedProduct} />
        <div className={styles.pd__colors_container}>
          <div className={styles.pd__colors_block}>
            <p className={styles.pd__block_title}>Available Colors:</p>
            <p>ID:{product && product.id} </p>
          </div>

          <div className={styles.pd__color_options}>
            {detailedProduct.colorsAvailable.map(color => (
              <div key={color}>
                <input
                  type="radio"
                  name="color"
                  value={color}
                  className={`${styles[color.replace(/\s+/g, '-').toLowerCase()]}`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.pd__divider}></div>
        <div className={styles.pd__capacities_container}>
          <p className={styles.pd__block_title}>Select Capacity:</p>
          <div className={styles.pd__capacity_options}>
            {detailedProduct.capacityAvailable.map(capacity => (
              <div key={capacity}>
                <input
                  type="radio"
                  name="capacity"
                  value={capacity}
                  id={`capacity-${capacity}`}
                />
                <label htmlFor={`capacity-${capacity}`}>{capacity}</label>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.pd__divider}></div>
        <div className={styles.pd__price_container}>
          <p className={styles.pd__price}>
            ${detailedProduct.priceDiscount}
            <span
              className={`${styles.pd__price} ${styles['pd__price--full']}`}
            >
              {`$${detailedProduct.priceRegular}`}
            </span>
          </p>
        </div>
        {product && (
          <div className={styles.pd__bottom_container}>
            <button
              className={styles.pd__button}
              onClick={() => !isInCart(product.id) && addToCart(product)}
              disabled={isInCart(product.id)}
            >
              {isInCart(product.id) ? 'Added to cart' : 'Add to cart'}
            </button>
            <div
              className={styles.pd__icon}
              onClick={() => handleFavoriteClick(product)}
            >
              {isInFavorite(product.id) ? (
                <Icon iconType={IconType.Selected} address="#" />
              ) : (
                <Icon iconType={IconType.Like} address="#" />
              )}
            </div>
          </div>
        )}

        <div className={`${styles.pd__spec} ${styles['pd__spec--small']}`}>
          <span className={`${styles.pd__spec} ${styles['pd__spec--title']}`}>
            Screen
          </span>
          <span className={`${styles.pd__spec} ${styles['pd__spec--value']}`}>
            {detailedProduct.screen}
          </span>
        </div>
        <div className={`${styles.pd__spec} ${styles['pd__spec--small']}`}>
          <span className={`${styles.pd__spec} ${styles['pd__spec--title']}`}>
            Resolution
          </span>
          <span className={`${styles.pd__spec} ${styles['pd__spec--value']}`}>
            {detailedProduct.resolution}
          </span>
        </div>
        <div className={`${styles.pd__spec} ${styles['pd__spec--small']}`}>
          <span className={`${styles.pd__spec} ${styles['pd__spec--title']}`}>
            Processor
          </span>
          <span className={`${styles.pd__spec} ${styles['pd__spec--value']}`}>
            {detailedProduct.processor}
          </span>
        </div>
        <div className={`${styles.pd__spec} ${styles['pd__spec--small']}`}>
          <span className={`${styles.pd__spec} ${styles['pd__spec--title']}`}>
            RAM
          </span>
          <span className={`${styles.pd__spec} ${styles['pd__spec--value']}`}>
            {detailedProduct.ram}
          </span>
        </div>
        <div className={styles.pd__about}>
          <h3 className={styles.pd__title}>About</h3>
          <div className={styles.pd__divider}></div>
          {detailedProduct.description.map((section, index) => (
            <div key={index}>
              <h4 className={styles.pd__section_title}>{section.title}</h4>
              {section.text.map((text, idx) => (
                <p key={idx} className={styles.pd__about_text}>
                  {text}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.pd__tech_specs}>
          <h3 className={styles.pd__title}>Tech Specs</h3>
          <div className={styles.pd__divider}></div>
          <div className={styles.pd__spec}>
            <span className={`${styles.pd__spec} ${styles['pd__spec--title']}`}>
              Screen
            </span>
            <span className={`${styles.pd__spec} ${styles['pd__spec--value']}`}>
              {detailedProduct.screen}
            </span>
          </div>
          <div className={styles.pd__spec}>
            <span className={`${styles.pd__spec} ${styles['pd__spec--title']}`}>
              Capacity
            </span>
            <span className={`${styles.pd__spec} ${styles['pd__spec--value']}`}>
              {detailedProduct.capacity}
            </span>
          </div>
          <div className={styles.pd__spec}>
            <span className={`${styles.pd__spec} ${styles['pd__spec--title']}`}>
              RAM
            </span>
            <span className={`${styles.pd__spec} ${styles['pd__spec--value']}`}>
              {detailedProduct.ram}
            </span>
          </div>
          <div className={styles.pd__spec}>
            <span className={`${styles.pd__spec} ${styles['pd__spec--title']}`}>
              Built in memory
            </span>
            <span className={`${styles.pd__spec} ${styles['pd__spec--value']}`}>
              {detailedProduct.capacity}
            </span>
          </div>
          <div className={styles.pd__spec}>
            <span className={`${styles.pd__spec} ${styles['pd__spec--title']}`}>
              Camera
            </span>
            <span className={`${styles.pd__spec} ${styles['pd__spec--value']}`}>
              {detailedProduct.camera}
            </span>
          </div>
          <div className={styles.pd__spec}>
            <span className={`${styles.pd__spec} ${styles['pd__spec--title']}`}>
              Zoom
            </span>
            <span className={`${styles.pd__spec} ${styles['pd__spec--value']}`}>
              {detailedProduct.zoom}
            </span>
          </div>
          <div className={styles.pd__spec}>
            <span className={`${styles.pd__spec} ${styles['pd__spec--title']}`}>
              Cell
            </span>
            <span className={`${styles.pd__spec} ${styles['pd__spec--value']}`}>
              {detailedProduct.cell.join(', ')}
            </span>
          </div>
        </div>
        <SliderSection
          products={products}
          spaceBetween={16}
          slidesPerView={1.5}
          slidesPerView640={2.5}
          slidesPerView1024={4}
          prevClass={'pd__prev'}
          nextClass={'pd__next'}
          title={'You may also like'}
        />
      </div>
    </section>
  );
};
