import React, { useRef } from "react";
import type { TeamMember } from "../../types/team";
import StatusBadge from "../StatusBadge/StatusBadge";
import "./TeamRow.scss";

interface Props {
  member: TeamMember;
  checked: boolean;
  onCheck: () => void;
  onStatusClick: (id: string, ref: HTMLButtonElement) => void;
}

const TeamRow = ({ member, checked, onCheck, onStatusClick }: Props) => {
  const statusRef = useRef<HTMLButtonElement>(null);

  return (
    <tr>
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
          <StatusBadge
            key={s}
            label={s}
            onClick={() =>
              statusRef.current && onStatusClick(member.id, statusRef.current)
            }
          />
        ))}
      </td>

      <td>{member.role}</td>
      <td>{member.email}</td>
      <td>{member.teams.join(", ")}</td>
    </tr>
  );
};

export default TeamRow;
