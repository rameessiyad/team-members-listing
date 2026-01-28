import React, { useRef } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { FiPlus } from "react-icons/fi";
import "./StatusPopup.scss";

const STATUSES = [
  "Active",
  "Inactive",
  "Busy",
  "Away",
  "On Leave",
  "Do Not Disturb",
  "Terminated",
];

interface Props {
  position: { top: number; left: number; direction: "top" | "bottom" };
  onSelect: (status: string) => void;
  onClose: () => void;
}

const StatusPopup = ({ position, onSelect, onClose }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, onClose);

  return (
    <div
      ref={ref}
      className={`status-popup ${position.direction}`}
      style={{ top: position.top, left: position.left }}
    >
      {STATUSES.map((status) => (
        <div
          key={status}
          className="status-popup__item"
          onClick={() => onSelect(status)}
        >
          {status}
        </div>
      ))}

      <div className="status-popup__add">
        <FiPlus size={14} />
        <span>Add new status</span>
      </div>
    </div>
  );
};

export default StatusPopup;
