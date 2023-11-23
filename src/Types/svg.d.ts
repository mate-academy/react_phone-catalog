declare module '*.svg?inline' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}
