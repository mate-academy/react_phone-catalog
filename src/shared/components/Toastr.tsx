import { Toaster } from 'react-hot-toast';

export const Toastr = () => {
  const root = getComputedStyle(document.documentElement);

  const successBg = root.getPropertyValue('--green');
  const color = root.getPropertyValue('--white');

  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
        success: {
          style: {
            background: successBg,
            color,
          },
        },
      }}
    />
  );
};
