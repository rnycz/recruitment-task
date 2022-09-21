import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { ImCross } from "react-icons/im";

const AddPost = () => {
  // use states to manage data
  const { postModal, setPostModal } = useStateContext();
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
          <form className="post-input">
            <h2>Add new post</h2>
            <label htmlFor="userID">
              <b>User ID</b>
            </label>
            <input
              type="number"
              placeholder="Enter userID"
              name="userID"
              required
            />
            <label htmlFor="title">
              <b>Title</b>
            </label>
            <input
              type="text"
              placeholder="Enter title"
              name="title"
              required
            />
            <label htmlFor="body">
              <b>Post content</b>
            </label>
            <input
              type="text"
              placeholder="Enter post content"
              name="body"
              required
            />
            {/* submit form */}
            <button type="submit" className="add-button">
              Add new post
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default AddPost;
