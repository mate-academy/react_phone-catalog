declare module '*.module.scss';
declare module '*.png';
declare module 'redux-persist/lib/storage' {
  const storage: any;
  export default storage;
}
