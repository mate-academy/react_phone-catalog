import { api } from '@/api/api';
import { useCart } from '@/app/providers/Cart';
import { useFavourites } from '@/app/providers/Favorities';
import { Category, ProductDetails as ProductDetailsType } from '@/shared/type';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageSwiper } from '../ImageSwiper';
import { ButtonColor } from '@/components/ButtonColor';
import classNames from 'classnames';
import { ButtonBuy } from '@/components/ButtonBuy/ButtonBuy';
import { ButtonHeart } from '@/components/ButtonHeart/ButtonHeart';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ButtonBack } from '@/components/ButtonBack';
import styles from './styles.module.scss';
import productColors from '@/shared/utils';
import skeleton from './skeleton.module.scss';
import { ButtonThird } from '@/components/ButtonThird/ButtonThird';
import { SectionYouMayAlsoLike } from '../SectionYouMayAlsoLike';

type ProductDetailsState =
  | { status: 'loading' }
  | { status: 'success'; product: Awaited<ReturnType<typeof api.getProductDetails>> }
  | { status: 'error'; error: string };

function hashString(str: string) {
  let hash = 2166136261;

  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString().slice(1, 6);
}

export const ProductDetails = ({
  category,
  productId,
}: {
  category: Category;
  productId: string;
}) => {
  const { t, i18n } = useTranslation();
  const { favourites, setFavourites } = useFavourites();
  const { cart, setCart } = useCart();

  const [state, setState] = useState<ProductDetailsState>({
    status: 'loading',
  });

  const isFavourite = useMemo(() => {
    if (state.status !== 'success') {
      return false;
    }
    return favourites.includes(state.product.productDetail.id);
  }, [favourites, state]);

  const isInCart = useMemo(() => {
    if (state.status !== 'success') {
      return false;
    }
    return cart.includes(state.product.productDetail.id);
  }, [cart, state]);

  useEffect(() => {
    let ignoreResult = false;

    api
      .getProductDetails(category, productId)
      .then((product) => {
        if (ignoreResult) {
          return;
        }

        if (!product) {
          setState({
            status: 'error',
            error: `No such product found: ${productId}`,
          });

          return;
        }
        setState({
          status: 'success',
          product,
        });
      })
      .catch((error: unknown) => {
        if (ignoreResult) {
          return;
        }

        const message = error instanceof Error ? error.message : String(error);

        setState({
          status: 'error',
          error: `Something went wrong: ${message}`,
        });
      });

    return () => {
      ignoreResult = true;
    };
  }, [productId, category]);

  const prepareProductDetails = (
    product: ProductDetailsType,
    productByNamespace: ProductDetailsType[],
    isLoading: boolean,
    key: string,
  ) => {
    const addSkeleton = (className: string = '') => {
      return {
        className: classNames(className, { [skeleton.skeleton]: isLoading }),
        inert: isLoading,
      };
    };

    return (
      <article key={key} className={styles.container}>
        <h1 {...addSkeleton(styles.title)}>{product.name}</h1>
        <ImageSwiper {...addSkeleton(styles.imageSwiper)} images={product.images}></ImageSwiper>
        <div className={styles.parameters}>
          <div className={styles.parameterBox}>
            <div className={styles.parameterTitle}>
              <p {...addSkeleton()}>{t('productDetails.availableColors')}</p>
              <p {...addSkeleton()}>{`ID ${hashString(product.id)}`}</p>
            </div>
            <div className={styles.parameterSelects}>
              {product.colorsAvailable.map((color) => {
                const link = productByNamespace.find((item) => item.color === color)?.id || '';
                return (
                  <ButtonColor
                    {...addSkeleton()}
                    key={color}
                    to={`/${category}/${link}`}
                    color={productColors[color] || 'red'}
                    selected={color === product.color}
                  ></ButtonColor>
                );
              })}
            </div>
          </div>

          <div
            className={classNames(styles.line, styles.lineMarginTop24, styles.lineMarginBottom24)}
          ></div>

          <div className={styles.parameterBox}>
            <div className={classNames(styles.parameterTitle)}>
              <p {...addSkeleton()}>{t('productDetails.selectCapacity')}</p>
            </div>
            <div className={styles.parameterSelects}>
              {product.capacityAvailable.map((capacity) => {
                const link =
                  productByNamespace.find((item) => item.capacity === capacity)?.id || '';
                return (
                  <ButtonThird
                    {...addSkeleton()}
                    key={capacity}
                    to={`/${category}/${link}`}
                    selected={capacity === product.capacity}
                  >
                    {capacity}
                  </ButtonThird>
                );
              })}
            </div>
          </div>

          <div
            className={classNames(styles.line, styles.lineMarginTop24, styles.lineMarginBottom32)}
          ></div>

          <div className={styles.priceBox}>
            <h3 {...addSkeleton(styles.price)}>{'$' + product.priceDiscount}</h3>
            <h3 {...addSkeleton(styles.price + ' ' + styles.pricelineThrough)}>
              {'$' + product.priceRegular}
            </h3>
          </div>

          <div className={styles.buttons}>
            <ButtonBuy
              {...addSkeleton(styles.buttonBuy)}
              selected={isInCart}
              onClick={() => {
                setCart((prev) =>
                  prev.includes(String(product.id))
                    ? prev.filter((id) => id !== String(product.id))
                    : [...prev, String(product.id)],
                );
              }}
            >
              {isInCart ? t('productCart.buttonSelected') : t('productCart.button')}
            </ButtonBuy>
            <ButtonHeart
              {...addSkeleton(styles.buttonHeart)}
              like={isFavourite}
              onClick={() => {
                setFavourites((prev) =>
                  prev.includes(String(product.id))
                    ? prev.filter((id) => id !== String(product.id))
                    : [...prev, String(product.id)],
                );
              }}
            ></ButtonHeart>
          </div>

          <div className={classNames(styles.details, styles.detailsMarginTop32)}>
            <div className={styles.detail}>
              <p {...addSkeleton(styles.detailText1)}>{t('productCart.screen')}</p>
              <p {...addSkeleton(classNames(styles.detailText2, styles.detailText2fontWeight700))}>
                {product.screen}
              </p>
            </div>
            <div className={styles.detail}>
              <p {...addSkeleton(styles.detailText1)}>{t('productCart.capacity')}</p>
              <p {...addSkeleton(classNames(styles.detailText2, styles.detailText2fontWeight700))}>
                {product.capacity}
              </p>
            </div>
            <div className={styles.detail}>
              <p {...addSkeleton(styles.detailText1)}>{t('productCart.RAM')}</p>
              <p {...addSkeleton(classNames(styles.detailText2, styles.detailText2fontWeight700))}>
                {product.ram}
              </p>
            </div>
            <div className={styles.detail}>
              <p {...addSkeleton(styles.detailText1)}>{t('productCart.processor')}</p>
              <p {...addSkeleton(classNames(styles.detailText2, styles.detailText2fontWeight700))}>
                {product.processor}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.sections}>
          <section className={styles.sectionAbout} aria-label="About product">
            <h2 {...addSkeleton()}>{t('productDetails.about')}</h2>
            <div
              className={classNames(styles.line, styles.lineMarginBottom32, styles.lineMarginTop24)}
            ></div>
            <div className={styles.sectionAboutDescription}>
              {product[i18n.resolvedLanguage === 'en' ? 'description' : 'descriptionUa'].map(
                (item) => {
                  return (
                    <div key={item.title}>
                      <h3 {...addSkeleton()}>{item.title}</h3>
                      <p {...addSkeleton()}>
                        {item.text.map((text, index) => {
                          if (index === item.text.length - 1) {
                            return text;
                          }
                          return (
                            <Fragment key={index}>
                              {text} <br /> <br />
                            </Fragment>
                          );
                        })}
                      </p>
                    </div>
                  );
                },
              )}
            </div>
          </section>

          <section className={styles.sectionTechSpecs} aria-label="About product">
            <h2 {...addSkeleton()}>{t('productDetails.techSpecs')}</h2>
            <div
              className={classNames(styles.line, styles.lineMarginBottom32, styles.lineMarginTop24)}
            ></div>
            <div className={classNames(styles.details)}>
              <div className={styles.detail}>
                <p {...addSkeleton(classNames(styles.detailText1, styles.detailText1fontSize14))}>
                  {t('productCart.screen')}
                </p>
                <p {...addSkeleton(classNames(styles.detailText2, styles.detailText2fontSize14))}>
                  {product.screen}
                </p>
              </div>

              <div className={styles.detail}>
                <p {...addSkeleton(classNames(styles.detailText1, styles.detailText1fontSize14))}>
                  {t('productCart.resolution')}
                </p>
                <p {...addSkeleton(classNames(styles.detailText2, styles.detailText2fontSize14))}>
                  {product.resolution}
                </p>
              </div>
              <div className={styles.detail}>
                <p {...addSkeleton(classNames(styles.detailText1, styles.detailText1fontSize14))}>
                  {t('productCart.processor')}
                </p>
                <p {...addSkeleton(classNames(styles.detailText2, styles.detailText2fontSize14))}>
                  {product.processor}
                </p>
              </div>
              <div className={styles.detail}>
                <p {...addSkeleton(classNames(styles.detailText1, styles.detailText1fontSize14))}>
                  {t('productCart.RAM')}
                </p>
                <p {...addSkeleton(classNames(styles.detailText2, styles.detailText2fontSize14))}>
                  {product.ram}
                </p>
              </div>

              <div className={styles.detail}>
                <p {...addSkeleton(classNames(styles.detailText1, styles.detailText1fontSize14))}>
                  {t('productCart.builtInMemory')}
                </p>
                <p {...addSkeleton(classNames(styles.detailText2, styles.detailText2fontSize14))}>
                  {product.capacity}
                </p>
              </div>
              {product.camera && (
                <div className={styles.detail}>
                  <p {...addSkeleton(classNames(styles.detailText1, styles.detailText1fontSize14))}>
                    {t('productCart.camera')}
                  </p>
                  <p {...addSkeleton(classNames(styles.detailText2, styles.detailText2fontSize14))}>
                    {product.camera}
                  </p>
                </div>
              )}
              {product.zoom && (
                <div className={styles.detail}>
                  <p {...addSkeleton(classNames(styles.detailText1, styles.detailText1fontSize14))}>
                    {t('productCart.zoom')}
                  </p>
                  <p {...addSkeleton(classNames(styles.detailText2, styles.detailText2fontSize14))}>
                    {product.zoom}
                  </p>
                </div>
              )}

              <div className={styles.detail}>
                <p {...addSkeleton(classNames(styles.detailText1, styles.detailText1fontSize14))}>
                  {t('productCart.cell')}
                </p>
                <p {...addSkeleton(classNames(styles.detailText2, styles.detailText2fontSize14))}>
                  {product.cell.join(', ')}
                </p>
              </div>
            </div>
          </section>
        </div>
      </article>
    );
  };

  const productDetailsDefault = prepareProductDetails(
    {
      id: 'apple-iphone-14-128gb-purple',
      category: 'phones',
      namespaceId: 'apple-iphone-14',
      name: 'Apple iPhone 14 128GB Purple',
      capacityAvailable: ['128GB', '256GB', '512GB'],
      capacity: '128GB',
      priceRegular: 1056,
      priceDiscount: 980,
      colorsAvailable: ['midnight', 'yellow', 'purple'],
      color: 'purple',
      images: [
        'img/phones/apple-iphone-14/purple/00.webp',
        'img/phones/apple-iphone-14/purple/01.webp',
        'img/phones/apple-iphone-14/purple/02.webp',
        'img/phones/apple-iphone-14/purple/03.webp',
        'img/phones/apple-iphone-14/purple/04.webp',
      ],
      description: [
        {
          title: 'Wonderfull',
          text: [
            'A transformative triple-camera system that adds tons of capability without complexity.',
            'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
          ],
        },
        {
          title: 'Camera',
          text: [
            'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
          ],
        },
        {
          title: 'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
          text: [
            'iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
          ],
        },
      ],
      descriptionUa: [
        {
          title: 'Чудово',
          text: [
            'Революційна система з трьох камер, яка додає безліч можливостей без зайвих складнощів.',
            'Безпрецедентний стрибок у тривалості роботи від акумулятора. І неймовірний чип, який виводить машинне навчання на новий рівень та розширює межі можливостей смартфона. Зустрічайте перший iPhone, достатньо потужний, щоб називатися Pro.',
          ],
        },
        {
          title: 'Камера',
          text: [
            'Зустрічайте першу систему з трьох камер, яка поєднує передові технології з легендарною простотою iPhone. Захоплюйте до чотирьох разів більше простору в кадрі. Отримуйте чудові знімки за значно слабшого освітлення. Знімайте відео найвищої якості серед смартфонів, а потім редагуйте його за допомогою тих самих інструментів, які ви любите використовувати для фотографій. Ви ще ніколи не знімали нічим подібним.',
          ],
        },
        {
          title:
            'Знімайте. Перевертайте. Наближайте. Кадруйте. Вирізайте. Освітлюйте. Налаштовуйте. Насолоджуйтеся.',
          text: [
            'iPhone 11 Pro дає змогу знімати надзвичайно реалістичні відео з більшою деталізацією та плавнішим рухом. Величезна обчислювальна потужність дозволяє знімати відео 4K із розширеним динамічним діапазоном і кінематографічною стабілізацією — усе це з частотою 60 кадрів за секунду. Ви також отримуєте більше творчого контролю: у кадр потрапляє в чотири рази більше простору, а для редагування доступні нові потужні інструменти.',
          ],
        },
      ],
      screen: "6.1' OLED (Super Retina XDR)",
      resolution: '2532x1170',
      processor: 'Apple A15 Bionic',
      ram: '6GB',
      camera: '12 Mp + 12 Mp + 12MP',
      zoom: 'Digital 5x, Optical 2x',
      cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE', '5G'],
    },
    [
      {
        id: 'apple-iphone-14-128gb-purple',
        category: 'phones',
        namespaceId: 'apple-iphone-14',
        name: 'Apple iPhone 14 128GB Purple',
        capacityAvailable: ['128GB', '256GB', '512GB'],
        capacity: '128GB',
        priceRegular: 1056,
        priceDiscount: 980,
        colorsAvailable: ['midnight', 'yellow', 'purple'],
        color: 'purple',
        images: [
          'img/phones/apple-iphone-14/purple/00.webp',
          'img/phones/apple-iphone-14/purple/01.webp',
          'img/phones/apple-iphone-14/purple/02.webp',
          'img/phones/apple-iphone-14/purple/03.webp',
          'img/phones/apple-iphone-14/purple/04.webp',
        ],
        description: [
          {
            title: 'Wonderfull',
            text: [
              'A transformative triple-camera system that adds tons of capability without complexity.',
              'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
            ],
          },
          {
            title: 'Camera',
            text: [
              'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
            ],
          },
          {
            title: 'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
            text: [
              'iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
            ],
          },
        ],
        descriptionUa: [
          {
            title: 'Чудово',
            text: [
              'Революційна система з трьох камер, яка додає безліч можливостей без зайвих складнощів.',
              'Безпрецедентний стрибок у тривалості роботи від акумулятора. І неймовірний чип, який виводить машинне навчання на новий рівень та розширює межі можливостей смартфона. Зустрічайте перший iPhone, достатньо потужний, щоб називатися Pro.',
            ],
          },
          {
            title: 'Камера',
            text: [
              'Зустрічайте першу систему з трьох камер, яка поєднує передові технології з легендарною простотою iPhone. Захоплюйте до чотирьох разів більше простору в кадрі. Отримуйте чудові знімки за значно слабшого освітлення. Знімайте відео найвищої якості серед смартфонів, а потім редагуйте його за допомогою тих самих інструментів, які ви любите використовувати для фотографій. Ви ще ніколи не знімали нічим подібним.',
            ],
          },
          {
            title:
              'Знімайте. Перевертайте. Наближайте. Кадруйте. Вирізайте. Освітлюйте. Налаштовуйте. Насолоджуйтеся.',
            text: [
              'iPhone 11 Pro дає змогу знімати надзвичайно реалістичні відео з більшою деталізацією та плавнішим рухом. Величезна обчислювальна потужність дозволяє знімати відео 4K із розширеним динамічним діапазоном і кінематографічною стабілізацією — усе це з частотою 60 кадрів за секунду. Ви також отримуєте більше творчого контролю: у кадр потрапляє в чотири рази більше простору, а для редагування доступні нові потужні інструменти.',
            ],
          },
        ],
        screen: "6.1' OLED (Super Retina XDR)",
        resolution: '2532x1170',
        processor: 'Apple A15 Bionic',
        ram: '6GB',
        camera: '12 Mp + 12 Mp + 12MP',
        zoom: 'Digital 5x, Optical 2x',
        cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE', '5G'],
      },
      {
        id: 'apple-iphone-14-128gb-purple',
        category: 'phones',
        namespaceId: 'apple-iphone-14',
        name: 'Apple iPhone 14 128GB Purple',
        capacityAvailable: ['128GB', '256GB', '512GB'],
        capacity: '128GB',
        priceRegular: 1056,
        priceDiscount: 980,
        colorsAvailable: ['midnight', 'yellow', 'purple'],
        color: 'purple',
        images: [
          'img/phones/apple-iphone-14/purple/00.webp',
          'img/phones/apple-iphone-14/purple/01.webp',
          'img/phones/apple-iphone-14/purple/02.webp',
          'img/phones/apple-iphone-14/purple/03.webp',
          'img/phones/apple-iphone-14/purple/04.webp',
        ],
        description: [
          {
            title: 'Wonderfull',
            text: [
              'A transformative triple-camera system that adds tons of capability without complexity.',
              'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
            ],
          },
          {
            title: 'Camera',
            text: [
              'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
            ],
          },
          {
            title: 'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
            text: [
              'iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
            ],
          },
        ],
        descriptionUa: [
          {
            title: 'Чудово',
            text: [
              'Революційна система з трьох камер, яка додає безліч можливостей без зайвих складнощів.',
              'Безпрецедентний стрибок у тривалості роботи від акумулятора. І неймовірний чип, який виводить машинне навчання на новий рівень та розширює межі можливостей смартфона. Зустрічайте перший iPhone, достатньо потужний, щоб називатися Pro.',
            ],
          },
          {
            title: 'Камера',
            text: [
              'Зустрічайте першу систему з трьох камер, яка поєднує передові технології з легендарною простотою iPhone. Захоплюйте до чотирьох разів більше простору в кадрі. Отримуйте чудові знімки за значно слабшого освітлення. Знімайте відео найвищої якості серед смартфонів, а потім редагуйте його за допомогою тих самих інструментів, які ви любите використовувати для фотографій. Ви ще ніколи не знімали нічим подібним.',
            ],
          },
          {
            title:
              'Знімайте. Перевертайте. Наближайте. Кадруйте. Вирізайте. Освітлюйте. Налаштовуйте. Насолоджуйтеся.',
            text: [
              'iPhone 11 Pro дає змогу знімати надзвичайно реалістичні відео з більшою деталізацією та плавнішим рухом. Величезна обчислювальна потужність дозволяє знімати відео 4K із розширеним динамічним діапазоном і кінематографічною стабілізацією — усе це з частотою 60 кадрів за секунду. Ви також отримуєте більше творчого контролю: у кадр потрапляє в чотири рази більше простору, а для редагування доступні нові потужні інструменти.',
            ],
          },
        ],
        screen: "6.1' OLED (Super Retina XDR)",
        resolution: '2532x1170',
        processor: 'Apple A15 Bionic',
        ram: '6GB',
        camera: '12 Mp + 12 Mp + 12MP',
        zoom: 'Digital 5x, Optical 2x',
        cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE', '5G'],
      },
    ],
    true,
    'default',
  );

  const stateSwitch = () => {
    switch (state.status) {
      case 'loading':
        return productDetailsDefault;

      case 'error':
        return (
          <div className={styles.containerNoGrid}>
            <h1>{state.error}</h1>

            <img
              className={styles.imageProductNotFound}
              src="./img/product-not-found.png"
              alt="Image product not found"
            />
          </div>
        );

      case 'success': {
        return (
          <>
            {prepareProductDetails(
              state.product.productDetail,
              state.product.productByNamespace,
              false,
              state.product.productDetail.id,
            )}
            <SectionYouMayAlsoLike className={styles.sectionYouMayAlsoLike}></SectionYouMayAlsoLike>
          </>
        );
      }
    }
  };

  return (
    <div>
      <div className={styles.containerNoGrid}>
        <Breadcrumbs></Breadcrumbs>
        <ButtonBack></ButtonBack>
      </div>
      <div> {stateSwitch()}</div>
    </div>
  );
};
