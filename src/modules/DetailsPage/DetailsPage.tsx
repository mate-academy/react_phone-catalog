import React, { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton';
import ProductsSlider from '../../components/ProductsSlider';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import style from './DetailsPage.module.scss';
import { fetchProducts } from '../../redux/features/productsSlice';
import { Link, useParams } from 'react-router-dom';
import { fetchPhones } from '../../redux/features/phonesSlice';
import { fetchTablets } from '../../redux/features/tabletsSlice';
import { fetchAccessories } from '../../redux/features/accessoriesSlice';
import Loader from '../../components/Loader';
import { addToCart, removeToCart } from '../../redux/features/cartSlice';
import {
  addToFavorites,
  removeToFavorites,
} from '../../redux/features/favoritesSlice';
import { colorMap } from '../../utils/colorMap';

type Props = {
  category: string;
};

const DetailsPage: React.FC<Props> = ({ category }) => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.products);
  const { cart } = useAppSelector(state => state.cart);
  const { favorites } = useAppSelector(state => state.favorites);

  const [activeImg, setActiveImg] = useState(0);

  const { device } = useParams();

  const { phones, loading: loadingPhones } = useAppSelector(
    state => state.phones,
  );
  const { tablets, loading: loadingTablets } = useAppSelector(
    state => state.tablets,
  );
  const { accessories, loading: loadingAccessories } = useAppSelector(
    state => state.accessories,
  );

  const deviceData =
    category === 'phones'
      ? phones.find(item => item.id === device)
      : category === 'tablets'
        ? tablets.find(item => item.id === device)
        : category === 'accessories'
          ? accessories.find(item => item.id === device)
          : null;

  const devicesList = products.filter(item => {
    if (deviceData) {
      return item.itemId.includes(deviceData?.namespaceId);
    }

    return;
  });

  window.scrollTo(0, 0);

  useEffect(() => {
    dispatch(fetchProducts({ category }));

    if (category === 'phones') {
      dispatch(fetchPhones());
    } else if (category === 'tablets') {
      dispatch(fetchTablets());
    } else if (category === 'accessories') {
      dispatch(fetchAccessories());
    }
  }, [dispatch, category]);

  const handleAddToCart = (prodId: string | undefined) => {
    const newProd = products.find(item => item.itemId === prodId);

    if (newProd) {
      dispatch(addToCart(newProd));
    }
  };

  const handleRemoveProduct = (prodId: string | undefined) => {
    if (prodId) {
      dispatch(removeToCart(prodId));
    }
  };

  const inCart = cart.find(item => item.itemId === deviceData?.id);

  const handleAddFavorite = (prodId: string | undefined) => {
    const newProd = products.find(item => item.itemId === prodId);

    if (newProd) {
      dispatch(addToFavorites(newProd));
    }
  };

  const handleRemoveFavorite = (prodId: string | undefined) => {
    if (prodId) {
      dispatch(removeToFavorites(prodId));
    }
  };

  const inFavorites = favorites.find(item => item.itemId === deviceData?.id);

  const deviceId = products.find(item => item.itemId === deviceData?.id);

  return (
    <section className={style.page}>
      <div className="container">
        <div className={style.path}>
          <Link to="/" className={style.pathHome}>
            <img src="./img/icons/home.svg" alt="Home" />
          </Link>
          <img
            className={style.pathArrow}
            src="./img/icons/arrow-right.svg"
            alt="Arrow"
          />
          <Link to={`/${category}`} className={style.pathText}>
            {category[0].toUpperCase() + category.slice(1)}
          </Link>
          <img
            className={style.pathArrow}
            src="./img/icons/arrow-right.svg"
            alt="Arrow"
          />
          <Link
            to={`/${category}/${deviceData?.id}`}
            className={`${style.pathText} ${style.overflow}`}
          >
            {deviceData?.name}
          </Link>
        </div>

        <BackButton />

        {category === 'phones' && loadingPhones && <Loader />}
        {category === 'tablets' && loadingTablets && <Loader />}
        {category === 'accessories' && loadingAccessories && <Loader />}

        {(!loadingPhones || !loadingTablets || !loadingAccessories) && (
          <>
            <h2 className={style.title}>{deviceData?.name}</h2>

            <section className={style.deviceWrapper}>
              <div className={style.top}>
                <div className={style.gallery}>
                  <div className={style.device}>
                    <img
                      src={`/${deviceData?.images[activeImg]}`}
                      alt="Device"
                    />
                  </div>

                  <ul className={style.images}>
                    {deviceData?.images.map((img, index) => (
                      <li
                        key={img}
                        onClick={() => setActiveImg(index)}
                        className={`${activeImg === index ? style.activeImgStyle : ''}`}
                      >
                        <img src={`/${img}`} alt="Device" />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={style.params}>
                  <div className={style.paramsColorWrapper}>
                    <section className={style.paramsColor}>
                      <h4 className={style.paramsSubtitle}>Available colors</h4>
                      <ul className={style.colors}>
                        {deviceData?.colorsAvailable.map(color => {
                          return (
                            <li className={style.color} key={color}>
                              <Link
                                to={`/${category}/${deviceData?.namespaceId}-${deviceData?.capacity.toLowerCase()}-${color}`}
                                style={{ backgroundColor: colorMap[color] }}
                                className={
                                  device?.includes(color)
                                    ? style.activeColor
                                    : ''
                                }
                              ></Link>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                    <span className={style.id}>ID: {deviceId?.id}</span>
                  </div>

                  <div className={style.paramsMemoryWrapper}>
                    <section className={style.paramsMemory}>
                      <h4 className={style.paramsSubtitle}>Select capacity</h4>
                      <div className={style.memoryItems}>
                        {deviceData?.capacityAvailable.map(memory => (
                          <Link
                            to={`/${category}/${deviceData?.namespaceId}-${memory.toLowerCase()}-${deviceData?.color}`}
                            className={`${style.memoryItem} ${deviceData?.capacity === memory ? style.memoryActive : ''}`}
                            key={memory}
                          >
                            {memory}
                          </Link>
                        ))}
                      </div>
                    </section>
                  </div>

                  <section className={style.prices}>
                    <span className={style.newPrice}>
                      ${deviceData?.priceDiscount}
                    </span>
                    <span className={style.oldPrice}>
                      ${deviceData?.priceRegular}
                    </span>
                  </section>

                  <section className={style.btns}>
                    {!inCart ? (
                      <button
                        className={style.add}
                        onClick={() => handleAddToCart(deviceData?.id)}
                      >
                        Add to cart
                      </button>
                    ) : (
                      <button
                        className={`${style.add} ${style.success}`}
                        onClick={() => handleRemoveProduct(deviceData?.id)}
                      >
                        Added to cart
                      </button>
                    )}

                    {!inFavorites ? (
                      <button
                        className={style.favorite}
                        onClick={() => handleAddFavorite(deviceData?.id)}
                      >
                        <img src="./img/icons/favorites.svg" alt="Favorite" />
                      </button>
                    ) : (
                      <button
                        className={style.favorite}
                        onClick={() => handleRemoveFavorite(deviceData?.id)}
                      >
                        <img src="./img/icons/like.svg" alt="Like" />
                      </button>
                    )}
                  </section>

                  <section className={style.paramsInfo}>
                    <ul className={style.paramsItems}>
                      <li className={style.paramsItem}>
                        <span className={style.parameter}>Screen</span>
                        <span className={style.parameterValue}>
                          {deviceData?.screen}
                        </span>
                      </li>
                      <li className={style.paramsItem}>
                        <span className={style.parameter}>Resolution</span>
                        <span className={style.parameterValue}>
                          {deviceData?.resolution}
                        </span>
                      </li>
                      <li className={style.paramsItem}>
                        <span className={style.parameter}>Processor</span>
                        <span className={style.parameterValue}>
                          {deviceData?.processor}
                        </span>
                      </li>
                      <li className={style.paramsItem}>
                        <span className={style.parameter}>RAM</span>
                        <span className={style.parameterValue}>
                          {deviceData?.ram}
                        </span>
                      </li>
                    </ul>
                  </section>
                </div>
              </div>

              <div className={style.bottom}>
                <section className={style.about}>
                  <h3 className={style.subtitle}>About</h3>

                  {deviceData?.description.map((desc, index) => (
                    <section className={style.info} key={index}>
                      <h3 className={style.infoTitle}>{desc.title}</h3>

                      <p className={style.infoText}>{desc.text}</p>
                    </section>
                  ))}
                </section>

                <section className={style.techSpecs}>
                  <h3 className={style.subtitle}>Tech specs</h3>

                  <ul className={style.paramsItems}>
                    <li className={style.paramsItem}>
                      <span className={style.parameter}>Screen</span>
                      <span className={style.parameterValue}>
                        {deviceData?.screen}
                      </span>
                    </li>
                    <li className={style.paramsItem}>
                      <span className={style.parameter}>Resolution</span>
                      <span className={style.parameterValue}>
                        {deviceData?.resolution}
                      </span>
                    </li>
                    <li className={style.paramsItem}>
                      <span className={style.parameter}>Processor</span>
                      <span className={style.parameterValue}>
                        {deviceData?.processor}
                      </span>
                    </li>
                    <li className={style.paramsItem}>
                      <span className={style.parameter}>RAM</span>
                      <span className={style.parameterValue}>
                        {deviceData?.ram}
                      </span>
                    </li>
                    <li className={style.paramsItem}>
                      <span className={style.parameter}>Built in memory</span>
                      <span className={style.parameterValue}>
                        {deviceData?.capacity}
                      </span>
                    </li>
                    <li className={style.paramsItem}>
                      <span className={style.parameter}>Camera</span>
                      <span className={style.parameterValue}>
                        {deviceData?.camera}
                      </span>
                    </li>
                    <li className={style.paramsItem}>
                      <span className={style.parameter}>Zoom</span>
                      <span className={style.parameterValue}>
                        {deviceData?.zoom}
                      </span>
                    </li>
                    <li className={style.paramsItem}>
                      <span className={style.parameter}>Cell</span>
                      <span className={style.parameterValue}>
                        {deviceData?.cell.join(', ')}
                      </span>
                    </li>
                  </ul>
                </section>
              </div>
            </section>

            <ProductsSlider title="You may also like" products={devicesList} />
          </>
        )}
      </div>
    </section>
  );
};

export default DetailsPage;
