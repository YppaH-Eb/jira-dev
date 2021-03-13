import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "success" | "error";
}

const defaultInitialState: State<null> = {
  error: null,
  stat: "idle",
  data: null,
};

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = (data: D) =>
    setState({
      error: null,
      stat: "success",
      data,
    });

  const setError = (error: Error) =>
    setState({
      error,
      data: null,
      stat: "error",
    });

  const run = (promise: Promise<D>) => {
    setState({
      error: null,
      stat: "loading",
      data: null,
    });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return error;
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
