import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);

      return stored ? JSON.parse(stored) : startValue;
    } catch {
      return startValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    }
    catch (error) {
      throw new Error (`Can't read localStorage key ${key}: ${error}`)
    }
  }, [key, value]);

  return [value, setValue];
}
