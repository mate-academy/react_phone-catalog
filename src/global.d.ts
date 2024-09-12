declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.json' {
  const value: unknown;
  export default value;
}
