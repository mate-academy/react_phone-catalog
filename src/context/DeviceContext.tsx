// import React, { createContext, useContext, useEffect, useState } from 'react';

// interface DeviceContextType {
//   isMobile: boolean;
//   menuBtn: boolean;
//   setMenuBtn: React.Dispatch<React.SetStateAction<boolean>>;
// }

//const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

// export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [menuBtn, setMenuBtn] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       const isNowMobile = window.innerWidth < 640;

//       setIsMobile(prev => {
//         if (prev != isNowMobile) {
//           setMenuBtn(false);
//         }

//         return isNowMobile;
//       });
//     };

//     window.addEventListener('resize', handleResize);

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <DeviceContext.Provider value={{ isMobile, menuBtn, setMenuBtn }}>
//       {children}
//     </DeviceContext.Provider>
//   );
// };

// export const useDevice = () => {
//   const context = useContext(DeviceContext);

//   if (!context) {
//     throw new Error('useDevice must be used within a DeviceProvider');
//   }

//   return context;
// };
