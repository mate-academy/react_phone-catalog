declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}
