declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.json' {
  const value: string;
  export default value;
}
