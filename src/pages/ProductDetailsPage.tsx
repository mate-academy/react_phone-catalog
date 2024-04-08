import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Loader } from '../components/Loader';
import {
  getProductById,
  getSmallProductById,
  getSuggestedProducts,
} from '../api/products';
import { ErrorNetwork } from '../components/ErrorNetwork';
import { GoBackButton } from '../components/GoBackButton';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ColorButton } from '../components/ColorButton';
import { colorList } from '../utils/colorList';
import { Button } from '../components/Button';
import { FavouritesButton } from '../components/FavouritesButton';
import { ProductsSlider } from '../components/ProductsSlider';
import { useLocalStorage } from 'usehooks-ts';
import { toggleItemInArray } from '../helpers/functions';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [favourites, setFavourites] = useLocalStorage<number[]>(
    'favourites',
    [],
  );
  const [cart, setCart] = useLocalStorage<number[]>('cart', []);

  const { data: suggestedProducts, fetchNextPage } = useInfiniteQuery({
    queryKey: ['suggestedProducts'],
    queryFn: data => getSuggestedProducts(data.pageParam),
    initialPageParam: 10,
    getNextPageParam: () => 10,
  });

  const { isLoading: productLoading, data: product } = useQuery({
    queryKey: ['productById', productId],
    queryFn: () => (productId ? getProductById(productId) : undefined),
  });

  const { isLoading: smallProductLoading, data: smallProduct } = useQuery({
    queryKey: ['smallProductById', product?.id],
    queryFn: () => (product?.id ? getSmallProductById(product.id) : undefined),
    enabled: !!product?.id,
  });

  const isLoading = productLoading || smallProductLoading;

  return isLoading ? (
    <main className="flex h-full items-center justify-center">
      <Loader />
    </main>
  ) : !product || !smallProduct ? (
    <ErrorNetwork />
  ) : (
    <main className="content-padding grid w-full pb-14 pt-6">
      <Breadcrumbs />

      <GoBackButton className="mt-6 md:mt-10">Back</GoBackButton>

      <h2 className="mt-4">{product.name}</h2>

      <section
        className="mt-8 flex w-full flex-col gap-10
        overflow-hidden md:grid md:grid-cols-12 md:gap-4"
      >
        <div
          className="flex flex-col gap-4
          md:col-span-7 md:grid md:grid-cols-7 lg:col-span-6 lg:grid-cols-6"
        >
          <Swiper
            pagination={{
              el: '#product-details-page-container-of-bullets',
              bulletActiveClass: 'border-primary pointer-events-none',
              clickable: true,
              renderBullet: (index, className) =>
                `<span
                  class="h-13 aspect-square border
                  object-contain hover:border-primary border-elements
                  transition cursor-pointer md:w-full md:overflow-hidden md:h-auto ${className}"
                >
                  <img class="h-full w-full object-contain" src="${product.images[index]}"/>
                </span>`,
            }}
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            loop
            autoplay
            className="aspect-square w-full md:order-1 md:col-span-6
            md:col-start-2"
          >
            {product.images.map(image => (
              <SwiperSlide key={image}>
                <img
                  className="aspect-square w-full object-contain"
                  src={image}
                  alt={product.name}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            id="product-details-page-container-of-bullets"
            className="flex flex-wrap justify-center gap-2
            md:col-span-1 md:col-start-1 md:flex-col md:justify-start"
          ></div>
        </div>

        <div className="flex flex-col md:col-span-5 lg:col-span-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <small className="text-secondary">Available colors</small>
              <small className="text-secondary">{`ID: ${smallProduct.id}`}</small>
            </div>
            <div className="flex gap-2">
              {product.colorsAvailable.map(color => (
                <ColorButton
                  onClick={() =>
                    navigate(
                      `../${product.id.split(product.color).join(color)}`,
                    )
                  }
                  key={color}
                  active={product.color === color}
                  color={colorList[color as keyof typeof colorList]}
                />
              ))}
            </div>
          </div>

          <hr className="mt-6 border-elements" />

          <div className="mt-6 flex flex-col gap-2">
            <small className="text-secondary">Select capacity</small>
            <div className="flex flex-wrap gap-2">
              {product.capacityAvailable.map(capacity => (
                <Button
                  active={product.capacity === capacity}
                  onClick={() =>
                    navigate(
                      `../${product.id.split(product.capacity.toLowerCase()).join(capacity.toLowerCase())}`,
                    )
                  }
                  className="w-fit border border-primary bg-white p-2
                  font-normal text-primary"
                  activeClassName="text-white bg-primary border-none
                  pointer-events-none"
                  key={capacity}
                >
                  {capacity}
                </Button>
              ))}
            </div>
          </div>

          <hr className="mt-6 border-elements" />

          <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <h2>${product.priceDiscount || product.priceRegular}</h2>

              {product.priceRegular !== product.priceDiscount && (
                <h3 className="font-normal text-secondary line-through">
                  ${product.priceRegular}
                </h3>
              )}
            </div>

            <div className="flex h-12 gap-2">
              <Button
                onClick={() =>
                  setCart(c => toggleItemInArray(c, smallProduct.id))
                }
                active={cart.includes(smallProduct.id)}
                className="h-full w-full"
              >
                {favourites.includes(smallProduct.id) ? 'Added' : 'Add to cart'}
              </Button>

              <FavouritesButton
                onClick={() =>
                  setFavourites(c => toggleItemInArray(c, smallProduct.id))
                }
                active={favourites.includes(smallProduct.id)}
                className="h-full w-auto"
              />
            </div>
          </div>

          <ul className="mt-8 flex flex-col gap-2">
            <li className="flex justify-between">
              <small className="text-secondary">Screen</small>
              <small>{product.screen}</small>
            </li>
            <li className="flex justify-between">
              <small className="text-secondary">Resolution</small>
              <small>{product.resolution}</small>
            </li>
            <li className="flex justify-between">
              <small className="text-secondary">Processor</small>
              <small>{product.processor}</small>
            </li>
            <li className="flex justify-between">
              <small className="text-secondary">RAM</small>
              <small>{product.ram}</small>
            </li>
          </ul>
        </div>
      </section>

      <section
        className="mt-14 flex flex-col gap-14 md:mt-16 md:gap-16
        lg:flex-row"
      >
        <div className="flex flex-col gap-8 lg:w-full">
          <div className="flex flex-col gap-4">
            <h3 className="font-bold">About</h3>
            <hr className="border-elements" />
          </div>

          {product.description.map(paragraph => (
            <div className="flex flex-col gap-4" key={paragraph.title}>
              <h4 className="font-bold">{paragraph.title}</h4>

              {paragraph.text.map(text => (
                <p className="text-[#89939A]" key={text}>
                  {text}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-7.5 lg:w-full">
          <div className="flex flex-col gap-4">
            <h3>Tech specs</h3>
            <hr className="border-elements" />
          </div>

          <ul className="flex flex-col gap-2">
            <li className="flex justify-between">
              <p className="text-secondary">Screen</p>
              <p className="text-primary">{product.screen}</p>
            </li>
            <li className="flex justify-between">
              <p className="text-secondary">Resolution</p>
              <p className="text-primary">{product.resolution}</p>
            </li>
            <li className="flex justify-between">
              <p className="text-secondary">Processor</p>
              <p className="text-primary">{product.processor}</p>
            </li>
            <li className="flex justify-between">
              <p className="text-secondary">RAM</p>
              <p className="text-primary">{product.ram}</p>
            </li>
            <li className="flex justify-between">
              <p className="text-secondary">Built in memory</p>
              <p className="text-primary">{product.capacity}</p>
            </li>
            <li className="flex justify-between">
              <p className="text-secondary">Cell</p>
              <p className="text-primary">{product.cell.join(' ')}</p>
            </li>
          </ul>
        </div>
      </section>

      {!!suggestedProducts?.pages.length && (
        <ProductsSlider
          className="mt-14 w-full overflow-hidden md:mt-16"
          slides={suggestedProducts.pages.flat()}
          title="You may also like"
          swiperProps={{
            onReachEnd: () => fetchNextPage(),
          }}
        />
      )}
    </main>
  );
};
