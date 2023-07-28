import { useEffect, useMemo } from "react";
import { useMediaQuery } from "./useMediaQuery";

type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl";

const breakpoints: Record<ScreenSize, `${number}px`> = {
  xs: "320px",
  sm: "576px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

export const useScreenSize = () => {
  const { xs, sm, md, lg, xl } = breakpoints;
  const isExtraLarge = useMediaQuery(`(min-width: ${xl})`);
  const isLarge = useMediaQuery(`(min-width: ${md}) and (max-width: ${lg})`);
  const isMedium = useMediaQuery(`(min-width: ${sm}) and (max-width: ${md})`);
  const isSmall = useMediaQuery(`(min-width: ${xs}) and (max-width: ${sm})`);
  const isExtraSmall = useMediaQuery(`(max-width: ${xs})`);

  const currentSize: ScreenSize = useMemo(() => {
    if (isExtraLarge) return "xl";
    if (isLarge) return "lg";
    if (isMedium) return "md";
    if (isSmall) return "sm";
    return "xs";
  }, [isExtraLarge, isLarge, isMedium, isSmall, isExtraSmall]);

  return {
    isExtraLarge,
    isLarge,
    isMedium,
    isSmall,
    isExtraSmall,
    currentSize,
  };
};

type ScreenSizeHooks = {
  [Screen in ScreenSize]?: () => void;
};

export const useResponsiveScreen = (config: ScreenSizeHooks) => {
  const { currentSize } = useScreenSize();

  useEffect(() => {
    config?.[currentSize]?.();
  }, [currentSize, config]);
};
