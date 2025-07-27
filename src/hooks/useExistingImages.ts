import { useEffect, useState } from 'react';

export const useExistingImages = (urls: string[]) => {
  const [existingUrls, setExistingUrls] = useState<string[]>([]);

  useEffect(() => {
    Promise.all(
      urls.map(
        url =>
          new Promise<string | null>(resolve => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => resolve(null);
            img.src = url;
          }),
      ),
    ).then(results => {
      setExistingUrls(results.filter(Boolean) as string[]);
    });
  }, [urls]);

  return existingUrls;
};
