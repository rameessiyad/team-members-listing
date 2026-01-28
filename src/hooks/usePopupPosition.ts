import React, { useLayoutEffect, useState } from "react";

export const usePopupPosition = (buttonRef: React.RefObject<HTMLElement>) => {
  const [position, setPosition] = useState<{
    top: number;
    left: number;
    direction: "top" | "bottom";
  }>({ top: 0, left: 0, direction: "bottom" });

  useLayoutEffect(() => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const popupHeight = 200;
    const spaceBelow = window.innerHeight - rect.bottom;

    if (spaceBelow < popupHeight) {
      setPosition({
        top: rect.top - popupHeight - 8,
        left: rect.left,
        direction: "top",
      });
    } else {
      setPosition({
        top: rect.bottom + 8,
        left: rect.left,
        direction: "bottom",
      });
    }
  }, [buttonRef]);

  return position;
};
