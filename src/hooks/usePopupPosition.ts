import { useLayoutEffect, useState } from "react";

const POPUP_WIDTH = 180;
const GAP = 6;

export const usePopupPosition = (
  target: HTMLElement | null,
  popupRef: React.RefObject<HTMLDivElement>,
) => {
  const [position, setPosition] = useState<{
    top: number;
    left: number;
    direction: "top" | "bottom";
  }>({
    top: 0,
    left: 0,
    direction: "bottom",
  });

  useLayoutEffect(() => {
    if (!target || !popupRef.current) return;

    const buttonRect = target.getBoundingClientRect();
    const popupHeight = popupRef.current.offsetHeight;

    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const left = buttonRect.left + buttonRect.width / 2 - POPUP_WIDTH / 2;

    if (spaceBelow < popupHeight + GAP) {
      setPosition({
        top: buttonRect.top - popupHeight - GAP,
        left,
        direction: "top",
      });
    } else {
      setPosition({
        top: buttonRect.bottom + GAP,
        left,
        direction: "bottom",
      });
    }
  }, [target, popupRef]);

  return position;
};
