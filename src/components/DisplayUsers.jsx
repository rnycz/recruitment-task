import React from "react";
import { useStateContext } from "../contexts/ContextProvider";

const DisplayUsers = () => {
  // use states to manage data
  const { fetchUsers, loadingUsers, errorUsers } = useStateContext();

  return (
    // render component content
    <div className="users-container">
      {/* info - waiting to load users */}
      {loadingUsers && <div className="info-box">Loading Users...</div>}
      {/* info - display error on screen */}
      {errorUsers && (
        <div className="info-box">{`There is a problem fetching the users - ${errorUsers}`}</div>
      )}
      {fetchUsers && (
        <table className="users-table">
          {/* table headers */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* map data to matching cells */}
            {fetchUsers.data.map(({ id, name, email, gender, status }) => (
              <tr key={id}>
                <td data-label="Name">{name}</td>
                <td data-label="Email">{email}</td>
                <td data-label="Gender">{gender}</td>
                <td data-label="Status">{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DisplayUsers;
