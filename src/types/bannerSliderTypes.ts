type BannerSliderItemBase = {
  image: string;
  alt: string;
  link: string;
};

type MainBannerSliderItem = BannerSliderItemBase & {
  type: 'main';
  title: string;
  subtitle: string;
  textBtn: string;
  phoneName: string;
  tagName: string;
};

type ImageBannerSliderItem = BannerSliderItemBase;

export type BannerSliderItem = MainBannerSliderItem | ImageBannerSliderItem;
