export const fetchBanners = async () => {
  return [
    {
      id: 1,
      title: 'iPhone 14 Pro',
      subtitle: 'banners.iphone.subtitle',
      img: './img/banner-iphone.png',
      color: '#000000',
      link: '/phones/iphone-15-pro',
    },
    {
      id: 2,
      title: 'iPad Pro',
      subtitle: 'banners.ipad.subtitle',
      img: './img/banner-ipad.png',
      color: '#6D6474',
      link: '/tablets/ipad-pro',
    },
    {
      id: 3,
      title: 'Apple Watch',
      subtitle: 'banners.watch.subtitle',
      img: './img/banner-watch.png',
      color: '#7f70b8',
      link: '/accessories/apple-watch-series-9',
    },
  ];
};
