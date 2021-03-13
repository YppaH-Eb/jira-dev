import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
// let b:object=()=>{
//  //这样传入一个函数也不会报错
// }
//object: {[key:string]:unknown}限制我们需要的就是一个字符串

export const cleanObject = (object: { [key: string]: unknown }) => {
  //不能直接修改传入的对象
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <V>(param: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(param);
  useEffect(() => {
    let timeout = setTimeout(() => setDebouncedValue(param), delay);
    return () => clearTimeout(timeout);
  }, [param, delay]);
  return debouncedValue;
};
