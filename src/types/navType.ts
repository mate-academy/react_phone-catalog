import { NavigateOptions, To } from 'react-router-dom';

export type NavType = (to: To, options?: NavigateOptions | undefined) => void;
