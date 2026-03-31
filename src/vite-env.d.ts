/// <reference types="vite/client" />

declare module "*.css";
declare module "*.scss";

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
