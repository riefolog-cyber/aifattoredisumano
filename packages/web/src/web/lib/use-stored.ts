import { useEffect, useState } from "react";

type Initial<T> = T | (() => T);

export function useStored<T>(key: string, initial: Initial<T>) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) return JSON.parse(raw) as T;
    } catch {
      // valore corrotto o storage non disponibile: si riparte dal default
    }
    return typeof initial === "function" ? (initial as () => T)() : initial;
  });
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [key, value]);

  return [value, setValue, storageError] as const;
}
