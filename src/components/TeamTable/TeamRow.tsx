import React, { useRef } from "react";
import type { TeamMember } from "../../types/team";
import StatusBadge from "../StatusBadge/StatusBadge";
import "./TeamRow.scss";
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

interface Props {
  member: TeamMember;
  checked: boolean;
  onCheck: () => void;
  onStatusClick: (id: string, ref: HTMLButtonElement) => void;
}

const TeamRow = ({ member, checked, onCheck, onStatusClick }: Props) => {
  const statusRef = useRef<HTMLButtonElement>(null);

  return (
    <tr className="team-row">
      <td>
        <input type="checkbox" checked={checked} onChange={onCheck} />
      </td>

      <td>
        <div className="name-cell">
          <img src={member.avatar} alt={member.name} />
          <div>
            <div>{member.name}</div>
            <small>{member.username}</small>
          </div>
        </div>
      </td>

      <td>
        {member.status.map((s) => (
          <button
            key={s}
            ref={statusRef}
            className="status-trigger"
            onClick={() =>
              statusRef.current && onStatusClick(member.id, statusRef.current)
            }
          >
            <StatusBadge label={s} />
          </button>
        ))}
      </td>

      <td>{member.role}</td>
      <td>{member.email}</td>
      <td>
        <div className="team-badges">
          {member.teams.map((team) => (
            <span
              key={team}
              className={`team-badge team-badge--${team.replace(/\s/g, "").toLowerCase()}`}
            >
              {team}
            </span>
          ))}
        </div>
      </td>
      <td className="actions">
        <AiOutlineDelete className="action-icon" />
        <MdOutlineEdit className="action-icon" />
      </td>
    </tr>
  );
};

export default TeamRow;
