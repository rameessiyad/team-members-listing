import { useLayoutEffect, useState } from "react";

const POPUP_HEIGHT = 200;
const POPUP_WIDTH = 180;
const GAP = 4;

export const usePopupPosition = (buttonRef: React.RefObject<HTMLElement>) => {
  const [position, setPosition] = useState<{
    top: number;
    left: number;
    direction: "top" | "bottom";
  }>({ top: 0, left: 0, direction: "bottom" });

  useLayoutEffect(() => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;

    if (spaceBelow < POPUP_HEIGHT) {
      setPosition({
        top: rect.top - POPUP_HEIGHT - GAP,
        left: rect.left + rect.width / 2 - POPUP_WIDTH / 2,
        direction: "top",
      });
    } else {
      setPosition({
        top: rect.bottom + GAP,
        left: rect.left + rect.width / 2 - POPUP_WIDTH / 2,
        direction: "bottom",
      });
    }
  }, [buttonRef]);

  return position;
};
