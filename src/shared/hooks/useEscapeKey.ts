import { useCallback, useEffect } from "react";

export const useEscapeKey = (handleClose: () => void) => {
  const handleEscKey = useCallback(
    (event: { key: string }) => {
      if (event.key === "Escape") {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener("keyup", handleEscKey, false);

    return () => {
      document.removeEventListener("keyup", handleEscKey, false);
    };
  }, [handleEscKey]);
};
