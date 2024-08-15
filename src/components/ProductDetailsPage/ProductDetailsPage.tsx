import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { selectProducts } from '../../redux/slices/productsSlice';
import { selectPhones } from '../../redux/slices/phonesSlice';
import { selectTablets } from '../../redux/slices/tabletsSlice';
import { selectAccessories } from '../../redux/slices/accessoriesSlice';
import { toCommonPropsProduct } from '../../utils/toCommonPropsProducts';
import { getSuggestedProducts } from '../../utils/getSliderProducts';
import { SkeletonProductDetails } from '../SkeletonProductDetails';
import { BackButton } from '../BackButton';
import { AddButtons } from '../AddButtons';
import { ProductsSlider } from '../ProductsSlider';
import { NoProductsFound } from '../NoProductsFound';
import styles from './ProductDetailsPage.module.scss';

const colors = {
  black: '#000000',
  blue: '#0000ff',
  coral: '#ff7f50',
  gold: '#ffd700',
  graphite: '#4b4f54',
  green: '#008000',
  midnight: '#2c3e50',
  midnightgreen: '#004953',
  pink: '#ffc0cb',
  purple: '#800080',
  red: '#ff0000',
  'rose gold': '#b76e79',
  rosegold: '#b76e79',
  sierrablue: '#006b8f',
  silver: '#c0c0c0',
  'sky blue': '#87ceeb',
  'space gray': '#4a4a4a',
  spaceblack: '#1d1d1d',
  spacegray: '#4a4a4a',
  starlight: '#f6f6f6',
  white: '#ffffff',
  yellow: '#ffff00',
};

const colorsNames = Object.keys(colors);
const colorsHexes = Object.values(colors);

export const ProductDetailsPage = () => {
  const { products, productsLoading, productsErrorMsg } =
    useAppSelector(selectProducts);

  const { phones, phonesLoading, phonesErrorMsg } =
    useAppSelector(selectPhones);

  const { tablets, tabletsLoading, tabletsErrorMsg } =
    useAppSelector(selectTablets);

  const { accessories, accessoriesLoading, accessoriesErrorMsg } =
    useAppSelector(selectAccessories);

  const [selectedImg, setSelectedImg] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');

  const { productId } = useParams();
  const navigate = useNavigate();

  const isLoading =
    productsLoading || phonesLoading || tabletsLoading || accessoriesLoading;

  const isErrorMsg =
    productsErrorMsg ||
    phonesErrorMsg ||
    tabletsErrorMsg ||
    accessoriesErrorMsg;

  const numberId = products.find(({ itemId }) => itemId === productId)?.id || 0;
  const selectedPhone = phones.find(({ id }) => id === productId);
  const selectedTablet = tablets.find(({ id }) => id === productId);
  const selectedAccessory = accessories.find(({ id }) => id === productId);

  const selectedProduct = selectedPhone || selectedTablet || selectedAccessory;

  const suggestedProducts = useMemo(
    () => getSuggestedProducts(products),
    [products],
  );

  const handleColorChange = useCallback(
    (newColor: string): void => {
      if (!productId) {
        return;
      }

      setSelectedColor(newColor);

      const selectedColorHyphen = selectedColor.replace(' ', '-').toLowerCase();
      const newColorHyphen = newColor.replaceAll(' ', '-').toLowerCase();
      const newProductId = productId.replace(
        selectedColorHyphen,
        newColorHyphen,
      );

      navigate(`../${newProductId}`);
    },
    [navigate, productId, selectedColor],
  );

  const handleCapacityChange = useCallback(
    (newCapacity: string): void => {
      if (!productId) {
        return;
      }

      setSelectedCapacity(newCapacity);

      const newProductId = productId.replace(
        selectedCapacity.toLowerCase(),
        newCapacity.toLowerCase(),
      );

      navigate(`../${newProductId}`);
    },
    [navigate, productId, selectedCapacity],
  );

  useEffect(() => {
    if (!selectedProduct) {
      return;
    }

    setSelectedImg(selectedProduct.images[0]);
    setSelectedColor(selectedProduct.color);
    setSelectedCapacity(selectedProduct.capacity);
  }, [selectedProduct]);

  if (isLoading) {
    return (
      <>
        <SkeletonProductDetails />
        <ProductsSlider
          title="You may also like"
          products={suggestedProducts}
        />
      </>
    );
  }

  if (!productId || !selectedProduct || isErrorMsg) {
    return <NoProductsFound />;
  }

  const {
    category,
    namespaceId,
    name,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    colorsAvailable,
    images,
    description,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
  } = selectedProduct;

  return (
    <>
      <div className={styles.productDetailsPage}>
        <div className={styles.breadcrumbs}>
          <Link to="/" className={styles.homeLink} />

          <div className={styles.arrowRight} />

          <Link to=".." className={styles.productsLink}>
            {category}
          </Link>

          <div className={styles.arrowRight} />

          <span className={styles.productName}>{name}</span>
        </div>

        <div className={styles.btnBack}>
          <BackButton />
        </div>

        <h3 className={styles.title}>{name}</h3>

        <div className={styles.detailsContent}>
          <div className={styles.mainImgWrapper}>
            <img
              className={styles.mainImg}
              src={selectedImg}
              alt={namespaceId}
            />
          </div>

          <div className={styles.availableImages}>
            {images.map(img => (
              <div key={img} className={styles.availableImage}>
                <input
                  type="radio"
                  name="img"
                  value={img}
                  className={styles.imgRadio}
                  style={{
                    backgroundImage: `url(${img})`,
                  }}
                  onChange={() => setSelectedImg(img)}
                  checked={selectedImg === img}
                />
              </div>
            ))}
          </div>

          <div className={styles.features}>
            <div className={styles.availableColorsWrapper}>
              <div className={styles.colorsTopInfo}>
                <p className={styles.featuresLabel}>Available colors</p>
                <p
                  className={styles.id}
                >{`ID: ${numberId.toString().padStart(6, '0')}`}</p>
              </div>

              <div className={styles.availableColors}>
                {colorsAvailable.map(availableColor => {
                  const index = colorsNames.indexOf(availableColor);
                  const hexColor = colorsHexes[index];

                  return (
                    <div key={availableColor} className={styles.availableColor}>
                      <input
                        type="radio"
                        name="color"
                        value={availableColor}
                        className={styles.colorRadio}
                        style={{ backgroundColor: hexColor }}
                        onChange={() => handleColorChange(availableColor)}
                        checked={selectedColor === availableColor}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.availableCapacitiesWrapper}>
              <p className={styles.featuresLabel}>Select capacity</p>

              <div className={styles.availableCapacities}>
                {capacityAvailable.map(availableCapacity => (
                  <div
                    key={availableCapacity}
                    className={styles.availableCapacity}
                  >
                    <span>{availableCapacity}</span>
                    <input
                      type="radio"
                      name="capacity"
                      value={availableCapacity}
                      className={styles.capacityRadio}
                      onChange={() => handleCapacityChange(availableCapacity)}
                      checked={selectedCapacity === availableCapacity}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.priceWrapper}>
              <p className={styles.priceDiscount}>{`$${priceDiscount}`}</p>
              <p
                className={styles.priceRegular}
                hidden={priceDiscount === priceRegular}
              >{`$${priceRegular}`}</p>
            </div>

            <div className={styles.addButtons}>
              <AddButtons
                product={toCommonPropsProduct(selectedProduct)}
                onProductDetailsPage={true}
              />
            </div>

            <table className={styles.featuresTable}>
              <tbody className={styles.featuresTbody}>
                {screen && (
                  <tr className={styles.featuresRow}>
                    <td className={styles.featuresCell1}>Screen</td>
                    <td className={styles.featuresCell2}>{screen}</td>
                  </tr>
                )}

                {resolution && (
                  <tr className={styles.featuresRow}>
                    <td className={styles.featuresCell1}>Resolution</td>
                    <td className={styles.featuresCell2}>{resolution}</td>
                  </tr>
                )}

                {processor && (
                  <tr className={styles.featuresRow}>
                    <td className={styles.featuresCell1}>Processor</td>
                    <td className={styles.featuresCell2}>{processor}</td>
                  </tr>
                )}

                {ram && (
                  <tr className={styles.featuresRow}>
                    <td className={styles.featuresCell1}>RAM</td>
                    <td className={styles.featuresCell2}>{ram}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.aboutTechSpecsContent}>
          <div className={styles.aboutSection}>
            <p className={styles.aboutLabel}>About</p>

            <div className={styles.descriptionsWrapper}>
              {description.map(({ title, text }) => (
                <div key={title}>
                  <p className={styles.descriptionTitle}>{title}</p>

                  <div className={styles.descriptionTexts}>
                    {text.map(txt => (
                      <p key={txt} className={styles.descriptionText}>
                        {txt}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.techSpecsSection}>
            <p className={styles.techSpecsLabel}>Tech specs</p>

            <table className={styles.techSpecsTable}>
              <tbody className={styles.techSpecsTbody}>
                {screen && (
                  <tr className={styles.techSpecsRow}>
                    <td className={styles.techSpecsCell1}>Screen</td>
                    <td className={styles.techSpecsCell2}>{screen}</td>
                  </tr>
                )}

                {resolution && (
                  <tr className={styles.techSpecsRow}>
                    <td className={styles.techSpecsCell1}>Resolution</td>
                    <td className={styles.techSpecsCell2}>{resolution}</td>
                  </tr>
                )}

                {processor && (
                  <tr className={styles.techSpecsRow}>
                    <td className={styles.techSpecsCell1}>Processor</td>
                    <td className={styles.techSpecsCell2}>{processor}</td>
                  </tr>
                )}

                {ram && (
                  <tr className={styles.techSpecsRow}>
                    <td className={styles.techSpecsCell1}>RAM</td>
                    <td className={styles.techSpecsCell2}>{ram}</td>
                  </tr>
                )}

                {capacity && (
                  <tr className={styles.techSpecsRow}>
                    <td className={styles.techSpecsCell1}>Built in memory</td>
                    <td className={styles.techSpecsCell2}>{capacity}</td>
                  </tr>
                )}

                {camera && (
                  <tr className={styles.techSpecsRow}>
                    <td className={styles.techSpecsCell1}>Camera</td>
                    <td className={styles.techSpecsCell2}>{camera}</td>
                  </tr>
                )}

                {zoom && (
                  <tr className={styles.techSpecsRow}>
                    <td className={styles.techSpecsCell1}>Zoom</td>
                    <td className={styles.techSpecsCell2}>{zoom}</td>
                  </tr>
                )}

                {!!cell.length && (
                  <tr className={styles.techSpecsRow}>
                    <td className={styles.techSpecsCell1}>Cell</td>
                    <td className={styles.techSpecsCell2}>{cell.join(', ')}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ProductsSlider title="You may also like" products={suggestedProducts} />
    </>
  );
};
