export const imageToBase64 = (url: string): Promise<string> => {
  return new Promise((resolve) => {
    const absoluteUrl =
      url.startsWith('http') ? url : `${window.location.origin}/${url}`;

    const img = new window.Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };

    img.onerror = () => resolve('');
    img.src = absoluteUrl;
  });
};
