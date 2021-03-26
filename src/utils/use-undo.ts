import { useState } from "react";
import set = Reflect.set;

export const useUndo = <T>(initialState: T) => {
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState<T>(initialState);
  const [future, setFuture] = useState<T[]>([]);

  const canUndo = past.length !== 0;
  const canRedo = past.length !== 0;

  const undo = () => {
    if (!canUndo) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(1, past.length - 1);

    setPast(newPast);
    setPresent(previous);
    setFuture([present, ...future]);
  };
  const redo = () => {
    if (!canRedo) return;
    const next = future[0];
    const newFuture = future.slice(1);

    setPast([...past, present]);
    setPresent(next);
    setFuture(newFuture);
  };
  const set = (newPresent: T) => {
    if (newPresent === present) return;
    setPast([...past, present]);
    setPresent(newPresent);
    setFuture([]);
  };
  const reset = (newPresent: T) => {
    setPast([]);
    setPresent(newPresent);
    setFuture([]);
  };
  return [
    { past, present, future },
    { set, reset, undo, redo, canUndo, canRedo },
  ];
};
