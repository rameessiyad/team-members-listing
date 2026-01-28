import React, { useState } from "react";
import { FaWhatsapp, FaSortAlphaUp } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { IoSettingsOutline, IoSearchOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { AiOutlineImport, AiOutlineExport } from "react-icons/ai";
import { GoBell } from "react-icons/go";

import "./Header.scss";
import ActionButtons from "./ActionButtons";

const Header: React.FC = () => {
  const [search, setSearch] = useState("");

  return (
    <header className="header">
      <div className="header-row header-row-top">
        <h1 className="title">Team members</h1>

        <div className="icons-right">
          <IoSearchOutline className="icon" />
          <FaWhatsapp className="icon" />
          <IoSettingsOutline className="icon" />
          <CiCirclePlus className="icon" />
          <GoBell className="icon" />
          <div className="avatar">A</div>
        </div>
      </div>

      <div className="header-row header-row-bottom">
        <div className="search-container">
          <IoSearchOutline className="icon" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="actions">
          <ActionButtons title="Filter" icon={<CiFilter />} filter={true} />
          <ActionButtons title="Sort" icon={<FaSortAlphaUp />} filter={false} />
          <ActionButtons
            title="Import"
            icon={<AiOutlineImport />}
            filter={false}
          />
          <ActionButtons
            title="Export"
            icon={<AiOutlineExport />}
            filter={false}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
