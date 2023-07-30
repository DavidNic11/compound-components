import { RefObject, useEffect } from "react";

export function useOnClickOutside<TElement extends HTMLElement = HTMLElement>(
  ref: RefObject<TElement>,
  handler: (event?: MouseEvent) => void,
  mouseEvent: "mousedown" | "mouseup" = "mousedown"
): void {
  useEffect(() => {
    const element = ref?.current;

    const checkElement = (event: MouseEvent) => {
      if (!element) {
        return;
      }

      if (element.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(mouseEvent, checkElement);

    return () => {
      document.removeEventListener(mouseEvent, checkElement);
    };
  }, [handler, mouseEvent, ref]);
}
