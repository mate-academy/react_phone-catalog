export interface SlideItem {
  id: number;
  image: string;
  mainTitle: string;
  subTitle: string;
  content: {
    title: string;
    text: string;
    buttonText: string;
    buttonLink: string;
  };
}
