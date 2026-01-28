import React, { useRef, useState, useEffect } from "react";
import { teamMembers as initialData } from "../../data/teamMembers";
import type { TeamMember } from "../../types/team";
import { CiCircleQuestion } from "react-icons/ci";
import { FaArrowDown } from "react-icons/fa";
import TeamRow from "./TeamRow";
import StatusPopup from "../StatusPopup/StatusPopup";
import { Pagination } from "./Pagination";
import { usePopupPosition } from "../../hooks/usePopupPosition";
import "./TeamTable.scss";

const TeamTable: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>(initialData);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeButton, setActiveButton] = useState<HTMLButtonElement | null>(
    null,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const popupRef = useRef<HTMLDivElement>(null);

  const calculateItemsPerPage = () => {
    const rowHeight = 60;
    const headerHeight = 50;
    const footerHeight = 50;
    const padding = 40;

    const availableHeight =
      window.innerHeight - headerHeight - footerHeight - padding;

    const perPage = Math.floor(availableHeight / rowHeight);
    setItemsPerPage(perPage > 0 ? perPage : 1);
  };

  useEffect(() => {
    calculateItemsPerPage();
    window.addEventListener("resize", calculateItemsPerPage);

    return () => {
      window.removeEventListener("resize", calculateItemsPerPage);
    };
  }, []);

  const totalPages = Math.ceil(members.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = members.slice(startIndex, startIndex + itemsPerPage);

  const position = usePopupPosition(activeButton, popupRef);

  const toggleAll = () => {
    const pageIds = currentItems.map((m) => m.id);
    const allSelected = pageIds.every((id) => selectedIds.has(id));

    const updated = new Set(selectedIds);

    if (allSelected) {
      pageIds.forEach((id) => updated.delete(id));
    } else {
      pageIds.forEach((id) => updated.add(id));
    }

    setSelectedIds(updated);
  };

  const toggleOne = (id: string) => {
    const updated = new Set(selectedIds);
    updated.has(id) ? updated.delete(id) : updated.add(id);
    setSelectedIds(updated);
  };

  const updateStatus = (status: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === activeId ? { ...m, status: [status] } : m)),
    );

    setActiveId(null);
    setActiveButton(null);
  };

  return (
    <div className="team-table">
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  currentItems.length > 0 &&
                  currentItems.every((m) => selectedIds.has(m.id))
                }
                onChange={toggleAll}
              />
            </th>

            <th>Name</th>

            <th>
              <div className="header-flex">
                Status <FaArrowDown />
              </div>
            </th>

            <th>
              <div className="header-flex">
                Role <CiCircleQuestion />
              </div>
            </th>

            <th>Email address</th>
            <th>Teams</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {currentItems.map((member) => (
            <TeamRow
              key={member.id}
              member={member}
              checked={selectedIds.has(member.id)}
              onCheck={() => toggleOne(member.id)}
              onStatusClick={(id, ref) => {
                setActiveId(id);
                setActiveButton(ref);
              }}
            />
          ))}
        </tbody>
      </table>

      {activeId && activeButton && (
        <StatusPopup
          popupRef={popupRef}
          position={position}
          onSelect={updateStatus}
          onClose={() => {
            setActiveId(null);
            setActiveButton(null);
          }}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TeamTable;
