import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (object) => {
  //不能直接修改传入的对象
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (param, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(param);
  useEffect(() => {
    let timeout = setTimeout(() => setDebouncedValue(param), delay);
    return () => clearTimeout(timeout);
  }, [param, delay]);
  return debouncedValue;
};
