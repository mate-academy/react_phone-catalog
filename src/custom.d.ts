declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.jpg' {
  const content: React.FC<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
  >;
  export default content;
}

declare module '*.png' {
  const content: React.FC<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
  >;
  export default content;
}
