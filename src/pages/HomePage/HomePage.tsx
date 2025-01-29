import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../api/api';
import { ProductSlider } from '../../components/ProductSlider';
import { ProductType } from '../../types/ProductType';
import { SortType } from '../../types/SortType';
import { BannerSlider } from '../../components/BannerSlider';
import './HomePage.scss';

const BANNERS = [
  {
    desktop: 'banners/iphone_14_pro.png',
    mobile: 'banners/iphone_14_pro_mobile.png',
    link: 'product/apple-iphone-14-512gb-midnight',
  },
  {
    desktop: 'banners/watch_series_6.png',
    mobile: 'banners/watch_series_6_mobile.png',
    link: 'product/apple-watch-series-6-44mm-space-gray',
  },
  {
    desktop: 'banners/ipad_pro_11.png',
    mobile: 'banners/ipad_pro_11_mobile.png',
    link: 'product/apple-ipad-pro-11-2021-128gb-spacegray',
  },
];

const CATEGORIES = [
  {
    image: 'categories/phones.png',
    title: 'Mobile phones',
    link: 'phones',
    model_count: 95,
  },
  {
    image: 'categories/tablets.png',
    title: 'Tablets',
    link: 'tablets',
    model_count: 24,
  },
  {
    image: 'categories/accessories.png',
    title: 'Accessories',
    link: 'accessories',
    model_count: 100,
  },
];

const normalize = (number: number) => {
  return Math.min(Math.max(number, -1), 1);
};

const calculateBrightness = (x: number, y: number) => {
  const normalizedX = normalize(x);
  const normalizedY = normalize(y);

  const baseBrightness = 1;
  const brightnessRange = 0.4;

  const brightness =
    baseBrightness + (-normalizedY * 0.5 + normalizedX * 0.2) * brightnessRange;

  return Math.min(Math.max(brightness, 0.6), 1.05);
};

const calculateImageStyles = (
  image: HTMLImageElement,
  mouseX: number,
  mouseY: number,
) => {
  const category = image.parentElement;

  if (!category) {
    return;
  }

  const categoryRect = category.getBoundingClientRect();

  const middleX = (categoryRect.left + categoryRect.right) / 2;
  const middleY = (categoryRect.top + categoryRect.bottom) / 2;

  const posX = normalize((mouseX - middleX) / 150);
  const posY = -normalize((mouseY - middleY) / 150);

  const targetRotation = `${posY} ${posX} 0 ${Math.max(Math.abs(posX), Math.abs(posY)) * 10}deg`;
  const targetBrightness = `brightness(${calculateBrightness(posX, -posY)})`;

  return { rotation: targetRotation, brightness: targetBrightness };
};

export const HomePage = () => {
  const [newestProducts, setNewestProducts] = useState<ProductType[]>([]);
  const [hotProducts, setHotProducts] = useState<ProductType[]>([]);
  const imageRef = useRef<HTMLImageElement>();

  const fetchProducts = async () => {
    const newestProducts = await getProducts();
    const hotProducts = await getProducts({ sortBy: SortType.Discount });

    setNewestProducts(newestProducts.products);
    setHotProducts(hotProducts.products);
  };

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    imageRef.current = event.currentTarget;

    if (!event.currentTarget) {
      return;
    }

    if (
      event.currentTarget.style.rotate &&
      event.currentTarget.style.rotate !== 'none'
    ) {
      return;
    }

    const styles = calculateImageStyles(
      event.currentTarget,
      event.clientX,
      event.clientY,
    );

    if (!styles) {
      return;
    }

    const imageKeyframes: Partial<CSSStyleDeclaration>[] = [
      {
        rotate: 'none',
        filter: 'none',
      },
      {
        rotate: styles.rotation,
        filter: styles.brightness,
      },
    ];

    const imageTiming: KeyframeAnimationOptions = {
      duration: 50,
      iterations: 1,
      easing: 'ease-in-out',
    };

    event.currentTarget.animate(imageKeyframes as Keyframe[], imageTiming);
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const image = imageRef.current;

    if (!image) {
      return;
    }

    const styles = calculateImageStyles(image, event.clientX, event.clientY);

    if (!styles) {
      return;
    }

    image.style.rotate = styles.rotation;
    image.style.filter = styles.brightness;
  };

  const handleMouseLeave = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const image = event.currentTarget.querySelector('img');

    if (!image) {
      return;
    }

    const imageKeyframes: Partial<CSSStyleDeclaration>[] = [
      {
        rotate: image.style.rotate,
        filter: image.style.filter,
      },
      {
        rotate: 'none',
        filter: 'none',
      },
    ];

    const imageTiming: KeyframeAnimationOptions = {
      duration: 300,
      iterations: 1,
      easing: 'ease-in-out',
    };

    const animation = image.animate(imageKeyframes as Keyframe[], imageTiming);

    imageRef.current = undefined;

    animation.addEventListener('finish', (ev: AnimationPlaybackEvent) => {
      const effect = (ev.currentTarget as Animation).effect as KeyframeEffect;

      const image = effect?.target as HTMLImageElement;

      if (image) {
        image.style.rotate = 'none';
        image.style.filter = 'none';
      }
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      <h1 className="home-page__title">Welcome to Nice Gadgets store!</h1>

      <div className="home-page__container">
        <section className="home-page__banner">
          <BannerSlider banners={BANNERS} />
        </section>

        <section className="home-page__models">
          <ProductSlider products={newestProducts} title="Brand new models" />
        </section>

        <section className="home-page__categories home-page__section">
          <h2 className="home-page__section-title">Shop by category</h2>

          <div className="home-page__categories-container">
            {CATEGORIES.map(category => (
              <Link
                key={category.title}
                to={category.link}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="home-page__categories-category"
              >
                <img
                  className="home-page__categories-category-photo"
                  onMouseEnter={handleMouseEnter}
                  src={category.image}
                  alt="Phones category photo"
                />
                <h4 className="home-page__categories-category-title">
                  {category.title}
                </h4>
                <p className="body-text home-page__categories-category-subtitle">
                  {category.model_count} models
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="home-page__hot-prices">
          <ProductSlider products={hotProducts} title="Hot prices" />
        </section>
      </div>
    </div>
  );
};
