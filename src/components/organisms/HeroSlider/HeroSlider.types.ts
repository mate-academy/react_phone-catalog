export type HeroSlideFeature = {
  icon: string;
  title: string;
  description: string;
};

export type HeroSlide = {
  id: string | number;
  title: string;
  accentTitle: string;
  subtitle: string;
  backgroundImage: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  features: HeroSlideFeature[];
  colorScheme: 'purple' | 'yellow' | 'blue';
};

export type HeroSliderData = {
  slides: HeroSlide[];
};
