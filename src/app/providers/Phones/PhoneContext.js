import { jsx as _jsx } from "react/jsx-runtime";
import { api } from '@/api/api';
import { createContext, useCallback, useContext, useRef, useState, } from 'react';
const PhonesContext = createContext(null);
export function PhonesProvider({ children }) {
    const [phones, setPhones] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const requestRef = useRef(null);
    const loadPhones = useCallback(async () => {
        if (phones) {
            return phones;
        }
        if (requestRef.current) {
            return requestRef.current;
        }
        setLoading(true);
        setError(null);
        requestRef.current = api
            .getPhones()
            .then((data) => {
            setPhones(data);
            return data;
        })
            .catch((error) => {
            setError('Failed to load phones');
            requestRef.current = null;
            throw error;
        })
            .finally(() => {
            setLoading(false);
        });
        return requestRef.current;
    }, [phones]);
    return (_jsx(PhonesContext.Provider, { value: {
            phones,
            loading,
            error,
            loadPhones,
        }, children: children }));
}
export function usePhones() {
    const context = useContext(PhonesContext);
    if (!context) {
        throw new Error('usePhones must be used inside PhonesProvider');
    }
    return context;
}
