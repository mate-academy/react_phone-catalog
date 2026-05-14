import React from 'react';
import s from './BannerSlide.module.scss';

export interface BannerSlideData {
  badge: string;
  headlineAccent: string;
  headlineRest: string;
  sub: string;
  btnText: string;
  btnHref?: string;
  productTitle: string;
  productSub: string;
  imgSrc: string;
  imgAlt: string;
  theme: 'purple' | 'cyan' | 'orange';
}

export const bannerSlides: BannerSlideData[] = [
  {
    badge: 'New arrival',
    headlineAccent: 'Now available!',
    headlineRest: 'In our store!',
    sub: 'Be the first to experience it',
    btnText: 'Order now',
    btnHref: '#',
    productTitle: 'iPhone 17 Pro',
    productSub: 'Pro. Beyond.',
    imgSrc: './img/iphone17.png',
    imgAlt: 'iPhone 17 Pro',
    theme: 'orange',
  },
  {
    badge: 'Best seller',
    headlineAccent: 'Pure sound.',
    headlineRest: 'Zero limits.',
    sub: 'Adaptive Noise Cancellation',
    btnText: 'Shop now',
    btnHref: '#',
    productTitle: 'AirPods Pro',
    productSub: 'Hear everything. Filter the rest.',
    imgSrc: './img/airpods.png',
    imgAlt: 'AirPods Pro',
    theme: 'cyan',
  },
  {
    badge: 'Limited offer',
    headlineAccent: 'Your health.',
    headlineRest: 'On your wrist.',
    sub: 'Advanced health sensors, all day',
    btnText: 'Explore',
    btnHref: '#',
    productTitle: 'Apple Watch Series 9',
    productSub: 'Smarter. Faster. Healthier.',
    imgSrc: './img/apple-watch.png',
    imgAlt: 'Apple Watch Series 9',
    theme: 'purple',
  },
];

interface BannerSlideProps {
  data: BannerSlideData;
}

const BannerSlide: React.FC<BannerSlideProps> = ({ data }) => {
  const {
    badge,
    headlineAccent,
    headlineRest,
    sub,
    btnText,
    btnHref,
    productTitle,
    productSub,
    imgSrc,
    imgAlt,
    theme,
  } = data;

  return (
    <div className={`${s.slide} ${s[theme]}`}>
      <div className={s.glow1} />
      <div className={s.glow2} />

      <div className={s.slide__leftContent}>
        <span className={s.badge}>{badge}</span>
        <div className={s.headline}>
          <div className={s.accent}>{headlineAccent}</div>
          {headlineRest}
        </div>
        <p className={s.sub}>{sub}</p>
        <a href={btnHref ?? '#'} className={s.btn}>
          {btnText.toUpperCase()}
        </a>
      </div>

      <div className={s.slide__rigthContent}>
        <div className={s.productLabel}>
          <span className={s.productTitle}>{productTitle}</span>
          <span className={s.productSub}>{productSub}</span>
        </div>

        <div className={s.imgWrap}>
          <img src={imgSrc} alt={imgAlt} className={s.productImg} />
        </div>
      </div>
    </div>
  );
};

export default BannerSlide;
