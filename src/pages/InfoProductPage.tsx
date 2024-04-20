import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { useLocalStorage } from 'usehooks-ts';
import { twMerge } from 'tailwind-merge';
import { title } from 'process';
import { ListOfProductCards } from '../components/ListOfProductCards';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ButtonCard } from '../components/ButtonCard';
import { ColorLink } from '../components/ColorLink';
import { Loader } from '../components/Loader';
import { colorList } from '../sources/colorList';
import { BasketGoods, Product } from '../types/product';
import { handleToggleBasket } from '../helpers/functions';
import { getProductInfo, getRandomProducts } from '../api/products';
import favouriteActive from '../images/icons/favourites-active.svg';
import favouriteGoods from '../images/icons/favourites-goods.svg';
import arrowIcon from '../images/icons/arrow-icon.svg';

export const InfoProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [favourites, setFavourites] = useLocalStorage<Product['itemId'][]>(
    'favourites',
    [],
  );

  const [basket, setBasket] = useLocalStorage<BasketGoods[]>('basketGoods', []);

  const { isLoading: isProductInfo, data: productInfo } = useQuery({
    queryKey: ['productInfo', productId],
    queryFn: async () => {
      try {
        return await getProductInfo(productId as string);
      } catch (error) {
        setTimeout(() => {
          navigate('/404');
        }, 2000);

        return Promise.reject(error);
      }
    },
    enabled: !!productId,
  });

  const { isLoading: isRandomProducts, data: randomProducts } = useQuery({
    queryKey: ['randomProducts'],
    queryFn: () => getRandomProducts(12),
  });

  const handleToggleFavourites = () => {
    if (productInfo && favourites.includes(productInfo.id)) {
      setFavourites(favourites.filter(item => item !== productInfo.id));
    } else {
      setFavourites([...favourites, productInfo?.id || '']);
    }
  };

  return (
    <main
      className="content flex w-full flex-col pb-14 pt-6 md:pb-16 lg:pb-20"
      key={productId}
    >
      <Breadcrumbs />

      <div className="mt-6 flex items-center gap-1">
        <img
          src={arrowIcon}
          alt="Arrow Back"
          className="h-4 min-w-4 -rotate-90"
        />
        <button onClick={() => navigate(-1)}>
          <small className="font-bold text-secondary">Back</small>
        </button>
      </div>

      {isProductInfo || !productInfo ? (
        <Loader />
      ) : (
        <>
          <h2 className="mt-4">{productInfo.name}</h2>
          <section>
            <div
              className="mt-8 flex flex-col gap-14 md:mt-10 md:grid
              md:grid-cols-12 md:flex-row md:gap-x-4 md:gap-y-0"
            >
              <div
                className="
                col-span-7 flex flex-col gap-4
                md:grid md:grid-cols-7 md:flex-row-reverse lg:col-span-5
              "
              >
                <Swiper
                  className="col-span-6 col-start-2 w-full md:order-1"
                  spaceBetween={10}
                  navigation={true}
                  slidesPerView={1}
                  loop={true}
                  grabCursor={true}
                  modules={[FreeMode, Navigation, Pagination, Autoplay]}
                  autoplay={{
                    delay: 5000,
                  }}
                  pagination={{
                    bulletActiveClass: 'border-primary pointer-events-none',
                    bulletClass: 'border border-elements p-1 aspect-square',
                    el: '#product-details-bullet-images-list',
                    type: 'bullets',
                    clickable: true,
                    renderBullet: (index, className) =>
                      `<span class="h-full md:h-auto overflow-hidden aspect-square md:w-full ${className}">
                      <img class="h-full w-full object-contain" src="${productInfo.images[index]}"/>
                    </span>`,
                  }}
                >
                  {productInfo.images.map(image => (
                    <SwiperSlide className="w-full" key={image}>
                      <img
                        src={image}
                        alt="Phone"
                        className="aspect-square w-full object-contain p-2"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div
                  className="
                  flex h-13 cursor-pointer justify-center
                  gap-2 md:col-span-1 md:h-auto
                  md:flex-col md:justify-start lg:gap-4
                "
                  id="product-details-bullet-images-list"
                />
              </div>

              <div
                className="
                  order-1 flex flex-col gap-6 md:col-span-5 lg:col-[7_/_-1]
                "
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <small className="font-semibold text-secondary">
                      Available colors
                    </small>
                    <small className="font-bold text-icons">ID: 802390</small>
                  </div>

                  <div className="flex gap-2">
                    {productInfo.colorsAvailable.map(color => (
                      <ColorLink
                        key={color}
                        color={colorList[color as keyof typeof colorList]}
                        active={productInfo.color === color}
                        to={`../${productInfo.id.replace(
                          productInfo.color.toLowerCase().split(' ').join('-'),
                          color.toLowerCase().split(' ').join('-'),
                        )}`}
                      />
                    ))}
                  </div>
                </div>

                <hr className="h-px border-elements" />

                <div className="flex flex-col gap-2">
                  <small className="font-semibold text-secondary">
                    Select capacity
                  </small>
                  <div className="flex gap-2">
                    {productInfo.capacityAvailable.map(item => (
                      <Link
                        to={`../${productInfo.id.replace(
                          productInfo.capacity
                            .toLowerCase()
                            .split(' ')
                            .join('-'),
                          item.toLowerCase().split(' ').join('-'),
                        )}`}
                        key={item}
                        className={twMerge(
                          `border border-icons p-2 duration-500 hover:bg-primary
                        hover:text-white hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]`,
                          productInfo.capacity === item &&
                            'bg-primary text-white',
                        )}
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>

                <hr className="h-px border-elements" />

                <div>
                  <div className="flex items-center gap-2">
                    <h3>${productInfo.priceRegular}</h3>

                    <h4 className="text-1.5xl text-secondary line-through">
                      ${productInfo.priceDiscount}
                    </h4>
                  </div>

                  <div className="mt-4 flex h-10 gap-2">
                    <ButtonCard
                      className={twMerge(
                        'h-full w-full',
                        basket.some(item => item.id === productInfo.id) &&
                          'border border-elements bg-white text-green',
                      )}
                      onClick={() =>
                        handleToggleBasket(productInfo.id, basket, setBasket)
                      }
                    >
                      {basket.some(item => item.id === productInfo.id)
                        ? 'Selected'
                        : 'Add to cart'}
                    </ButtonCard>
                    <ButtonCard
                      className="flex aspect-square h-full items-center
                        justify-center border border-icons bg-white"
                      onClick={handleToggleFavourites}
                    >
                      <img
                        src={
                          favourites.includes(productInfo.id)
                            ? favouriteActive
                            : favouriteGoods
                        }
                        alt="Favorites Good"
                      />
                    </ButtonCard>
                  </div>

                  <ul className="mt-8 flex flex-col gap-2 font-semibold">
                    <li className="flex justify-between">
                      <span className="text-secondary">Screen</span>
                      <span>{productInfo.screen}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-secondary">Capacity</span>
                      <span>{productInfo.capacity}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-secondary">Processor</span>
                      <span>{productInfo.processor}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-secondary">RAM</span>
                      <span>{productInfo.ram}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              className="
                mt-14 md:mt-16 lg:mt-20 lg:grid lg:grid-cols-12 lg:gap-4
              "
            >
              <div className="lg:col-span-5">
                <h4 className="text-1.5xl font-bold">About</h4>

                <hr className="mt-4 h-px border-elements" />

                {productInfo.description.map(product => (
                  <div key={title} className="mt-8 flex flex-col gap-4">
                    <h4 className="text-1.5xl font-bold">{product.title}</h4>
                    <p className="font-semibold text-secondary">
                      {product.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-14 md:mt-16 lg:col-[7_/_-1] lg:mt-0">
                <h4>Tech specs</h4>

                <hr className="mt-4 h-px border-elements" />

                <ul className="mt-6 flex flex-col gap-2">
                  <li className="flex justify-between">
                    <p className="text-secondary">Screen</p>
                    <p>{productInfo.screen}</p>
                  </li>
                  <li className="flex justify-between">
                    <p className="text-secondary">Capacity</p>
                    <p>{productInfo.capacity}</p>
                  </li>
                  <li className="flex justify-between">
                    <p className="text-secondary">Processor</p>
                    <p>{productInfo.processor}</p>
                  </li>
                  <li className="flex justify-between">
                    <p className="text-secondary">RAM</p>
                    <p>{productInfo.ram}</p>
                  </li>

                  {productInfo.capacity && (
                    <li className="flex justify-between">
                      <p className="text-secondary">Built in memory</p>
                      <p>{productInfo.capacity}</p>
                    </li>
                  )}

                  {productInfo.camera && (
                    <li className="flex justify-between">
                      <p className="text-secondary">Camera</p>
                      <p>{productInfo.camera}</p>
                    </li>
                  )}

                  {productInfo.zoom && (
                    <li className="flex justify-between">
                      <p className="text-secondary">Zoom</p>
                      <p>{productInfo.zoom}</p>
                    </li>
                  )}

                  {productInfo.cell && (
                    <li className="flex justify-between">
                      <p className="text-secondary">Cell</p>
                      <p className="flex gap-1">
                        {productInfo.cell.map(item => (
                          <p key={item}>{item},</p>
                        ))}
                      </p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </section>
        </>
      )}

      {isRandomProducts ? (
        <Loader />
      ) : (
        randomProducts && (
          <ListOfProductCards
            title="You may also like"
            products={randomProducts}
            className="mt-14 md:mt-16 lg:mt-20"
          />
        )
      )}
    </main>
  );
};
