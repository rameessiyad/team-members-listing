import React from 'react';
import "./StatusBadge.scss";

interface Props {
  label: string;
  onClick?: () => void;
}

const StatusBadge = ({ label, onClick }: Props) => {
  return (
    <button
      className={`status-badge status-badge--${label.replace(/\s/g, "").toLowerCase()}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default StatusBadge;
