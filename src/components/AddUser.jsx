import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { ImCross } from "react-icons/im";

const AddUser = () => {
  // use states to manage data
  const { userModal, setUserModal, setFetchUsers } = useStateContext();

  // states necessary to hold data for post request
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  // error handling states
  const [emailError, setEmailError] = useState(null);
  const [dataError, setDataError] = useState(null);

  const handleAdd = (e) => {
    // prevention page refresh
    e.preventDefault();

    // define options for post request and request body
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization:
          "Bearer a2ed4e1c10f4e8dd7e3da84df0e4687dd098b8788a6141efb7d64718f6727768",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        gender: gender,
        status: status,
      }),
    };
    if (gender !== "" && status !== "") {
      setDataError(null);

      // post request
      fetch("https://gorest.co.in/public/v1/users", requestOptions)
        .then((response) => {
          // error handling
          if (!response.ok) {
            if (response.status === 422) {
              setEmailError("Email already exists");
            }
            throw new Error(`HTTP error: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => {
          // add new user to fetched users state
          setFetchUsers((prevState) => ({
            meta: {
              ...prevState,
            },
            data: [
              ...prevState.data,
              {
                id: result.id,
                name: name,
                email: email,
                gender: gender,
                status: status,
              },
            ],
          }));
          // reset states to default
          setName("");
          setEmail("");
          setGender("");
          setStatus("");
          setEmailError(null);
          setUserModal(!userModal);
        })
        // catch error and display in console
        .catch((error) => console.log("error: ", error));
    } else {
      // error handling
      setDataError("Select gender and/or status");
    }
  };

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
          <form
            className="user-input"
            onSubmit={(e) => {
              handleAdd(e);
            }}
          >
            <h2>Add new user</h2>
            {/* name input */}
            <label htmlFor="name">
              <b>Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
            {/* email input */}
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* radio buttons to select gender */}
            <div
              className="selector"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <input type="radio" id="male" name="radio-gender" value="male" />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="female"
                name="radio-gender"
                value="female"
              />
              <label htmlFor="female">Female</label>
            </div>
            {/* radio buttons to select status */}
            <div
              className="selector"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <input
                type="radio"
                id="inactive"
                name="radio-status"
                value="inactive"
              />
              <label htmlFor="inactive">Inactive</label>
              <input
                type="radio"
                id="active"
                name="radio-status"
                value="active"
              />
              <label htmlFor="active">Active</label>
            </div>
            {/* submit form */}
            <button type="submit" className="add-button">
              Add new user
            </button>
            {/* show errors on screen if happen */}
            {emailError && <div className="error-box">{emailError}</div>}
            {dataError && <div className="error-box">{dataError}</div>}
          </form>
        </div>
      ) : null}
    </>
  );
};

export default AddUser;
