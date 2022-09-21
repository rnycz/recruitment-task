import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { ImCross } from "react-icons/im";

const AddUser = () => {
  // use states to manage data
  const { userModal, setUserModal } = useStateContext();
  return (
    <>
      {/* display modal window if userModal is true */}
      {userModal ? (
        <div className="user-modal">
          {/* close modal window */}
          <span
            className="close-modal"
            onClick={() => setUserModal(!userModal)}
          >
            <ImCross />
          </span>
          {/* form to enter necessary data */}
          <form className="user-input">
            <h2>Add new user</h2>
            <label htmlFor="name">
              <b>Name</b>
            </label>
            <input type="text" placeholder="Enter name" name="name" required />
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="text"
              placeholder="Enter email"
              name="email"
              required
            />
            <div className="selector">
              <input type="radio" id="male" name="radio-gender" />
              <label htmlFor="male">Male</label>
              <input type="radio" id="female" name="radio-gender" />
              <label htmlFor="female">Female</label>
            </div>
            <div className="selector">
              <input type="radio" id="inactive" name="radio-status" />
              <label htmlFor="inactive">Inactive</label>
              <input type="radio" id="active" name="radio-status" />
              <label htmlFor="active">Active</label>
            </div>
            {/* submit form */}
            <button type="submit" className="add-button">
              Add new user
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default AddUser;
