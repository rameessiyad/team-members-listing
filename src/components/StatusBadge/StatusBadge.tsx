import React, { forwardRef } from "react";
import "./StatusBadge.scss";

interface Props {
  label: string;
  onClick?: () => void;
}

const StatusBadge = forwardRef<HTMLButtonElement, Props>(
  ({ label, onClick }, ref) => {
    return (
      <button
        ref={ref}
        className={`status-badge status-badge--${label
          .replace(/\s/g, "")
          .toLowerCase()}`}
        onClick={onClick}
      >
        {label}
      </button>
    );
  },
);

export default StatusBadge;
