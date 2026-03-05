import { Font } from '@react-pdf/renderer';

const BASE_URL = `${window.location.origin}${import.meta.env.BASE_URL}`;

Font.register({
  family: 'Manrope',
  fonts: [
    { src: `${BASE_URL}fonts/Manrope-Regular.ttf`, fontWeight: 400 },
    { src: `${BASE_URL}fonts/Manrope-SemiBold.ttf`, fontWeight: 600 },
    { src: `${BASE_URL}fonts/Manrope-Bold.ttf`, fontWeight: 700 },
    { src: `${BASE_URL}fonts/Manrope-ExtraBold.ttf`, fontWeight: 800 },
  ],
});
