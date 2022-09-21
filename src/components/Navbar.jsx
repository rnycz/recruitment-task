import React from "react";
import { links } from "../data/data";
import { Link, NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const Navbar = () => {
  const { userModal, setUserModal, postModal, setPostModal } =
    useStateContext();
  return (
    <nav className="navbar">
      {/* map links to subpages */}
      <div className="navbar-links">
        {links.map((link) => (
          <NavLink
            to={`/${link.name}`}
            key={link.name}
            // onClick={handleCloseSidebar}
            className={({ isActive }) => (isActive ? "link-active" : null)}
          >
            {/* display link icon */}
            <span className="link-icon">{link.icon}</span>
            {/* display link name */}
            <span className="link-name">{link.name}</span>
          </NavLink>
        ))}
      </div>
      {/* navbar buttons to add new post and user */}
      <div className="navbar-buttons">
        <button className="add-button" onClick={() => setUserModal(!userModal)}>
          Add User
        </button>
        <button className="add-button" onClick={() => setPostModal(!postModal)}>
          Add Post
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
