import { useState } from "react";
export function useLocalStorage(key, startValue) {
    const [value, setValue] = useState(() => {
        const data = localStorage.getItem(key);
        if (data == null) {
            return startValue;
        }
        try {
            return JSON.parse(data);
        }
        catch (e) {
            console.error(e);
            return startValue;
        }
    });
    const save = (newValue) => {
        setValue(prev => {
            const valueToStore = newValue instanceof Function
                ? newValue(prev)
                : newValue;
            localStorage.setItem(key, JSON.stringify(valueToStore));
            return valueToStore;
        });
    };
    return [value, save];
}
