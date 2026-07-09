import { useState, useEffect } from 'react';

/**
 * A custom hook that delays updating a value until after a specified delay
 * has passed since the last time the value was changed.
 * * Commonly used to prevent expensive operations (like API calls or
 * complex filtering) from running on every keystroke.
 */

// --- TIMER SETUP ---
// Set up a timer to update the debounced value after the specified delay
// --- CLEANUP ---
// This is the "magic" part: if the value or delay changes before
// the timeout finishes (e.g., user is still typing),
// the previous timer is cleared and a new one starts.

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
