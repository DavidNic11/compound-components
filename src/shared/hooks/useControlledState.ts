import { Dispatch, useCallback, useRef, useState } from "react";

type UseControlledState<TState> = {
  controlledValue?: TState;
  defaultValue?: TState;
};

type FirstParameter<TFunction extends (...args: any[]) => any> =
  Parameters<TFunction> extends [infer First] ? First : never;

export const useControlledState = <TState>({
  defaultValue,
  controlledValue,
}: UseControlledState<TState>) => {
  const { current: controlled } = useRef(
    typeof controlledValue !== "undefined"
  );

  const [state, setState] = useState(defaultValue);

  const value = controlled ? controlledValue : state;

  const set = useCallback(
    (value: FirstParameter<typeof setState>) => {
      if (!controlled) {
        setState(value);
      }
    },
    [controlled]
  );

  return [value, set] as const;
};
