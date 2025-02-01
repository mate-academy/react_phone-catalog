import { Location, useLocation, useNavigate } from 'react-router-dom';
import style from './ProductDetailsPage.module.scss';
import { useContext, useEffect, useState } from 'react';
import { ProductItem } from '../../types/ProductItem';
import { getProducts } from '../../utils/getProducts';
import { Loader } from '../../components/Loader';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import classNames from 'classnames';
import { ColorSelector } from '../../components/ColorSelector';
import { CapacitySelector } from '../../components/CapacitySelector';
import { getProductItems } from '../../utils/getProductItems';
import { ButtonsAddCardFav } from '../../components/ButtonsAddCardFav';
import { PhoneSlider } from '../../components/PhoneSlider';
import { DispatchContext, StateContext } from '../../components/GlobalProvider';
import { Product } from '../../types/Product';
import { MenuItems } from '../../types/MenuItems';
import { ItemPhoto } from './ItemPhoto/ItemPhoto';

const getIdFromURL = (location: Location) => {
  return location.pathname.split('/').slice(-1)[0];
};

type Props = {
  category: MenuItems;
};

export const ProductDetailsPage: React.FC<Props> = ({ category }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { products, showSearch } = useContext(StateContext);
  const [item, setItem] = useState<ProductItem>();
  const [allCatalogProducts, setAllCatalogProducts] = useState<ProductItem[]>(
    [],
  );
  const [similarProduct, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const curItemId = getIdFromURL(location);
  const dispatch = useContext(DispatchContext);

  useEffect(
    () => dispatch({ type: 'setShowSearch', payload: false }),
    [dispatch, showSearch],
  );

  useEffect(() => {
    setLoading(true);
    getProductItems
      .fetchByCategory(category)
      .then(res => setAllCatalogProducts(() => res))
      .finally(() => setLoading(false));
  }, [category]);

  useEffect(() => {
    if (!products.length) {
      return;
    }

    const currentItem = allCatalogProducts.find(
      (prod: ProductItem) => prod.id === curItemId,
    );

    setItem(() => currentItem);

    if (currentItem) {
      const simItems: ProductItem[] = allCatalogProducts.filter(
        itm => itm.namespaceId === currentItem.namespaceId,
      );

      const simProducts: Product[] = [];

      simItems.forEach((itm: ProductItem) => {
        const found = getProducts.getProductById(products, itm.id);

        if (found) {
          simProducts.push(found);
        }
      });

      setSimilarProducts(() => simProducts);
    }
  }, [products, allCatalogProducts, curItemId]);

  const handleColorChange = (selectedColor: string) => {
    if (selectedColor && item && allCatalogProducts.length > 0) {
      const newItem = getProductItems.getColorVariant(
        allCatalogProducts,
        item,
        selectedColor,
      );

      if (newItem) {
        setItem(() => newItem);
        navigate(`/${item?.category}/${newItem.id}`);
      }
    }
  };

  const handleCapacityChange = (selectedCapacity: string) => {
    if (selectedCapacity && item && allCatalogProducts.length > 0) {
      const newItem = getProductItems.getCapacityVariant(
        allCatalogProducts,
        item,
        selectedCapacity,
      );

      if (newItem) {
        setItem(() => newItem);
        navigate(`/${item?.category}/${newItem.id}`);
      }
    }
  };

  return (
    <div className={style.prod_page_container}>
      {loading ? (
        <div className="loader_container">
          <Loader />
        </div>
      ) : (
        <>
          {item ? (
            <div className={style.container_body}>
              <div className={style.container_breadcrumbs}>
                <BreadCrumbs product={item} />
              </div>

              <div className={style.container_back_bt}>
                <div
                  className={classNames(style.icon_container)}
                  onClick={() => navigate(-1)}
                >
                  <div
                    className={classNames(style.icon, style.icon_right)}
                    onClick={() => navigate(-1)}
                  />
                </div>

                <p
                  className={style.container_back_bt_text}
                  onClick={() => navigate(-1)}
                >
                  Back
                </p>
              </div>

              <div className={style.container_title}>
                <h2> {item.name}</h2>
              </div>

              <div className={style.container_photo_option}>
                <div className={style.photo_slider}>
                  <ItemPhoto item={item} />
                </div>

                <div className={style.options_addCart}>
                  <div className={style.container_colors_selection}>
                    <ColorSelector
                      colors={item.colorsAvailable}
                      selectedColor={item.color}
                      onClick={handleColorChange}
                    />

                    <div className={style.container_seperator} />
                  </div>

                  <div className={style.container_capacity_selection}>
                    <CapacitySelector
                      capacities={item.capacityAvailable}
                      selectedCapacity={item.capacity}
                      onClick={handleCapacityChange}
                    />

                    <div className={style.container_seperator} />
                  </div>

                  <div className={style.container_cart_fav_price}>
                    <div className={style.container_price}>
                      <h2>${item.priceDiscount}</h2>

                      <h2 className={classNames(style.price_crossout)}>
                        ${item.priceRegular}
                      </h2>
                    </div>

                    <div className={style.container_cart_favorite}>
                      <ButtonsAddCardFav productId={item.id} />
                    </div>
                  </div>

                  <div className={style.container_specs}>
                    <div className={style.spec_line}>
                      <p className={style.spec_item}>Screen</p>

                      <p className={style.spec_item_val}>{item.screen}</p>
                    </div>

                    <div className={style.spec_line}>
                      <p className={style.spec_item}>Resolution</p>

                      <p className={style.spec_item_val}>{item.resolution}</p>
                    </div>

                    <div className={style.spec_line}>
                      <p className={style.spec_item}>Processor</p>

                      <p className={style.spec_item_val}>{item.processor}</p>
                    </div>

                    <div className={style.spec_line}>
                      <p className={style.spec_item}>RAM</p>

                      <p className={style.spec_item_val}>{item.ram}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={style.container_about}>
                <div>
                  <h3>About</h3>

                  <div
                    className={classNames(
                      style.container_seperator,
                      style.about_seperator,
                    )}
                  />
                </div>

                {item.description.map(section => {
                  return (
                    <div
                      key={section.title}
                      className={style.sections}
                    >
                      <h4>{section.title}</h4>

                      {section.text.map((parag, i) => {
                        return <p key={i}>{parag}</p>;
                      })}
                    </div>
                  );
                })}
              </div>

              <div className={style.container_full_specs}>
                <h3>Tech specs</h3>

                <div
                  className={classNames(
                    style.container_seperator,
                    style.full_spec_seperator,
                  )}
                />

                <ul className={style.full_spec_container}>
                  <li className={style.full_spec_line}>
                    <p className={style.full_spec_item}>Screen</p>

                    <p className={style.full_spec_item_val}>{item.screen}</p>
                  </li>

                  <li className={style.full_spec_line}>
                    <p className={style.full_spec_item}>Resolution</p>

                    <p className={style.full_spec_item_val}>
                      {item.resolution}
                    </p>
                  </li>

                  <li className={style.full_spec_line}>
                    <p className={style.full_spec_item}>Processor</p>

                    <p className={style.full_spec_item_val}>{item.processor}</p>
                  </li>

                  <li className={style.full_spec_line}>
                    <p className={style.full_spec_item}>RAM</p>

                    <p className={style.full_spec_item_val}>{item.ram}</p>
                  </li>

                  <li className={style.full_spec_line}>
                    <p className={style.full_spec_item}>Built in memory</p>

                    <p className={style.full_spec_item_val}>{item.capacity}</p>
                  </li>

                  <li className={style.full_spec_line}>
                    <p className={style.full_spec_item}>Camera</p>

                    <p className={style.full_spec_item_val}>{item.camera}</p>
                  </li>

                  <li className={style.full_spec_line}>
                    <p className={style.full_spec_item}>Zoom</p>

                    <p className={style.full_spec_item_val}>{item.zoom}</p>
                  </li>

                  <li className={style.full_spec_line}>
                    <p className={style.full_spec_item}>Cell</p>

                    <p className={style.full_spec_item_val}>
                      {item.cell.map((channel, i) => (
                        <span key={i}>{channel}, </span>
                      ))}
                    </p>
                  </li>
                </ul>
              </div>

              <div className={style.container_other_like}>
                <PhoneSlider
                  title="You may also like"
                  products={similarProduct}
                />
              </div>
            </div>
          ) : (
            <div className={style.product_not_found_container}>
              <h3>Sorry Product Not Found</h3>
              <div className={style.img}></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
