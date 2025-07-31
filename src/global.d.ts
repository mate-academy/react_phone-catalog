declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

// Декларація для плагіна Tailwind CSS Vite
declare module '@tailwindcss/vite' {
  import { Plugin } from 'vite';
  const tailwindcss: () => Plugin;
  export default tailwindcss;
}
