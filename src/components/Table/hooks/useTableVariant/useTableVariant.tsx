import { useMemo } from "react";

import { useResponsiveScreen } from "../../../../shared/hooks/useScreenSize";
import { useControlledState } from "../../../../shared/hooks/useControlledState";

import { TableContextValues } from "../../TableContext";

export const useTableVariant = (variant?: TableContextValues["variant"]) => {
  const [controlledVariant, setControlledVariant] = useControlledState<
    TableContextValues["variant"]
  >({
    controlledValue: variant,
    defaultValue: "full",
  });

  if (!controlledVariant) {
    throw new Error("how did you get here???");
  }

  useResponsiveScreen(
    useMemo(() => {
      return {
        lg: () => setControlledVariant("full"),
        md: () => setControlledVariant("compact"),
      };
    }, [])
  );

  return controlledVariant;
};
