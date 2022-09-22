import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { ImCross } from "react-icons/im";

const AddPost = () => {
  // use states to manage data
  const { postModal, setPostModal, setFetchPosts } = useStateContext();

  // states necessary to hold data for post request
  const [userID, setUserID] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // error handling states
  const [userIDError, setUserIDError] = useState(null);
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
        user_id: userID,
        title: title,
        body: body,
      }),
    };
    if (title !== "" && body !== "") {
      setDataError(null);

      // post request
      fetch("https://gorest.co.in/public/v1/posts", requestOptions)
        .then((response) => {
          // error handling
          if (!response.ok) {
            if (response.status === 422) {
              setUserIDError(`User with ID: ${userID} not exists`);
            }
            throw new Error(`HTTP error: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => {
          // add new post to fetched posts state
          setFetchPosts((prevState) => ({
            meta: {
              ...prevState,
            },
            data: [
              {
                id: result.id,
                user_id: userID,
                title: title,
                body: body,
              },
              ...prevState.data,
            ],
          }));
          // reset values to default
          setUserID(null);
          setTitle("");
          setBody("");
          setUserIDError(null);
          setPostModal(!postModal);
        })
        // catch error and display in console
        .catch((error) => console.log("error: ", error));
    } else {
      // error handling
      setDataError("Title and body cannot be blank");
    }
  };

  return (
    <>
      {/* display modal window if postModal is true */}
      {postModal ? (
        <div className="post-modal">
          {/* close modal window */}
          <span
            className="close-modal"
            onClick={() => setPostModal(!postModal)}
          >
            <ImCross />
          </span>
          {/* form to enter necessary data */}
          <form
            className="post-input"
            onSubmit={(e) => {
              handleAdd(e);
            }}
          >
            <h2>Add new post</h2>
            {/* userID input */}
            <label htmlFor="userID">
              <b>User ID</b>
            </label>
            <input
              type="number"
              placeholder="Enter userID"
              name="userID"
              required
              onChange={(e) => setUserID(e.target.value)}
            />
            {/* title input */}
            <label htmlFor="title">
              <b>Title</b>
            </label>
            <input
              type="text"
              placeholder="Enter title"
              name="title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* body input */}
            <label htmlFor="body">
              <b>Post content</b>
            </label>
            <input
              type="text"
              placeholder="Enter post content"
              name="body"
              required
              onChange={(e) => setBody(e.target.value)}
            />
            {/* submit form */}
            <button type="submit" className="add-button">
              Add new post
            </button>
            {/* show errors on screen if happen */}
            {userIDError && <div className="error-box">{userIDError}</div>}
            {dataError && <div className="error-box">{dataError}</div>}
          </form>
        </div>
      ) : null}
    </>
  );
};

export default AddPost;
