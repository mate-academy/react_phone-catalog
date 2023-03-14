declare module '*.svg' {
  import React = require('react');

  const ReactComponent: React.FC<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
  >;
  export default ReactComponent;
}
