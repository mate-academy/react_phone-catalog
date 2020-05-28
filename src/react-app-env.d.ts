// / <reference types="react-scripts" />
type Link = {
  name: string;
  title?: string;
  url: string;
  imgUrl?: string;
  type?: string;
  exact?: boolean;
};

type Slide = {
  id: number;
  imgUrl: string;
  alt: string;
};
