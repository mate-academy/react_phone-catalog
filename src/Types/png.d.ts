declare module '*.png?inline' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}
