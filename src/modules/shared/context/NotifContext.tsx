// import React, { createContext, useState } from 'react';

// type NotificationContextType = {
//   notification: boolean;
//   setNotification: React.Dispatch<React.SetStateAction<boolean>>;
// };

// export const NotificationContext = createContext<NotificationContextType>({
//   notification: false,
//   setNotification: () => {},
// });

// export const NotificationProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [notification, setNotification] = useState<boolean>(false);

//   return (
//     <NotificationContext.Provider value={{ notification, setNotification }}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };
