import { useCallback, useState, useEffect } from "react";

type StorageObject = Storage | null;

type UseStorageReturnType<T> = [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>, () => void];

function useStorage<T>(key: string, defaultValue: T | (() => T), storageObject: StorageObject): UseStorageReturnType<T> {
    const [value, setValue] = useState<T | undefined>(() => {
        const jsonValue = storageObject?.getItem(key);
        if (jsonValue != null) return JSON.parse(jsonValue);

        if (typeof defaultValue === "function") {
            return (defaultValue as () => T)();
        } else {
            return defaultValue;
        }
    });

    useEffect(() => {
        if (storageObject === null) return;
        if (value === undefined) return storageObject.removeItem(key);
        storageObject.setItem(key, JSON.stringify(value));
    }, [key, value, storageObject]);

    const remove = useCallback(() => {
        setValue(undefined);
    }, []);

    return [value, setValue, remove];
}

export function useLocalStorage<T>(key: string, defaultValue: T | (() => T)): UseStorageReturnType<T> {
    return useStorage(key, defaultValue, window.localStorage);
}

export function useSessionStorage<T>(key: string, defaultValue: T | (() => T)): UseStorageReturnType<T> {
    return useStorage(key, defaultValue, window.sessionStorage);
}