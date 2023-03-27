<<<<<<< HEAD
declare module '*.svg?inline' {
  const content: any
  export default content
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
=======
declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const path: string;
  export default path;
}

declare module '*.png' {
  const path: string;
  export default path;
}
>>>>>>> cf11070d51018e71b3b0f27e4a4d27261eed43f3
