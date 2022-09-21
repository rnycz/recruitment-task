import React, { createContext, useContext, useState } from "react";

// create context to provide app states
const StateContext = createContext();

// export provider to read states
export const ContextProvider = ({ children }) => {
  // users states
  const [fetchUsers, setFetchUsers] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);

  // posts states
  const [fetchPosts, setFetchPosts] = useState(null);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [errorPosts, setErrorPosts] = useState(null);

  // comments states
  const [fetchComments, setFetchComments] = useState(null);
  const [loadingComments, setLoadingComments] = useState(true);
  const [errorComments, setErrorComments] = useState(null);

  // todos states
  const [fetchTodos, setFetchTodos] = useState(null);
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [errorTodos, setErrorTodos] = useState(null);

  // modal window states
  const [userModal, setUserModal] = useState(false);
  const [postModal, setPostModal] = useState(false);
  return (
    //states provider
    <StateContext.Provider
      value={{
        fetchUsers,
        setFetchUsers,
        loadingUsers,
        setLoadingUsers,
        errorUsers,
        setErrorUsers,

        fetchPosts,
        setFetchPosts,
        loadingPosts,
        setLoadingPosts,
        errorPosts,
        setErrorPosts,

        fetchComments,
        setFetchComments,
        loadingComments,
        setLoadingComments,
        errorComments,
        setErrorComments,

        fetchTodos,
        setFetchTodos,
        loadingTodos,
        setLoadingTodos,
        errorTodos,
        setErrorTodos,

        userModal,
        setUserModal,
        postModal,
        setPostModal,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// export state context to use states
export const useStateContext = () => useContext(StateContext);
