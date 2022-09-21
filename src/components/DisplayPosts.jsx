import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { HiOutlineUserCircle } from "react-icons/hi";

const DisplayPosts = () => {
  // use states to manage data
  const {
    fetchPosts,
    loadingPosts,
    errorPosts,

    fetchComments,
    loadingComments,
    errorComments,
  } = useStateContext();

  return (
    // render component content
    <div className="posts-container">
      {/* info - waiting to load posts */}
      {loadingPosts && <div className="info-box">Loading Posts...</div>}
      {/* info - display error on screen */}
      {errorPosts && (
        <div className="info-box">{`There is a problem fetching the posts - ${errorPosts}`}</div>
      )}
      {fetchPosts && (
        <>
          {/* map data to matching cells */}
          {fetchPosts.data.map((post) => (
            <div className="post-box" key={post.id}>
              <div className="post-title">
                <span>{post.title}</span>
              </div>
              <div className="post-body">{post.body}</div>
              <div className="post-comments">
                <h3>Comments</h3>
                {/* info - waiting to load comments */}
                {loadingComments && (
                  <div className="info-box">Loading Comments...</div>
                )}
                {/* info - display error on screen */}
                {errorComments && (
                  <div className="info-box">{`There is a problem fetching the comments - ${errorComments}`}</div>
                )}
                {fetchComments && (
                  <>
                    {/* map comments to posts */}
                    {fetchComments.data.map((comment) =>
                      comment.post_id === post.id ? (
                        <div className="comment" key={comment.id}>
                          <div className="comment-wrapper">
                            <span className="comment-icon">
                              <HiOutlineUserCircle />
                            </span>
                            <div className="comment-user">
                              <div className="comment-name">{comment.name}</div>
                              <div className="comment-email">
                                {comment.email}
                              </div>
                            </div>
                          </div>
                          <div className="comment-body">{comment.body}</div>
                        </div>
                      ) : null
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DisplayPosts;
