import { useState } from 'react';

export function useStateCached(key, defaultValue) {
    const [value, setValue] = useState(localStorage.getItem(key) || defaultValue);

    const setValueAndSave = v => {
        setValue(v);
        localStorage.setItem(key, v);
    }

    return [value, setValueAndSave];
}