import React, { useState, useEffect } from "react";
import { links } from "../data/data";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

const Navbar = () => {
  // use states to manage data
  const { userModal, setUserModal, postModal, setPostModal } =
    useStateContext();

  // useStates to manage mobile menu
  const [showMobileMenuButton, setShowMobileMenuButton] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [screenSize, setScreenSize] = useState(undefined);

  // useEffect to handle the actual screen size and set the value to state
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // if screen size is below 850 - display mobile menu
  useEffect(() => {
    if (screenSize <= 850) {
      setShowMobileMenuButton(true);
    } else {
      setShowMobileMenuButton(false);
    }
  }, [screenSize]);

  return (
    <nav className="navbar">
      {/* decide which menu should be displayed */}
      {showMobileMenuButton ? (
        // mobile menu below
        <>
          <div className="mobile-menu">
            <h3>Task Frontend</h3>
            {/* decide which icon should be displayed */}
            {showMobileMenu ? (
              <MdClose
                className="mobile-menu-icon"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              />
            ) : (
              <GiHamburgerMenu
                className="mobile-menu-icon"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              />
            )}
            {/* click the icon above to expand menu below */}
            {showMobileMenu ? (
              <div className="mobile-menu-wrapper">
                <div className="navbar-links links-mobile">
                  {/* map links to subpages */}
                  {links.map((link) => (
                    <NavLink
                      to={`/${link.name}`}
                      key={link.name}
                      onClick={() => setShowMobileMenu(!showMobileMenu)}
                      className={({ isActive }) =>
                        isActive ? "link-active" : null
                      }
                    >
                      {/* display link icon */}
                      <span className="link-icon">{link.icon}</span>
                      {/* display link name */}
                      <span className="link-name">{link.name}</span>
                    </NavLink>
                  ))}
                </div>
                {/* navbar buttons to add new post and user */}
                <div className="navbar-buttons buttons-mobile">
                  <button
                    className="add-button"
                    onClick={() => {
                      setUserModal(!userModal);
                      setShowMobileMenu(!showMobileMenu);
                    }}
                  >
                    Add User
                  </button>
                  <button
                    className="add-button"
                    onClick={() => {
                      setPostModal(!postModal);
                      setShowMobileMenu(!showMobileMenu);
                    }}
                  >
                    Add Post
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </>
      ) : (
        // normal menu below
        <>
          <div className="navbar-links">
            {/* map links to subpages */}
            {links.map((link) => (
              <NavLink
                to={`/${link.name}`}
                key={link.name}
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
            <button
              className="add-button"
              onClick={() => setUserModal(!userModal)}
            >
              Add User
            </button>
            <button
              className="add-button"
              onClick={() => setPostModal(!postModal)}
            >
              Add Post
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
